import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import nodemailer from "nodemailer"

export default async function handleforgotpassword(req, res){
	const {email} = req.body;
<<<<<<< HEAD
	const oldUser = await prisma.Student.findUnique({ 
=======
	const oldUser = await prisma.Students.findUnique({ 
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
		where:{
			email:email
		},
	});

	if (oldUser == null) {
<<<<<<< HEAD
	  return res.json({ status: "Student does not exit" });
=======
	  return res.json({ status: "Student not exit" });
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	}

	const secret = process.env.JWT_SECRET + oldUser.Password;
	const token = jwt.sign({ email: oldUser.email, id: oldUser.user_id }, secret, {
	  expiresIn: "5m",
	});
<<<<<<< HEAD
	const ResetToken = await prisma.Student.update({ 
=======
	const ResetToken = await prisma.Students.update({ 
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
		where:{
			email:email
		},
		data:{resetToken : token}
	});
<<<<<<< HEAD
 
=======

>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	const link = `${process.env.link}/Students/ResetPassword?token=${token}`;
	console.log(link)
	var transporter = nodemailer.createTransport({
	  	service: "gmail",
	    auth: {
<<<<<<< HEAD
	     	user: process.env.NODEMAILER_USER,
	     	pass: process.env.NODEMAILER_PASSWORD,
=======
	     	user: "MatricMate@gmail.com",
	     	pass: "mkhvelqnhlpkznji",
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	    },
	});

	var mailOptions = {
<<<<<<< HEAD
		from: "addisuyafet321@gmail.com",
	  	to: email,
	  	subject: "Password Reset",
	  	text: link,
=======
	  from: "MatricMate@gmail.com",
	  to: email,
	  subject: "Password Reset",
	  text: link,
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
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