import { bootstrapApplication } from '@angular/platform-browser'; // Importa la función para iniciar la app en el navegador
import { appConfig } from './app/app.config'; // Importa la configuración de la aplicación (providers, etc.)
import { AppComponent } from './app/app.component'; // Importa el componente raíz de la aplicación

// Inicia ("bootea") la aplicación Angular usando el componente raíz y la configuración indicada
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err)); // Si ocurre un error al iniciar, lo muestra en consola