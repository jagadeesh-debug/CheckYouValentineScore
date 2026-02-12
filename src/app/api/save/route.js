import { connectDB } from "@/app/lib/db"
import Result from "@/app/models/result"

export async function POST(req) {

  const body = await req.json()
  const { name1, name2, percentage, status } = body

  await connectDB()

  // normalize names (important)
  const n1 = name1.toLowerCase().trim()
  const n2 = name2.toLowerCase().trim()

  // check existing (both combinations)
  const existing = await Result.findOne({
    $or: [
      { name1: n1, name2: n2 },
      { name1: n2, name2: n1 }
    ]
  })

  if (existing) {
    return Response.json({
      message: "Already exists",
      data: existing
    })
  }

  // create new if not found
  const newResult = await Result.create({
    name1: n1,
    name2: n2,
    percentage,
    status
  })

  return Response.json({
    message: "Saved",
    data: newResult
  })
}
