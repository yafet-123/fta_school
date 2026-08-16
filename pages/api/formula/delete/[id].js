import { prisma } from '../../../../util/db.server';

export default async function handler(req, res) {
  if (req.method !== 'DELETE') return res.status(405).json({ message: 'Method not allowed' });
  const { id } = req.query;
  try {
    await prisma.formulaSheet.delete({ where: { id: Number(id) } });
    return res.status(200).json({ message: 'Deleted' });
  } catch (error) {
    return res.status(500).json({ message: 'Failed', error: error.message });
  }
}
