"use client";
import { useRouter } from "next/navigation";
import logo from "../../public/logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Alert from "@/components/Alert";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  password: z.string().nonempty({ message: "Password is required" }),
});

export default function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const router = useRouter();
const [Login,SetLogin]=useState(false)
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    if (values.username === "admin" && values.password === "admin") {
      router.push("/admin");
    } else {
      SetLogin(true)
    }
  }

  return (
    <div
      className="flex justify-center items-center h-screen w-screen relative"
      style={{ backgroundImage: `url(/background.jpg)`, backgroundSize: "cover" }}
    >
      <Image
        src={logo}
        width={60}
        height={60}
        className="absolute top-2 left-2"
        alt="Logo"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-3/4 h-3/6 lg:w-2/5 lg:h-1/2 bg-white rounded-md flex flex-col justify-center items-center"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="w-4/5 md:w-[300px]">
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Put your username" {...field} />
                </FormControl>
                <FormDescription>Username shortcut</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-4/5 md:w-[300px] mt-2">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Put your password" {...field} />
                </FormControl>
                <FormDescription>password shortcut</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-[100px] mt-3" type="submit">
            Submit
          </Button>
         {Login===true? <Alert />:null}
        </form>
      </Form>
    </div>
  );
}
