import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

dotenv.config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// creates a SQL connection using our env variables
export const sql = neon(
    `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
)

//postgresql://neondb_owner:npg_1wGbAx9dIveg@ep-holy-leaf-a1cteqcd-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require