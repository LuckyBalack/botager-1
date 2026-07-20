-- Seed data with proper UUID format for all IDs

-- Buildings
INSERT INTO buildings (id, name, location, total_units, occupied_units, open_maintenance_tickets, monthly_revenue, created_at)
VALUES
('550e8400-e29b-41d4-a716-446655440001', 'Abuki Building', 'Addis Ababa', 12, 8, 2, 180000.00, NOW()),
('550e8400-e29b-41d4-a716-446655440002', 'Sky Tower Residences', 'Addis Ababa', 20, 15, 1, 300000.00, NOW()),
('550e8400-e29b-41d4-a716-446655440003', 'Tech Hub Office', 'Addis Ababa', 8, 6, 0, 112000.00, NOW());

-- Properties (Rooms/Units)
INSERT INTO properties (id, building_id, room_number, floor, square_footage, occupancy_status, lease_status, listing_type, base_rent, is_auction, current_bid, auction_end_time, created_at)
VALUES
('550e8400-e29b-41d4-a716-446655550001', '550e8400-e29b-41d4-a716-446655440001', '310', '3', 45.5, 'Vacant', NULL, 'standard', 15000.00, false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446655550002', '550e8400-e29b-41d4-a716-446655440001', '315', '3', 35.0, 'Vacant', NULL, 'standard', 12000.00, false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446655550003', '550e8400-e29b-41d4-a716-446655440002', '501', '5', 55.0, 'Vacant', NULL, 'auction', 20000.00, true, 18500.00, NOW() + INTERVAL '7 days', NOW()),
('550e8400-e29b-41d4-a716-446655550004', '550e8400-e29b-41d4-a716-446655440003', '201', '2', 40.0, 'Occupied', 'active', 'standard', 14000.00, false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446655550005', '550e8400-e29b-41d4-a716-446655440002', '505', '5', 60.0, 'Vacant', NULL, 'standard', 22000.00, false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446655550006', '550e8400-e29b-41d4-a716-446655440001', '210', '2', 50.0, 'Occupied', 'active', 'standard', 16000.00, false, NULL, NULL, NOW());

-- User Profiles
INSERT INTO user_profiles (id, full_name, email, phone, role, created_at)
VALUES
('550e8400-e29b-41d4-a716-446655660001', 'Getachew Temesgen', 'getachew@example.com', '+251911234567', 'tenant', NOW()),
('550e8400-e29b-41d4-a716-446655660002', 'Alemu Tadesse', 'alemu@example.com', '+251922345678', 'building-owner', NOW()),
('550e8400-e29b-41d4-a716-446655660003', 'Selam Bekele', 'selam@example.com', '+251933456789', 'system-admin', NOW()),
('550e8400-e29b-41d4-a716-446655660004', 'Sara Ahmed', 'sara@example.com', '+251944567890', 'tenant', NOW()),
('550e8400-e29b-41d4-a716-446655660005', 'Abebe Wolde', 'abebe@example.com', '+251955678901', 'building-owner', NOW());

-- Tenants
INSERT INTO tenants (id, user_id, building_id, full_name, email, phone, tenant_status, created_at)
VALUES
('550e8400-e29b-41d4-a716-446655770001', '550e8400-e29b-41d4-a716-446655660001', '550e8400-e29b-41d4-a716-446655440001', 'Getachew Temesgen', 'getachew@example.com', '+251911234567', 'active', NOW()),
('550e8400-e29b-41d4-a716-446655770002', '550e8400-e29b-41d4-a716-446655660004', '550e8400-e29b-41d4-a716-446655440001', 'Sara Ahmed', 'sara@example.com', '+251944567890', 'active', NOW());

-- Leases
INSERT INTO leases (id, tenant_id, property_id, building_id, start_date, end_date, monthly_rent, security_deposit, lease_status, created_at)
VALUES
('550e8400-e29b-41d4-a716-446655880001', '550e8400-e29b-41d4-a716-446655770001', '550e8400-e29b-41d4-a716-446655550001', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '3 months', NOW() + INTERVAL '9 months', 15000.00, 30000.00, 'active', NOW()),
('550e8400-e29b-41d4-a716-446655880002', '550e8400-e29b-41d4-a716-446655770002', '550e8400-e29b-41d4-a716-446655550006', '550e8400-e29b-41d4-a716-446655440001', NOW() - INTERVAL '6 months', NOW() + INTERVAL '6 months', 16000.00, 32000.00, 'active', NOW());

-- Invoices
INSERT INTO invoices (id, lease_id, building_id, tenant_id, amount_due, amount_paid, due_date, payment_date, invoice_status, created_at)
VALUES
('550e8400-e29b-41d4-a716-446655990001', '550e8400-e29b-41d4-a716-446655880001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655770001', 15000.00, 15000.00, NOW() - INTERVAL '10 days', NOW() - INTERVAL '20 days', 'paid', NOW() - INTERVAL '20 days'),
('550e8400-e29b-41d4-a716-446655990002', '550e8400-e29b-41d4-a716-446655880001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655770001', 15000.00, 0.00, NOW() + INTERVAL '5 days', NULL, 'pending', NOW()),
('550e8400-e29b-41d4-a716-446655990003', '550e8400-e29b-41d4-a716-446655880002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655770002', 16000.00, 16000.00, NOW() - INTERVAL '5 days', NOW() - INTERVAL '15 days', 'paid', NOW() - INTERVAL '15 days'),
('550e8400-e29b-41d4-a716-446655990004', '550e8400-e29b-41d4-a716-446655880002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655770002', 16000.00, 8000.00, NOW() + INTERVAL '10 days', NULL, 'partial', NOW());

