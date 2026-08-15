import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { bookCategoryId, title, bookFileLink } = req.body;

    if (!bookCategoryId || !title || !bookFileLink) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        bookCategoryId: parseInt(bookCategoryId),
        title,
        bookFile: bookFileLink,
      },
    });

    return res.status(200).json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Failed to update Book" });
  }
}
