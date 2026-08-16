import { prisma } from '../../../util/db.server';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  const { name, link, subjectId } = req.body;
  if (!name || !link || !subjectId) return res.status(400).json({ message: 'name, link, subjectId required' });
  try {
    const formula = await prisma.formulaSheet.create({
      data: { name, link, subjectId: Number(subjectId) },
    });
    return res.status(201).json({ message: 'Formula Sheet added', formula });
  } catch (error) {
    return res.status(500).json({ message: 'Failed', error: error.message });
  }
}
