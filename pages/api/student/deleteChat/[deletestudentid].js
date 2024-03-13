import { prisma } from '../../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeleteChat(req, res){
	const {deletecommunicationId,deletecategoryId} = req.query
	console.log(req.query)
	const data = await prisma.Communication.delete({
		where:{communication_id:Number(deletecommunicationId)},
	});

	const data = await prisma.CommunicationRelation.delete({
		where:{communication_relation_id:Number(deletecommunicationId)},
	});
	
	res.json(data)
}