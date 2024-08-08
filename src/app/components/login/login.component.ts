import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Importaciones de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthServicio } from '../Servicios/AuthServicio'; 
import { HttpClient } from '@angular/common/http';
import { Login } from '../Model/Login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  mostrarMensajeAceptar = false;
  mostrarError = false;
  mostrarBotonSalir = false;
  nombreUsuario: string = '';
  datosLocalStorageListos = false;
  Id?:number|null;
  usuarioLogin = new FormGroup({
    Usuario: new FormControl('', Validators.required),
    Contrasena: new FormControl('', Validators.required)
  });

  constructor(private router: Router, private authService: AuthServicio, private http: HttpClient) {}
  
  login(): void {
    if (this.usuarioLogin.valid) {
      const login: Login = {
        Usuario: this.usuarioLogin.get('Usuario')?.value!,
        Contrasena: this.usuarioLogin.get('Contrasena')?.value!,
    
        
      };
    
        console.log('Intentando login con:', login);
        this.authService.login(login).subscribe({
          next: (response) => {
            // Manejar la respuesta de inicio de sesión exitoso
            console.log('Login exitoso:', response);
            this.mostrarError = false;
         
         //  this.Id=response.idUsuario!;
          // localStorage.setItem('this.Id', response.idUsuario?.toString());
          if (response.idUsuario !== undefined) {
            this.authService.setUserId(response.idUsuario! );
            console.log('Login exitoso:', response.idUsuario );
           this.router.navigate(['/principal']).then(() => {
          
              window.location.reload();
              console.log('Login exitoso:', response.idUsuario );
            });
            this.nombreUsuario = login.Usuario!;
            this.mostrarBotonSalir = true;
           if (typeof localStorage !== 'undefined') {
              localStorage.setItem('nombreUsuario', this.nombreUsuario);
              localStorage.setItem('response.idUsuario', response.idUsuario?.toLocaleString()!);
            }
          
          }else {
            console.error('idUsuario is undefined in response');
          }
      //  localStorage.setItem('nombreUsuario', this.nombreUsuario);
      //  localStorage.setItem('mostrarBotonSalir', 'true');
        
            // Redirigir o realizar otras acciones según sea necesario
          },
          error: (error) => {
            // Manejar errores de inicio de sesión
            console.error('Error de inicio de sesión:', error);
            this.mostrarError = true;
          }
        });
    
    }
  }
  
  
  /*
  login(username: string, password: string): void {
    this.http.post('/api/login', { username, password }).subscribe({
      next: (response: any) => {
        const userId = response.userId;
        this.authService.setUserId(userId);
        this.router.navigate(['/principal']).then(() => {
          
          window.location.reload();
        });
        // Redirigir a la página principal u otra acción
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }*/
  iniciarSesion() {
    const emailControl = this.usuarioLogin.get('email');
    const claveControl = this.usuarioLogin.get('clave');

    if (emailControl && claveControl) {
      const email = emailControl.value;
      const clave = claveControl.value;

      if (email === 'Fausto@gmail.com' && clave === 'fausto123') {
   
        this.nombreUsuario = email;
        this.mostrarBotonSalir = true;
        this.mostrarError = false;
        
        localStorage.setItem('nombreUsuario', this.nombreUsuario);
        localStorage.setItem('mostrarBotonSalir', 'true');

        
      } else {
      
        this.mostrarError = true;
        this.mostrarBotonSalir = false;
      }
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  limpiarCampos() {
    const emailControl = this.usuarioLogin.get('Usuario');
    const claveControl = this.usuarioLogin.get('Contrasena');

    if (emailControl && claveControl) {
      emailControl.setValue('');
      claveControl.setValue('');
    }

    this.mostrarError = false;
  }
}
