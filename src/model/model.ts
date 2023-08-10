class Usuario {
    tipoDeUsuario;
    nombreDeUsuario;
    contraseña;
    UUID;

    constructor(tipoDeUsuario: string, nombreDeUsuario: string, contraseña: string, UUID: number){
        this.tipoDeUsuario = tipoDeUsuario;
        this.nombreDeUsuario = nombreDeUsuario;
        this.contraseña = contraseña;
        this.UUID = UUID;
    }

    login(){
        return 'Su sesión se ha iniciado correctamente'
    }

    signOut(){
        return 'Su sesión ha sido finalizada'
    }
}

class Administrador extends Usuario{
    crearMateria(){
        return 'Ha creado una nueva materia'
    }

    darDeAlta(data: string, nombre: string){
        if(data == 'Profesor'){
            return nombre + 'dado de alta correctamente'
        }
        else if(data == 'Alumno'){
            return nombre + 'dado de alta correctamente'
        }
        return 'Ingrese los datos correctos'
    }

    cambiarUserData(data: string){
        if(data == 'nombre'){
            return 'Nombre modificado correctamente'
        }
        else if(data == 'contraseña'){
            return 'Contraseña modificada correctamente'
        }
        return 'Ingrese los datos correctos'
    }
}

class Registado extends Usuario {
    fechaDeNacimiento;

    constructor(tipoDeUsuario: string, nombreDeUsuario: string, contraseña: string, UUID: number, fechaDeNacimiento: number){
        super(tipoDeUsuario, nombreDeUsuario, contraseña, UUID)
        this.fechaDeNacimiento = fechaDeNacimiento;
    }

    cambiarContraseña(){
        return 'Su contraseña ha sido modificada correctamente'
    }
}

class Profesor extends Registado {
    cantidadDeMateriasQueEnseña;

    constructor(tipoDeUsuario: string, nombreDeUsuario: string, contraseña: string, UUID: number, fechaDeNacimiento: number, cantidadDeMateriasQueEnseña: number){ // No me acuerdo como se podía evitar escribir todo de nuevo
        super(tipoDeUsuario, nombreDeUsuario, contraseña, UUID, fechaDeNacimiento)
        this.cantidadDeMateriasQueEnseña = cantidadDeMateriasQueEnseña;
    }
    
    calificarMateria(){
        return 'Calificación cargada exitosamente'
    }
}

class Alumno extends Registado {
    cantidadDeMateriasQueCursa;

    constructor(tipoDeUsuario: string, nombreDeUsuario: string, contraseña: string, UUID: number, fechaDeNacimiento: number, cantidadDeMateriasQueCursa: number){
        super(tipoDeUsuario, nombreDeUsuario, contraseña, UUID, fechaDeNacimiento)
        this.cantidadDeMateriasQueCursa = cantidadDeMateriasQueCursa;
    }

    inscribirMateria(){
        return 'Inscripción exitosa'
    }
}

const nuevoAlumno = new Alumno('registrado', 'juana', 'adaomdd588', 778887, 1999, 15)

console.log(nuevoAlumno)