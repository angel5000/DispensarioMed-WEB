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

  usuarioLogin = new FormGroup({
    email: new FormControl('', Validators.required),
    clave: new FormControl('', Validators.required)
  });

  constructor(private router: Router) {}

  iniciarSesion() {
    const emailControl = this.usuarioLogin.get('email');
    const claveControl = this.usuarioLogin.get('clave');

    if (emailControl && claveControl) {
      const email = emailControl.value;
      const clave = claveControl.value;

      if (email === 'Fausto@gmail.com' && clave === 'fausto123') {
        // Credenciales válidas: redirige al componente PaginaPrincipal
        this.nombreUsuario = email;
        this.mostrarBotonSalir = true;
        this.mostrarError = false;
        // Guarda los valores en localStorage
        localStorage.setItem('nombreUsuario', this.nombreUsuario);
        localStorage.setItem('mostrarBotonSalir', 'true');

        this.router.navigate(['/principal']).then(() => {
          // Redirección completada, ahora recargamos la página
          window.location.reload();
        });
      } else {
        // Credenciales incorrectas: muestra el mensaje de error
        this.mostrarError = true;
        this.mostrarBotonSalir = false;
      }
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  limpiarCampos() {
    const emailControl = this.usuarioLogin.get('email');
    const claveControl = this.usuarioLogin.get('clave');

    if (emailControl && claveControl) {
      emailControl.setValue('');
      claveControl.setValue('');
    }

    this.mostrarError = false;
  }
}
