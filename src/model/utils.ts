import DB from '../database/database.json';

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

export { findUser };
