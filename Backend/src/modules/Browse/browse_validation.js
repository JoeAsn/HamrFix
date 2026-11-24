import { z } from "zod";
import ErrorAPI from "../../shared/errors/AppError.js";

const browse_query_schema = z
  .object({
    name: z.string().trim().max(100).optional(),
    service: z.string().trim().max(100).optional(),
    category: z.string().trim().optional(),
    location: z.string().trim().max(100).optional(),
    cursor: z.string().optional(),
    limit: z.coerce.number().int().min(1).max(50).default(10),
  })
  .strict();

function browse_validation(req, res, next) {
  const result = browse_query_schema.safeParse(req.query);

  if (!result.success) {
    return next(new ErrorAPI("Invalid search parameters", 400));
  }

  const { cursor, ...filters } = result.data;

  let decoded_cursor;

  if (cursor) {
    try {
      const decoded = Buffer.from(cursor, "base64").toString("utf8");
      decoded_cursor = JSON.parse(decoded);

      // Validate the decoded cursor's structure and value.
      if (
        typeof decoded_cursor !== "object" ||
        decoded_cursor === null ||
        !Number.isSafeInteger(decoded_cursor.id) ||
        decoded_cursor.id <= 0
      ) {
        throw new Error("Invalid cursor");
      }
    } catch {
      return next(new ErrorAPI("Invalid pagination cursor", 400));
    }
  }

  req.filters = Object.fromEntries(
    Object.entries(filters).filter(
      ([key, value]) => key !== "limit" && value !== undefined && value !== ""
    )
  );

  req.pagination = {
    limit: result.data.limit,
    cursor: decoded_cursor ?? null,
  };

  next();
}

export default browse_validation;
