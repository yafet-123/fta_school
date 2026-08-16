import { prisma } from "../../../../util/db.server";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await prisma.syllablus.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Syllabus deleted successfully" });
  } catch (error) {
    console.error("Delete failed:", error);
    return res.status(500).json({ message: "Failed to delete Syllabus" });
  }
}
