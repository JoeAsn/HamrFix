-- Hamrfix development/test seed data
-- Run schema.sql first.
-- Run with:
-- psql -h localhost -U hamrfix_user -d hamrfix_mock -f database/seed.sql
--
-- Fictional data only. password_hash values are placeholders and cannot
-- be used to authenticate. Replace with real hashes if testing login.

BEGIN;

-- 1. Locations
INSERT INTO locations (name)
VALUES
    ('Bole'),
    ('Megenagna'),
    ('Piazza'),
    ('Kazanchis'),
    ('CMC'),
    ('Ayat'),
    ('Sar Bet'),
    ('Mexico'),
    ('Lideta'),
    ('Gerji')
ON CONFLICT (name) DO NOTHING;

-- 2. Categories (matching the six frontend categories)
INSERT INTO categories (name)
VALUES
    ('Plumbing'),
    ('Electrical'),
    ('Carpentry'),
    ('Appliances'),
    ('Painting'),
    ('Cleaning')
ON CONFLICT (name) DO NOTHING;

-- 3. Services: three per category
INSERT INTO services (category_id, name, details)
SELECT c.id, v.name, v.details
FROM (
    VALUES
        ('Plumbing', 'Pipe Repair', 'Repairing damaged and leaking water pipes'),
        ('Plumbing', 'Leak Detection', 'Identifying and fixing water leaks'),
        ('Plumbing', 'Water Tank Installation', 'Installing and maintaining water tanks'),
        ('Electrical', 'Electrical Wiring', 'Residential electrical wiring and installation'),
        ('Electrical', 'Electrical Repair', 'Diagnosing and repairing electrical faults'),
        ('Electrical', 'Lighting Installation', 'Installing indoor and outdoor lighting'),
        ('Carpentry', 'Furniture Making', 'Custom furniture design and construction'),
        ('Carpentry', 'Door Repair', 'Repairing and installing doors'),
        ('Carpentry', 'Cabinet Installation', 'Kitchen and storage cabinet installation'),
        ('Appliances', 'Refrigerator Repair', 'Repairing domestic refrigerators'),
        ('Appliances', 'Washing Machine Repair', 'Repairing washing machines'),
        ('Appliances', 'Oven Installation', 'Installing and maintaining ovens'),
        ('Painting', 'Interior Painting', 'Painting interior walls and ceilings'),
        ('Painting', 'Exterior Painting', 'Exterior building painting'),
        ('Painting', 'Wall Finishing', 'Wall preparation and finishing'),
        ('Cleaning', 'Home Deep Cleaning', 'Detailed residential cleaning'),
        ('Cleaning', 'Sofa and Carpet Cleaning', 'Cleaning upholstery and carpets'),
        ('Cleaning', 'Post-Construction Cleaning', 'Cleaning after construction or renovation')
) AS v(category_name, name, details)
JOIN categories c ON c.name = v.category_name
ON CONFLICT (category_id, name) DO NOTHING;

-- 4. Users: 15 professionals and 5 residents.
-- The password_hash values are mock placeholders, not valid password hashes.
INSERT INTO users (name, email, password_hash, phone, photo, location_id)
VALUES
    ('Abebe Kebede', 'abebe@example.com', 'mock_hash_001', '0911000001', NULL, (SELECT id FROM locations WHERE name = 'Bole')),
    ('Dawit Alemu', 'dawit@example.com', 'mock_hash_002', '0911000002', NULL, (SELECT id FROM locations WHERE name = 'Megenagna')),
    ('Hana Tesfaye', 'hana@example.com', 'mock_hash_003', '0911000003', NULL, (SELECT id FROM locations WHERE name = 'Piazza')),
    ('Mekdes Girma', 'mekdes@example.com', 'mock_hash_004', '0911000004', NULL, (SELECT id FROM locations WHERE name = 'Kazanchis')),
    ('Samuel Bekele', 'samuel@example.com', 'mock_hash_005', '0911000005', NULL, (SELECT id FROM locations WHERE name = 'CMC')),
    ('Yonas Tadesse', 'yonas@example.com', 'mock_hash_006', '0911000006', NULL, (SELECT id FROM locations WHERE name = 'Ayat')),
    ('Meron Worku', 'meron@example.com', 'mock_hash_007', '0911000007', NULL, (SELECT id FROM locations WHERE name = 'Sar Bet')),
    ('Fitsum Haile', 'fitsum@example.com', 'mock_hash_008', '0911000008', NULL, (SELECT id FROM locations WHERE name = 'Mexico')),
    ('Betelhem Assefa', 'betelhem@example.com', 'mock_hash_009', '0911000009', NULL, (SELECT id FROM locations WHERE name = 'Lideta')),
    ('Henok Solomon', 'henok@example.com', 'mock_hash_010', '0911000010', NULL, (SELECT id FROM locations WHERE name = 'Gerji')),
    ('Rahel Getachew', 'rahel@example.com', 'mock_hash_011', '0911000011', NULL, (SELECT id FROM locations WHERE name = 'Bole')),
    ('Kebede Mulu', 'kebede@example.com', 'mock_hash_012', '0911000012', NULL, (SELECT id FROM locations WHERE name = 'Megenagna')),
    ('Elias Worku', 'elias@example.com', 'mock_hash_013', '0911000013', NULL, (SELECT id FROM locations WHERE name = 'Piazza')),
    ('Selamawit Fikru', 'selam@example.com', 'mock_hash_014', '0911000014', NULL, (SELECT id FROM locations WHERE name = 'Kazanchis')),
    ('Biruk Assefa', 'biruk@example.com', 'mock_hash_015', '0911000015', NULL, (SELECT id FROM locations WHERE name = 'CMC')),
    ('Mihret Abebe', 'mihret@example.com', 'mock_hash_016', '0911000016', NULL, (SELECT id FROM locations WHERE name = 'Bole')),
    ('Daniel Girma', 'daniel@example.com', 'mock_hash_017', '0911000017', NULL, (SELECT id FROM locations WHERE name = 'Ayat')),
    ('Eden Tadesse', 'eden@example.com', 'mock_hash_018', '0911000018', NULL, (SELECT id FROM locations WHERE name = 'Gerji')),
    ('Nahom Kebede', 'nahom@example.com', 'mock_hash_019', '0911000019', NULL, (SELECT id FROM locations WHERE name = 'Piazza')),
    ('Saron Bekele', 'saron@example.com', 'mock_hash_020', '0911000020', NULL, (SELECT id FROM locations WHERE name = 'Sar Bet'))
