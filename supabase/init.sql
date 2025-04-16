-- Remover tabelas existentes se houver
drop table if exists appointments;
drop table if exists availability;
drop table if exists services;
drop table if exists professionals;

-- Criar tabelas
create table professionals (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null unique,
  phone text not null,
  bio text,
  logo text,
  primary_color text default '#000000',
  secondary_color text default '#ffffff',
  constraint email_format check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

create table services (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  professional_id uuid not null references professionals(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10,2) not null check (price >= 0),
  duration integer not null check (duration > 0),
  images text[] default array[]::text[],
  constraint valid_duration check (duration > 0 and duration <= 480)
);

create table availability (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  professional_id uuid not null references professionals(id) on delete cascade,
  day integer not null check (day >= 0 and day <= 6),
  slots text[] not null,
  constraint unique_professional_day unique (professional_id, day)
);

create table appointments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  professional_id uuid not null references professionals(id) on delete cascade,
  service_id uuid not null references services(id) on delete restrict,
  client_name text not null,
  client_email text not null,
  client_phone text not null,
  date date not null,
  time_slot_id text not null,
  status text not null check (status in ('pending', 'confirmed', 'cancelled')) default 'pending',
  notes text,
  constraint future_date check (date >= current_date)
);

-- Criar índices
create index idx_appointments_professional_id on appointments(professional_id);
create index idx_appointments_service_id on appointments(service_id);
create index idx_appointments_date on appointments(date);
create index idx_services_professional_id on services(professional_id);
create index idx_availability_professional_id on availability(professional_id);

-- Habilitar RLS
alter table professionals enable row level security;
alter table services enable row level security;
alter table availability enable row level security;
alter table appointments enable row level security;

-- Criar políticas
create policy "Profissionais são públicos"
  on professionals for select
  to anon
  using (true);

create policy "Serviços são públicos"
  on services for select
  to anon
  using (true);

create policy "Disponibilidade é pública"
  on availability for select
  to anon
  using (true);

create policy "Agendamentos são públicos"
  on appointments for select
  to anon
  using (true);

create policy "Qualquer um pode criar agendamentos"
  on appointments for insert
  to anon
  with check (true);

-- Inserir dados de teste
insert into professionals (name, email, phone, bio)
values (
  'Maria Silva',
  'maria@example.com',
  '(11) 99999-9999',
  'Profissional especializada em tratamentos estéticos faciais e corporais.'
);

-- Inserir serviços de teste
insert into services (professional_id, name, description, price, duration)
select
  id as professional_id,
  'Limpeza de Pele',
  'Limpeza profunda com extração e máscara hidratante',
  150.00,
  60
from professionals
where email = 'maria@example.com'; 