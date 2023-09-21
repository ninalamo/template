'use client'

import { Button } from '@/components/ui/button';
import { ClientSubscription } from '@/models/ClientSubscription';
import { Client } from '@/models/Company';
import { getClient } from '@/services/ClientService';
import { getClientSubscriptions } from '@/services/SubscriptionService';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'


import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  



export default function CompanyProfile({
    params
  }: {
    params: {
      id: string
    }
  }) {
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<Client>();
    const [clientSubscriptions, setClientSubscriptions] = useState<ClientSubscription[]>();


    useEffect(() => {
        if(params?.id){
            const fetchClient = async () => {
                const resp = await getClient(params?.id);
                setClient(resp);
                
                setLoading(false);

                const subs = await getClientSubscriptions(params?.id);

                setClientSubscriptions(subs);
            }
      
            fetchClient();
        }

    }, [params?.id])

    console.log(clientSubscriptions)

  return (
    <div>
         {loading? <p>Please wait...</p> :
        <>
            <h1>{client?.company_name}</h1>

            <div className='lg:flex flex-row'>
                <div className='bg-white p-5 basis-full mb-5 lg:basis-4/6 lg:mr-5'>
                    <div className='mb-5'>
                        <p className='font-bold'>Name</p>
                        <p>{client?.company_name}</p>
                    </div>  


                    <div className='mb-5'>
                        <p className='font-bold'>Industry</p>
                        <p>{client?.industry}</p>
                    </div>

                    <div className='mb-5'>
                        <p className='font-bold'>Company Profile</p>
                        <p>-</p>
                    </div>

                    <div className='mb-5'>
                        <p className='font-bold'>Address</p>
                        <p>-</p>
                    </div>

                    <div className='mb-5'>
                        <p className='font-bold'>Contact No.</p>
                        <p>-</p>
                    </div>
                </div>

                <div className='bg-white p-5 basis-full mb-5 lg:basis-2/6'>
                    <div>
                            <Image 
                                className='mx-auto mb-5'
                                src="/logo-placeholder.png" 
                                alt="Company Logo" 
                                width={200}
                                height={40}
                            />
                    </div>
                </div>
            </div>

            <div className='bg-white p-5'>
                <h2 className='font-bold mb-5 text-3xl'>
                        Subscriptions
                </h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='mb-3'>New Subscription</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>New Subscription</DialogTitle>
                        <DialogDescription>
                           Form here...
                        </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                {clientSubscriptions?.map((s,i) => {
                    return (
                        <table key={s.subscription_id} className='table-fixed w-full mb-5'>
                            <tbody>
                                <tr>
                                    <td>
                                        <span className='font-bold'>Level</span>
                                    </td>
                                    <td className='w-2/4'>{s?.card_level}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='font-bold'>Details</span>
                                    </td>
                                    <td>{s?.description}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='font-bold'>Start Date</span>
                                    </td>
                                    <td>{new Date(s?.start_date).toDateString()}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='font-bold'>End Date</span>
                                    </td>
                                    <td>{new Date(s?.end_date).toDateString()}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='font-bold'>Status</span>
                                    </td>
                                    <td>{s?.status_description}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className='font-bold'>Card Expiration (in Months)</span>
                                    </td>
                                    <td>{s?.card_expiry_in_months}</td>
                                </tr>
                            </tbody>
                    </table>
                    )
                })}
            </div>

            

        </>
        }
    </div>
  )
}
