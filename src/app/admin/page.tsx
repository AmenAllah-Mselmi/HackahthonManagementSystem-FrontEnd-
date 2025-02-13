"use client"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent,Tabs } from "@/components/ui/tabs"
import { use, useEffect, useState } from "react";
import axios from "axios"
import { set } from "date-fns";
export default  function AnalyticsDashboard() {
  const [Numattendees,setNumAttendees]=useState(0);
  const [Numchallenges,setNumChallenges]=useState(0);
  const[Numworkshops,setNumWorkshops]=useState(0);
  const [NumTeams,setNumTeams]=useState(0);
  const [Revenue,setRevenue]=useState(0);
  useEffect(() => {
    const fectchAttendees=async()=>{
      const request=await axios.get('http://localhost:8080/api/attendee/count');
      setNumAttendees(request.data);
      setRevenue(request.data*25);
    }
    const fetchChallenges=async()=>{
      const request=await axios.get('http://localhost:8080/api/challenge/count');
      setNumChallenges(request.data);
    }
    const fetchWorkshops=async()=>{
      const request=await axios.get('http://localhost:8080/api/workshop/count');
      setNumWorkshops(request.data);
    }
    const fetchteams=async()=>{
      const request=await axios.get('http://localhost:8080/api/team/count');
      setNumTeams(request.data);
    }
    fectchAttendees();
    fetchChallenges();
    fetchWorkshops();
    fetchteams();
  }, []);
  return (
    <Tabs value="analytics" className="space-y-4 flex just items-center justify-center  lg:ml-56  ">
      <div className="flex  justify-around items-center flex-wrap gap-2">
        <Card className="w-11/12">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Revenue} Dinars</div>
          </CardContent>
        </Card>
        <Card className="w-11/12">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Subscriptions
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{Numattendees}</div>
          </CardContent>
        </Card>
        <Card className="w-11/12">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teams</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{NumTeams}</div>
          </CardContent>
        </Card>
        <Card className="w-11/12">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Challenges
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{Numchallenges}</div>
          </CardContent>
        </Card>
        <div className="mx-auto w-11/12 border-none">
         <section className="py-8 md:py-12">
        <div className="mx-auto">
          <h1 className="mb-4 text-4xl font-bold tracking-tight lg:mb-7 lg:text-start lg:text-5xl lg:font-extrabold lg:leading-none">
            Find us here.
          </h1>
          <iframe
            title="tsyp location"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12941.701626024917!2d10.642093!3d35.814037!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302756a7452317b%3A0xfe8bdcb107b21c72!2sInstitut%20Sup%C3%A9rieur%20des%20Sciences%20Appliqu%C3%A9es%20et%20de%20Technologie%20de%20Sousse!5e0!3m2!1sfr!2stn!4v1726792840117!5m2!1sfr!2stn"
            className="w-full rounded-2xl shadow-md"
            height="500"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ border: '0px' }}
          ></iframe>
        </div>
      </section>
    </div>
      </div>
    </Tabs>
  )
}

