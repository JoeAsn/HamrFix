
import pool from "../../config/database.js";

export async function browse_professionals(queryValues) {
  const result = await pool.query(
    `
      SELECT
        p.id,
        p.name
      FROM professionals p
      WHERE
        -- Professional name filter
        (
          $1::text IS NULL
          OR p.name ILIKE '%' || $1 || '%'
        )

        -- Service filter
        AND (
          $2::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM professional_services ps
            JOIN services s
              ON s.id = ps.service_id
            WHERE ps.professional_id = p.id
              AND s.name ILIKE '%' || $2 || '%'
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
            WHERE ps.professional_id = p.id
              AND c.name = $3
          )
        )

        -- Location filter
        AND (
          $4::text IS NULL
          OR EXISTS (
            SELECT 1
            FROM professional_service_areas psa
            JOIN service_areas sa
              ON sa.id = psa.area_id
            WHERE psa.professional_id = p.id
              AND sa.name = $4
          )
        )

        -- Cursor pagination
        AND (
          $5::integer IS NULL
          OR p.id < $5
        )

      ORDER BY p.id DESC
      LIMIT $6;
    `,
    queryValues
  );

  return result.rows;
}

export async function browse_services(professionals_id) {
  const result = await pool.query(
    `
      SELECT
        ps.professional_id,
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
  const result = await pool.query(
    `
      SELECT
        psa.professional_id,
        l.name
        psa.is_primary
      FROM professional_service_areas psa
      JOIN locations l
        ON l.id = psa.location_id
      WHERE psa.professional_id = ANY($1::integer[]);
    `,
    [professionals_id]
  );

  return result.rows;
}
