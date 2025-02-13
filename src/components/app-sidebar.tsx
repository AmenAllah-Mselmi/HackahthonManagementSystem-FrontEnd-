"use client"
import MainLogo from "../../public/main-logo.webp"
import * as React from "react"
import {
  House,
  CircleUserRound,
  Swords,
  Code,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { url } from "inspector"

// This is sample data.
const data = {
  user: {
    name: "MicrosoftIssatsoClub",
    email: "microsoft@gmail.com",
    avatar: MainLogo.src,
  },
  navMain: [
    {
      title: "Home",
      url: "/admin",
      icon: House,
      isActive: true,
      items: [
        {
          title: "Home",
          url:"/admin"
        },
        {
          title: "Submit",
          url:"/admin/submit"
        }
      ]
    },
    {
      title: "Attendees",
      url: "/admin/attendees",
      icon: CircleUserRound,
      isActive: true,
      items: [
        {
          title: "Attendees-List",
          url: "/admin/attendees",
        },
        {
          title: "Create-Attendee",
          url: "/admin/attendees/create",
        },
      ],
    },
    {
      title: "Workshops",
      url: "/admin/workshops",
      icon: Code,
      isActive: true,
      items: [
        {
          title: "Workshops-List",
          url: "/admin/workshops",
        },
        {
          title: "Create-Workshop",
          url: "/admin/workshops/create",
        },
      ],
    },
    {
      title: "Challenges",
      url: "/admin/challenges",
      icon: Swords,
      isActive: true,
      items: [
        {
          title: "Challenges-List",
          url:"/admin/challenges",
        },
        {
          title: "Create Challenge",
          url: "/admin/challenges/create",
        },
      ],
    },
    {
    title: "Teams",
    url: "/admin/teams",
    icon: Swords,
    isActive: true,
    items: [
      {
        title: "Teams-List",
        url:"/admin/teams",
      },
    ],
  },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
