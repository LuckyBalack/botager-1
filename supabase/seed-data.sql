-- Seed data for all dashboard tables

-- Buildings
INSERT INTO buildings (id, name, location, subcity, price, size, floor, description, images, amenities, building_features, contact_phone, owner_name, created_at) VALUES
('bldg-001', 'Abuki Building', 'Addis Ababa', 'Bole', 45000, 450, 3, 'Modern office complex with excellent amenities', '[]', '["WiFi", "24/7 Security", "Elevator"]', '["24/7 Security", "Generator Backup", "Water Tank"]', '+251911234567', 'Abuki Properties', NOW()),
('bldg-002', 'Sky Tower Residences', 'Addis Ababa', 'Kazanchis', 35000, 350, 15, 'Luxury residential building with premium facilities', '[]', '["WiFi", "Gym", "Pool"]', '["Parking", "Elevator", "Generator"]', '+251922345678', 'Sky Tower Group', NOW()),
('bldg-003', 'Tech Hub Office', 'Addis Ababa', 'CMC', 28000, 280, 8, 'Prime tech startup workspace', '[]', '["WiFi", "Coworking", "Conference Rooms"]', '["Elevator", "Security", "Backup Power"]', '+251933456789', 'Tech Innovation Ltd', NOW());

-- Properties (Rooms/Units)
INSERT INTO properties (id, building_id, room_number, floor, size, price, status, is_auction, current_bid, auction_start_time, auction_end_time, created_at) VALUES
('prop-001', 'bldg-001', '310', 3, 45, 15000, 'available', false, NULL, NULL, NULL, NOW()),
('prop-002', 'bldg-001', '311', 3, 50, 16000, 'available', false, NULL, NULL, NULL, NOW()),
('prop-003', 'bldg-002', '501', 5, 60, 22000, 'available', true, 20000, NOW(), NOW() + INTERVAL '7 days', NOW()),
('prop-004', 'bldg-003', '201', 2, 35, 12000, 'occupied', false, NULL, NULL, NULL, NOW());

-- User Profiles
INSERT INTO user_profiles (id, email, full_name, phone, role, profile_picture_url, created_at) VALUES
('user-001', 'alemu@example.com', 'Alemu Getachew', '+251911111111', 'tenant', 'https://avatar.example.com/alemu.jpg', NOW()),
('user-002', 'owner@example.com', 'Building Owner', '+251922222222', 'building_owner', 'https://avatar.example.com/owner.jpg', NOW()),
('user-003', 'admin@example.com', 'System Admin', '+251933333333', 'system_admin', 'https://avatar.example.com/admin.jpg', NOW());

-- Tenants
INSERT INTO tenants (id, building_id, user_id, full_name, email, phone, emergency_contact, created_at) VALUES
('tenant-001', 'bldg-001', 'user-001', 'Alemu Getachew', 'alemu@example.com', '+251911111111', '+251944444444', NOW()),
('tenant-002', 'bldg-002', 'user-002', 'Desta Abebe', 'desta@example.com', '+251922222222', '+251955555555', NOW());

-- Leases
INSERT INTO leases (id, tenant_id, property_id, building_id, start_date, end_date, security_deposit, monthly_rent, status, created_at) VALUES
('lease-001', 'tenant-001', 'prop-001', 'bldg-001', '2023-01-01', '2024-04-30', 30000, 15000, 'active', NOW()),
('lease-002', 'tenant-002', 'prop-004', 'bldg-003', '2023-06-15', '2024-12-15', 25000, 12000, 'active', NOW());

-- Invoices
INSERT INTO invoices (id, tenant_id, lease_id, building_id, amount_due, amount_paid, status, due_date, payment_date, created_at) VALUES
('inv-001', 'tenant-001', 'lease-001', 'bldg-001', 15000, 15000, 'paid', '2024-01-15', '2024-01-10', NOW() - INTERVAL '30 days'),
('inv-002', 'tenant-001', 'lease-001', 'bldg-001', 15000, 5000, 'pending', '2024-02-15', NULL, NOW()),
('inv-003', 'tenant-002', 'lease-002', 'bldg-003', 12000, 12000, 'paid', '2024-01-20', '2024-01-18', NOW() - INTERVAL '20 days');

