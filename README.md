## Aplicación de reserva de vuelos usando Next.js 14, Kinde, Supabase, Prisma y Shadcn UI

## Instalacion

npm install

Segundo, iniciar el development server:

npm run dev

## Caracteristicas

- Next.js 14 App Router
- Autenticación con Kinde
- Base de datos relacional de Supabase
- Conexion con Prisma ORM
- Stilos con Tailwind CSS
- Componentes con Shadcn UI
- Buscador con pasos multiples
- Url desplegada en Vercel

### Diagrama base de datos Postgresql

#### User
- id: String (Primary Key)
- email: String
- firstName: String
- lastName: String
- profileImage: String?

#### Flight
- id: String (Primary Key)
- airline: String
- origin: String
- destiny: String
- departure: String
- passengers: String
- flightNumber: String
- price: Int
- categoryName: String
- createdAT: DateTime
- userId: String (Foreign Key)

#### Favorite
- id: String (Primary Key)
- userId: String (Foreign Key)
- flightId: String (Foreign Key)
- createAt: DateTime

#### Reservation
- id: String (Primary Key)
- createdAt: DateTime
- userId: String (Foreign Key)
- flightId: String (Foreign Key)

En esta base de datos podemos observar la relacion one-to-many.
Por ejemplo, un usuario puede tener varias reservaciones.
 

  ## Vercel URL con servidor gratuito

  https://killa-travel.vercel.app/ 

  ## Video presentacion en Youtube

  https://youtu.be/KClX8FXDak8
  

  ##--------------------------------------

  
