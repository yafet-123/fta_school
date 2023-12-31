import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddClass } from "../../../components/Admin/classes/AddClass";
import {DisplayClass} from "../../../components/Admin/classes/DisplayClass";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
export async function getServerSideProps(){
  const classes = await prisma.Class.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
  
  const Allclasses = classes.map((data)=>({
      class_id:data.class_id,
      ClassName:data.ClassName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User.UserName,
  }))
  return{
    props:{
      classes:JSON.parse(JSON.stringify(Allclasses)),
    }
  }
}

export default function Subjects({classes}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Class Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddClass />
            			<DisplayClass classes={classes} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
