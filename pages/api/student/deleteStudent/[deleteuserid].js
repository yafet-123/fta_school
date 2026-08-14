import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteuser(req, res){
	const {deleteuserid} = req.query
	console.log(req.query)
<<<<<<< HEAD
	const data = await prisma.Student.delete({
		where:{id:Number(deleteuserid)},
=======
	const data = await prisma.Students.delete({
		where:{students_id:Number(deleteuserid)},
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	});
	res.json(data)
}