import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req,res) {
  const {
    name,
    email,
    phone,
    message,
    hotelType,
    startdate,
    enddate,
  } = await req.body;

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  // Define the email options
  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: 'info@undiscoveredethiopia.com',
    subject: 'Undiscovered Hotel Booking',
    text: `Name: ${name} \nEmail: ${email} \nphone: ${phone} \nStart Date: ${startdate} \nEnd Date: ${enddate} \nHotel Types: ${hotelType} \nMessage: ${message}`,
  };
  console.log(mailOptions);
  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    res.status(405).end(); // Method Not Allowed
  }
}
