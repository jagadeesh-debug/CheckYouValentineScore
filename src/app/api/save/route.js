import { connectDB } from "@/app/lib/db"
import Result from "@/app/models/result"

export async function POST(req) {
  const body = await req.json()

  await connectDB()

  await Result.create(body)

  return Response.json({ message: "Saved" })
}
