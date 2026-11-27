import pool from "../../config/database.js";
export default async function proDetailRepo(professionalId) {
  const professionalInfo = {};
  try {
    const professionalName = await pool.query(
      `SELECT name FROM users WHERE id = $1`,
      [professionalId],
    );
    if (professionalName.rowCount < 1) {
      return {
        success: false,
        message: "the user with this id does not exist.",
      };
    }
    const additinalInfo = await pool.query(
      `SELECT profession , overview  , contact_phone , telegram , professional_photo FROM professional_profiles WHERE user_id  = $1 AND status = 'published'`,
      [professionalId],
    );
    const services = await pool.query(
      `SELECT name , details FROM services WHERE id IN (
            SELECT service_id FROM professional_services WHERE professional_id = $1)`,
      [professionalId],
    );
    const serviceAreas = await pool.query(
      `SELECT name , is_primary FROM locations JOIN professional_service_areas ON professional_service_areas.location_id = locations.id WHERE professional_id = $1`,
      [professionalId],
    );
    if (additinalInfo.rowCount < 1) {
      return {
        success: false,
        message: "the published professional profile does not exist.",
      };
    }
    Object.assign(
      professionalInfo,
      professionalName.rows[0],
      additinalInfo.rows[0],
      { services: services.rows },
      { areas: serviceAreas.rows },
    );
    return professionalInfo ;
  } catch (error) {
    console.error("Failed to fetch professional details:", error);
    return {
      success: false,
      message: "Could not fetch professional details.",
    };
  }
}
