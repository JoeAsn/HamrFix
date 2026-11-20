# Hamrfix database design

## 1. Project Introduction

Hamrfix helps residents find home repair professionals in Addis Ababa. Every account can use resident features. A user may also create a professional profile using the same account; the two functions are not exclusive roles.

## 2. Database Design Objectives

- Store account, location, category, and service information clearly.
- Let a user have no professional profile or one professional profile.
- Connect professionals to multiple services and locations without storing lists in a single field.
- Keep required data and relationships consistent.

## 3. Database Architecture Overview

The design has seven tables: `users`, `locations`, `professional_profiles`, `categories`, `services`, `professional_services`, and `professional_service_areas`. The last two tables connect professional profiles to services and locations.

## 4. Entity Relationship Diagram (ERD)

The project includes a visual ER diagram created for this design: [View the ER diagram image](ER_diagram/ER-diagram.png).

The Mermaid diagram below shows the same seven-table structure and its relationships.

```mermaid
erDiagram
    LOCATIONS ||--o{ USERS : "residential location"
    USERS ||--o| PROFESSIONAL_PROFILES : "may create"
    CATEGORIES ||--o{ SERVICES : "contains"
    PROFESSIONAL_PROFILES ||--o{ PROFESSIONAL_SERVICES : "offers"
    SERVICES ||--o{ PROFESSIONAL_SERVICES : "offered by"
    PROFESSIONAL_PROFILES ||--o{ PROFESSIONAL_SERVICE_AREAS : "serves"
    LOCATIONS ||--o{ PROFESSIONAL_SERVICE_AREAS : "served location"

    USERS {
        BIGINT id PK
        VARCHAR name "NOT NULL"
        VARCHAR email UK "NOT NULL"
        TEXT password_hash "NOT NULL"
        VARCHAR phone "OPTIONAL"
        TEXT photo "OPTIONAL"
        BIGINT location_id FK "NOT NULL"
    }
    PROFESSIONAL_PROFILES {
        BIGINT user_id PK, FK
        VARCHAR profession "NOT NULL"
        TEXT overview "NOT NULL"
        TEXT professional_photo "OPTIONAL"
        VARCHAR contact_phone "NOT NULL"
        VARCHAR telegram "OPTIONAL"
        VARCHAR_20 status "NOT NULL DEFAULT 'draft'"
    }
    LOCATIONS {
        BIGINT id PK
        VARCHAR name UK "NOT NULL"
    }
    CATEGORIES {
        BIGINT id PK
        VARCHAR name UK "NOT NULL"
    }
    SERVICES {
        BIGINT id PK
        BIGINT category_id FK "NOT NULL"
        VARCHAR name "NOT NULL"
        TEXT details "OPTIONAL"
        "UNIQUE (category_id, name)"
    }
    PROFESSIONAL_SERVICES {
        BIGINT professional_id PK, FK
        BIGINT service_id PK, FK
    }
    PROFESSIONAL_SERVICE_AREAS {
        BIGINT professional_id PK, FK
        BIGINT location_id PK, FK
        BOOLEAN is_primary "NOT NULL"
    }
```

`USERS ||--o| PROFESSIONAL_PROFILES` means each user may have zero or one professional profile. A profile always belongs to one existing user.

## 5. Entity and Table Specifications

| Table | What it stores | Main fields |
| --- | --- | --- |
| `users` | Account and resident information | `id` (primary key), `name`, `email` (unique), `password_hash`, optional `phone`, optional `photo`, required `location_id` |
| `professional_profiles` | Optional professional information | `user_id` (primary key and foreign key), `profession`, `overview`, optional `professional_photo`, required `contact_phone`, optional `telegram`, `status VARCHAR(20)` (required; defaults to `draft`; only `draft` or `published`) |
| `locations` | Addis Ababa subcities and other supported locations | `id` (primary key), `name` (unique) |
| `categories` | Main service categories | `id` (primary key), `name` (unique) |
| `services` | Services within categories | `id` (primary key), `category_id`, `name` (unique within its category), optional `details` |
| `professional_services` | Services offered by each professional | `professional_id`, `service_id` (together form the primary key) |
| `professional_service_areas` | Locations served by each professional | `professional_id`, `location_id` (together form the primary key), `is_primary` |

The six categories used by the current project are Plumbing, Electrical, Carpentry, Appliances, Painting, and Cleaning. A service name must be unique within its category. In the Mermaid diagram, `VARCHAR_20` means `VARCHAR(20)`.

## 6. Relationship Cardinalities and Explanations

