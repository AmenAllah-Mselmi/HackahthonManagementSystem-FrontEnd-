'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useParams, useRouter } from 'next/navigation'
import { toast } from '@/hooks/use-toast'
import axios from 'axios'

export default function updateWorkshopForm() {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState('')
  const [trainerName, setTrainerName] = useState('')
  const {id}=useParams();
  const router=useRouter();
  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/workshop/getById/${id}`)
        const data = await response.json()
        setName(data.Name)
        setTopic(data.Topic)
        setTrainerName(data.TrainerName)
      } catch (error) {
        console.error('Error fetching workshop:', error)
      }
    }
    fetchWorkshop();
  },[])
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const payload={
      Name:name,
      TrainerName:trainerName,
      Topic:topic
    }
    // Handle form submission here
    console.log('Workshop updated:', { name, topic, trainerName })
    const response = await axios.put(
      `http://localhost:8080/api/workshop/update/${id}`,
      payload
    );
    toast({
      title: "update successful",
      description: ` ${response.data.Name} has been successfully updated.`,
    });
    // Reset form fields after submission
    setName('')
    setTopic('')
    setTrainerName('')
    router.push('/admin/workshops')
  }

  return (
    <div className='w-screen h-screen flex justify-center flex-col items-center lg:w-[1200px]'>
        <Card className="w-10/12 mx-auto ">
      <CardHeader>
        <CardTitle>update Workshop</CardTitle>
        <CardDescription>Fill in the details to update a new workshop.</CardDescription>
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
            <Label htmlFor="trainerName">Trainer Name</Label>
            <Input 
              id="trainerName" 
              value={trainerName} 
              onChange={(e) => setTrainerName(e.target.value)} 
              required 
              placeholder="Enter trainer's name"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">update Workshop</Button>
        </CardFooter>
      </form>
    </Card>
    </div>
  )
}

