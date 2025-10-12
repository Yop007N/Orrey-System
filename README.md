# Orrey System

## Descripcion

Sistema de visualizacion 3D interactivo del Sistema Solar construido con React Three Fiber. Permite explorar planetas, lunas y otros cuerpos celestes en un entorno 3D inmersivo con datos astronomicos precisos almacenados en base de datos MySQL.

## Stack Tecnologico

### Frontend (Client)
- **React 18** - Biblioteca UI moderna
- **Vite** - Build tool ultra-rapido
- **React Three Fiber (R3F)** - Renderizado 3D con Three.js en React
- **@react-three/drei** - Helpers y componentes 3D utiles
- **Three.js** - Motor de graficos 3D WebGL
- **Tailwind CSS** - Framework de estilos utility-first
- **React Icons** - Iconografia
- **Axios** - Cliente HTTP

### Backend (Server)
- **Node.js** con TypeScript
- **Express** - Framework web minimalista
- **MySQL 2** - Base de datos relacional
- **CORS** - Habilitado para comunicacion con frontend
- **ts-node-dev** - Hot reload para TypeScript

## Caracteristicas

- **Visualizacion 3D Interactiva**: Representacion realista del Sistema Solar con Three.js
- **Navegacion de Planetas**: Explora cada planeta con informacion detallada
- **Sistema de Lunas**: Visualizacion de satelites naturales
- **Datos Astronomicos**: Informacion precisa de planetas almacenada en MySQL
- **Controles Interactivos**: Zoom, rotacion y navegacion fluida
- **Renderizado Optimizado**: Uso eficiente de WebGL
- **Diseño Responsive**: Adaptable a diferentes resoluciones

## Estructura del Proyecto

```
Orrey-System/
├── client/                    # Frontend React
│   ├── src/
│   │   ├── App.jsx           # Componente principal
│   │   ├── SolarSystem.jsx   # Sistema solar 3D
│   │   ├── Orrery.jsx        # Orbitador principal
│   │   ├── Moons.jsx         # Sistema de lunas
│   │   ├── Creditos.jsx      # Creditos
│   │   ├── API.js            # Cliente API
│   │   ├── infoplanets.js    # Datos de planetas
│   │   └── assets/           # Texturas y recursos 3D
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                    # Backend Express
│   ├── config/
│   │   └── db.ts             # Configuracion MySQL
│   ├── main.ts               # Servidor Express
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

## Requisitos Previos

- Node.js 16+
- MySQL 8+
- npm o yarn

## Instalacion

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Yop007N/Orrey-System.git
cd Orrey-System
```

### 2. Configurar Base de Datos

```sql
CREATE DATABASE orrery_db;
USE orrery_db;

-- Tabla de recursos (texturas, modelos 3D)
CREATE TABLE resource (
  id INT PRIMARY KEY AUTO_INCREMENT,
  src_json JSON NOT NULL
);

-- Tabla de planetas
CREATE TABLE planets (
  id INT PRIMARY KEY AUTO_INCREMENT,
  src_json JSON NOT NULL
);

-- Insertar datos iniciales
INSERT INTO resource (src_json) VALUES
('{"textures": [...], "models": [...]}');

INSERT INTO planets (src_json) VALUES
('{"mercury": {...}, "venus": {...}, "earth": {...}, ...}');
```

### 3. Configurar Backend

```bash
cd server

# Instalar dependencias
npm install

# Configurar base de datos (editar config/db.ts)
# Actualizar credenciales MySQL

# Iniciar servidor
npm run dev
```

El servidor se ejecutara en `http://localhost:3000` (por defecto).

### 4. Configurar Frontend

```bash
cd client

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev
```

La aplicacion se abrira en `http://localhost:5173`.

## Configuracion

### Base de Datos (server/config/db.ts)

```typescript
import mysql from 'mysql2';

export const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'tu_password',
  database: 'orrery_db'
});
```

### CORS (server/main.ts)

Por defecto configurado para `http://localhost:5173`. Actualizar para produccion:

```typescript
app.use(cors({
  origin: 'https://tu-dominio.com'
}));
```

## API Endpoints

### GET /api/src
Obtiene recursos 3D (texturas, modelos).

**Respuesta**:
```json
{
  "src_json": {
    "textures": {
      "sun": "url...",
      "earth": "url...",
      ...
    },
    "models": [...]
  }
}
```

### GET /api/planets
Obtiene datos de planetas.

**Respuesta**:
```json
{
  "src_json": {
    "mercury": {
      "name": "Mercurio",
      "radius": 2439.7,
      "distance": 57.9,
      "period": 88,
      ...
    },
    ...
  }
}
```

## Componentes Principales

### SolarSystem.jsx
Renderiza el sistema solar completo con orbitas y planetas.

```jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function SolarSystem() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} />
      <OrbitControls />
      <Sun />
      <Planets />
    </Canvas>
  )
}
```