-- Receipts
INSERT INTO receipts (id, invoice_id, tenant_id, amount, payment_method, transaction_reference, created_at) VALUES
('recv-001', 'inv-001', 'tenant-001', 15000, 'bank_transfer', 'TRX20240110001', NOW() - INTERVAL '30 days'),
('recv-002', 'inv-003', 'tenant-002', 12000, 'bank_transfer', 'TRX20240118001', NOW() - INTERVAL '20 days');

-- Maintenance Tickets
INSERT INTO maintenance_tickets (id, property_id, building_id, tenant_id, title, description, status, priority, created_at, updated_at) VALUES
('maint-001', 'prop-001', 'bldg-001', 'tenant-001', 'Leaking faucet in bathroom', 'Water dripping from bathroom tap', 'open', 'medium', NOW(), NOW()),
('maint-002', 'prop-004', 'bldg-003', 'tenant-002', 'Door lock broken', 'Main entrance door lock not working', 'in_progress', 'high', NOW() - INTERVAL '2 days', NOW());

-- Marketplace Listings
INSERT INTO marketplace_listings (id, building_id, property_id, title, description, price, current_bid, is_auction, auction_start_time, auction_end_time, location, amenities, images, status, created_at) VALUES
('listing-001', 'bldg-001', 'prop-001', 'Modern Office Space - Room 310', 'Premium office space in Abuki Building with excellent natural lighting and modern amenities', 15000, NULL, false, NULL, NULL, 'Addis Ababa, Bole', '["WiFi", "24/7 Security", "Parking"]', '[]', 'active', NOW()),
('listing-002', 'bldg-002', 'prop-003', 'Luxury Residential Unit - Room 501', 'Beautiful residential unit with panoramic city views and premium finishes', 22000, 20000, true, NOW(), NOW() + INTERVAL '7 days', 'Addis Ababa, Kazanchis', '["WiFi", "Gym", "Pool", "Security"]', '[]', 'active', NOW()),
('listing-003', 'bldg-003', 'prop-002', 'Tech Startup Office - Room 311', 'Coworking space perfect for startups with high-speed internet and collaboration areas', 16000, NULL, false, NULL, NULL, 'Addis Ababa, CMC', '["WiFi", "Coworking", "Conference Rooms"]', '[]', 'active', NOW());

-- Bids
INSERT INTO bids (id, listing_id, bidder_id, bid_amount, bid_time, created_at) VALUES
('bid-001', 'listing-002', 'user-001', 20500, NOW(), NOW()),
('bid-002', 'listing-002', 'user-002', 21000, NOW() - INTERVAL '1 hour', NOW());

-- Subscription Plans
INSERT INTO subscription_plans (id, name, description, price, features, created_at) VALUES
('plan-001', 'Basic', 'Perfect for individual tenants', 0, '["View Listings", "Submit Applications"]', NOW()),
('plan-002', 'Professional', 'For property managers and small teams', 50000, '["Advanced Reporting", "Tenant Management", "Maintenance Tracking"]', NOW()),
('plan-003', 'Enterprise', 'Complete solution for large buildings', 150000, '["All Professional Features", "API Access", "Priority Support", "Custom Reports"]', NOW());

-- Subscription Payments
INSERT INTO subscription_payments (id, building_id, plan_id, amount, status, payment_date, created_at) VALUES
('subpay-001', 'bldg-001', 'plan-003', 150000, 'paid', NOW() - INTERVAL '30 days', NOW()),
('subpay-002', 'bldg-002', 'plan-002', 50000, 'paid', NOW() - INTERVAL '45 days', NOW());

-- Waitlist Leads
INSERT INTO waitlist_leads (id, email, phone, full_name, interested_property_type, status, created_at) VALUES
('waitlist-001', 'newresident@example.com', '+251966666666', 'New Resident', 'Residential', 'pending', NOW()),
('waitlist-002', 'businessman@example.com', '+251977777777', 'Business Person', 'Office', 'contacted', NOW());
