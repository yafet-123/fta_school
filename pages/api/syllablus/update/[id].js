import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { subjectId, title, content } = req.body;

    if (!subjectId || !title || !content) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updatedSyllablus = await prisma.syllablus.update({
      where: { id: parseInt(id) },
      data: {
        subjectId: parseInt(subjectId),
        title,
        content,
      },
    });

    return res.status(200).json({ message: "Syllabus updated successfully", syllablus: updatedSyllablus });
  } catch (error) {
    console.error("Update failed:", error);
    return res.status(500).json({ message: "Failed to update Syllabus" });
  }
}
