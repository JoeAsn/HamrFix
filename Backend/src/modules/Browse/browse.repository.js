
import pool from "../../config/database.js";

async function browse_professionals(queryValues) {
  const result = await pool.query(
    `
      SELECT u.id, u.name, u.phone AS resident_phone, u.photo AS resident_photo,
        pp.profession, pp.overview AS bio, pp.contact_phone AS phone,
        pp.telegram, pp.professional_photo AS photo
      FROM professional_profiles pp JOIN users u ON u.id = pp.user_id
      WHERE
        -- Professional name filter
        (
          $1::text IS NULL
          OR u.name ILIKE '%' || $1 || '%'
        )

        -- Service filter
        AND (
          $2::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM professional_services ps
            JOIN services s
              ON s.id = ps.service_id
            WHERE ps.professional_id = u.id
              AND (
                s.name ILIKE '%' || $2 || '%'
                OR s.details ILIKE '%' || $2 || '%'
                OR pp.profession ILIKE '%' || $2 || '%'
              )
          )
        )

        -- Category filter
        AND (
          $3::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM professional_services ps
            JOIN services s
              ON s.id = ps.service_id
            JOIN categories c
              ON c.id = s.category_id
            WHERE ps.professional_id = u.id
              AND c.id::text = $3
          )
        )

        -- Location filter
        AND (
          $4::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM professional_service_areas psa
            JOIN locations l ON l.id = psa.location_id
            WHERE psa.professional_id = u.id
              AND l.name = $4
          )
        )

        -- Cursor pagination
        AND (
          $5::bigint IS NULL
          OR u.id < $5
        )

        AND pp.status = 'published'

      ORDER BY u.id DESC
      LIMIT $6;
    `,
    queryValues
  );

  return result.rows;
}
export { browse_professionals };

export async function find_category_by_name(name) {
  const result = await pool.query(
    "SELECT id, name FROM categories WHERE name = $1",
    [name]
  );
  return result.rows[0] ?? null;
}

export async function browse_services(professionals_id) {
  if (!professionals_id.length) return [];
  const result = await pool.query(
    `
      SELECT
        ps.professional_id,
        s.id,
        s.name
      FROM professional_services ps
      JOIN services s
        ON s.id = ps.service_id
      WHERE ps.professional_id = ANY($1::integer[]);
    `,
    [professionals_id]
  );

  return result.rows;
}

export async function browse_locations(professionals_id) {
  if (!professionals_id.length) return [];
  const result = await pool.query(
    `
      SELECT
        psa.professional_id,
        l.name,
        psa.is_primary
      FROM professional_service_areas psa
      JOIN locations l
        ON l.id = psa.location_id
      WHERE psa.professional_id = ANY($1::integer[])
      ORDER BY psa.is_primary DESC;
    `,
    [professionals_id]
  );

  return result.rows;
}

export async function get_professional(id) {
  const result = await pool.query(
     `SELECT u.id, u.name, u.phone AS resident_phone, u.photo AS resident_photo,
            pp.profession, pp.overview AS bio, pp.contact_phone AS phone, pp.telegram,
            pp.professional_photo AS photo
     FROM professional_profiles pp JOIN users u ON u.id = pp.user_id
     WHERE u.id = $1 AND pp.status = 'published'`,
    [id],
  );
  if (!result.rows[0]) return null;
  const professional = result.rows[0];
  const services = await pool.query(
    `SELECT s.id, s.name, s.details AS description FROM professional_services ps
     JOIN services s ON s.id = ps.service_id WHERE ps.professional_id = $1`,
    [id],
  );
  const areas = await pool.query(
    `SELECT l.name, psa.is_primary FROM professional_service_areas psa
     JOIN locations l ON l.id = psa.location_id WHERE psa.professional_id = $1
     ORDER BY psa.is_primary DESC, l.name`,
    [id],
  );
  return { ...professional, services: services.rows, areas: areas.rows };
}
