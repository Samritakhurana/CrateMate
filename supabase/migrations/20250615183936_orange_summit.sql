/*
  # Initial CrateMate Database Schema

  1. New Tables
    - `fruits` - Store fruit inventory data
    - `alerts` - Store user alerts and notifications
    - `farm_profiles` - Store farm and user profile information
    - `analytics` - Store daily analytics data
    - `market_prices` - Store current market price information

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Add policies for market prices (read-only for all authenticated users)

  3. Functions
    - Trigger to automatically update updated_at timestamps
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Fruits table
CREATE TABLE IF NOT EXISTS fruits (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    fruit_type TEXT NOT NULL,
    variety TEXT,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    harvest_date DATE NOT NULL,
    storage_method TEXT NOT NULL,
    condition TEXT NOT NULL CHECK (condition IN ('excellent', 'good', 'fair', 'poor')),
    shelf_life_days INTEGER NOT NULL CHECK (shelf_life_days > 0),
    expiry_date DATE NOT NULL,
    status TEXT NOT NULL DEFAULT 'fresh' CHECK (status IN ('fresh', 'warning', 'expired')),
    location TEXT,
    temperature DECIMAL(5,2),
    humidity DECIMAL(5,2) CHECK (humidity >= 0 AND humidity <= 100),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Alerts table
CREATE TABLE IF NOT EXISTS alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    fruit_id UUID REFERENCES fruits(id) ON DELETE SET NULL,
    type TEXT NOT NULL CHECK (type IN ('spoilage_warning', 'expired', 'storage_tip', 'market_alert')),
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Farm profiles table
CREATE TABLE IF NOT EXISTS farm_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    farm_name TEXT,
    location TEXT,
    farm_size DECIMAL(10,2) CHECK (farm_size > 0),
    primary_crops TEXT[],
    contact_phone TEXT,
    address TEXT,
    coordinates JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    total_fruits INTEGER DEFAULT 0,
    spoiled_fruits INTEGER DEFAULT 0,
    revenue_saved DECIMAL(10,2) DEFAULT 0,
    efficiency_score DECIMAL(5,2) DEFAULT 0 CHECK (efficiency_score >= 0 AND efficiency_score <= 100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Market prices table
CREATE TABLE IF NOT EXISTS market_prices (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fruit_type TEXT NOT NULL,
    variety TEXT,
    price_per_kg DECIMAL(10,2) NOT NULL CHECK (price_per_kg > 0),
    market_location TEXT NOT NULL,
    quality_grade TEXT NOT NULL CHECK (quality_grade IN ('premium', 'good', 'average')),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE fruits ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE farm_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;

-- Fruits policies
CREATE POLICY "Users can manage their own fruits"
    ON fruits
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Alerts policies
CREATE POLICY "Users can manage their own alerts"
    ON alerts
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Farm profiles policies
CREATE POLICY "Users can manage their own farm profile"
    ON farm_profiles
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can manage their own analytics"
    ON analytics
    FOR ALL
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Market prices policies (read-only for all authenticated users)
CREATE POLICY "Authenticated users can read market prices"
    ON market_prices
    FOR SELECT
    TO authenticated
    USING (true);

-- Only allow admins to modify market prices
CREATE POLICY "Only admins can modify market prices"
    ON market_prices
    FOR ALL
    TO authenticated
    USING (auth.jwt() ->> 'role' = 'admin')
    WITH CHECK (auth.jwt() ->> 'role' = 'admin');

-- Create updated_at triggers
CREATE TRIGGER update_fruits_updated_at
    BEFORE UPDATE ON fruits
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_alerts_updated_at
    BEFORE UPDATE ON alerts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_farm_profiles_updated_at
    BEFORE UPDATE ON farm_profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_market_prices_updated_at
    BEFORE UPDATE ON market_prices
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_fruits_user_id ON fruits(user_id);
CREATE INDEX IF NOT EXISTS idx_fruits_expiry_date ON fruits(expiry_date);
CREATE INDEX IF NOT EXISTS idx_fruits_status ON fruits(status);
CREATE INDEX IF NOT EXISTS idx_alerts_user_id ON alerts(user_id);
CREATE INDEX IF NOT EXISTS idx_alerts_read ON alerts(read);
CREATE INDEX IF NOT EXISTS idx_analytics_user_date ON analytics(user_id, date);
CREATE INDEX IF NOT EXISTS idx_market_prices_fruit_type ON market_prices(fruit_type);