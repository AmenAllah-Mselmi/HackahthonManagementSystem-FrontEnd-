"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { toast } from '@/hooks/use-toast'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"

const formSchema = z.object({
  teamId: z.string().min(1, "Please select a team"),
  PointsEarned: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)), 
    z.number()
  ),
})

type FormData = z.infer<typeof formSchema>

export default function PointsForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teamId: "",
      PointsEarned: 0,
    },
  })

  const [teams, setTeams] = useState<{ _id: string, Name: string }[]>([])
  const [TeamName,setTeamName] = useState<string>("")
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const request = await axios.get('http://localhost:8080/api/team/all')
        setTeams(request.data)
      } catch (error) {
        console.error("Error fetching teams:", error)
      }
    }
    fetchTeams()
  }, [])

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post("http://localhost:8080/api/submission/submitChallenge", data)
      
      toast({
        title: "Registration successful",
        description: `Team ${data.teamId} has successfully gained ${data.PointsEarned} points.`,
      })

      form.reset()
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Submission failed",
        description: "There was an error submitting the points.",
      })
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:w-1/2 lg:w-1/4">
          {/* Team Selection */}
          <FormField
            control={form.control}
            name="teamId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Team</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a team" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {teams.map((team) => (
                      <SelectItem key={team._id} value={team._id}>
                        {team.Name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Points Input */}
          <FormField
            control={form.control}
            name="PointsEarned"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Points</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    {...field} 
                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : "")} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit Points</Button>
        </form>
      </Form>
    </div>
  )
}
