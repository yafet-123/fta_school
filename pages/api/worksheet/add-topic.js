import { prisma } from '../../../util/db.server';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { title, subjectId } = req.body;
  if (!title || !subjectId) return res.status(400).json({ message: 'title and subjectId required' });
  try {
    const topic = await prisma.worksheetTopic.create({
      data: { title, subjectId: Number(subjectId) },
    });
    return res.status(201).json({ message: 'Worksheet topic added', topic });
  } catch (error) {
    return res.status(500).json({ message: 'Failed', error: error.message });
  }
}
