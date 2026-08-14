import { prisma } from '../../../../util/db.server.js'
<<<<<<< HEAD

export default async function handler(req, res) {
  const { deleteuserid } = req.query;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await prisma.User.delete({
      where: { id: parseInt(deleteuserid) },
    });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
}
=======
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {deleteuserid} = req.query
	console.log(req.query)
	const data = await prisma.User.delete({
		where:{user_id:Number(deleteuserid)},
	});
	res.json(data)
}
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
