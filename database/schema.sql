-- ==========================================
-- TYPES & ENUMS
-- ==========================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'ALUNO', 'TENISTA');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE reservation_status AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE match_status AS ENUM ('SCHEDULED', 'IN_PROGRESS', 'FINISHED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE order_status AS ENUM ('PENDING', 'PAID', 'DELIVERED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- ==========================================
-- FUNCTIONS
-- ==========================================
-- Função auxiliar para checar se o usuário atual é ADMIN
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'ADMIN'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ==========================================
-- TABLES
-- ==========================================

-- 1. Profiles (Usuários)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  role user_role DEFAULT 'TENISTA'::user_role,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger para criar profile automaticamente ao criar usuário no Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.email);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 2. Student Profiles (Dados específicos de alunos)
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  level TEXT, -- Iniciante, Intermediário, Avançado
  classes_per_week INT DEFAULT 1
);

-- 3. Courts (Quadras)
CREATE TABLE IF NOT EXISTS courts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- ex: "Quadra 1"
  surface TEXT,       -- ex: "Saibro"
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Reservations (Reservas)
CREATE TABLE IF NOT EXISTS reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  court_id UUID REFERENCES courts(id) ON DELETE CASCADE,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status reservation_status DEFAULT 'PENDING'::reservation_status,
  type TEXT, -- 'CLASS', 'RENTAL', 'TOURNAMENT'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Matches (Jogos ao Vivo / Placares)
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reservation_id UUID REFERENCES reservations(id) ON DELETE SET NULL UNIQUE,
  court_id UUID REFERENCES courts(id) ON DELETE CASCADE,
  player1_id UUID REFERENCES profiles(id),
  player2_id UUID REFERENCES profiles(id),
  player1_name TEXT, -- Caso seja um jogador sem conta
  player2_name TEXT,
  tournament TEXT, -- Nome do torneio, se aplicável
  status match_status DEFAULT 'SCHEDULED'::match_status,
  score_data JSONB DEFAULT '{"sets": [], "current": {"p1": "0", "p2": "0"}}'::JSONB,
  winner_id UUID REFERENCES profiles(id),
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Coaches (Professores)
CREATE TABLE IF NOT EXISTS coaches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'Head Coach', 'Treinador Avançado', etc
  img TEXT,
  bio TEXT,
  attributes JSONB DEFAULT '[]'::JSONB, -- Array de objetos: [{ name: "Técnica", value: 95 }]
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Products (Loja / Pro Shop)
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INT DEFAULT 0,
  img TEXT,
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Orders (Pedidos da Loja)
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  total_amount DECIMAL(10, 2) NOT NULL,
  status order_status DEFAULT 'PENDING'::order_status,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Order Items (Itens do Pedido)
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE RESTRICT,
  quantity INT NOT NULL CHECK (quantity > 0),
  price_at_time DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE courts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE coaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Profiles
DROP POLICY IF EXISTS "Profiles são visíveis para todos" ON profiles;
CREATE POLICY "Profiles são visíveis para todos" ON profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Usuário pode atualizar próprio perfil" ON profiles;
CREATE POLICY "Usuário pode atualizar próprio perfil" ON profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "Admin tem acesso total a profiles" ON profiles;
CREATE POLICY "Admin tem acesso total a profiles" ON profiles FOR ALL USING (public.is_admin());

-- Student Profiles
DROP POLICY IF EXISTS "Student profiles são visíveis para todos" ON student_profiles;
CREATE POLICY "Student profiles são visíveis para todos" ON student_profiles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Admin tem acesso total a student_profiles" ON student_profiles;
CREATE POLICY "Admin tem acesso total a student_profiles" ON student_profiles FOR ALL USING (public.is_admin());

-- Courts
DROP POLICY IF EXISTS "Quadras visíveis para todos" ON courts;
CREATE POLICY "Quadras visíveis para todos" ON courts FOR SELECT USING (true);
DROP POLICY IF EXISTS "Apenas ADMIN modifica quadras" ON courts;
CREATE POLICY "Apenas ADMIN modifica quadras" ON courts FOR ALL USING (public.is_admin());

