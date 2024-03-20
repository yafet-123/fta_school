import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import {BsFacebook, BsYoutube, BsLinkedin, BsInstagram, BsTwitter} from 'react-icons/bs'
import Link from "next/link";
import ReactModal from 'react-modal';
import { useRouter } from "next/router";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};



const validateForm = (values) => {
  const errors = {};
  const MAX_TEXT_LENGTH = 100;
  const Name = values.name;
  console.log(Name.length)

  if (Name.length > MAX_TEXT_LENGTH) {
    errors.name = `Name must be ${MAX_TEXT_LENGTH} characters or less`;
    console.log(errors.name)
  }

  if (!values.name) {
    errors.name = "Name is required";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  }

  if (!values.message) {
    errors.message = "Message is required";
  }

  return errors;
};


const ContactForm = () => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenone, setModalIsOpenone] = useState(false);
  const socialMediaLinks = [
    {id:"https://www.linkedin.com/in/helen-zeray-789b89267",path:<BsLinkedin size={30} color="black"/>},
    {id:"https://instagram.com/helenzeray1?igshid=ZGUzMzM3NWJiOQ==",path:<BsInstagram size={30} color="black"/>},
  ]
  const handleSubmit = async (values) => {
    console.log(values)
    // Handle form submission logic her
    try {
      const response = await fetch('/api/SentMail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name:values.name, 
          email:values.email,
          phone:values.phone,
          message:values.message
        }),
      });
      console.log(response.ok)
      if (response.ok) {
        setModalIsOpen(true)    
        router.push("/contact")   
      } else {
        setModalIsOpenone(true)
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    console.log("contact")
    router.push("/")
  };

  const closeModalone = () => {
    setModalIsOpenone(false);
  };
  return (
    <div className="w-full flex flex-col md:flex-row items-center space-y-6">
      <div className="flex flex-col px-2 lg:px-10 w-full">
        <h1 className="font-poppins font-bold text-4xl lg:tetx-6xl text-left text-[#010101] mb-5">
          Contact
        </h1>
        <div className="font-poppins text-left text-[#010101]">
          <p className="font-normal text-xl lg:text-2xl mb-5">ftaacademy@gmail.com </p>
          <p className="font-normal text-xl lg:text-2xl mb-5">Wello Sefer Campus</p>
          <p className="font-normal text-xl lg:text-2xl mb-5">WhatsApp: +934781038</p>
        </div>

        <div className="flex gap-4">
          {socialMediaLinks.map((paths, index) => {
            return (
              <Link key={index} href={paths.path} target="_blank">
                {paths.path}
              </Link>
            );
          })}
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validateForm}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit }) => (
        <form className="flex flex-col px-2 lg:px-10 w-full" onSubmit={handleSubmit} >
            <h3 className="font-poppins text-left text-[#010101] font-bold text-4xl lg:tetx-6xl mb-5">Enquiry form</h3>

            <div className="mb-4">
              <label htmlFor="name" className="block mb-1">
                Name:
                <span className="text-gray-500 text-sm ml-1">(required)</span>
              </label>
              <Field
                type="name"
                id="name"
                name="name"
                className="w-full p-2 text-black border border-gray-300"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block mb-1">
                Email:
                <span className="text-gray-500 text-sm ml-1">(required)</span>
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full p-2 text-black border border-gray-300"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="phone" className="block mb-1">
                Phone:
                <span className="text-gray-500 text-sm ml-1">(required)</span>
              </label>
              <Field
                type="text"
                id="phone"
                name="phone"
                className="w-full p-2 text-black border border-gray-300"
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="text-red-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="message" className="block mb-1">
                Message:
                <span className="text-gray-500 text-sm ml-1">(required)</span>
              </label>
              <Field
                as="textarea"
                id="message"
                name="message"
                className="w-full p-2 text-black border border-gray-300"
              />
              <ErrorMessage
                name="message"
                component="div"
                className="text-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-[#17c294] w-28 text-white paragraph-fonts py-2 px-4 mb-8 md:mb-0 md:py-4 md:px-8
                           shadow-black items-center rounded-md justify-center shadow-md hover:scale-105 duration-300"
            >
              Submit
            </button>
        </form>
        )}
      </Formik>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        className="flex items-center justify-center w-full h-full"
      >
        {/* Add your modal content here */}
        <div className="flex flex-col items-center justify-center bg-[#F7F7F7] w-[350px] h-[200px] p-2 border rounded-sm ">
          <p  className="text-md lg:text-xl mb-5 text-center">Your Enquiry form Submitted Successfully.</p>
          <button onClick={closeModal} className="p-2 bg-[#17c294] border text-white rounded-sm">
            Close
          </button>
        </div>
      </ReactModal>

      <ReactModal
        isOpen={modalIsOpenone}
        onRequestClose={closeModalone}
        contentLabel="Modal Two"
        className="flex items-center justify-center w-full h-full"
      >
        {/* Add your modal content here */}
        <div className="flex flex-col items-center justify-center bg-[#F7F7F7] w-[350px] h-[200px] p-2 border rounded-sm ">
          <p  className="text-md lg:text-xl mb-5 text-center">Your Enquiry form Submitted un Successfull.  Please retry again.</p>
          <button onClick={closeModalone} className="p-2 bg-[#17c294] border text-white rounded-sm">Close</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default ContactForm;
