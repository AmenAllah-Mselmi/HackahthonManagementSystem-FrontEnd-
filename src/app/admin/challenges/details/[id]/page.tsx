"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Calendar, Hash, Star, Info, ChevronRight } from "lucide-react"

interface Challenge {
  _id: string
  Title: string
  Description: string
  ChallengeNumber: number
  DifficultyLevel: "Easy" | "Medium" | "Hard" | "Expert"
  Points: number
  createdAt: string
}

export default function ChallengePage() {
  const params = useParams()
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get<Challenge>(`http://localhost:8080/api/challenge/getById/${params.id}`)
        setChallenge(response.data)
      } catch (err) {
        setError("Failed to fetch challenge. Please try again later.")
        console.error("Error fetching challenge:", err)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchChallenge()
    }
  }, [params.id])

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  if (!challenge) return <div className="flex justify-center items-center h-screen">No challenge found</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white w-screen">
      <div className="container mx-auto p-4 max-w-4xl">
        <header className="mb-8 pt-8">
          <h1 className="text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            {challenge.Title}
          </h1>
          <div className="flex items-center space-x-4">
            <Badge variant={getDifficultyVariant(challenge.DifficultyLevel)} className="text-lg px-3 py-1">
              {challenge.DifficultyLevel}
            </Badge>
            <span className="text-gray-400">Challenge #{challenge.ChallengeNumber}</span>
          </div>
        </header>

        <main className="grid gap-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-blue-400">
                <Info className="mr-2" /> Description
              </h2>
              <p className="text-lg text-gray-300">{challenge.Description}</p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-yellow-400">
                  <Trophy className="mr-2" /> Reward
                </h2>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600">
                  {challenge.Points} Points
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 flex items-center text-purple-400">
                  <Star className="mr-2" /> Difficulty
                </h2>
                <p className="text-3xl font-bold">{challenge.DifficultyLevel}</p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-green-400">
                <Hash   className="mr-2" /> Challenge Details
              </h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-green-400" />
                  <span className="font-semibold mr-2">Challenge ID:</span> {challenge._id}
                </li>
                <li className="flex items-center">
                  <ChevronRight className="mr-2 text-green-400" />
                  <span className="font-semibold mr-2">Challenge Number:</span> {challenge.ChallengeNumber}
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center text-red-400">
                <Calendar className="mr-2" /> Date Information
              </h2>
              <p className="text-gray-300">Created on: {new Date(challenge.createdAt).toLocaleString()}</p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}

function getDifficultyVariant(difficulty: string) {
  switch (difficulty) {
    case "Easy":
      return "success"
    case "Medium":
      return "warning"
    case "Hard":
      return "destructive"
    case "Expert":
      return "default"
    default:
      return "default"
  }
}

