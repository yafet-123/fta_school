import { prisma } from '../../../util/db.server.js'
 
export default async function handleadduser(req, res){
<<<<<<< HEAD
	const {SubjectName, description, svg ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.Subject.create({
		data:{
			name:SubjectName,
			description,
			svg,
			createdBy:user_id
		},
	});
	console.log(data)
=======
	const {SubjectName ,user_id} = req.body;
	console.log(req.body)
	const data = await prisma.Subject.create({
		data:{
			SubjectName,
			user_id
		},
	});

>>>>>>> 0306f37bdbd9c29dc14158fb38dab803e1b3073a
	res.json(data)
}