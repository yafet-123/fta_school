import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
  const {title,content,classId,teacherId} = req.body;
  console.log(req.body)

  const data = await prisma.Communication.create({
    data:{
      title,
      content
    },
  });

  for (let j = 0; j < classId.length; j++) {
      addcommunication = await prisma.CommunicationRelation.create({
        data:{             
          Communication: {
              connect: { communication_id: Number(data.communication_id) },
          },
          Class: {
              connect: { class_id: Number(classId[j]) },
          }, 
          Teacher:{
            connect:{ teacher_id: Number(teacherId)},
          }    
        }
      })
      console.log(addcommunication)
  }
  
  console.log(addcommunication)
  res.json(addcommunication)
}
