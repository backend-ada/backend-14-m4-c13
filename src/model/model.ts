import DB from '../database/database.json';
import jsonfile from 'jsonfile';
import { randomUUID } from 'node:crypto';
import { findUser } from './utils';
import {
	Role,
	TeacherData,
	StudentData,
	NormalUserData,
	UserData,
} from './types';
const PATH = './src/database/database.json';

class User {
	username;
	password;
	id;
	role;

	constructor(userData: UserData) {
		const { username, password, role } = userData;

		this.username = username;
		this.password = password;
		this.role = role;
		this.id = randomUUID();
	}

	login(username: string, password: string) {
		if (password !== this.password) return 'Wrong credentials';

		// Logica de login

		return 'User logged';
	}

	logout() {
		return 'User logged out';
	}

	changePassword(currentPassword: string, newPassword: string) {
		if (currentPassword !== this.password) return 'Wrong credentials';

		this.password = newPassword;

		return 'Password changed';
	}
}

interface CompleteUserData {
	role: Role;
	username: string;
	password: string;
	numSubjects?: string[];
	birthyear?: number;
}

class Admin extends User {
	constructor(username: string, password: string) {
		super({ username, password, role: 'admin' });
	}

	createUser(userData: CompleteUserData) {
		const { username, password, numSubjects, birthyear, role } = userData;

		const userExists = findUser(username);

		if (!userExists) return 'User already exists';

		if (role === 'admin') {
			const newAdmin = new Admin(username, password);
			DB.users.administrators.push(newAdmin);
			jsonfile.writeFileSync(PATH, DB);
			return newAdmin;
		}

		if (role === 'teacher') {
			const newTeacher = new Teacher({
				username,
				password,
				numSubjects: numSubjects as string[],
				birthyear: birthyear as number,
			});

			DB.users.teachers.push(newTeacher);
			jsonfile.writeFileSync(PATH, DB);
			return newTeacher;
		}

		if (role === 'student') {
			const newStudent = new Student({
				username,
				password,
				numSubjects: numSubjects as string[],
				birthyear: birthyear as number,
			});

			DB.users.students.push(newStudent);
			jsonfile.writeFileSync(PATH, DB);
			return newStudent;
		}
	}

	createSubject() {
		return 'Subject created';
	}

	changeUserInfo() {
		return 'Info updated!';
	}
}

class NormalUser extends User {
	numSubjects;
	birthyear;

	constructor(normalUserData: NormalUserData) {
		const { username, password, role, numSubjects, birthyear } = normalUserData;
		super({ username, password, role });

		this.numSubjects = numSubjects;
		this.birthyear = birthyear;
	}
}

class Student extends NormalUser {
	constructor(studentData: StudentData) {
		const { username, password, numSubjects, birthyear } = studentData;
		super({ username, password, role: 'student', numSubjects, birthyear });
	}

	enroll() {
		return 'Subject added!';
	}
}

class Teacher extends NormalUser {
	constructor(teacherData: TeacherData) {
		const { username, password, numSubjects, birthyear } = teacherData;
		super({ username, password, numSubjects, birthyear, role: 'teacher' });
	}

	grade() {
		return 'Qualifications updated!';
	}
}

const newAdmin = new Admin('test', '1234');

const admin2 = {
	username: 'Mara',
	password: '12345648978',
	role: 'admin' as Role,
};

const teacher1 = {
	username: 'Ciruela',
	password: '12345648978',
	role: 'teacher' as Role,
	numSubjects: ['Math', 'Geometry'],
};

console.log(newAdmin.createUser(admin2));
console.log(newAdmin.createUser(teacher1));
