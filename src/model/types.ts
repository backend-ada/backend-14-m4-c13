type Role = 'admin' | 'student' | 'teacher';

interface NormalUserData {
	username: string;
	password: string;
	role: Role;
	numSubjects: string[];
	birthyear: number;
}

type UserData = Omit<NormalUserData, 'numSubjects' | 'birthyear'>;

interface TeacherData {
	username: string;
	password: string;
	numSubjects: string[];
	birthyear: number;
}

interface StudentData {
	username: string;
	password: string;
	numSubjects: string[];
	birthyear: number;
}

export { Role, TeacherData, StudentData, NormalUserData, UserData };
