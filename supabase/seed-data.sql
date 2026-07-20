-- Seed data matching actual database schema

-- Buildings (correct schema: id, name, location, total_units, occupied_units, open_maintenance_tickets, monthly_revenue, image_url, owner_id, created_at, updated_at)
INSERT INTO buildings (id, name, location, total_units, occupied_units, open_maintenance_tickets, monthly_revenue, created_at)
VALUES
('bldg-001', 'Abuki Building', 'Addis Ababa', 12, 8, 2, 180000.00, NOW()),
('bldg-002', 'Sky Tower Residences', 'Addis Ababa', 20, 15, 1, 300000.00, NOW()),
('bldg-003', 'Tech Hub Office', 'Addis Ababa', 8, 6, 0, 112000.00, NOW());

-- Properties (correct schema: id, building_id, room_number, floor, square_footage, occupancy_status, lease_status, lease_start_date, lease_end_date, listing_type, base_rent, pricing_mode, is_auction, current_bid, auction_start_time, auction_end_time, created_at)
INSERT INTO properties (id, building_id, room_number, floor, square_footage, occupancy_status, lease_status, listing_type, base_rent, is_auction, current_bid, auction_end_time, created_at)
VALUES
('prop-001', 'bldg-001', '310', '3', 45.5, 'Vacant', NULL, 'standard', 15000.00, false, NULL, NULL, NOW()),
('prop-002', 'bldg-001', '315', '3', 35.0, 'Vacant', NULL, 'standard', 12000.00, false, NULL, NULL, NOW()),
('prop-003', 'bldg-002', '501', '5', 55.0, 'Vacant', NULL, 'auction', 20000.00, true, 18500.00, NOW() + INTERVAL '7 days', NOW()),
('prop-004', 'bldg-003', '201', '2', 40.0, 'Occupied', 'active', 'standard', 14000.00, false, NULL, NULL, NOW()),
('prop-005', 'bldg-002', '505', '5', 60.0, 'Vacant', NULL, 'standard', 22000.00, false, NULL, NULL, NOW()),
('prop-006', 'bldg-001', '210', '2', 50.0, 'Occupied', 'active', 'standard', 16000.00, false, NULL, NULL, NOW());

-- User Profiles (correct schema: id, full_name, email, phone, role, telegram_handle, profile_picture_url, created_at)
INSERT INTO user_profiles (id, full_name, email, phone, role, created_at)
VALUES
('user-001', 'Getachew Temesgen', 'getachew@example.com', '+251911234567', 'tenant', NOW()),
('user-002', 'Alemu Tadesse', 'alemu@example.com', '+251922345678', 'building-owner', NOW()),
('user-003', 'Selam Bekele', 'selam@example.com', '+251933456789', 'system-admin', NOW()),
('user-004', 'Sara Ahmed', 'sara@example.com', '+251944567890', 'tenant', NOW()),
('user-005', 'Abebe Wolde', 'abebe@example.com', '+251955678901', 'building-owner', NOW());

-- Tenants (correct schema: id, user_id, building_id, full_name, email, phone, emergency_contact, tenant_status, created_at)
INSERT INTO tenants (id, user_id, building_id, full_name, email, phone, tenant_status, created_at)
VALUES
('tenant-001', 'user-001', 'bldg-001', 'Getachew Temesgen', 'getachew@example.com', '+251911234567', 'active', NOW()),
('tenant-002', 'user-004', 'bldg-001', 'Sara Ahmed', 'sara@example.com', '+251944567890', 'active', NOW());

-- Leases (correct schema: id, tenant_id, property_id, building_id, start_date, end_date, monthly_rent, security_deposit, lease_status, created_at)
INSERT INTO leases (id, tenant_id, property_id, building_id, start_date, end_date, monthly_rent, security_deposit, lease_status, created_at)
VALUES
('lease-001', 'tenant-001', 'prop-001', 'bldg-001', NOW() - INTERVAL '3 months', NOW() + INTERVAL '9 months', 15000.00, 30000.00, 'active', NOW()),
('lease-002', 'tenant-002', 'prop-006', 'bldg-001', NOW() - INTERVAL '6 months', NOW() + INTERVAL '6 months', 16000.00, 32000.00, 'active', NOW());

-- Invoices (correct schema: id, lease_id, building_id, tenant_id, amount_due, amount_paid, due_date, payment_date, invoice_status, created_at)
INSERT INTO invoices (id, lease_id, building_id, tenant_id, amount_due, amount_paid, due_date, payment_date, invoice_status, created_at)
VALUES
('inv-001', 'lease-001', 'bldg-001', 'tenant-001', 15000.00, 15000.00, NOW() - INTERVAL '10 days', NOW() - INTERVAL '20 days', 'paid', NOW() - INTERVAL '20 days'),
('inv-002', 'lease-001', 'bldg-001', 'tenant-001', 15000.00, 0.00, NOW() + INTERVAL '5 days', NULL, 'pending', NOW()),
('inv-003', 'lease-002', 'bldg-001', 'tenant-002', 16000.00, 16000.00, NOW() - INTERVAL '5 days', NOW() - INTERVAL '15 days', 'paid', NOW() - INTERVAL '15 days'),
('inv-004', 'lease-002', 'bldg-001', 'tenant-002', 16000.00, 8000.00, NOW() + INTERVAL '10 days', NULL, 'partial', NOW());

