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
import { getMemberInfo, saveMemberInfo } from '@/services/ExternalService'
import { MemberInfo } from '@/models/Member'
import { redirect } from 'next/navigation'
import { RedirectType } from 'next/dist/client/components/redirect'

const formSchema = z.object({
  first_name: z.string().min(1, {
    message: "First Name is required"
  }),
  last_name: z.string().min(1, {
    message: "Last Name is required"
  }),
  middle_name: z.string(),
  email: z.string(),
  phone_number: z.string(),
  address: z.string(),
  occupation: z.string().min(1, {
    message: "Position is required"
  }),
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
  params,
  searchParams
}: {
  params: {
    id: string,
    client_id: string
  },
  searchParams?:  { uid: string }
}) {
    const [cardKey, setCardKey] = useState<string>()

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
      
      if(params?.client_id && params?.id){
        const initializeMember = async () => {
          const resp = await getMemberInfo(params?.client_id, params?.id, searchParams?.uid? searchParams?.uid: "");

          console.log('member details', resp);

          form.setValue("first_name", resp? resp.firstName: "")
          form.setValue("last_name", resp? resp.lastName: "")
          form.setValue("middle_name", resp? resp.middleName: "")
          form.setValue("phone_number", resp? resp.phoneNumber: "")
          form.setValue("email", resp? resp.email: "")
          form.setValue("address", resp? resp.address: "")
          form.setValue("facebook", resp? resp.facebook: "")
          form.setValue("linkedin", resp? resp.linkedIn: "")
          form.setValue("instagram", resp? resp.instagram: "")
          form.setValue("pinterest", resp? resp.pinterest: "")
          form.setValue("twitter", resp? resp.twitter: "")
          form.setValue("occupation", resp? resp.occupation: "")

          setCardKey(searchParams?.uid);
        }

        initializeMember();
      }

      //fetch member's info on this line

      // GET "{id}/members/{memberId}/external?uid=xxxsx
      // IF cardkey is empty THEN RETURN an object with empty fields except for CardKey and Id (MemberId)
      // ELSE RETURN object as a whole

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.client_id, params?.id])
  


    const { toast } = useToast();
  
    async function onSubmit(values: z.infer<typeof formSchema>) {
      let request = {
        client_id: params?.client_id,
        member_id: params?.id,
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
        card_key: cardKey,
        subscription_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        identity: {
          email: values.identity_email,
          password: values.identity_password
        }
      }

      const res = await saveMemberInfo(request);

      console.log('response', res);

      if(res.status === 200 || res.status === 201 || res.status === 204){
        toast({
          title: "Success!",
          description: "Information has been recorded",
        })

        location.replace(`/ext/v1/tenants/${request.client_id}/members/${request.member_id}/profile?uid=${cardKey}`);

      }else{
        toast({
          title: "Error!",
          description: res? res.result.error_message: "Your information can't be saved right now.",
        })
      }
      
    }

    useEffect(() => {
      const subscription = form.watch((value, { name, type }) => {
        if(name === 'identity_confirmPassword' && value !== form.getValues("identity_password")){
          console.log("Password did not match");
        }
      });

      return () => subscription.unsubscribe();
    }, [form])

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
              <div className='bg-white basis-full xl:basis-3/6 p-5 '>
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
                        name="occupation"
                        render={({ field }) => (
                          <FormItem className='mr-3'>
                            <FormLabel>Position/Job Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
              

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