ON CONFLICT DO NOTHING;

-- 5. Professional profiles: 12 published and 3 draft.
INSERT INTO professional_profiles
    (user_id, profession, overview, professional_photo, contact_phone, telegram, status)
SELECT
    u.id, v.profession, v.overview, NULL, u.phone, v.telegram, v.status
FROM (
    VALUES
        ('abebe@example.com', 'Plumber', 'Experienced in residential pipe repair and water systems.', '@abebe_plumbing', 'published'),
        ('dawit@example.com', 'Electrician', 'Residential wiring, electrical troubleshooting and installation.', '@dawit_electric', 'published'),
        ('hana@example.com', 'Carpenter', 'Custom furniture, doors and cabinet construction.', '@hana_carpentry', 'published'),
        ('mekdes@example.com', 'Appliance Technician', 'Specialized in refrigerator and washing machine repairs.', '@mekdes_appliances', 'published'),
        ('samuel@example.com', 'Painter', 'Interior and exterior painting services.', '@samuel_painting', 'published'),
        ('yonas@example.com', 'Cleaning Specialist', 'Professional home and office cleaning.', '@yonas_cleaning', 'published'),
        ('meron@example.com', 'Plumber', 'Water tank installation and leak detection.', '@meron_plumbing', 'published'),
        ('fitsum@example.com', 'Electrician', 'Electrical installation and lighting solutions.', '@fitsum_electric', 'published'),
        ('betelhem@example.com', 'Carpenter', 'Furniture restoration and cabinet installation.', '@betelhem_carpentry', 'published'),
        ('henok@example.com', 'Appliance Technician', 'Domestic appliance troubleshooting and repair.', '@henok_repair', 'published'),
        ('rahel@example.com', 'Painter', 'Professional wall finishing and residential painting.', '@rahel_painting', 'published'),
        ('kebede@example.com', 'Cleaning Specialist', 'Deep cleaning and post-construction cleaning.', '@kebede_cleaning', 'published'),
        ('elias@example.com', 'Plumber', 'Residential plumbing and water system maintenance.', '@elias_plumbing', 'draft'),
        ('selam@example.com', 'Electrician', 'Electrical repair and installation.', '@selam_electric', 'draft'),
        ('biruk@example.com', 'Carpenter', 'Custom furniture and home improvement.', '@biruk_carpentry', 'draft')
) AS v(email, profession, overview, telegram, status)
JOIN users u ON u.email = v.email
ON CONFLICT (user_id) DO UPDATE SET
    profession = EXCLUDED.profession,
    overview = EXCLUDED.overview,
    professional_photo = EXCLUDED.professional_photo,
    contact_phone = EXCLUDED.contact_phone,
    telegram = EXCLUDED.telegram,
    status = EXCLUDED.status;

