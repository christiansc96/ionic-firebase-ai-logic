# Firebase AI Logic Demo (Ionic + Angular)

Demo para charla de **Ionic + Firebase AI Logic**.

Esta app muestra una integración simple entre Ionic (Angular) y Firebase para consumir lógica de IA.

## Requisitos

- Node.js 20+
- npm 10+

## Ejecutar el proyecto

1. Instala dependencias:

```bash
npm install
```

2. Configura el environment (este es el único paso obligatorio de configuración):

Edita `src/environments/environment.ts` con tus credenciales de Firebase y tu modelo de IA.

Ejemplo:

```ts
export const environment = {
  production: false,
  firebase: {
    apiKey: 'TU_API_KEY',
    authDomain: 'TU_AUTH_DOMAIN',
    projectId: 'TU_PROJECT_ID',
    storageBucket: 'TU_STORAGE_BUCKET',
    messagingSenderId: 'TU_MESSAGING_SENDER_ID',
    appId: 'TU_APP_ID',
  },
  ai: {
    model: 'gemini-3.1-flash-lite',
  },
};
```

> Si también vas a generar build de producción, replica esos valores en `src/environments/environment.prod.ts`.

3. Levanta la app en modo desarrollo:

```bash
npm start
```

La app quedará disponible en la URL mostrada por Angular CLI (normalmente `http://localhost:4200`).

## Scripts útiles

- `npm start`: inicia servidor de desarrollo
- `npm run build`: genera build de producción
- `npm test`: ejecuta pruebas
- `npm run lint`: ejecuta linter

## Notas

- Este repositorio está pensado como material de demo para una charla.
- Puedes adaptar el modelo en `environment.ai.model` según lo que tengas habilitado en tu proyecto Firebase.
