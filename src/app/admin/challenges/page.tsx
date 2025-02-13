"use client";

import { useEffect, useState } from "react";
import { Challenge, columns } from "./columns";
import { DataTable } from "./data-table";
import logo from "../../../../public/main-logo.webp";
import { Delete, Slash } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function DemoPage() {
  const [data, setData] = useState<Challenge[]>([]);
  const router = useRouter();

  // Fetch data on the client-side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/challenge/all");
        setData(response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    const interval=setInterval(fetchData,5000);
    fetchData();
    return () => clearInterval(interval);
  }, []);

  const addChallenge = () => {
    router.push("/admin/challenges/create");
  };

  return (
    <div className="w-screen max-w-screen min-h-screen flex flex-col">
      <Image src={logo} width={20} height={20} alt="logo" className="absolute right-9 top-1" />
      <div className="flex justify-between items-center container mx-auto w-5/6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Admin</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbLink href="/components">Challenge</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <Slash />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <Button onClick={addChallenge}>Add Challenge</Button>
      </div>
      <div className="flex items-center justify-center">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