-- 6. Professional service areas.
-- Every seeded professional has one primary area and at most three areas.
INSERT INTO professional_service_areas (professional_id, location_id, is_primary)
SELECT u.id, l.id, v.is_primary
FROM (
    VALUES
        ('abebe@example.com', 'Bole', TRUE),
        ('abebe@example.com', 'Gerji', FALSE),
        ('dawit@example.com', 'Megenagna', TRUE),
        ('dawit@example.com', 'CMC', FALSE),
        ('hana@example.com', 'Piazza', TRUE),
        ('hana@example.com', 'Lideta', FALSE),
        ('mekdes@example.com', 'Kazanchis', TRUE),
        ('samuel@example.com', 'CMC', TRUE),
        ('samuel@example.com', 'Ayat', FALSE),
        ('samuel@example.com', 'Gerji', FALSE),
        ('yonas@example.com', 'Ayat', TRUE),
        ('yonas@example.com', 'Megenagna', FALSE),
        ('meron@example.com', 'Sar Bet', TRUE),
        ('meron@example.com', 'Bole', FALSE),
        ('fitsum@example.com', 'Mexico', TRUE),
        ('fitsum@example.com', 'Piazza', FALSE),
        ('betelhem@example.com', 'Lideta', TRUE),
        ('henok@example.com', 'Gerji', TRUE),
        ('henok@example.com', 'CMC', FALSE),
        ('rahel@example.com', 'Bole', TRUE),
        ('rahel@example.com', 'Kazanchis', FALSE),
        ('kebede@example.com', 'Megenagna', TRUE),
        ('kebede@example.com', 'Ayat', FALSE),
        ('elias@example.com', 'Piazza', TRUE),
        ('selam@example.com', 'Kazanchis', TRUE),
        ('biruk@example.com', 'CMC', TRUE)
) AS v(email, location_name, is_primary)
JOIN users u ON u.email = v.email
JOIN locations l ON l.name = v.location_name
ON CONFLICT (professional_id, location_id)
DO UPDATE SET is_primary = EXCLUDED.is_primary;

-- 7. Professional-service relationships.
INSERT INTO professional_services (professional_id, service_id)
SELECT u.id, s.id
FROM (
    VALUES
        ('abebe@example.com', 'Plumbing', 'Pipe Repair'),
        ('abebe@example.com', 'Plumbing', 'Leak Detection'),
        ('dawit@example.com', 'Electrical', 'Electrical Wiring'),
        ('dawit@example.com', 'Electrical', 'Lighting Installation'),
        ('hana@example.com', 'Carpentry', 'Furniture Making'),
        ('hana@example.com', 'Carpentry', 'Cabinet Installation'),
        ('mekdes@example.com', 'Appliances', 'Refrigerator Repair'),
        ('mekdes@example.com', 'Appliances', 'Washing Machine Repair'),
        ('samuel@example.com', 'Painting', 'Interior Painting'),
        ('samuel@example.com', 'Painting', 'Exterior Painting'),
        ('yonas@example.com', 'Cleaning', 'Home Deep Cleaning'),
        ('yonas@example.com', 'Cleaning', 'Sofa and Carpet Cleaning'),
        ('meron@example.com', 'Plumbing', 'Leak Detection'),
        ('meron@example.com', 'Plumbing', 'Water Tank Installation'),
        ('fitsum@example.com', 'Electrical', 'Electrical Repair'),
        ('fitsum@example.com', 'Electrical', 'Lighting Installation'),
        ('betelhem@example.com', 'Carpentry', 'Door Repair'),
        ('betelhem@example.com', 'Carpentry', 'Cabinet Installation'),
        ('henok@example.com', 'Appliances', 'Refrigerator Repair'),
        ('henok@example.com', 'Appliances', 'Oven Installation'),
        ('rahel@example.com', 'Painting', 'Interior Painting'),
        ('rahel@example.com', 'Painting', 'Wall Finishing'),
        ('kebede@example.com', 'Cleaning', 'Home Deep Cleaning'),
        ('kebede@example.com', 'Cleaning', 'Post-Construction Cleaning'),
        ('elias@example.com', 'Plumbing', 'Pipe Repair'),
        ('elias@example.com', 'Plumbing', 'Water Tank Installation'),
        ('selam@example.com', 'Electrical', 'Electrical Wiring'),
        ('selam@example.com', 'Electrical', 'Electrical Repair'),
        ('biruk@example.com', 'Carpentry', 'Furniture Making'),
        ('biruk@example.com', 'Carpentry', 'Door Repair')
) AS v(email, category_name, service_name)
JOIN users u ON u.email = v.email
JOIN categories c ON c.name = v.category_name
JOIN services s ON s.category_id = c.id AND s.name = v.service_name
ON CONFLICT (professional_id, service_id) DO NOTHING;

COMMIT;

-- Expected counts on a fresh database:
SELECT 'locations' AS table_name, COUNT(*) AS row_count FROM locations
UNION ALL SELECT 'categories', COUNT(*) FROM categories
UNION ALL SELECT 'services', COUNT(*) FROM services
UNION ALL SELECT 'users', COUNT(*) FROM users
UNION ALL SELECT 'professional_profiles', COUNT(*) FROM professional_profiles
UNION ALL SELECT 'professional_service_areas', COUNT(*) FROM professional_service_areas
UNION ALL SELECT 'professional_services', COUNT(*) FROM professional_services
ORDER BY table_name;
