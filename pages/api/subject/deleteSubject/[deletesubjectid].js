import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deletesubjectid} = req.query
	console.log(req.query)
	const data = await prisma.Subject.delete({
<<<<<<< HEAD
		where:{id:Number(deletesubjectid)},
=======
		where:{subject_id:Number(deletesubjectid)},
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	});
	res.json(data)
}