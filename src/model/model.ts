import { v4 as uuidv4 } from 'uuid'
import jsonfile from 'jsonfile'
import crypto from 'crypto'
import db from '../database/database.json';
import { findUser, checkUserData } from './utils';
import {
	TeacherData,
    StudentData,
    UserData,
    RegisterUserData
} from './types';

const PATH = '../database/database.json';;

class User {
    userName;
	password;
	role;
    UUID;

    constructor(userData: UserData){
        const { userName, password, role } = userData;
        let hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        this.userName = userName;
		this.password = hashedPassword;
		this.role = role;
        this.UUID = uuidv4();
    } 

    login(userName: string, password: string){
        if(checkUserData(userName, password)){
            return 'Login successfully'
        }
        return 'Username or password is not correct. Try again'
    }

    logOut(){
        return 'Logout successfully'
    }

    changePassowrd(userName: string,oldPassword: string, newPassword: string){
        let hashedOldPassword = crypto.createHash('sha256').update(oldPassword).digest('hex');
        let hashedNewPassword = crypto.createHash('sha256').update(newPassword).digest('hex');

        const students = db.User.Register.Student;
        const techers = db.User.Register.Teacher;
        const admins = db.User.Administrator;

            if(checkUserData(userName, oldPassword)){
                if(hashedNewPassword !== hashedOldPassword){
                    for(const student of students) { // ejecuta un bloque de codigo para cada elemento de un objeto iterable. En este caso ejecuta de a uno role, userName, etc. Lo que me permite acceder a cada propiedad.
                        if (student.userName === userName) {
                            student.password = hashedNewPassword;
                            
                            jsonfile.writeFileSync(PATH, db); 
                        }
                        return 'Password changed successfully';
                    }
                    for(const techer of techers) {
                        if (techer.userName === userName) {
                            techer.password = hashedNewPassword;
                            
                            jsonfile.writeFileSync(PATH, db); 
                        }
                        return 'Password changed successfully';
                    }
                    for(const admin of admins) {
                        if (admin.userName === userName) {
                            admin.password = hashedNewPassword;
                            
                            jsonfile.writeFileSync(PATH, db); 
                        }
                        return 'Password changed successfully';
                    }
                } else if(hashedOldPassword == hashedNewPassword){
                    return 'You cannot use the same password. Please choose a new password'
                }
            } return 'Wrong password. Try again'
        }
    }

class Administrator extends User{
    constructor(userName: string, password: string) {
		super({ userName, password, role: 'admin' });
    }

    newAssignment(newAssignment: string){

        if(newAssignment)
        return 'Ha creado una nueva materia'
    }

    newRegister(role: string, userName: string, birthDate: number, assignments: string[]){
        if (role === 'Teacher') {
            const teachers = db.User.Register.Teacher;
    
            for (const teacher of teachers) {
                if (teacher.userName === userName) {
                    return 'User already exists';
                }
            }
    
            db.User.Register.Teacher.push({ // antes habia puesto estas lineas dentro del if del for y aunque el usuario existiera lo seguia agregando
                role,
                userName,
                password: '',
                UUID: uuidv4(),
                birthDate,
                assignments,
            });
    
            jsonfile.writeFileSync(PATH, db);
            return userName + ' added successfully';
    
        } else if (role === 'Student') {
            const students = db.User.Register.Student;
    
            for (const student of students) {
                if (student.userName === userName) {
                    return 'User already exists';
                }
            }
    
            db.User.Register.Student.push({
                role,
                userName,
                password: '',
                UUID: uuidv4(),
                birthDate,
                assignments,
            });
    
            jsonfile.writeFileSync(PATH, db);
            return userName + ' added successfully';
        }
        return 'Please check your data'
    }

    changeUserData(userName: string, data: string, newData: string){
        const students = db.User.Register.Student;
        const techers = db.User.Register.Teacher;

        if(data == 'userName'){
            if(!findUser(newData)){
                if(data !== newData){
                    for(const student of students) {       
                        student.userName = newData;
                        jsonfile.writeFileSync(PATH, db);
                        return 'Username changed successfully' 
                    }

                    for(const techer of techers) {       
                        techer.userName = newData;
                        jsonfile.writeFileSync(PATH, db);
                        return 'Username changed successfully' 
                    }
                }
                return 'Incorrect params'
            }
            return 'User already exist'
        }
        else if(data == 'password'){
            let hashedNewPassword = crypto.createHash('sha256').update(newData).digest('hex');
        
            if(!checkUserData(userName, newData)){
                if(data !== newData){
                    for(const student of students) {       
                        student.password = hashedNewPassword;
                        jsonfile.writeFileSync(PATH, db);
                        return 'Password changed successfully' 
                    }

                    for(const techer of techers) {       
                        techer.password = hashedNewPassword;
                        jsonfile.writeFileSync(PATH, db);
                        return 'Password changed successfully' 
                    }
                }
                return 'Incorrect params'
            }
        }
        return 'Ingrese los datos correctos'
    }
}

class Register extends User {
    birthDate;
    assignments;

    constructor(registerUserData: RegisterUserData){
        const { userName, password, role, assignments, birthDate } = registerUserData;
		super({ userName, password, role });

		this.assignments = assignments;
		this.birthDate = birthDate;
    }
}

class Teacher extends Register {

    constructor(teacherData: TeacherData){
        const { userName, password, assignments, birthDate } = teacherData;
		super({ userName, password, assignments, birthDate, role: 'teacher' });
    }
    
    gradeAsigment(){
        return 'Grade loaded successfully'
    }
}

class Student extends Register {

    constructor(studentData: StudentData){
        const { userName, password, assignments, birthDate } = studentData;
		super({ userName, password, role: 'student', assignments, birthDate });
    }
    
    enroll(userName: string, assignment: string){
        const students = db.User.Register.Student;
        const studentAsignmentFound = db.User.Register.Student.some((asign) => asign.assignments.find((subj) => subj == assignment));

        for(const student of students) { 
            if (student.userName === userName) {
                if(studentAsignmentFound == false){
                    student.assignments.push(assignment);
                    jsonfile.writeFileSync(PATH, db); 
                }
                return 'Asigment was already enrolled'
            }
            return 'Enrolled successfully'
        }
        return 'Something went wrong'
    }
}

const nuevoAlumno = new Student({
    userName: 'Juana',
    password: 'adaomdd588',
    birthDate: 1999,
    assignments: ['Math', 'Chimestry']})

const nuevoAdmin = new Administrator('AdminMatias', 'fkfnek778rfe')

// console.log(nuevoAdmin.changeUserData('Juana', 'userName', 'Paola'))
// console.log(nuevoAdmin.newRegister('Student', 'Cristian', 2000, ['Phiolosophy', 'Math', 'English']))
// console.log(nuevoAdmin.newRegister('Teacher', 'Pablo', 1975, ['Phiolosophy']))
// console.log(nuevoAlumno.login('Juana', 'adaomddss4477'))
// console.log(nuevoAlumno.changePassowrd('Juana', 'adaomdd588', 'adaomddss4477'))
// console.log(nuevoAlumno.enroll('Juana', 'English'))
// console.log(nuevoAlumno)