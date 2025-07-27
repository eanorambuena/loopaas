# Tabla de Organizaciones - Supabase

## Script SQL para crear la tabla de organizaciones

Ejecuta este script en el SQL Editor de Supabase:

```sql
-- Crear tabla de organizaciones
CREATE TABLE public.organizations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  plan text NOT NULL CHECK (plan IN ('Free', 'Pro')),
  "ownerId" uuid NOT NULL,
  "createdAt" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT organizations_pkey PRIMARY KEY (id),
  CONSTRAINT organizations_ownerId_fkey FOREIGN KEY ("ownerId") REFERENCES public."userInfo"(id)
);

-- Habilitar Row Level Security
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;

-- Política para que los usuarios solo puedan ver sus propias organizaciones
CREATE POLICY "Users can view their own organizations" ON public.organizations
  FOR SELECT USING (auth.uid() IN (
    SELECT "userId" FROM public."userInfo" WHERE id = "ownerId"
  ));

-- Política para que los usuarios puedan crear organizaciones
CREATE POLICY "Users can create organizations" ON public.organizations
  FOR INSERT WITH CHECK (auth.uid() IN (
    SELECT "userId" FROM public."userInfo" WHERE id = "ownerId"
  ));

-- Política para que los usuarios puedan actualizar sus organizaciones
CREATE POLICY "Users can update their own organizations" ON public.organizations
  FOR UPDATE USING (auth.uid() IN (
    SELECT "userId" FROM public."userInfo" WHERE id = "ownerId"
  ));

-- Política para que los usuarios puedan eliminar sus organizaciones
CREATE POLICY "Users can delete their own organizations" ON public.organizations
  FOR DELETE USING (auth.uid() IN (
    SELECT "userId" FROM public."userInfo" WHERE id = "ownerId"
  ));
```

## Esquema de la tabla

- `id`: UUID único de la organización (clave primaria)
- `created_at`: Timestamp de creación automático
- `name`: Nombre de la organización (requerido)
- `plan`: Plan de la organización ('Free' o 'Pro')
- `ownerId`: ID del propietario (referencia a userInfo.id)
- `createdAt`: Timestamp personalizado de creación

## Políticas de seguridad

Las políticas RLS aseguran que:
- Los usuarios solo pueden ver sus propias organizaciones
- Los usuarios solo pueden crear organizaciones con su propio ownerId
- Los usuarios solo pueden modificar/eliminar sus propias organizaciones

## Próximos pasos

1. Ejecutar el script SQL en Supabase
2. Probar la creación de organizaciones desde la interfaz
3. Implementar la página de gestión de organizaciones (`/organizacion/[id]`)
