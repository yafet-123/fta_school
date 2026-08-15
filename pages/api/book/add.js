import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { bookCategoryId, topicTitle, books } = req.body;

    if (!bookCategoryId || !topicTitle || !books || books.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    for (const book of books) {
      // Save book in DB linked to a BookCategory (not Subject directly)
      const savedBook = await prisma.book.create({
        data: {
          title: book.name,
          bookFile: book.link,
          bookCategoryId: parseInt(bookCategoryId),
        },
      });

      // Save topic entry
      await prisma.bookTopic.create({
        data: {
          title: topicTitle,
          bookId: savedBook.id,
        },
      });
    }

    return res.json({ message: "Books saved successfully!" });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
