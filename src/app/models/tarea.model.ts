// Interfaz que define la estructura de una tarea, ahora con los nuevos campos del backend
export interface Tarea {
  id: number;                        // Identificador único de la tarea
  titulo: string;                    // Título de la tarea
  descripcion: string;               // Descripción detallada de la tarea
  prioridad: number;                 // Prioridad de la tarea (por ejemplo: 1 = alta, 2 = media, 3 = baja)
  completada: boolean;               // Indica si la tarea está completada
  fechaCreacion: string;             // Fecha de creación (en formato ISO string)
  fechaVencimiento?: string | null;  // Fecha de vencimiento (puede ser nula)
  fechaModificacion?: string | null; // Fecha de última modificación (puede ser nula)
}