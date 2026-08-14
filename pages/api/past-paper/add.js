import { prisma } from "../../../util/db.server";

export const config = { api: { bodyParser: true } };

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { subjectId, topicTitle, papers } = req.body;

    if (!subjectId || !topicTitle || !papers || papers.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create ONE topic (subjectId now lives on the topic)
    const topic = await prisma.pastPaperTopic.create({
      data: {
        title: topicTitle,
        subjectId: parseInt(subjectId),
      },
    });

    for (const paper of papers) {
      // Save past paper in DB, linking it to the topic (topic can hold many papers)
      await prisma.pastPaper.create({
        data: {
          title: paper.name,
          paperFile: paper.link,
          year: paper.year ? parseInt(paper.year) : null,
          pastPaperTopicId: topic.id,
        },
      });
    }

    return res.json({ message: "Past papers saved successfully!" });

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: err.message });
  }
}
