import React, { useState } from 'react';
import { prisma } from '../util/db.server.js'
import ClassList from "../components/quiz/ClassList"
export async function getStaticProps(){
  const classes = await prisma.Class.findMany();
  return{
    props:{
      classes:JSON.parse(JSON.stringify(classes)),
    }
  }
}

const Quiz = ({classes}) => {
  return (
    <div className='bg-[#E6E6E6] px-2 lg:px-32 h-full py-32'>
      <ClassList classes={classes}/>
    </div>
  );
};

export default Quiz;
