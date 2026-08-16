import { prisma } from '../../../../util/db.server';

export default async function handler(req, res) {
  if (req.method !== 'PUT') return res.status(405).json({ message: 'Method not allowed' });
  const { id } = req.query;
  const { name, link, subjectId } = req.body;
  try {
    const formula = await prisma.formulaSheet.update({
      where: { id: Number(id) },
      data: { name, link, subjectId: subjectId ? Number(subjectId) : undefined },
    });
    return res.status(200).json({ message: 'Updated', formula });
  } catch (error) {
    return res.status(500).json({ message: 'Failed', error: error.message });
  }
}
