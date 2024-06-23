import { MongoClient } from "mongodb";
const connectionString = process.env.CONNECTION_STRING || "";
const client = new MongoClient(connectionString);
let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}
let db = conn.database("controlambiental");
export default db;