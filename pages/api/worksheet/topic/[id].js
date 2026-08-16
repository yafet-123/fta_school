import { prisma } from '../../../../util/db.server';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { title, subjectId } = req.body;
    try {
      const t = await prisma.worksheetTopic.update({
        where: { id: Number(id) },
        data: { title, subjectId: subjectId ? Number(subjectId) : undefined },
      });
      return res.status(200).json({ message: 'Updated', topic: t });
    } catch (error) {
      return res.status(500).json({ message: 'Failed', error: error.message });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.worksheetTopic.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed', error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
