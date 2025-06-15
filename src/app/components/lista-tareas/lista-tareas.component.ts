import { Component, OnInit } from '@angular/core'; // Importa decorador y ciclo de vida de Angular
import { FormsModule } from '@angular/forms'; // Importa módulo para formularios y ngModel
import { CommonModule } from '@angular/common'; // Importa directivas comunes como *ngIf y *ngFor
import { TareasService } from '../../services/tareas.service'; // Importa el servicio que maneja las tareas (API)
import { Tarea } from '../../models/tarea.model'; // Importa el modelo de datos de una tarea

@Component({
  selector: 'app-lista-tareas', // Nombre del selector para usar este componente en HTML
  templateUrl: './lista-tareas.component.html', // Ruta al archivo de plantilla HTML
  styleUrls: ['./lista-tareas.component.css'], // Ruta al archivo de estilos CSS
  standalone: true, // Indica que es un componente standalone (no necesita un módulo)
  imports: [FormsModule, CommonModule] // Importa módulos necesarios para el template
})
export class ListaTareasComponent implements OnInit {
  tareas: Tarea[] = []; // Array donde se guardan las tareas obtenidas del backend
  cargando = true; // Variable para mostrar mensaje de carga mientras se obtienen las tareas
  nuevoTitulo = ''; // Variable para el input del formulario (nuevo título de tarea)

  // Inyecta el servicio de tareas en el constructor
  constructor(private tareasService: TareasService) {}

  // Método del ciclo de vida de Angular: se ejecuta al iniciar el componente
  ngOnInit(): void {
    // Llama al servicio para obtener las tareas (petición HTTP)
    this.tareasService.getTareas().subscribe({
      next: (datos) => {
        this.tareas = datos; // Guarda las tareas recibidas en el array
        this.cargando = false; // Oculta el mensaje de carga
      },
      error: (err) => {
        console.error('Error al cargar tareas', err); // Muestra error en consola si falla la petición
        this.cargando = false;
      }
    });
  }

  // Método para agregar una nueva tarea
  agregarTarea() {
    if (!this.nuevoTitulo.trim()) return; // No agrega si el título está vacío
    this.tareasService.crearTarea({
      titulo: this.nuevoTitulo,
      completada: false
    }).subscribe({
      next: (tarea) => {
        this.tareas.push(tarea); // Agrega la nueva tarea al array local
        this.nuevoTitulo = '';   // Limpia el input del formulario
      },
      error: (err) => {
        console.error('Error al agregar tarea', err);
      }
    });
  }

  // Método para marcar una tarea como completada
  marcarComoCompletada(tarea: Tarea) {
    const tareaActualizada = { ...tarea, completada: true }; // Crea una copia de la tarea con completada en true
    this.tareasService.actualizarTarea(tareaActualizada).subscribe({
      next: () => {
        tarea.completada = true; // Actualiza el estado en el array local
      },
      error: (err) => {
        console.error('Error al marcar como completada', err);
      }
    });
  }

  // Método para eliminar una tarea
  eliminarTarea(tarea: Tarea) {
    this.tareasService.eliminarTarea(tarea.id).subscribe({
      next: () => {
        // Elimina la tarea del array local filtrando por id
        this.tareas = this.tareas.filter(t => t.id !== tarea.id);
      },
      error: (err) => {
        console.error('Error al eliminar tarea', err);
      }
    });
  }
}
