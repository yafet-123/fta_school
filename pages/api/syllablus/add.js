import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectId, title, content } = req.body;

    if (!subjectId || !title || !content) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const savedSyllablus = await prisma.syllablus.create({
      data: {
        title,
        content,
        subjectId: parseInt(subjectId),
      },
    });

    return res.json({ message: "Syllabus saved successfully!", syllablus: savedSyllablus });
  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
