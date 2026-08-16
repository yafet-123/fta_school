import { prisma } from '../../../../util/db.server';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { title, link } = req.body;
    try {
      const w = await prisma.worksheet.update({ where: { id: Number(id) }, data: { title, link } });
      return res.status(200).json({ message: 'Updated', worksheet: w });
    } catch (error) {
      return res.status(500).json({ message: 'Failed', error: error.message });
    }
  }
  if (req.method === 'DELETE') {
    try {
      await prisma.worksheet.delete({ where: { id: Number(id) } });
      return res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed', error: error.message });
    }
  }
  return res.status(405).json({ message: 'Method not allowed' });
}
