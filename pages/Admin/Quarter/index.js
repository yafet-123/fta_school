import React from "react";
import { useState,useEffect, useContext} from 'react'
import { prisma } from '../../../util/db.server.js'
import { AddQuarter } from "../../../components/Admin/quarter/AddQuarter";
import {DisplayQuarter } from "../../../components/Admin/quarter/DisplayQuarter";
import { useSession } from "next-auth/react";
import { VerticalNavbar } from "../../../components/Admin/VerticalNavbar";
import { MainHeader } from '../../../components/common/MainHeader';
export async function getServerSideProps(){
  const quarter = await prisma.Quarter.findMany({
    orderBy : {ModifiedDate:'desc'},
    include:{
      User:{
        select:{
          UserName:true
        }
      }
      
    }
    
  });
   
  const Allquarter = quarter.map((data)=>({
      quarter_id:data.quarter_id,
      quarterName:data.quarterName,
      CreatedDate:data.CreatedDate,
      ModifiedDate:data.ModifiedDate,
      User:data.User.UserName,
  }))
  return{
    props:{
      quarter:JSON.parse(JSON.stringify(Allquarter)),
    }
  }
}

export default function Subjects({quarter}) {
    const { status, data } = useSession();
    return (
    	<React.Fragment>
      		<MainHeader title="Class Dashboard" />
      		<section className="flex flex-col w-full h-full bg-[#e6e6e6] dark:bg-[#02201D] pt-10">
				    <div className='w-full h-full flex flex-row'>
		        	<VerticalNavbar data={data} />
		        	<div className="w-full">
            			<AddQuarter />
            			<DisplayQuarter quarter={quarter} />
        			</div>
		        </div> 
			     </section>
      	</React.Fragment>
        
    );
}
