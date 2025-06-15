import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root' // Hace que este servicio esté disponible en toda la app
})
export class TareasService {
  // URL base de la API de tareas
  private apiUrl = 'http://localhost:5190/api/tareas';

  // Inyecta HttpClient para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

  // Obtiene todas las tareas (GET)
  getTareas(): Observable<Tarea[]> {
    // Devuelve un Observable con la lista de tareas desde la API
    return this.http.get<Tarea[]>(this.apiUrl);
  }

  // Crea una nueva tarea (POST)
  crearTarea(tarea: Omit<Tarea, 'id'>): Observable<Tarea> {
    // Envía la nueva tarea a la API (sin id, porque lo genera el backend)
    return this.http.post<Tarea>(this.apiUrl, tarea);
  }
  actualizarTarea(tarea: Tarea): Observable<Tarea> {
  // Hace una petición PUT para actualizar la tarea en la API
  return this.http.put<Tarea>(`${this.apiUrl}/${tarea.id}`, tarea);
  }
  eliminarTarea(id: number): Observable<void> {
  // Hace una petición DELETE para eliminar la tarea en la API
  return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}