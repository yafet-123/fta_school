import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deletequestionid} = req.query
	console.log(req.query)
	const data = await prisma.Question.delete({
		where:{question_id:Number(deletequestionid)},
	});

	const data = await prisma.ClassQuestion.delete({
		where:{question_id:Number(deletequestionid)},
	});

	res.json(data)
}