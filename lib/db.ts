import { neon } from "@neondatabase/serverless"

// Create a SQL client with the connection string
export const sql = neon(process.env.DATABASE_URL!)

// Helper function to execute raw SQL queries with tagged template literals
export async function executeQuery(query: string, params: any[] = []) {
  try {
    // Use sql.query for parameterized queries
    return await sql.query(query, params)
  } catch (error) {
    console.error("Database query error:", error)
    throw error
  }
}
