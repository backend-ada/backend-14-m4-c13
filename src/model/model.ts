import DB from '../database/database.json';
import jsonfile from 'jsonfile';
import { randomUUID } from 'node:crypto';
const PATH = './src/database/database.json';

type Role = 'admin' | 'student' | 'teacher';

const findUser = (username: string) => {
	const searchAdmin = DB.users.administrators.find(
		(user) => user.username === username
	);

	if (searchAdmin) return false;

	const searchTeacher = DB.users.teachers.find(
		(user) => user.username === username
	);

	if (searchTeacher) return false;

	const searchStudent = DB.users.students.find(
		(user) => user.username === username
	);

	if (searchStudent) return false;

	return true;
};

class User {
	username;
	password;
	id;
	role;

	constructor(username: string, password: string, role: Role) {
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

class Admin extends User {
	constructor(username: string, password: string) {
		super(username, password, 'admin');
	}

	createUser(
		role: Role,
		username: string,
		password: string,
		numSubjects?: string[],
		birthyear?: number
	) {
		const userExists = findUser(username);

		if (!userExists) return 'User already exists';

		if (role === 'admin') {
			const newAdmin = new Admin(username, password);
			DB.users.administrators.push(newAdmin);
			jsonfile.writeFileSync(PATH, DB);
			return newAdmin;
		}

		if (role === 'teacher') {
			const newTeacher = new Teacher(
				username,
				password,
				numSubjects as string[],
				birthyear as number
			);

			DB.users.teachers.push(newTeacher);
			jsonfile.writeFileSync(PATH, DB);
			return newTeacher;
		}

		if (role === 'student') {
			const newStudent = new Student(
				username,
				password,
				numSubjects as string[],
				birthyear as number
			);

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

	constructor(
		username: string,
		password: string,
		role: Role,
		numSubjects: string[],
		birthyear: number
	) {
		super(username, password, role);

		this.numSubjects = numSubjects;
		this.birthyear = birthyear;
	}
}

class Student extends NormalUser {
	constructor(
		username: string,
		password: string,
		numSubjects: string[],
		birthyear: number
	) {
		super(username, password, 'student', numSubjects, birthyear);
	}

	enroll() {
		return 'Subject added!';
	}
}

class Teacher extends NormalUser {
	constructor(
		username: string,
		password: string,
		numSubjects: string[],
		birthyear: number
	) {
		super(username, password, 'teacher', numSubjects, birthyear);
	}

	grade() {
		return 'Qualifications updated!';
	}
}

const kgarcia = new Admin('kgarcia', 'qwerty');

kgarcia.createUser('admin', 'jlopez', '1234');

kgarcia.createUser(
	'teacher',
	'pciruela',
	'12344321',
	['Math', 'Geography', 'History'],
	1950
);

kgarcia.createUser(
	'student',
	'jdoe',
	'4321',
	['Software Development', 'Programming'],
	1990
);
