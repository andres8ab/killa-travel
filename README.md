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

## Diagrama base de datos Postgresql

  +---------------+              +-----------------+              +---------------+
  |     User      |              |     Flight      |              |    Favorite    |
  +---------------+              +-----------------+              +---------------+
  | id: String    | *          * | id: String      |   *       *  | id: String    |
  | email: String |------------->| airline: String |<------------>| userId: String|
  | firstName: Str|              | origin: String  |              | flightId: Str |
  | lastName: Str |              | destiny: String |              | createAt: Date|
  | profileImg: Str|             | departure: Str  |              +---------------+
  +---------------+              | passengers: Str |  
          |                      | flightNumber: S |  
          |                      | price: Int      |  
          |                      | categoryName: S |  
          |                       +-----------------+  
          |                            
          |  
          |  
          |                En base de datos podemos observar la relacion one-to-many
          *                Por ejemplo, un usuario puede tener varias reservaciones.
  +---------------+  
  |   Reservation |  
  +---------------+  
  | id: String    |  
  | createdAt: Date|  
  | userId: String|  
  | flightId: Str |  
  +---------------+

  ## Vercel URL con servidor gratuito

  https://killa-travel.vercel.app/ 
