# Portal Clientes FullCheck

Sistema web independiente para gestionar clientes, proyectos, archivos, solicitudes, tickets de soporte y reuniones.

## Estado actual

Esta primera versión es un MVP visual y funcional en local. Incluye datos demo y flujo básico para crear solicitudes, tickets, registros de archivo y reuniones desde la interfaz.

## Módulos incluidos

- Portal cliente
- Panel administrador
- Proyectos del cliente
- Solicitudes
- Tickets de soporte
- Registro de archivos
- Reuniones
- Diseño responsive

## Ejecutar en local

1. Abre una terminal en esta carpeta.
2. Instala dependencias:

```bash
npm install
```

3. Ejecuta el proyecto:

```bash
npm run dev
```

4. Abre la URL local que indique Vite, normalmente:

```text
http://localhost:5173
```

## Publicación recomendada

La ruta recomendada para producción es:

```text
clientes.fullcheck.cl
```

Stack sugerido para la versión con datos reales:

- Frontend: React/Vite o Next.js
- Hosting: Vercel
- Base de datos: Supabase
- Login: Supabase Auth
- Archivos: Supabase Storage

## Próximos pasos técnicos

1. Conectar Supabase.
2. Crear autenticación real para clientes y administrador.
3. Crear tablas de clientes, proyectos, solicitudes, tickets, reuniones y archivos.
4. Configurar subida real de documentos.
5. Publicar en Vercel.
6. Conectar el DNS del subdominio `clientes.fullcheck.cl`.
