// Define cómo debe ser un objeto de tipo Tarea
export interface Tarea {
  id: number;           // Debe tener un id numérico
  titulo: string;       // Debe tener un título de tipo texto
  completada: boolean;  // Debe tener un estado completada (verdadero o falso)
}