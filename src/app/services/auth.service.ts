import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Guarda los datos del usuario en localStorage
  guardarUsuario(usuario: any) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  // Obtiene el usuario actual (o null si no hay)
  obtenerUsuario() {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Elimina los datos del usuario (logout)
  logout() {
    localStorage.removeItem('usuario');
  }

  // ¿Está autenticado?
  estaAutenticado(): boolean {
    return !!this.obtenerUsuario();
  }

  obtenerNombreUsuario(): string | null {
  const usuario = this.obtenerUsuario();
  return usuario ? usuario.nombre : null;
 }
}