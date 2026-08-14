import { prisma } from '../../../../util/db.server.js'
<<<<<<< HEAD

export default async function handler(req, res) {
  const { updateuserid } = req.query;

  if (req.method !== "PATCH") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { UserName, email } = req.body;
  console.log(req.body)
  try {
    const user = await prisma.User.update({
      where: { id: parseInt(updateuserid) },
      data: {
        name: UserName,
        email,
      },
    });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
}
=======
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateuser(req, res){
	const {updateuserid} = req.query
	const {UserName,email} = req.body
	const data = await prisma.User.update({
		where:{user_id:Number(updateuserid)},
		data:{
			UserName,
			email
		},
	});
	res.json(data)
}
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
