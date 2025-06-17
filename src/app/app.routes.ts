import { Routes } from '@angular/router';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ListaTareasComponent,
    canActivate: [authGuard] // Solo usuarios autenticados pueden ver la lista de tareas
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  // Ruta comodín: redirige cualquier ruta no encontrada a la principal
  { path: '**', redirectTo: '' }
];