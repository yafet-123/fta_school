import { prisma } from '../../../util/db.server';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, link, subjectId } = req.body;
  if (!name || !link || !subjectId) {
    return res.status(400).json({ message: 'name, link, and subjectId are required' });
  }

  try {
    const definition = await prisma.definition.create({
      data: {
        name,
        link,
        subjectId: Number(subjectId),
      },
    });
    return res.status(201).json({ message: 'Definition added successfully', definition });
  } catch (error) {
    console.error('Error adding definition:', error);
    return res.status(500).json({ message: 'Failed to add definition', error: error.message });
  }
}
