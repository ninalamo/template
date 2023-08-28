'use client'

import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { Checkbox } from '@/components/ui/checkbox'

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "First Name is required"
  }),
  last_name: z.string().min(1, {
    message: "Last Name is required"
  }),
  middle_name: z.string().min(1, {
    message: "Last Name is required"
  }),
  email: z.string(),
  phone_number: z.string(),
  address: z.string(),
  occupation: z.string(),
  facebook: z.string(),
  linkedin: z.string(),
  instagram: z.string(),
  pinterest: z.string(),
  twitter: z.string(),
  identity_email: z.string().min(1, {
    message: "Username is required"
  }),
  identity_password: z.string().min(6, {
    message: "Password must be 6 characters minimum"
  }),
  identity_confirmPassword: z.string().min(6, {
    message: "Password must be 6 characters minimum"
  })
}).superRefine(({identity_password, identity_confirmPassword }, ctx) => {
  if (identity_confirmPassword !== identity_password) {
    console.log('Password did not match');
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "The passwords did not match"
    });
  }
})

export default function ExtMemberForm({
  params
}: {
  params: {
    id: string
  }
}) {

  const [memberInfo, setMemberInfo] = useState(
    {
      id: "cd61247b-69da-47cf-95d7-08dba5570f83",
      client_id: "0bf443ba-b461-4c0c-c757-08dba54c99eb",
      full_name: "Chrisdan Rivera Evalla",
      first_name: "Chrisdan",
      middle_name: "Rivera",
      last_name: "Evalla",
      phone_number: "11112222",
      email: "chridan.evalla@gmail.com",
      address: "Bicutan",
      occupation: "CTO / CIO",
      facebook: "https://www.facebook.com/chrisbrown",
      linkedin: "https://www.linkedin.com/in/pasupuleti-varshitha-1a1084189/",
      instagram: "N/A",
      pinterest: "N/A",
      twitter: "N/A",
      card_key: "xxxxxxx",
      subscription: "level_one",
      subscription_level: "1",
      created_by: null,
      modified_by: null,
      created_on: null,
      modified_on: null,
      is_active: true
    })

    

    const[isEmailAsUsername, setEmailAsUsername] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        address: "",
        occupation: "",
        facebook: "",
        linkedin: "",
        instagram: "",
        pinterest: "",
        twitter: "",
        identity_email: "",
        identity_password: "",
        identity_confirmPassword: ""
      }
    })

    useEffect(() => {
      form.reset();
      form.setValue("first_name", memberInfo.first_name)
      form.setValue("last_name", memberInfo.last_name)
      form.setValue("middle_name", memberInfo.middle_name)
      form.setValue("phone_number", memberInfo.phone_number)
      form.setValue("email", memberInfo.email)
      form.setValue("address", memberInfo.address)
      form.setValue("facebook", memberInfo.facebook)
      form.setValue("linkedin", memberInfo.linkedin)
      form.setValue("instagram", memberInfo.instagram)
      form.setValue("pinterest", memberInfo.pinterest)
      form.setValue("twitter", memberInfo.twitter)

      console.log(params?.id);

      //fetch member's info on this line

      // GET "{id}/members/{memberId}/external?uid=xxxsx
      // IF cardkey is empty THEN RETURN an object with empty fields except for CardKey and Id (MemberId)
      // ELSE RETURN object as a whole

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  


    const { toast } = useToast();
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      let request = {
        client_id: memberInfo.client_id,
        member_id: memberInfo.id,
        first_name: values.first_name,
        last_name: values.last_name,
        middle_name: values.middle_name,
        name_suffix: "",
        phone_number: values.phone_number,
        email: values.email,
        address: values.address,
        occupation: values.occupation,
        facebook: values.facebook,
        linkedin: values.linkedin,
        instagram: values.instagram,
        pinterest: values.pinterest,
        twitter: values.twitter,
        card_key: memberInfo.card_key,
        subscription_level: memberInfo.subscription_level,
        identity: {
          email: values.identity_email,
          password: values.identity_password
        }
      }

      console.log(request)

      toast({
        title: "Success!",
        description: "Information has been recorded",
      })
    }

    useEffect(() => {
      const subscription = form.watch((value, { name, type }) => {
        if(name === 'identity_confirmPassword' && value !== form.getValues("identity_password")){
          console.log("Password did not match");
        }
        // if(name && value){
        //   setMemberInfo({
        //     ...memberInfo,
        //     [name.toString()]: value[name]
        //   })
        // }
      });

      return () => subscription.unsubscribe();
    }, [form, memberInfo])

  return (
    <div className='container mx-auto px-4 py-4'>
        <Toaster />
        <h1>
          Digital Business Card
        </h1>
        <p className='mb-3'>
          Please complete your registration
        </p>
        <div>
          <div>
            <div className='lg:flex flex-row'>
              <div className='bg-white basis-full lg:basis-3/6 p-5 '>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className='lg:flex flex-row'>
                      <FormField
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                          <FormItem className='basis-full mb-3 lg:basis-1/3 mr-3'>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input placeholder="First Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                        control={form.control}
                        name="middle_name"
                        render={({ field }) => (
                          <FormItem className='basis-full mb-3 lg:basis-1/3 mr-3'>
                            <FormLabel>Middle Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Middle Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                          <FormItem className='basis-full mb-3 lg:basis-1/3 mr-3'>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({ field }) => (
                          <FormItem className='mr-3'>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem className='mr-3'>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type='email' placeholder="sample@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormControl>
                          <Checkbox 
                            checked={isEmailAsUsername}
                            onCheckedChange={() => {
                              setEmailAsUsername(!isEmailAsUsername);
                              form.setValue("identity_email", form.getValues("email"))
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Set email as username?</FormLabel>
                        </div>
                      </FormItem>

                      {!isEmailAsUsername?
                        <FormField
                          control={form.control}
                          name="identity_email"
                          render={({ field }) => (
                            <FormItem className='mr-3'>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      : null}
                    
                    <div className='flex flex-row'>
                      <FormField
                          control={form.control}
                          name="identity_password"
                          render={({ field }) => (
                            <FormItem className='basis-1/2 mr-3'>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input type='password' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      <FormField
                          control={form.control}
                          name="identity_confirmPassword"
                          render={({ field }) => (
                            <FormItem className='basis-1/2 mr-3'>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input type='password' {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {form.getValues('identity_password') !== form.getValues('identity_confirmPassword')?
                        <p className='text-red-600 font-bold'>
                          Password and Confirm Password should match
                        </p>
                      : null}
              

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem className='mr-3'>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className='lg:flex flex-row'>
                          <FormField
                              control={form.control}
                              name="facebook"
                              render={({ field }) => (
                                <FormItem className='basis-full mb-3 lg:basis-1/2 mr-3'>
                                  <FormLabel>Facebook</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                        <FormField
                              control={form.control}
                              name="linkedin"
                              render={({ field }) => (
                                <FormItem className='basis-full mb-3 lg:basis-1/2 mr-3'>
                                  <FormLabel>LinkedIn</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                      </div>

                      <div className='flex flex-row'>
                        <FormField
                              control={form.control}
                              name="instagram"
                              render={({ field }) => (
                                <FormItem className='basis-full mb-3 lg:basis-1/2 mr-3'>
                                  <FormLabel>Instagram</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                          <FormField
                              control={form.control}
                              name="pinterest"
                              render={({ field }) => (
                                <FormItem className='basis-full mb-3 lg:basis-1/2 mr-3'>
                                  <FormLabel>Pinterest</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                      </div>
                        

                        <FormField
                              control={form.control}
                              name="twitter"
                              render={({ field }) => (
                                <FormItem className='mr-3'>
                                  <FormLabel>Twitter/x</FormLabel>
                                  <FormControl>
                                    <Input {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
               
                    
                    <Button className='w-full' type="submit">Update Information</Button>
                  </form>
                </Form>
              </div>

              {/* <div className='basis-full lg:basis-3/6 relative'>
                <div className='flex items-center justify-center w-full h-full bg-gradient-to-r from-slate-900 to-slate-800'>
                  <div className='relative h-full w-full p-8'>
                      <div>
                        <div>
                          <p className='text-white font-bold'>
                          {memberInfo?.first_name} {memberInfo?.middle_name} {memberInfo?.last_name}
                          </p>
                          <p className='text-white text-xs text-slate-400'>
                            {memberInfo?.email}
                          </p>

                          <p className='text-white text-xs text-slate-400 mb-1'>
                            Contact No.: {memberInfo?.phone_number}  
                          </p>
                          <p className='text-white text-xs text-slate-400 mb-5'>
                            Address: {memberInfo?.address}
                          </p>
                          <p className='text-white text-base mb-1 font-bold'>
                            Social Media
                          </p>
                          <p className='text-white text-xs text-slate-400 mb-3'>
                            Facebook: {memberInfo?.facebook}
                          </p>
                          
                          <p className='text-white text-xs text-slate-400 mb-3'>
                            LinkedIn: {memberInfo?.linkedin}
                          </p>

                          <p className='text-white text-xs text-slate-400 mb-3'>
                            Instagram : {memberInfo?.instagram}
                          </p>

                          <p className='text-white text-xs text-slate-400 mb-3'>
                            Pinterest : {memberInfo?.pinterest}
                          </p>

                          <p className='text-white text-xs text-slate-400 mb-3'>
                            Twitter (x) : {memberInfo?.twitter}
                          </p>
                        </div>
                      </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>

    </div>
  )
}