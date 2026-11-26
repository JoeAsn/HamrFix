import "dotenv/config"
import { z } from "zod";
const schema = z.object({
  SERVER_PORT : z.coerce.number().int().positive() ,
  DB_HOST: z.string().trim().min(1),
  DB_PORT: z.coerce.number().int().positive(),
  DB_PASSWORD: z.string().min(1),
  DB_USER: z.string().trim().min(1),
  DB_POOL: z.coerce.number().positive().default(10),
  DB_NAME: z.string().min(1),
});
export default function validateEnv(){
  const envValidation  = schema.safeParse(process.env) ;
  if (!envValidation.success){
    process.exit(1) ;
  }
  return envValidation.data ;
}