import { z } from "zod";
import ErrorAPI from "../../shared/errors/AppError.js";

const browse_query_schema = z
  .object({
    name: z.string().trim().max(100).optional(),
    service: z.string().trim().max(100).optional(),
    category: z.string().trim().max(100).optional(),
    mode: z.enum(["services", "professionals"]).optional(),
    location: z.string().trim().max(100).optional(),
    cursor: z.string().trim().optional().nullable(),
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

  if (cursor != null && cursor !== "") {
    try {
      const decoded = Buffer.from(cursor, "base64").toString("utf8");
      const parsed_cursor = JSON.parse(decoded);
      const raw_id = parsed_cursor?.id;
      const cursor_id =
        typeof raw_id === "string"
          ? raw_id
          : Number.isSafeInteger(raw_id)
            ? String(raw_id)
            : null;

      if (
        typeof parsed_cursor !== "object" ||
        parsed_cursor === null ||
        !cursor_id ||
        !/^[1-9]\d*$/.test(cursor_id) ||
        BigInt(cursor_id) > 9223372036854775807n
      ) {
        throw new Error("Invalid cursor");
      }
      decoded_cursor = { id: cursor_id };
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
