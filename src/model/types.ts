type Role = 'admin' | 'student' | 'teacher';

interface RegisterUserData {
	userName: string;
	password: string;
	role: Role;
	assignments: string[];
	birthDate: number;
}

type UserData = Omit<RegisterUserData, 'assignments' | 'birthDate'>;

interface TeacherData {
	userName: string;
	password: string;
	assignments: string[];
	birthDate: number;
}

interface StudentData {
	userName: string;
	password: string;
	assignments: string[];
	birthDate: number;
}

export { Role, TeacherData, StudentData, RegisterUserData, UserData };