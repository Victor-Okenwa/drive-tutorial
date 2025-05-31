import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";
import { env } from "~/env";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  // client: Client | undefined;
  conn: Pool | undefined;
};

const conn = globalForDb.conn ?? createPool({
  host: env.SINGLESTORE_HOST,
  user: env.SINGLESTORE_USER,
  password: env.SINGLESTORE_PASS,
  database: env.SINGLESTORE_DB_NAME,
  port: env.SINGLESTORE_PORT ? parseInt(env.SINGLESTORE_PORT, 10) : 3306,
  ssl: {},
  maxIdle: 0,
});

if (env.NODE_ENV !== "production") globalForDb.conn = conn;
conn.addListener("error", (err) => {
  console.log('Database error: ', err);
  // Handle the error appropriately, e.g., log it or notify the user
});

export const db = drizzle({ client: conn });

// const db = drizzle({ client: conn });
// export const client =
//   globalForDb.client ?? createClient({ url: env.DATABASE_URL });
// if (env.NODE_ENV !== "production") globalForDb.client = client;

// export const db = drizzle(client, { schema });
