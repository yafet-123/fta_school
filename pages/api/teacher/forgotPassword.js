import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer"

export default async function handleforgotpassword(req, res){
	const {email} = req.body;
	const oldUser = await prisma.Teacher.findUnique({ 
		where:{
			email:email
		},
	});

	if (oldUser == null) {
	  return res.json({ status: "Teacher not exit" });
	}

	const secret = process.env.JWT_SECRET + oldUser.Password;
	const token = jwt.sign({ email: oldUser.email, id: oldUser.user_id }, secret, {
	  expiresIn: "5m",
	});
	const ResetToken = await prisma.Teacher.update({ 
		where:{
			email:email
		},
		data:{resetToken : token}
	});
 
	const link = `${process.env.link}/Teacher/ResetPassword?token=${token}`;
	console.log(link)
	var transporter = nodemailer.createTransport({
	  	service: "gmail",
	    auth: {
	     	user: "hulumedia12@gmail.com",
	     	pass: "mkhvelqnhlpkznji",
	    },
	});

	var mailOptions = {
	  from: "hulumedia12@gmail.com",
	  to: email,
	  subject: "Password Reset",
	  text: link,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
	    	console.log(error);
	  	} else {
	    	console.log("Email sent: " + info.response);
	  	}
	});

	return res.json({ status: "An Email send to your email address" });
}