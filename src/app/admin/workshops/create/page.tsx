'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

export default function CreateWorkshopForm() {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const [errors, setErrors] = useState<{ name?: string; trainerName?: string }>({})

  const validateForm = () => {
    const newErrors: { name?: string; trainerName?: string } = {}

    // Validate workshop name
    if (!name.trim()) {
      newErrors.name = "Workshop name is required."
    } else if (name.length < 3 || name.length > 50) {
      newErrors.name = "Workshop name must be between 3 and 50 characters."
    }

    // Validate trainer name (email format)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!trainerName.trim()) {
      newErrors.trainerName = "Trainer's email is required."
    } else if (!emailRegex.test(trainerName)) {
      newErrors.trainerName = "Please enter a valid email address."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
const payload={
  Name:name,
  TrainerName:trainerName,
  Topic:topic
}
    if (validateForm()) {
      // Handle form submission
      console.log('Workshop created:', { name, topic, trainerName })
      const response = await axios.post(
        "http://localhost:8080/api/workshop/create",
        payload
      );

      toast({
        title: "Registration successful",
        description: `workshop ${response.data.Name} has been successfully registered.`,
      });
      // Reset form fields after submission
      setName('')
      setTopic('')
      setTrainerName('')
      setErrors({})
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center lg:w-[1200px]">
      <Card className="w-10/12 mx-auto">
        <CardHeader>
          <CardTitle>Create Workshop</CardTitle>
          <CardDescription>Fill in the details to create a new workshop.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Workshop Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter workshop name"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="topic">Topic</Label>
              <Textarea
                id="topic"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                required
                placeholder="Describe the workshop topic"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="trainerName">Trainer Name (Email)</Label>
              <Input
                id="trainerName"
                value={trainerName}
                onChange={(e) => setTrainerName(e.target.value)}
                required
                placeholder="Enter trainer's email"
              />
              {errors.trainerName && <p className="text-red-500 text-sm">{errors.trainerName}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Create Workshop</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
