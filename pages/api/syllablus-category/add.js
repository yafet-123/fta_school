import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { title, subjectId } = req.body;

    if (!title || !subjectId) {
      return res.status(400).json({ error: "Title and subjectId are required" });
    }

    const category = await prisma.syllablusCategory.create({
      data: {
        title,
        subjectId: parseInt(subjectId),
      },
    });

    return res.status(201).json({ message: "Syllabus category created successfully!", category });
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).json({ error: err.message });
  }
}
