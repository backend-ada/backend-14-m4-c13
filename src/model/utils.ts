import crypto from 'crypto'
import db from '../database/database.json';

function findUser(username: string){

    const searchAdmin = db.User.Administrator.find((user) => user.userName === username);
	if(searchAdmin) return searchAdmin;
 
	const searchTeacher = db.User.Register.Teacher.find((user) => user.userName === username);
	if(searchTeacher) return searchTeacher;

	const searchStudent = db.User.Register.Student.find((user) => user.userName === username);
	if(searchStudent) return searchStudent;

	if(searchAdmin == 0 || searchTeacher == 0 || searchStudent == 0) return false;
}

function checkUserData(username: string, password: string){
    let hashedPassword = crypto.createHash('sha256').update(password).digest('hex'); // hasheo la password ingresada para ver si coincide con la de la base de datos
	let usernamesPass = findUser(username);

	if(usernamesPass){
		const findAdminPassword = usernamesPass.password === hashedPassword;
		if(findAdminPassword) return true;

		return false;
	}
}

export { findUser, checkUserData }