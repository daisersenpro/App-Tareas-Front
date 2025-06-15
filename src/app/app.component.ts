import { Component } from '@angular/core';
import { ListaTareasComponent } from './components/lista-tareas/lista-tareas.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ListaTareasComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestor-tareas-front';
  year = new Date().getFullYear(); // <-- Solo aquí
}