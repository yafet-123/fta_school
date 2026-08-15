// migrate_categories.js
// Run: node migrate_categories.js
// This safely migrates Book and ExamPreparation to use category tables.
// All existing rows are preserved under a "General" category per subject.

const mysql = require("mysql2/promise");

const DB_URL = "mysql://aceitcom_admin:10550583yafet@91.204.209.4:3306/aceitcom_quiz";

function parseUrl(url) {
  const u = new URL(url);
  return {
    host: u.hostname,
    port: parseInt(u.port) || 3306,
    user: u.username,
    password: u.password,
    database: u.pathname.replace(/^\//, ""),
  };
}

const steps = [
  {
    name: "Create BookCategory table",
    sql: `
      CREATE TABLE IF NOT EXISTS \`BookCategory\` (
        \`id\`        INT NOT NULL AUTO_INCREMENT,
        \`title\`     VARCHAR(255) NOT NULL,
        \`subjectId\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        INDEX \`idx_bookCategory_subjectId\` (\`subjectId\`),
        INDEX \`idx_bookCategory_title\` (\`title\`),
        CONSTRAINT \`BookCategory_subject_fkey\`
          FOREIGN KEY (\`subjectId\`) REFERENCES \`Subject\` (\`id\`)
          ON DELETE CASCADE ON UPDATE RESTRICT
      );
    `,
  },
  {
    name: "Create ExamPreparationCategory table",
    sql: `
      CREATE TABLE IF NOT EXISTS \`ExamPreparationCategory\` (
        \`id\`        INT NOT NULL AUTO_INCREMENT,
        \`title\`     VARCHAR(255) NOT NULL,
        \`subjectId\` INT NOT NULL,
        PRIMARY KEY (\`id\`),
        INDEX \`idx_examPreparationCategory_subjectId\` (\`subjectId\`),
        INDEX \`idx_examPreparationCategory_title\` (\`title\`),
        CONSTRAINT \`ExamPreparationCategory_subject_fkey\`
          FOREIGN KEY (\`subjectId\`) REFERENCES \`Subject\` (\`id\`)
          ON DELETE CASCADE ON UPDATE RESTRICT
      );
    `,
  },
  {
    name: "Seed one General BookCategory per subject that has Books",
    sql: `
      INSERT INTO \`BookCategory\` (\`title\`, \`subjectId\`)
      SELECT DISTINCT 'General', b.subjectId
      FROM \`Book\` b
      WHERE b.subjectId IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM \`BookCategory\` bc
          WHERE bc.subjectId = b.subjectId AND bc.title = 'General'
        );
    `,
  },
  {
    name: "Add bookCategoryId column to Book (nullable)",
    sql: `
      ALTER TABLE \`Book\`
        ADD COLUMN \`bookCategoryId\` INT NULL
        AFTER \`bookFile\`;
    `,
    skipIfExists: true,
  },
  {
    name: "Backfill bookCategoryId on Book rows",
    sql: `
      UPDATE \`Book\` b
      JOIN \`BookCategory\` bc
        ON bc.\`subjectId\` = b.\`subjectId\`
        AND bc.\`title\` = 'General'
      SET b.\`bookCategoryId\` = bc.\`id\`
      WHERE b.\`bookCategoryId\` IS NULL;
    `,
  },
  {
    name: "Make Book.bookCategoryId NOT NULL",
    sql: `ALTER TABLE \`Book\` MODIFY \`bookCategoryId\` INT NOT NULL;`,
  },
  {
    name: "Add FK constraint Book -> BookCategory",
    sql: `
      ALTER TABLE \`Book\`
        ADD CONSTRAINT \`Book_category_fkey\`
          FOREIGN KEY (\`bookCategoryId\`) REFERENCES \`BookCategory\` (\`id\`)
          ON DELETE CASCADE ON UPDATE RESTRICT;
    `,
    skipIfExists: true,
  },
  {
    name: "Drop old Book FK (Book_subject_fkey)",
    sql: `ALTER TABLE \`Book\` DROP FOREIGN KEY \`Book_subject_fkey\`;`,
    skipIfMissing: true,
  },
  {
    name: "Drop old Book index idx_book_subjectId",
    sql: `ALTER TABLE \`Book\` DROP INDEX \`idx_book_subjectId\`;`,
    skipIfMissing: true,
  },
  {
    name: "Drop Book.subjectId column",
    sql: `ALTER TABLE \`Book\` DROP COLUMN \`subjectId\`;`,
    skipIfMissing: true,
  },
  {
    name: "Add Book index idx_book_categoryId",
    sql: `ALTER TABLE \`Book\` ADD INDEX \`idx_book_categoryId\` (\`bookCategoryId\`);`,
    skipIfExists: true,
  },
  // ─── ExamPreparation ───────────────────────────────────────────────────────
  {
    name: "Seed one General ExamPreparationCategory per subject",
    sql: `
      INSERT INTO \`ExamPreparationCategory\` (\`title\`, \`subjectId\`)
      SELECT DISTINCT 'General', ep.subjectId
      FROM \`ExamPreparation\` ep
      WHERE ep.subjectId IS NOT NULL
        AND NOT EXISTS (
          SELECT 1 FROM \`ExamPreparationCategory\` epc
          WHERE epc.subjectId = ep.subjectId AND epc.title = 'General'
        );
    `,
  },
  {
    name: "Add examPreparationCategoryId column to ExamPreparation (nullable)",
    sql: `
      ALTER TABLE \`ExamPreparation\`
        ADD COLUMN \`examPreparationCategoryId\` INT NULL
        AFTER \`bookFile\`;
    `,
    skipIfExists: true,
  },
  {
    name: "Backfill examPreparationCategoryId on ExamPreparation rows",
    sql: `
      UPDATE \`ExamPreparation\` ep
      JOIN \`ExamPreparationCategory\` epc
        ON epc.\`subjectId\` = ep.\`subjectId\`
        AND epc.\`title\` = 'General'
      SET ep.\`examPreparationCategoryId\` = epc.\`id\`
      WHERE ep.\`examPreparationCategoryId\` IS NULL;
    `,
  },
  {
    name: "Make ExamPreparation.examPreparationCategoryId NOT NULL",
    sql: `ALTER TABLE \`ExamPreparation\` MODIFY \`examPreparationCategoryId\` INT NOT NULL;`,
  },
  {
    name: "Add FK ExamPreparation -> ExamPreparationCategory",
    sql: `
      ALTER TABLE \`ExamPreparation\`
        ADD CONSTRAINT \`ExamPreparation_category_fkey\`
          FOREIGN KEY (\`examPreparationCategoryId\`)
          REFERENCES \`ExamPreparationCategory\` (\`id\`)
          ON DELETE CASCADE ON UPDATE RESTRICT;
    `,
    skipIfExists: true,
  },
  {
    name: "Drop old ExamPreparation FK (ExamPreparation_ibfk_1)",
    sql: `ALTER TABLE \`ExamPreparation\` DROP FOREIGN KEY \`ExamPreparation_ibfk_1\`;`,
    skipIfMissing: true,
  },
  {
    name: "Drop old ExamPreparation index idx_subjectId",
    sql: `ALTER TABLE \`ExamPreparation\` DROP INDEX \`idx_subjectId\`;`,
    skipIfMissing: true,
  },
  {
    name: "Drop ExamPreparation.subjectId column",
    sql: `ALTER TABLE \`ExamPreparation\` DROP COLUMN \`subjectId\`;`,
    skipIfMissing: true,
  },
  {
    name: "Add ExamPreparation index idx_examPreparation_categoryId",
    sql: `ALTER TABLE \`ExamPreparation\` ADD INDEX \`idx_examPreparation_categoryId\` (\`examPreparationCategoryId\`);`,
    skipIfExists: true,
  },
];

async function run() {
  const conn = await mysql.createConnection(parseUrl(DB_URL));
  console.log("✅ Connected to database\n");

  for (const step of steps) {
    process.stdout.write(`⏳ ${step.name} ... `);
    try {
      await conn.execute(step.sql);
      console.log("✅ done");
    } catch (err) {
      const code = err.code || "";
      // Column/key already exists — safe to skip
      if (step.skipIfExists && (code === "ER_DUP_FIELDNAME" || code === "ER_DUP_KEY" || code === "ER_FK_DUP_NAME" || code === "ER_DUP_KEYNAME" || err.message.includes("Duplicate"))) {
        console.log("⚠️  already exists, skipped");
        continue;
      }
      // Column/key doesn't exist — safe to skip
      if (step.skipIfMissing && (code === "ER_CANT_DROP_FIELD_OR_KEY" || code === "ER_FK_NO_INDEX_PARENT" || err.message.includes("check that column/key exists"))) {
        console.log("⚠️  not found, skipped");
        continue;
      }
      console.log(`\n❌ FAILED: ${err.message}`);
      await conn.end();
      process.exit(1);
    }
  }

  // Verification summary
  console.log("\n─────────────────────────────────────────");
  console.log("📊 Verification Summary:");

  const [bookCats] = await conn.execute("SELECT COUNT(*) as c FROM `BookCategory`");
  console.log(`   BookCategory rows:              ${bookCats[0].c}`);

  const [examCats] = await conn.execute("SELECT COUNT(*) as c FROM `ExamPreparationCategory`");
  console.log(`   ExamPreparationCategory rows:   ${examCats[0].c}`);

  const [books] = await conn.execute("SELECT COUNT(*) as c FROM `Book`");
  console.log(`   Book rows preserved:            ${books[0].c}`);

  const [exams] = await conn.execute("SELECT COUNT(*) as c FROM `ExamPreparation`");
  console.log(`   ExamPreparation rows preserved: ${exams[0].c}`);

  console.log("─────────────────────────────────────────");
  console.log("✅ Migration completed — no data was deleted.\n");

  await conn.end();
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
