import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importa utilidades para pruebas unitarias de Angular

import { ListaTareasComponent } from './lista-tareas.component'; // Importa el componente a testear

// describe() define un grupo de pruebas para el componente ListaTareasComponent
describe('ListaTareasComponent', () => {
  let component: ListaTareasComponent; // Variable para la instancia del componente
  let fixture: ComponentFixture<ListaTareasComponent>; // Variable para el "fixture", que maneja el entorno de pruebas del componente

  // beforeEach() se ejecuta antes de cada prueba individual
  beforeEach(async () => {
    // Configura el módulo de pruebas de Angular con el componente a testear
    await TestBed.configureTestingModule({
      imports: [ListaTareasComponent] // Importa el componente standalone
    })
    .compileComponents(); // Compila los componentes declarados

    // Crea una instancia del componente y su fixture
    fixture = TestBed.createComponent(ListaTareasComponent);
    component = fixture.componentInstance; // Obtiene la instancia del componente
    fixture.detectChanges(); // Dispara la detección de cambios inicial
  });

  // it() define una prueba individual
  it('should create', () => {
    // Verifica que el componente se haya creado correctamente
    expect(component).toBeTruthy();
  });
});