-- Table des utilisateurs (utilise auth.users de Supabase)
-- Table principale des revenus
CREATE TABLE revenues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  platform VARCHAR(50) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  note TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index pour查询 rapide
CREATE INDEX idx_revenues_user_id ON revenues(user_id);
CREATE INDEX idx_revenues_date ON revenues(date);

-- RLS: seul l'utilisateur peut voir ses propres données
ALTER TABLE revenues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own revenues" 
ON revenues FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own revenues" 
ON revenues FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own revenues" 
ON revenues FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own revenues" 
ON revenues FOR DELETE 
USING (auth.uid() = user_id);

-- Table des abonnements (pour monétisation)
CREATE TABLE subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan VARCHAR(20) NOT NULL DEFAULT 'free',
  stripe_customer_id VARCHAR(100),
  stripe_subscription_id VARCHAR(100),
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  current_period_start DATE,
  current_period_end DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RLS pour abonnements
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own subscription" 
ON subscriptions FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscription" 
ON subscriptions FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscription" 
ON subscriptions FOR UPDATE 
USING (auth.uid() = user_id);
