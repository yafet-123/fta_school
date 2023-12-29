import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleadduser(req, res){
	const {UserName , Password,class_id, email, role} = req.body;
	console.log(UserName)
	const data = await prisma.Students.create({
		data:{
			UserName,
			email,
			class_id:Number(class_id) || null,
			Password:bcrypt.hashSync(Password, 8),
			role
		},
	});

	// take the username and password and save it , the password is bcrypt
  	const token = jwt.sign(
    	{ userId: data.students_id, user: data.UserName },process.env.JWT_SECRET,
    		{expiresIn: process.env.JWT_LIFETIME,}
  	);
  

  	res.status(StatusCodes.CREATED).json({
    	data: {
      		userId: data.students_id,
    		user: data.UserName,
    	},
    	token,
  	});
	
}

