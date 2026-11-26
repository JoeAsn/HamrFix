-- Hamrfix database schema
-- Run this before seed.sql:
-- psql -h localhost -U hamrfix_user -d hamrfix_mock -f database/schema.sql

BEGIN;

CREATE TABLE IF NOT EXISTS locations (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(30),
    photo TEXT,
    location_id BIGINT,

    CONSTRAINT fk_users_location
        FOREIGN KEY (location_id)
        REFERENCES locations(id)
        ON DELETE RESTRICT
);

-- Enforce case-insensitive email uniqueness.
CREATE UNIQUE INDEX IF NOT EXISTS uq_users_email_lower
    ON users (LOWER(email));

CREATE TABLE IF NOT EXISTS professional_profiles (
    user_id BIGINT PRIMARY KEY,
    profession VARCHAR(150) NOT NULL,
    overview TEXT,
    professional_photo TEXT,
    contact_phone VARCHAR(30) NOT NULL,
    telegram VARCHAR(100),
    status VARCHAR(20) NOT NULL DEFAULT 'draft',

    CONSTRAINT fk_professional_profiles_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT chk_professional_profiles_status
        CHECK (status IN ('draft', 'published'))
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS services (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_id BIGINT NOT NULL,
    name VARCHAR(100) NOT NULL,
    details TEXT,

    CONSTRAINT fk_services_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT,

    CONSTRAINT uq_services_category_name
        UNIQUE (category_id, name)
);

CREATE TABLE IF NOT EXISTS professional_service_areas (
    professional_id BIGINT NOT NULL,
    location_id BIGINT NOT NULL,
    is_primary BOOLEAN NOT NULL DEFAULT FALSE,

    CONSTRAINT pk_professional_service_areas
        PRIMARY KEY (professional_id, location_id),

    CONSTRAINT fk_service_areas_professional
        FOREIGN KEY (professional_id)
        REFERENCES professional_profiles(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_service_areas_location
        FOREIGN KEY (location_id)
        REFERENCES locations(id)
        ON DELETE RESTRICT
);

-- At most one primary area per professional.
-- The backend must ensure exactly one primary area before publishing.
CREATE UNIQUE INDEX IF NOT EXISTS uq_professional_one_primary_area
    ON professional_service_areas (professional_id)
    WHERE is_primary = TRUE;

CREATE TABLE IF NOT EXISTS professional_services (
    professional_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,

    CONSTRAINT pk_professional_services
        PRIMARY KEY (professional_id, service_id),

    CONSTRAINT fk_professional_services_profile
        FOREIGN KEY (professional_id)
        REFERENCES professional_profiles(user_id)
        ON DELETE CASCADE,

    CONSTRAINT fk_professional_services_service
        FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE RESTRICT
);

-- Index foreign-key columns used for joins and filtering.
CREATE INDEX IF NOT EXISTS idx_users_location_id
    ON users (location_id);

CREATE INDEX IF NOT EXISTS idx_services_category_id
    ON services (category_id);

CREATE INDEX IF NOT EXISTS idx_service_areas_location_id
    ON professional_service_areas (location_id);

CREATE INDEX IF NOT EXISTS idx_professional_services_service_id
    ON professional_services (service_id);

COMMIT;
