import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- Agrega esto
import { TareasService } from '../../services/tareas.service';
import { Tarea } from '../../models/tarea.model';

@Component({
  selector: 'app-lista-tareas',
  templateUrl: './lista-tareas.component.html',
  styleUrls: ['./lista-tareas.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule] // <-- Agrega CommonModule aquí
})
export class ListaTareasComponent implements OnInit {
  tareas: Tarea[] = [];
  cargando = true;
  nuevoTitulo = '';

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasService.getTareas().subscribe({
      next: (datos) => {
        this.tareas = datos;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar tareas', err);
        this.cargando = false;
      }
    });
  }

  agregarTarea() {
    if (!this.nuevoTitulo.trim()) return;
    this.tareasService.crearTarea({
      titulo: this.nuevoTitulo,
      completada: false
    }).subscribe({
      next: (tarea) => {
        this.tareas.push(tarea);
        this.nuevoTitulo = '';
      },
      error: (err) => {
        console.error('Error al agregar tarea', err);
      }
    });
  }

  marcarComoCompletada(tarea: Tarea) {
    const tareaActualizada = { ...tarea, completada: true };
    this.tareasService.actualizarTarea(tareaActualizada).subscribe({
      next: () => {
        tarea.completada = true;
      },
      error: (err) => {
        console.error('Error al marcar como completada', err);
      }
    });
  }

  eliminarTarea(tarea: Tarea) {
    this.tareasService.eliminarTarea(tarea.id).subscribe({
      next: () => {
        this.tareas = this.tareas.filter(t => t.id !== tarea.id);
      },
      error: (err) => {
        console.error('Error al eliminar tarea', err);
      }
    });
  }
}