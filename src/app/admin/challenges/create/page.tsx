'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import axios from 'axios'
import { toast } from '@/hooks/use-toast'

export default function CreateChallengeForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [number, setNumber] = useState('')
  const [level, setLevel] = useState('')
  const [points, setPoints] = useState('')

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload = {
      Title: title,
      Description: description,
      ChallengeNumber: number,
      DifficultyLevel: level,
      Points: points
    };

    const response = await axios.post(
      "http://localhost:8080/api/challenge/create",
      payload
    );

    toast({
      title: "Registration successful",
      description: `Challenge ${response.data.Name} has been successfully registered.`,
    });
    // Handle form submission here
    console.log('Challenge created:', { title, description, number, level, points })
    // Reset form fields after submission
    setTitle('')
    setDescription('')
    setNumber('')
    setLevel('')
    setPoints('')
  }

  return (
   <div  className="w-screen h-screen flex justify-center flex-col items-center lg:w-[1200px]">
     <Card className="w-10/12 mx-auto " >
      <CardHeader>
        <CardTitle>Create Challenge</CardTitle>
        <CardDescription>Fill in the details to create a new challenge.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Challenge Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              placeholder="Enter challenge title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              placeholder="Describe the challenge"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">Challenge Number</Label>
            <Input 
              id="number" 
              type="number"
              value={number} 
              onChange={(e) => setNumber(e.target.value)} 
              required 
              placeholder="Enter challenge number"
              min="1"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">Difficulty Level</Label>
            <Select value={level} onValueChange={setLevel} required>
              <SelectTrigger id="level">
                <SelectValue placeholder="Select difficulty level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
                <SelectItem value="Expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="points">Points</Label>
            <Input 
              id="points" 
              type="number"
              value={points} 
              onChange={(e) => setPoints(e.target.value)} 
              required 
              placeholder="Enter points for the challenge"
              min="0"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Create Challenge</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
  )
}

