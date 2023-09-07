'use client'

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod'


const formSchema = z.object({
  email: z.string().min(1, {
    message: "Email is required."
  }),
  password: z.string().min(1, {
    message: "Password is required"
  })
})



export default function Login(){
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        email: "",
        password: ""
      }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {

    }

    return (
        <div className="px-4 py-4 flex items-center justify-center min-h-screen">
          <div className="w-full md:w-96">
            <div className="bg-white basis-full rounded shadow lg:basis-3/6 p-5">
              <h1 className="uppercase">Log In</h1>
              <p className="text-slate-600 mb-5">
                Please sign in to proceed
              </p>
              <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="Username" {...field}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                      />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({field}) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input placeholder="Password" type="password" {...field}/>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                        )}
                      />

                      <Button className='w-full' type="submit">Log In</Button>
                  </form>
              </Form>
            </div>
          </div>
        </div>
      )
}