| Relationship | Cardinality | Meaning |
| --- | --- | --- |
| Locations → Users | One to many | Each user has one residential location; a location can have many users. |
| Users → Professional profiles | One to zero or one | A user may choose not to create a professional profile. |
| Categories → Services | One to many | A service belongs to one category; a category can have many services. |
| Professional profiles → Professional services | One to many | A professional can offer multiple services. |
| Services → Professional services | One to many | A service can be offered by multiple professionals. |
| Professional profiles → Professional service areas | One to many | A professional can serve multiple locations. |
| Locations → Professional service areas | One to many | A location can be served by multiple professionals. |

## 7. Primary Keys and Foreign Keys

- Each main table uses `id` as its primary key, except `professional_profiles`, which uses `user_id` as both primary and foreign key.
- `users.location_id` references `locations.id`.
- `services.category_id` references `categories.id`.
- `services` has a unique constraint on `(category_id, name)`.
- `professional_services` references professional profiles and services.
- `professional_service_areas` references professional profiles and locations.
- The two junction tables use both foreign keys together as their primary key, preventing duplicate assignments.

The service uniqueness and profile status rules can be represented in SQL as follows:

```sql
ALTER TABLE services
    ADD CONSTRAINT services_category_name_unique UNIQUE (category_id, name);

ALTER TABLE professional_profiles
    ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'draft'
    CONSTRAINT professional_profiles_status_check
    CHECK (status IN ('draft', 'published'));
```

## 8. Database Normalization (1NF, 2NF, 3NF)

- **1NF:** Each field stores one value. Services and locations are assigned with separate junction-table rows, not comma-separated lists.
- **2NF:** In each junction table, the assignment depends on the full pair of IDs. Service and location details stay in their own tables.
- **3NF:** Categories, services, locations, account details, and professional details are stored separately to avoid repeating the same information.

## 9. Business Rules and Constraints

**Required:** user name, email, and password hash. A resident phone is optional. A professional profile requires occupation, overview, and public contact phone. Publishing requires at least one service and one service area, with exactly one primary area.

**Optional:** resident photo, professional photo, Telegram username, and secondary service areas. A professional can select up to two secondary areas, for a maximum of three areas total.

New professional profiles start with status `draft`. Only `draft` and `published` are valid statuses. Draft profiles are not shown in public search. Publishing requires the mandatory profile details and associations above.

The database can enforce required fields, unique values, valid references, and no duplicate assignments. This index allows at most one primary area per professional:

```sql
CREATE UNIQUE INDEX one_primary_area_per_professional
ON professional_service_areas (professional_id)
WHERE is_primary = TRUE;
```

The index cannot require at least one primary area or limit the total areas to three. The frontend and backend are responsible for validating the one-to-three area rule and exactly one primary area during profile editing and publication.

## 10. Data Integrity and Referential Integrity

Primary keys identify rows and foreign keys require referenced rows to exist. Unique constraints prevent duplicate emails, category/location names, and duplicate service names within a category. The junction-table primary keys prevent duplicate service and location assignments. The frontend and backend handle rules involving multiple rows, such as service and area counts.

### Delete behavior

- Deleting a user deletes their professional profile. Deleting that profile deletes its service and area assignments (`ON DELETE CASCADE`).
- A location cannot be deleted while users or professional area assignments refer to it (`ON DELETE RESTRICT`).
- A category cannot be deleted while it has services, and a service cannot be deleted while professionals offer it (`ON DELETE RESTRICT`).

These choices prevent accidental loss of catalog data or resident locations. Remove or reassign dependent rows deliberately before deleting a location, category, or service.

## 11. Professional Registration and Profile Completion Workflow

1. Registration creates a user with resident functionality. Phone is optional at this stage.
2. A user who wants to offer services creates a professional profile under the same account.
3. The user adds required profile details, at least one service, and one to three service areas.
4. The backend checks that exactly one area is primary before publishing the profile.

Professional profiles start with status `draft`. Incomplete drafts must not appear in public search. A profile becomes `published` only after completion checks pass.

## 12. Transaction Management Considerations

Save profile changes, service assignments, and area assignments together in a database transaction. This lets the backend check the complete profile before publishing it and prevents simultaneous edits from exceeding the three-area limit.

## 13. Backend Validation Requirements

The frontend and backend should check that a profile has the required details, at least one service, one to three distinct service areas, and exactly one primary area before publication. Keep drafts out of search results. Perform these checks as part of the transaction that saves the changes.

## 14. Search and Filtering Considerations

Search can filter professionals by service, category, and service area by joining the profile, service, category, and location tables. Only profiles with status `published` should appear.

## 15. Future Expansion Considerations

New locations, categories, and services can be added as rows in their existing tables. Features such as bookings, payments, and reviews are outside this design and would need separate planning.

## 16. Final Architecture Summary

Hamrfix uses seven relational tables. Every user has resident functionality and may optionally create one professional profile. Junction tables connect profiles to services and locations. The database protects keys and references; the backend checks profile completion and publication rules.
