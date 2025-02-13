"use client"
import { Team, columns } from "./columns"
import { DataTable } from "./data-table"
import logo from "../../../../public/main-logo.webp"
import { Delete, Slash } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios"
import { useEffect, useState } from "react"
export default  function DemoPage() {
  const [data, setData] = useState<Team[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/team/all");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
      }
    };
    const interval=setInterval(fetchData,5000);
    fetchData();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className=" w-screen max-w-screen min-h-screen flex flex-col   ">
      <Image src={logo} width={20} height={20} alt="logo" className="absolute right-9 top-1" />
    <div className=" flex justify-between items-center container mx-auto w-5/6">
      <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Admin</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Teams</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <Slash />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>List</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      </div>
    <div className="flex  items-center justify-center  w-9/12">
      <DataTable columns={columns} data={data}  />
    </div>
</div>
  )
}

