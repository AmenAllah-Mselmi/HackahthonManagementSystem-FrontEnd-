'use client'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from "axios"
import { toast } from "@/hooks/use-toast"

// This type is used to define the shape of our data.
export type Team = {
  _id: string
  Points: number
  Name: string
}


const  UpdateModel=({isUpdateOpen, onCloseUpdate, onConfirmUpdate,UpdateName,setUpdateName}: {isUpdateOpen: boolean; onCloseUpdate: () => void; onConfirmUpdate: () => void;UpdateName:string,setUpdateName:(e:any)=>void})=>{
  return (
    <Dialog open={isUpdateOpen} onOpenChange={onCloseUpdate}>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Team</DialogTitle>
        <DialogDescription>
          Make changes to your Team here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="username" className="text-right">
            Name
          </Label>
          <Input id="username" value={UpdateName} className="col-span-3" onChange={(e) => setUpdateName(e.target.value)} />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onConfirmUpdate}>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
}
const DeleteModal = ({ isOpen, onClose, onConfirm }: { isOpen: boolean; onClose: () => void; onConfirm: () => void }) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the Team
            and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export const columns: ColumnDef<Team>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() 
            === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "Points",
    header: "Points",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const Team = row.original
      const router = useRouter()
      const [isDeleteOpen, setDeleteOpen] = useState(false)
      const [isUpdateOpen, setUpdateOpen] = useState(false)
      const [UpdateName, setUpdateName] = useState(Team.Name)
      const closeDeleteModal = () => {
        setDeleteOpen(false)
      }

      const handleConfirm = async() => {
        const request=await axios.delete(`http://localhost:8080/api/team/delete/${Team._id}`);
        console.log(`Deleting attendee ${Team._id}`)
        toast({
          title: " successful delete",
          description: `Team ${request.data.Name} has been successfully deleted.`,
        });
        closeDeleteModal()
      }
      const closeUpdateModal = () => {
        setUpdateOpen(false)
      }
const  handleUpdateConfirm = async() => {
  const request=await axios.put(`http://localhost:8080/api/team/update/${Team._id}`,{Name:UpdateName});
  toast({
    title: " successful update",
    description: `Team ${request.data.Name} has been successfully updated.`,
  });
  closeUpdateModal()
}
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={async(e) =>{
              e.preventDefault()
              setUpdateOpen(true)
            }}>
              Update
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => {
              e.preventDefault()
              setDeleteOpen(true)
            }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
          <DeleteModal isOpen={isDeleteOpen} onClose={closeDeleteModal} onConfirm={handleConfirm} />
          <UpdateModel isUpdateOpen={isUpdateOpen} onCloseUpdate={closeUpdateModal} onConfirmUpdate={handleUpdateConfirm} UpdateName={UpdateName} setUpdateName={setUpdateName} />
        </DropdownMenu>
      )
    },
  },
]

