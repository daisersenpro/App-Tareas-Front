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

  // Variable para guardar la tarea que se está editando
  tareaEditando: Tarea = this.nuevaTareaVacia();

  // Variables para el formulario de nueva tarea
  nuevoTitulo = ''; // Título de la nueva tarea
  nuevaDescripcion = ''; // Descripción de la nueva tarea
  nuevaPrioridad = 2; // Prioridad por defecto (2 = Media)
  nuevaFechaVencimiento: string | null = null; // Fecha de vencimiento (puede ser null)

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
    // Valida que título y descripción no estén vacíos
    if (!this.nuevoTitulo.trim() || !this.nuevaDescripcion.trim()) return;
    this.tareasService.crearTarea({
      titulo: this.nuevoTitulo,
      descripcion: this.nuevaDescripcion,
      prioridad: this.nuevaPrioridad,
      completada: false,
      fechaVencimiento: this.nuevaFechaVencimiento
    }).subscribe({
      next: (tarea) => {
        this.tareas.push(tarea); // Agrega la nueva tarea al array local
        // Limpia los campos del formulario
        this.nuevoTitulo = '';
        this.nuevaDescripcion = '';
        this.nuevaPrioridad = 2;
        this.nuevaFechaVencimiento = null;
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

  // Función para inicializar una tarea vacía (útil para limpiar el formulario)
  nuevaTareaVacia(): Tarea {
    return {
      id: 0,
      titulo: '',
      descripcion: '',
      prioridad: 2,
      completada: false,
      fechaCreacion: '',
      fechaVencimiento: null,
      fechaModificacion: null
    };
  }

  // Función para abrir el modal y cargar la tarea seleccionada
  abrirModalEdicion(tarea: Tarea) {
    // Clona la tarea seleccionada para no modificarla directamente en la lista
    this.tareaEditando = { ...tarea };

    // Abre el modal usando Bootstrap JS
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById('modalEdicionTarea')
    );
    modal.show();
  }

  // Función para guardar los cambios de la tarea editada
  guardarEdicionTarea() {
    // Al editar, la tarea siempre pasa a no completada
    this.tareaEditando.completada = false;
    this.tareasService.actualizarTarea(this.tareaEditando).subscribe({
      next: (tareaActualizada) => {
        // Actualiza la tarea en la lista local
        const idx = this.tareas.findIndex(t => t.id === tareaActualizada.id);
        if (idx !== -1) {
          this.tareas[idx] = tareaActualizada;
        }
        // Cierra el modal
        const modal = (window as any).bootstrap.Modal.getInstance(
          document.getElementById('modalEdicionTarea')
        );
        modal.hide();
      },
      error: (err) => {
        console.error('Error al editar tarea', err);
      }
    });
  }
}