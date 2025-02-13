'use client'

import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useParams } from "next/navigation";
import { set } from "date-fns";
import { useRouter } from "next/navigation";

export default function RegistrationForm() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Degree, setDegree] = useState("");
  const [Years, setYears] = useState("");
  const [Team, setTeam] = useState("");
  const [Workshops, setWorkshops] = useState([]);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [Teams, setTeams] = useState([]);
  const [showCreateTeam, setShowCreateTeam] = useState(false);
  const [newTeam, setNewTeam] = useState("");
  const [Presence,setPresence]=useState(false);
const {id}=useParams();
const router=useRouter();
  useEffect(() => {
    const fetchWorkshops = async () => {
      const request = await axios.get("http://localhost:8080/api/workshop/all");
      setWorkshops(request.data);
    };

    const fetchTeams = async () => {
      const request = await axios.get("http://localhost:8080/api/team/all");
      setTeams(request.data);
    };
    const fetchAttendee=async()=>{
      const request=await axios.get(`http://localhost:8080/api/attendee/getById/${id}`);
      const data=request.data;
      setName(data.Name);
      setEmail(data.Email);
      setDegree(data.Degree);
      setYears(data.Years);
      setTeam(data.Team);
      setSelectedWorkshops(data.Workshops);
      setPresence(data.Presence);
    }
    fetchWorkshops();
    fetchTeams();
    fetchAttendee();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const payload = {
        Name: Name,
        Email: Email,
        Degree: Degree,
        Years:Years,
        Team:Team,
        Workshops: selectedWorkshops,
        Presence:Presence
      };
      console.log(payload)
      const response = await axios.put(
        `http://localhost:8080/api/attendee/update/${id}`,
        payload
      );

      toast({
        title: "update successful",
        description: `Attendee ${response.data.Name} has been successfully updated.`,
      });

      // Reset form fields
      setName("");
      setEmail("");
      setDegree("");
      setYears("");
      setTeam("");
      setSelectedWorkshops([]);
      router.push("/admin/attendees");
    } catch (error) {
      console.error("Error registering attendee:", error);
      toast({
        title: "Registration failed",
        description: "Please try again later.",
      });
    }
  };

  const handleWorkshopselection = (workshopId) => {
    setSelectedWorkshops((prev) =>
      prev.includes(workshopId)
        ? prev.filter((id) => id !== workshopId)
        : [...prev, workshopId]
    );
  };

  return (
    <div className="w-screen h-screen flex justify-center flex-col items-center lg:w-[1200px]">
      <h1 className="text-3xl font-bold">Update Attendee</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-11/12 h-11/12 mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="Email">Email</Label>
          <Input
            id="Email"
            type="Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="Degree">Degree</Label>
          <Select onValueChange={(value) => setDegree(value)} >
            <SelectTrigger id="Degree">
              <SelectValue placeholder="Select your Degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="licence">Licence</SelectItem>
              <SelectItem value="ingenieur">Ingenieur</SelectItem>
              <SelectItem value="mastere">Mastere</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="Years">Years</Label>
          <Select onValueChange={(value) => setYears(value)} >
            <SelectTrigger id="Years">
              <SelectValue placeholder="Select Years" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">One</SelectItem>
              <SelectItem value="2">Two</SelectItem>
              <SelectItem value="3">Three</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
                id="presence"
                checked={Presence}
                onCheckedChange={() => setPresence(!Presence)}
              />
                <Label>Presence</Label>
        </div>
        <div>
          <Label htmlFor="Team">Team</Label>
          <Select
            onValueChange={(value) => {
              setTeam(value);
              setShowCreateTeam(value === "new");
            }}
          >
            <SelectTrigger id="Team">
              <SelectValue placeholder="Select your Team" />
            </SelectTrigger>
            <SelectContent>
              {Teams.map((Team, index) => (
                <SelectItem key={index} value={Team._id}>{Team.Name}</SelectItem>
              ))}
              <SelectItem value="new">Create New Team</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {showCreateTeam && (
          <div>
            <Label htmlFor="newTeam">Create New Team</Label>
            <Input
              id="newTeam"
              value={newTeam}
              onChange={(e) => setNewTeam(e.target.value)}
            />
            <Button
              type="button"
              onClick={async () => {
                try {
                  const response = await axios.post(
                    "http://localhost:8080/api/team/create",
                    { Name: newTeam }
                  );
                  setTeams((prevTeams) => [...prevTeams, response.data]);
                  setNewTeam("");
                  setShowCreateTeam(false);
                  toast({
                    title: "Team created",
                    description: `${response.data.Name} has been successfully created`,
                  });
                } catch (error) {
                  console.error("Error creating Team:", error);
                  toast({
                    title: "Error",
                    description: "Failed to create Team. Please try again.",
                  });
                }
              }}
            >
              Create
            </Button>
          </div>
        )}

        <div className="space-y-2">
          <Label>Workshops</Label>
          {Workshops.map((workshop) => (
            <div key={workshop._id} className="flex items-center space-x-2">
              <Checkbox
                id={workshop._id}
                checked={selectedWorkshops.includes(workshop._id)}
                onCheckedChange={() => handleWorkshopselection(workshop._id)}
              />
              <Label htmlFor={workshop._id}>{workshop.Name}</Label>
            </div>
          ))}
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
}
