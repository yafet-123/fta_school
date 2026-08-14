import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
 
export default async function handleadduser(req, res){
	const {text ,completed ,students_id} = req.body;
	console.log(req.body)
	const data = await prisma.Task.create({
		data:{
			text,
			completed,
<<<<<<< HEAD
			students_id
		},
	});
	console.log(data)
=======
			Students:{
				connect: {students_id:Number(students_id)}
			}
			
		},
	});

>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	res.json("Success")
}
