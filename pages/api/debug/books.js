import { prisma } from "../../../util/db.server";

export default async function handler(req, res) {
  try {
    const categories = await prisma.bookCategory.findMany({
      include: {
        Books: {
          include: { BookTopic: true },
        },
        Subject: { select: { id: true, name: true } },
      },
    });

    const books = await prisma.book.findMany({
      include: {
        BookTopic: true,
        BookCategory: { select: { id: true, title: true, subjectId: true } },
      },
    });

    return res.json({
      totalCategories: categories.length,
      totalBooks: books.length,
      categories,
      books,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
