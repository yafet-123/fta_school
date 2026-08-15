import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required." });
    }

    const updated = await prisma.examPreparationCategory.update({
      where: { id: parseInt(id) },
      data: { title },
    });

    return res.status(200).json({ message: "Exam Preparation category updated successfully", category: updated });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Failed to update Exam Preparation Category" });
  }
}
