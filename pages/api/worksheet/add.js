import { prisma } from '../../../util/db.server';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { title, link, worksheetTopicId } = req.body;
  if (!title || !link || !worksheetTopicId) return res.status(400).json({ message: 'title, link, and worksheetTopicId required' });
  try {
    const worksheet = await prisma.worksheet.create({
      data: { title, link, worksheetTopicId: Number(worksheetTopicId) },
    });
    return res.status(201).json({ message: 'Worksheet added', worksheet });
  } catch (error) {
    return res.status(500).json({ message: 'Failed', error: error.message });
  }
}