### Orrery.jsx
Orbitador principal que controla movimiento planetario.

### Moons.jsx
Sistema de lunas que orbitan planetas.

## Desarrollo

### Scripts del Cliente

```bash
npm run dev       # Servidor desarrollo (puerto 5173)
npm run build     # Build optimizado para produccion
npm run preview   # Preview de build
npm run lint      # ESLint
```

### Scripts del Servidor

```bash
npm run dev       # Servidor con hot-reload
```

## Datos de Planetas

Los datos astronomicos incluyen:

- **Nombre**: Nombre del planeta
- **Radio**: Radio ecuatorial (km)
- **Distancia al Sol**: Distancia media (millones de km)
- **Periodo Orbital**: Tiempo de traslacion (dias terrestres)
- **Periodo Rotacion**: Tiempo de rotacion (horas)
- **Masa**: Masa relativa a la Tierra
- **Gravedad**: Gravedad superficial (m/s²)
- **Temperatura**: Temperatura promedio (°C)
- **Lunas**: Numero de satelites naturales
- **Textura**: URL de textura 3D

## Optimizacion 3D

### Performance Tips

```jsx
// Usar LOD (Level of Detail) para objetos distantes
import { Lod } from '@react-three/drei'

// Reducir vertices en planetas lejanos
<sphereGeometry args={[radius, segments, segments]} />

// Usar instancing para estrellas
<instancedMesh count={1000}>
  <sphereGeometry args={[0.1, 8, 8]} />
  <meshBasicMaterial />
</instancedMesh>
```

### Texturas
- Usar formatos comprimidos (WebP, KTX2)
- Aplicar mipmaps para texturas grandes
- Cargar texturas de forma lazy

## Despliegue

### Frontend (Client)

**Build**:
```bash
cd client
npm run build
```

**Hosting Recomendado**:
- Vercel (recomendado para Vite)
- Netlify
- GitHub Pages

**Vercel**:
```bash
npm install -g vercel
vercel --prod
```

### Backend (Server)

**Opciones**:
- Railway (MySQL incluido)
- Heroku + ClearDB MySQL
- DigitalOcean Droplet
- AWS EC2 + RDS MySQL

**Variables de Entorno**:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=orrery_db
PORT=3000
CORS_ORIGIN=https://tu-frontend.com
```

## Tecnologias 3D

### React Three Fiber

Framework React para Three.js:
```jsx
import { Canvas, useFrame } from '@react-three/fiber'

function RotatingPlanet() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  )
}
```

### @react-three/drei

Helpers utiles:
- `OrbitControls` - Controles de camara
- `Stars` - Campo de estrellas
- `Environment` - Iluminacion ambiental
- `Text3D` - Texto 3D
- `Html` - Overlay HTML en 3D

## Recursos Astronomicos

### Fuentes de Datos
- NASA APIs
- JPL Horizons System
- Solar System OpenData

### Texturas de Planetas
- [Solar System Scope](https://www.solarsystemscope.com/textures/)
- [NASA 3D Resources](https://nasa3d.arc.nasa.gov/)
- [Planet Pixel Emporium](http://planetpixelemporium.com/)

## Funcionalidades Futuras

- [ ] Modo VR/AR con WebXR
- [ ] Simulacion de eclipses
- [ ] Trayectorias de cometas y asteroides
- [ ] Timeline historico de eventos astronomicos
- [ ] Quiz educativo interactivo
- [ ] Exportacion de orbitas en diferentes formatos
- [ ] Integracion con APIs de NASA en tiempo real
- [ ] Modo nocturno/estrellado

## Troubleshooting

**Error de conexion MySQL**:
```bash
# Verificar servicio MySQL
sudo systemctl status mysql

# Verificar credenciales en server/config/db.ts
```

**Performance 3D bajo**:
- Reducir segmentos de geometrias (menos vertices)
- Desactivar sombras si no son necesarias
- Usar texturas mas pequenas
- Limitar numero de objetos renderizados

**CORS Error**:
- Verificar que servidor backend este corriendo
- Actualizar CORS origin en server/main.ts

## Contribuciones

Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/NuevaCaracteristica`)
3. Commit cambios (`git commit -m 'Agregar caracteristica'`)
4. Push a rama (`git push origin feature/NuevaCaracteristica`)
5. Abrir Pull Request

## Licencia

MIT License - ver archivo LICENSE para detalles

## Recursos

- [React Three Fiber Documentation](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Documentation](https://threejs.org/docs/)
- [Drei Components](https://github.com/pmndrs/drei)
- [NASA 3D Resources](https://nasa3d.arc.nasa.gov/)

## Creditos

Desarrollado para educacion y visualizacion astronomica interactiva.

## Soporte

Para problemas o preguntas, abrir un issue en GitHub.
