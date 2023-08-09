import { randomUUID } from "node:crypto"

class User{
    name;
    password;
    userType:string;
    id:string;
    constructor(name:string, password:string){
        this.id=randomUUID()
        this.name=name
        this.password=password
        this.userType=''
    }
    login(){
        return "This is login"
    }

    signOut(){
        return "This is sign out"
    }
    changeProfilePassword(){
        return "Changing profile Password"
    }
}


class Professor extends User{
    dateOfBirth;
    toughtSubjects;
    userType='Professor'
    constructor(name:string, password:string,dateOfBirth:string, toughtSubjects:number){
        super(name, password)
        this.name=name
        this.password=password
        this.dateOfBirth=dateOfBirth
        this.toughtSubjects=toughtSubjects
    }
    gradeStudent(){
        return "Student has failed"
    }
}

class Student extends User{
    dateOfBirth;
    currentSubjects;
    userType='Student'
    constructor(name:string, password:string,dateOfBirth:string, currentSubjects:number){
        super(name,password)
        this.name=name;
        this.password=password
        this.dateOfBirth=dateOfBirth
        this.currentSubjects=currentSubjects
    }
    signUpToSubjects(){
        return "Student sign up"
    }
}

class Administrator extends User{
    userType='Admin'
    constructor(name:string, password:string){
        super(name,password)
        this.name=name
        this.password=password
    }

    addUser(){
        return "Adding new user to DB"
    }
    createNewSubjects(){
        return " Admin creating new subjects"
    }

    changeUserName(){
        return " changing user name"
    }

    changeUserPassword(){
        return "Changing user password"
    }
}