-- Reservations
DROP POLICY IF EXISTS "Reservas visíveis para todos" ON reservations;
CREATE POLICY "Reservas visíveis para todos" ON reservations FOR SELECT USING (true);
DROP POLICY IF EXISTS "Usuário logado pode criar reserva" ON reservations;
CREATE POLICY "Usuário logado pode criar reserva" ON reservations FOR INSERT WITH CHECK (auth.uid() = profile_id);
DROP POLICY IF EXISTS "Usuário pode atualizar própria reserva" ON reservations;
CREATE POLICY "Usuário pode atualizar própria reserva" ON reservations FOR UPDATE USING (auth.uid() = profile_id);
DROP POLICY IF EXISTS "Usuário pode deletar própria reserva" ON reservations;
CREATE POLICY "Usuário pode deletar própria reserva" ON reservations FOR DELETE USING (auth.uid() = profile_id);
DROP POLICY IF EXISTS "Admin tem acesso total a reservas" ON reservations;
CREATE POLICY "Admin tem acesso total a reservas" ON reservations FOR ALL USING (public.is_admin());

-- Matches
DROP POLICY IF EXISTS "Partidas visíveis para todos" ON matches;
CREATE POLICY "Partidas visíveis para todos" ON matches FOR SELECT USING (true);
DROP POLICY IF EXISTS "Apenas ADMIN gerencia partidas" ON matches;
CREATE POLICY "Apenas ADMIN gerencia partidas" ON matches FOR ALL USING (public.is_admin());

-- Coaches
DROP POLICY IF EXISTS "Professores visíveis para todos" ON coaches;
CREATE POLICY "Professores visíveis para todos" ON coaches FOR SELECT USING (true);
DROP POLICY IF EXISTS "Apenas ADMIN gerencia professores" ON coaches;
CREATE POLICY "Apenas ADMIN gerencia professores" ON coaches FOR ALL USING (public.is_admin());

-- Products
DROP POLICY IF EXISTS "Produtos visíveis para todos" ON products;
CREATE POLICY "Produtos visíveis para todos" ON products FOR SELECT USING (true);
DROP POLICY IF EXISTS "Apenas ADMIN gerencia produtos" ON products;
CREATE POLICY "Apenas ADMIN gerencia produtos" ON products FOR ALL USING (public.is_admin());

-- Orders
DROP POLICY IF EXISTS "Usuário vê próprios pedidos" ON orders;
CREATE POLICY "Usuário vê próprios pedidos" ON orders FOR SELECT USING (auth.uid() = profile_id);
DROP POLICY IF EXISTS "Usuário cria próprios pedidos" ON orders;
CREATE POLICY "Usuário cria próprios pedidos" ON orders FOR INSERT WITH CHECK (auth.uid() = profile_id);
DROP POLICY IF EXISTS "Admin tem acesso total a pedidos" ON orders;
CREATE POLICY "Admin tem acesso total a pedidos" ON orders FOR ALL USING (public.is_admin());

-- Order Items
DROP POLICY IF EXISTS "Usuário vê itens dos próprios pedidos" ON order_items;
CREATE POLICY "Usuário vê itens dos próprios pedidos" ON order_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.profile_id = auth.uid())
);
DROP POLICY IF EXISTS "Usuário insere itens nos próprios pedidos" ON order_items;
CREATE POLICY "Usuário insere itens nos próprios pedidos" ON order_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.profile_id = auth.uid())
);
DROP POLICY IF EXISTS "Admin tem acesso total aos itens dos pedidos" ON order_items;
CREATE POLICY "Admin tem acesso total aos itens dos pedidos" ON order_items FOR ALL USING (public.is_admin());

-- ==========================================
-- REALTIME
-- ==========================================
-- Ativar Realtime para a tabela matches para placar ao vivo
DO $$ BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE matches;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
