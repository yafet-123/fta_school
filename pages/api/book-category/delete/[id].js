import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.query;

    await prisma.bookCategory.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ success: true, message: "Book category deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ success: false, error: "Failed to delete Book Category" });
  }
}
