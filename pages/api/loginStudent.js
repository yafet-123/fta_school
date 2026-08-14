import { prisma } from '../../util/db.server.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleaddlogin(req, res) {
  try {
<<<<<<< HEAD
    const { username, password } = req.body; 
    console.log(req.body)
=======
    const { username, password } = req.body;

>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    if (!username || !password) {
      throw new Error("Please provide all values");
    }

<<<<<<< HEAD
    const user = await prisma.Student.findUnique({
      where: {
        name: username,
      },
    });

=======
    const user = await prisma.Students.findUnique({
      where: {
        UserName: username,
      },
    });
    console.log(user)
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    if (!user) {
      throw new Error(`No ${username} can be found`);
    }

    const comparePassword = async function (candidatePassword) {
<<<<<<< HEAD
      const isMatch = await bcrypt.compare(candidatePassword, user.password);
      return isMatch;
    };

    

=======
      const isMatch = await bcrypt.compare(candidatePassword, user.Password);
      return isMatch;
    };

>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
    const isPasswordCorrect = await comparePassword(password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid");
    }
<<<<<<< HEAD
    console.log(isPasswordCorrect)
    const createJWT = jwt.sign(
      { userId: user.students_id, user: user.name },
=======

    const createJWT = jwt.sign(
      { userId: user.students_id, user: user.UserName },
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );

    const token = createJWT;
<<<<<<< HEAD
    console.log(user)
    res.status(StatusCodes.OK).json({
      userId: user.students_id,
      name: user.name,
=======

    res.status(StatusCodes.OK).json({
      userId: user.students_id,
      name: user.UserName,
>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
      role: user.role,
      email: user.email,
      class_id: user.class_id,
      token,
    });
  } catch (error) {
    // Handle the error and redirect to the error page
    console.error('Error:', error.message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).redirect('/auth/error-student'); // Adjust the error page URL as needed
  }
}
