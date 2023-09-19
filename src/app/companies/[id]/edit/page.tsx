'use client'
import React, { useEffect, useState } from 'react'

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Company name must be at least 2 characters."
  }).max(50),
  industry: z.string({
    required_error: "Industry is required."
  }).min(1, {
    message: "Industry is required."
  }),
  is_discreet: z.boolean().default(false).optional(),
  subscription: z.string()
})

import { useRouter } from 'next/navigation';
import { editClient, getClient } from '@/services/ClientService'
import { Company, EditCompany } from '@/models/Company'
export default function EditCompany({
  params
}: {
  params: {
    id: string,
  }
}) {

  const router = useRouter();
  const [company, setCompany] = useState<Company>();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      industry: "",
      is_discreet: false,
      subscription: "0"
    },
  })

  useEffect(() => {
    form.reset();

    if (params?.id) {
      const fetchClient = async () => {
        const resp = await getClient(params?.id);

        console.log(resp);
        form.setValue("name", resp ? resp.company_name : "")
        form.setValue("industry", resp ? resp.industry : "")
      }

      fetchClient();
    }

  }, [params?.id]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const client: EditCompany = {
      company_name: values.name,
      industry: values.industry,
      id: params?.id
    };
    await editClient(client);
    console.log(client);
    location.replace("/companies");
  }

  return (
    <div>
      <h1>Edit Company</h1>

      <div className='flex flex-row'>
        <div className='basis-full md:basis-4/6 bg-white p-8'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="SonicLynx" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Outsourcing" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                  control={form.control}
                  name="is_discreet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange}/>
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Is Discreet</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField 
                  control={form.control}
                  name="subscription"
                  render={({field}) => (
                    <FormItem>
                        <FormLabel>Subscription</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a subscription" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">No Subscription</SelectItem>
                              <SelectItem value="1">Level 1</SelectItem>
                              <SelectItem value="2">Level 2</SelectItem>
                              <SelectItem value="3">Level 3</SelectItem>
                              <SelectItem value="4">Level 4</SelectItem>
                            </SelectContent>
                        </Select>
                    </FormItem>
                  )}
                /> */}
              <Button type="submit">Submit</Button>
              <input className="text-gray-800 text-sm font-semibold  px-4 py-1 rounded-lg hover:text-orange-400 hover:border-purple-600" type="button" value="Back" onClick={() => { location.replace("/companies") }} />
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}
