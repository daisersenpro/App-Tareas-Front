import { Injectable } from '@angular/core'; // Permite que este servicio sea inyectable en otros componentes/servicios
import { HttpClient } from '@angular/common/http'; // Servicio de Angular para hacer peticiones HTTP
import { Observable } from 'rxjs'; // Permite trabajar con datos asíncronos (como respuestas HTTP)
import { Tarea } from '../models/tarea.model'; // Importa la interfaz que define la estructura de una tarea

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible en toda la aplicación (singleton)
})
export class TareasService {
  // URL base de la API de tareas (ajusta el puerto si tu backend cambia)
  private apiUrl = 'http://localhost:5190/api/tareas';

  // Inyecta HttpClient para poder hacer peticiones HTTP a la API
  constructor(private http: HttpClient) {}

  // Método para obtener todas las tareas (GET)
  getTareas(): Observable<Tarea[]> {
    // Devuelve un Observable con la lista de tareas obtenida desde la API
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Método para crear una nueva tarea (POST)
  // Omitimos 'id', 'fechaCreacion' y 'fechaModificacion' porque los genera el backend
  crearTarea(
    tarea: Omit<Tarea, 'id' | 'fechaCreacion' | 'fechaModificacion'>
  ): Observable<Tarea> {
    // Envía la nueva tarea a la API (el backend asigna id y fechas automáticamente)
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }

  // Método para actualizar una tarea existente (PUT)
  actualizarTarea(tarea: Tarea): Observable<Tarea> {
    // Envía la tarea actualizada a la API usando el id para identificarla
    return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }

  // Método para eliminar una tarea (DELETE)
  eliminarTarea(id: number): Observable<void> {
    // Hace una petición DELETE a la API para eliminar la tarea con el id indicado
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}