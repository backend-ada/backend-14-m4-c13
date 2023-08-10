import { v4 as uuidv4 } from "uuid"
type BirthDate = {
  birthDate: `${number}${number}/${number}/${number}${number}${number}${number}`
}
class User {
  userId = uuidv4()
  username
  password
  userType = "student" || "professor" || "admin"
  birthDate

  constructor(username: string, password: string, birthDate?: BirthDate) {
    this.username = username
    this.password = password
    this.birthDate = birthDate
  }
  login() {
    return "You are logged in"
  }
  logout() {
    return "You are logged out"
  }
  changePassword() {
    return "your password has been successfully changed"
  }
}

class Admin extends User {
  setMaterias() {
    return "la materia se ha creado correctamente"
  }
  setStudent() {
    return "The new student has been successfully created"
  }
  setProfesor() {
    return "The new porfessor has been successfully created"
  }
  setUsername() {
    return "The username has been successfully changed"
  }
  setUserPassword() {
    return "The password has been successfully changed"
  }
}

class Professor extends User {
  materiasDictadas

  constructor(
    materiasDictadas: number,
    username: string,
    password: string,
    birthDate?: BirthDate
  ) {
    super(username, password, birthDate)
    this.materiasDictadas = materiasDictadas
  }

  calificarStudent() {
    return "La calificacion es un 7"
  }
}

class Student extends User {
  materiasEnCurso

  constructor(
    materiasEnCurso: number,
    username: string,
    password: string,
    birthDate?: BirthDate
  ) {
    super(username, password, birthDate)
    this.materiasEnCurso = materiasEnCurso
  }

  inscripcionMateria() {
    return "Se ha inscripto correctamente"
  }
}
