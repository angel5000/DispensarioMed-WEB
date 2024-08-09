import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { RegistroPaciente } from '../../Model/RegistroPaciente';
import { RegistroUsuario } from '../../Model/RegistroUsuario';
import { RegistrarPacienteServicio } from '../../Servicios/RegistrarPaciente';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [ReactiveFormsModule,MatCardModule],
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.css'
})
export class RegistrarComponent {
  registerForm!: FormGroup;
  paciente: RegistroPaciente = {
    idPaciente:0,
    cedula: '',
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    provincia: '',
    direccion: '',
    numCelular: '',
    canton: '',
    genero: '',
    correoElectronico: ''
  };

  usuario: RegistroUsuario = {
    idDatosUsuario: 0,
    usuario: '',
    rol: 0,
    activa: '',
    password: ''
  };
  constructor(private fb: FormBuilder,private registroService: RegistrarPacienteServicio, private router: Router) {
    this.registerForm = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      provincia: ['', Validators.required],
      direccion: ['', Validators.required],
      numCelular: ['', Validators.required],
      canton: ['', Validators.required],
      genero: ['', Validators.required],
      correoElectronico: ['', [Validators.required, Validators.email]],
      telefonoId: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }
  registrar() {
    if (this.registerForm.valid) {
      this.paciente = {
        ...this.registerForm.value,
        idPaciente: 0 // Si lo estás creando, puede que quieras que se mantenga en 0 o que la API lo genere.
      };
    }
    this.registroService.registrarPaciente(this.paciente).subscribe(
    
      (idPaciente: number) => {
        // Usamos la ID del paciente para registrar al usuario
        console.log("DATOS",idPaciente, this.paciente.idPaciente);
        const Usuario: RegistroUsuario={
          
        idDatosUsuario : idPaciente,
    usuario:  this.registerForm.get('usuario')?.value,
     rol:100,
   activa:'A',
     password:  this.registerForm.get('contrasena')?.value,
        }
        console.log("DATOS",idPaciente, this.paciente.idPaciente);
      // Convertimos el número a string si es necesario
    

        this.registroService.registrarUsuario(Usuario).subscribe(
          response => {

            this.showAlert();

            console.log('Usuario registrado exitosamente', response);
          },
          error => {
            console.error('Error al registrar el usuario', error);
          }
        );
      },
      error => {
        console.error('Error al registrar el paciente', error);
      }
    );
  }
  ngOnInit(): void {
   
  }
showAlert(): void {
    Swal.fire({
      title: 'Registro Paciente',
      text: 'Paciente Registrado con exito',
      icon: 'success',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/login']);
      }
    });
  }
  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registroService.registrarPaciente(this.registerForm.value).subscribe(response => {
       
       });
      console.log(this.registerForm.value);
      // Aquí puedes enviar los datos al servidor
    } else {
      console.log('Formulario no válido');
    }
  }
  
 



}
