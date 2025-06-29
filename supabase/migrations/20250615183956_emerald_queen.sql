/*
  # Sample Data for CrateMate

  1. Sample market prices for different fruits
  2. Sample analytics data structure
  
  This migration adds sample data to help users get started with the application.
*/

-- Insert sample market prices
INSERT INTO market_prices (fruit_type, variety, price_per_kg, market_location, quality_grade) VALUES
('Papaya', 'Red Lady', 45.00, 'Mumbai APMC', 'premium'),
('Papaya', 'Sunrise Solo', 40.00, 'Mumbai APMC', 'good'),
('Papaya', 'Hawaiian', 35.00, 'Mumbai APMC', 'average'),
('Mango', 'Alphonso', 120.00, 'Pune Market', 'premium'),
('Mango', 'Kesar', 80.00, 'Pune Market', 'good'),
('Mango', 'Dasheri', 60.00, 'Delhi Market', 'good'),
('Banana', 'Cavendish', 25.00, 'Chennai Market', 'good'),
('Banana', 'Robusta', 30.00, 'Chennai Market', 'premium'),
('Apple', 'Red Delicious', 150.00, 'Delhi Market', 'premium'),
('Apple', 'Granny Smith', 140.00, 'Delhi Market', 'good'),
('Orange', 'Valencia', 50.00, 'Nagpur Market', 'good'),
('Orange', 'Navel', 60.00, 'Nagpur Market', 'premium'),
('Grapes', 'Thompson Seedless', 80.00, 'Nashik Market', 'premium'),
('Grapes', 'Red Globe', 90.00, 'Nashik Market', 'premium'),
('Tomato', 'Roma', 30.00, 'Bangalore Market', 'good'),
('Tomato', 'Cherry', 60.00, 'Bangalore Market', 'premium'),
('Avocado', 'Hass', 200.00, 'Mumbai APMC', 'premium'),
('Avocado', 'Fuerte', 180.00, 'Mumbai APMC', 'good')
ON CONFLICT DO NOTHING;

-- Update market prices with recent timestamps
UPDATE market_prices SET updated_at = NOW() - INTERVAL '1 hour' * (RANDOM() * 24);