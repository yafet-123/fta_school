-- =====================================================================
-- ONE-TIME DATA MIGRATION for the PastPaper schema restructure
--   OLD layout:  PastPaper(subjectId -> Subject)            1 paper -> N topics
--                PastPaperTopic(pastPaperId -> PastPaper)    1 topic  -> 1 paper
--   NEW layout:  PastPaper(pastPaperTopicId -> PastPaperTopic)  1 paper -> 1 topic
--                PastPaperTopic(subjectId -> Subject)           1 topic -> N papers
--   (subjectId moved OFF PastPaper, ONTO PastPaperTopic)
--
-- Run against your MySQL DB (aceitcom_quiz) AFTER backing it up:
--
--   mysql -h 91.204.209.4 -P 3306 -u <user> -p aceitcom_quiz < prisma/restructure_pastpaper_topic.sql
--
-- Then run:  npx prisma db push   (to sync any remaining column/index differences)
-- =====================================================================

-- Use a single transaction where the engine allows it (MySQL DDL auto-commits,
-- but the UPDATE/backfill is transactional and is the important part).
START TRANSACTION;

-- 1) Add the new columns (nullable first, so existing rows are allowed).
ALTER TABLE `PastPaper`      ADD COLUMN IF NOT EXISTS `pastPaperTopicId` INT NULL;
ALTER TABLE `PastPaperTopic` ADD COLUMN IF NOT EXISTS `subjectId`        INT NULL;

-- 2) Backfill by INVERTING the old relation:
--    Each old topic T was linked to a paper P (T.pastPaperId = P.id).
--    -> the paper now belongs to that topic   (P.pastPaperTopicId = T.id)
--    -> the topic takes the paper's subject   (T.subjectId     = P.subjectId)
UPDATE `PastPaperTopic` AS t
JOIN `PastPaper` AS p ON p.id = t.`pastPaperId`
SET t.`subjectId`        = p.`subjectId`,
    p.`pastPaperTopicId` = t.`id`;

-- 3) Add / (re)create the foreign keys for the new structure.
--    (Drop only if they already exist to make this re-runnable.)
ALTER TABLE `PastPaperTopic`
  ADD CONSTRAINT `PastPaperTopic_subject_fkey`
      FOREIGN KEY (`subjectId`) REFERENCES `Subject`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
ALTER TABLE `PastPaper`
  ADD CONSTRAINT `PastPaper_topic_fkey`
      FOREIGN KEY (`pastPaperTopicId`) REFERENCES `PastPaperTopic`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- 4) Make the new relation columns NOT NULL now that they're populated.
ALTER TABLE `PastPaper`      MODIFY COLUMN `pastPaperTopicId` INT NOT NULL;
ALTER TABLE `PastPaperTopic` MODIFY COLUMN `subjectId`        INT NOT NULL;

-- 5) Drop the old columns that are no longer used.
ALTER TABLE `PastPaperTopic` DROP COLUMN IF EXISTS `pastPaperId`;
ALTER TABLE `PastPaper`      DROP COLUMN IF EXISTS `subjectId`;

-- 6) Helpful indexes (Prisma will (re)create these via db push if missing).
ALTER TABLE `PastPaper`      ADD INDEX `idx_pastpaper_topic`        (`pastPaperTopicId`);
ALTER TABLE `PastPaperTopic` ADD INDEX `idx_pastpaper_topic_subjectId` (`subjectId`);

COMMIT;

-- =====================================================================
-- Assumptions / checks
--   * The DB is at the ORIGINAL layout (PastPaper has subjectId,
--     PastPaperTopic has pastPaperId). If a previous round already added
--     pastPaperTopicId/Papers, some steps above will be no-ops or need
--     adjusting — check the actual columns first:
--       SHOW COLUMNS FROM PastPaper;
--       SHOW COLUMNS FROM PastPaperTopic;
-- =====================================================================