-- Receipts (correct schema: id, invoice_id, tenant_id, amount, payment_method, transaction_reference, receipt_status, created_at)
INSERT INTO receipts (id, invoice_id, tenant_id, amount, payment_method, transaction_reference, receipt_status, created_at)
VALUES
('recv-001', 'inv-001', 'tenant-001', 15000.00, 'bank_transfer', 'TRX-2024-001', 'completed', NOW() - INTERVAL '20 days'),
('recv-003', 'inv-003', 'tenant-002', 16000.00, 'bank_transfer', 'TRX-2024-002', 'completed', NOW() - INTERVAL '15 days');

-- Maintenance Tickets (correct schema: id, building_id, property_id, tenant_id, title, description, ticket_status, priority, created_at, updated_at)
INSERT INTO maintenance_tickets (id, building_id, property_id, tenant_id, title, description, ticket_status, priority, created_at)
VALUES
('maint-001', 'bldg-001', 'prop-001', 'tenant-001', 'Door Lock Repair', 'Main entrance door lock not working properly', 'open', 'high', NOW() - INTERVAL '2 days'),
('maint-002', 'bldg-001', 'prop-002', 'bldg-001', 'AC Maintenance', 'Air conditioner needs servicing and cleaning', 'in_progress', 'medium', NOW() - INTERVAL '1 day'),
('maint-003', 'bldg-002', 'prop-005', 'bldg-002', 'Plumbing Issue', 'Water leakage from bathroom ceiling', 'open', 'high', NOW()),
('maint-004', 'bldg-003', 'prop-004', 'tenant-002', 'Electrical Check', 'Outlet not working in room 201', 'resolved', 'low', NOW() - INTERVAL '3 days');

-- Marketplace Listings (correct schema: id, building_id, property_id, space_type, title, description, price, size_sqm, amenities, location, images_urls, is_auction, current_bid, auction_start_time, auction_end_time, views_count, created_at)
INSERT INTO marketplace_listings (id, building_id, property_id, space_type, title, description, price, size_sqm, amenities, location, is_auction, current_bid, auction_end_time, created_at)
VALUES
('list-001', 'bldg-001', 'prop-001', 'Office', 'Modern Office Room 310', 'Spacious office room on floor 3 with natural lighting and power backup', 15000.00, 45.5, ARRAY['WiFi', '24/7 Security', 'Elevator', 'Generator'], 'Addis Ababa', false, NULL, NULL, NOW()),
('list-002', 'bldg-002', 'prop-003', 'Office', 'Premium Residential Suite 501', 'Luxury suite with balcony and premium finishes in Sky Tower', 20000.00, 55.0, ARRAY['WiFi', 'Gym', 'Pool', 'Parking', 'Elevator'], 'Addis Ababa', true, 18500.00, NOW() + INTERVAL '7 days', NOW()),
('list-003', 'bldg-003', 'prop-004', 'Co-working', 'Tech Coworking Space 201', 'Prime coworking space with conference rooms and high-speed internet', 14000.00, 40.0, ARRAY['WiFi', 'Conference Rooms', 'Printer', 'Security'], 'Addis Ababa', false, NULL, NULL, NOW()),
('list-004', 'bldg-001', 'prop-002', 'Office', 'Professional Office 315', 'Well-maintained office space with natural lighting', 12000.00, 35.0, ARRAY['WiFi', 'Security', 'Water Supply', 'Elevator'], 'Addis Ababa', false, NULL, NULL, NOW()),
('list-005', 'bldg-002', 'prop-005', 'Office', 'Premium Office Suite 505', 'Large corner office with excellent natural lighting', 22000.00, 60.0, ARRAY['WiFi', 'AC', 'Parking', 'Security', 'Elevator'], 'Addis Ababa', false, NULL, NULL, NOW());

-- Bids (correct schema: id, listing_id, bidder_id, bid_amount, bid_time, created_at)
INSERT INTO bids (id, listing_id, bidder_id, bid_amount, bid_time, created_at)
VALUES
('bid-001', 'list-002', 'user-002', 18500.00, NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 hour'),
('bid-002', 'list-002', 'user-005', 19000.00, NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 minutes'),
('bid-003', 'list-002', 'user-002', 19500.00, NOW(), NOW());

-- Waitlist Leads (correct schema: id, email, phone, full_name, interested_property_type, lead_status, created_at)
INSERT INTO waitlist_leads (id, email, phone, full_name, interested_property_type, lead_status, created_at)
VALUES
('lead-001', 'interested1@example.com', '+251911111111', 'John Doe', 'Office Space', 'pending', NOW() - INTERVAL '5 days'),
('lead-002', 'interested2@example.com', '+251922222222', 'Jane Smith', 'Residential', 'contacted', NOW() - INTERVAL '2 days'),
('lead-003', 'interested3@example.com', '+251933333333', 'Mike Johnson', 'Coworking', 'pending', NOW());

-- Subscription Plans (correct schema: id, name, description, price, duration_months, created_at)
INSERT INTO subscription_plans (id, name, description, price, duration_months, created_at)
VALUES
('plan-001', 'Basic', 'Perfect for individual owners', 5000.00, 1, NOW()),
('plan-002', 'Professional', 'For small property management teams', 12000.00, 3, NOW()),
('plan-003', 'Enterprise', 'Complete solution for large portfolios', 25000.00, 6, NOW());

-- Subscription Payments (correct schema: id, building_id, plan_id, subscription_amount, payment_date, payment_status, created_at)
INSERT INTO subscription_payments (id, building_id, plan_id, subscription_amount, payment_date, payment_status, created_at)
VALUES
('subpay-001', 'bldg-001', 'plan-002', 12000.00, NOW() - INTERVAL '10 days', 'paid', NOW() - INTERVAL '10 days'),
('subpay-002', 'bldg-002', 'plan-002', 12000.00, NOW(), 'pending', NOW());