-- Receipts
INSERT INTO receipts (id, invoice_id, tenant_id, amount, payment_method, transaction_reference, receipt_status, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656000001', '550e8400-e29b-41d4-a716-446655990001', '550e8400-e29b-41d4-a716-446655770001', 15000.00, 'bank_transfer', 'TRX-2024-001', 'completed', NOW() - INTERVAL '20 days'),
('550e8400-e29b-41d4-a716-446656000002', '550e8400-e29b-41d4-a716-446655990003', '550e8400-e29b-41d4-a716-446655770002', 16000.00, 'bank_transfer', 'TRX-2024-002', 'completed', NOW() - INTERVAL '15 days');

-- Maintenance Tickets
INSERT INTO maintenance_tickets (id, building_id, property_id, tenant_id, title, description, ticket_status, priority, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656110001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655550001', '550e8400-e29b-41d4-a716-446655770001', 'Door Lock Repair', 'Main entrance door lock not working properly', 'open', 'high', NOW() - INTERVAL '2 days'),
('550e8400-e29b-41d4-a716-446656110002', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655550002', NULL, 'AC Maintenance', 'Air conditioner needs servicing and cleaning', 'in_progress', 'medium', NOW() - INTERVAL '1 day'),
('550e8400-e29b-41d4-a716-446656110003', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655550005', NULL, 'Plumbing Issue', 'Water leakage from bathroom ceiling', 'open', 'high', NOW()),
('550e8400-e29b-41d4-a716-446656110004', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655550004', '550e8400-e29b-41d4-a716-446655770002', 'Electrical Check', 'Outlet not working in room 201', 'resolved', 'low', NOW() - INTERVAL '3 days');

-- Marketplace Listings
INSERT INTO marketplace_listings (id, building_id, property_id, space_type, title, description, price, size_sqm, amenities, location, is_auction, current_bid, auction_end_time, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656220001', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655550001', 'Office', 'Modern Office Room 310', 'Spacious office room on floor 3 with natural lighting and power backup', 15000.00, 45.5, ARRAY['WiFi', '24/7 Security', 'Elevator', 'Generator'], 'Addis Ababa', false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446656220002', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655550003', 'Office', 'Premium Residential Suite 501', 'Luxury suite with balcony and premium finishes in Sky Tower', 20000.00, 55.0, ARRAY['WiFi', 'Gym', 'Pool', 'Parking', 'Elevator'], 'Addis Ababa', true, 18500.00, NOW() + INTERVAL '7 days', NOW()),
('550e8400-e29b-41d4-a716-446656220003', '550e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655550004', 'Co-working', 'Tech Coworking Space 201', 'Prime coworking space with conference rooms and high-speed internet', 14000.00, 40.0, ARRAY['WiFi', 'Conference Rooms', 'Printer', 'Security'], 'Addis Ababa', false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446656220004', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655550002', 'Office', 'Professional Office 315', 'Well-maintained office space with natural lighting', 12000.00, 35.0, ARRAY['WiFi', 'Security', 'Water Supply', 'Elevator'], 'Addis Ababa', false, NULL, NULL, NOW()),
('550e8400-e29b-41d4-a716-446656220005', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655550005', 'Office', 'Premium Office Suite 505', 'Large corner office with excellent natural lighting', 22000.00, 60.0, ARRAY['WiFi', 'AC', 'Parking', 'Security', 'Elevator'], 'Addis Ababa', false, NULL, NULL, NOW());

-- Bids
INSERT INTO bids (id, listing_id, bidder_id, bid_amount, bid_time, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656330001', '550e8400-e29b-41d4-a716-446656220002', '550e8400-e29b-41d4-a716-446655660002', 18500.00, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour'),
('550e8400-e29b-41d4-a716-446656330002', '550e8400-e29b-41d4-a716-446656220002', '550e8400-e29b-41d4-a716-446655660005', 19000.00, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes'),
('550e8400-e29b-41d4-a716-446656330003', '550e8400-e29b-41d4-a716-446656220002', '550e8400-e29b-41d4-a716-446655660002', 19500.00, NOW(), NOW());

-- Waitlist Leads
INSERT INTO waitlist_leads (id, email, phone, full_name, interested_property_type, lead_status, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656440001', 'interested1@example.com', '+251911111111', 'John Doe', 'Office Space', 'pending', NOW() - INTERVAL '5 days'),
('550e8400-e29b-41d4-a716-446656440002', 'interested2@example.com', '+251922222222', 'Jane Smith', 'Residential', 'contacted', NOW() - INTERVAL '2 days'),
('550e8400-e29b-41d4-a716-446656440003', 'interested3@example.com', '+251933333333', 'Mike Johnson', 'Coworking', 'pending', NOW());

-- Subscription Plans
INSERT INTO subscription_plans (id, name, description, price, duration_months, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656550001', 'Basic', 'Perfect for individual owners', 5000.00, 1, NOW()),
('550e8400-e29b-41d4-a716-446656550002', 'Professional', 'For small property management teams', 12000.00, 3, NOW()),
('550e8400-e29b-41d4-a716-446656550003', 'Enterprise', 'Complete solution for large portfolios', 25000.00, 6, NOW());

-- Subscription Payments
INSERT INTO subscription_payments (id, building_id, plan_id, subscription_amount, payment_date, payment_status, created_at)
VALUES
('550e8400-e29b-41d4-a716-446656660011', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446656550002', 12000.00, NOW() - INTERVAL '10 days', 'paid', NOW() - INTERVAL '10 days'),
('550e8400-e29b-41d4-a716-446656660012', '550e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446656550002', 12000.00, NOW(), 'pending', NOW());
