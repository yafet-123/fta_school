import { prisma } from '../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddlogin(req, res){
	const { username, password } = req.body;

	if (!username || !password) {
    	throw new Error("Please provide all values");
<<<<<<< HEAD
  	} 

  	console.log(username)
  	const user = await prisma.User.findUnique({
    	where: { 
    		name: username 
    	},
  	});
	console.log(user)
=======
  	}
  	const user = await prisma.User.findUnique({
    	where: { 
    		UserName: username 
    	},
  	});
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
  	// get the username
  	console.log(user)

  	if (!user) {
    	throw new Error(`No ${username} can be found`);
  	}

  	// if there is no user throw the error

  	const comparePassword = async function (candidatePassword) {
<<<<<<< HEAD
    	const isMatch = await bcrypt.compare(candidatePassword, user.password);
=======
    	const isMatch = await bcrypt.compare(candidatePassword, user.Password);
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    	return isMatch;
  	};

  	
  	
  	const isPasswordCorrect = await comparePassword(password);
  	// it take the password from the user(first bcrypt it) and compare with incoming password

  	if (!isPasswordCorrect) {

    	throw new Error("Invalid");
  	}

  	// if the paswors is incorrect please through error
  	const createJWT = jwt.sign(
<<<<<<< HEAD
    	{ userId: user.id, user: user.name },
=======
    	{ userId: user.user_id, user: user.UserName },
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    	process.env.JWT_SECRET,
    	{
      		expiresIn: process.env.JWT_LIFETIME,
    	}
  	);
  	const token = createJWT;

  	res.status(StatusCodes.OK).json({
<<<<<<< HEAD
    	userId: user.id,
    	name: user.name,
=======
    	userId: user.user_id,
    	name: user.UserName,
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    	role:user.role,
    	email:user.email,
    	token
  	});
}