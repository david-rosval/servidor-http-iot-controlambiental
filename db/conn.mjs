import { MongoClient } from "mongodb";
const connectionString = process.env.CONNECTION_STRING || "";
const client = new MongoClient(connectionString);
let conn 
try {
  conn = await client.connect();  
} catch (error) {
  console.error(error)
}
let db = conn.db("controlambiental");
export default db;