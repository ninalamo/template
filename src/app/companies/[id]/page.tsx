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
import SubscriptionForm from '@/components/forms/SubscriptionForm';
import GenerateCardForm from '@/components/forms/GenerateCardForm';
  



export default function CompanyProfile({
    params
  }: {
    params: {
      id: string
    }
  }) {
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<Client>();
    const [clientId, setClientId] = useState<string>();
    const [clientSubscriptions, setClientSubscriptions] = useState<ClientSubscription[]>();


    useEffect(() => {
        if(params?.id){
            setClientId(params?.id);
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
                        <DialogTitle className='mb-3'>New Subscription</DialogTitle>
                        <SubscriptionForm clientId={clientId? clientId: ""} />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <div className='overflow-auto'>
                    <table className='data-table table-fixed w-full mb-5 min-w-[1420px]'>
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Desc</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Status</th>
                                <th>Card Expiration (in months)</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {clientSubscriptions?.map((s,i) => {
                            return(
                                <tr key={s.subscription_id}>
                                    <td>{s?.card_level}</td>
                                    <td>{s?.description}</td>
                                    <td>{new Date(s?.start_date).toDateString()}</td>
                                    <td>{new Date(s?.end_date).toDateString()}</td>
                                    <td>{s?.status_description}</td>
                                    <td>{s?.card_expiry_in_months}</td>
                                    <td>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="sm" variant="outline" className='text-xs'>Generate Cards</Button>
                                            </DialogTrigger>
                                            <DialogContent className="sm:max-w-[425px]">
                                                <DialogHeader>
                                                <DialogTitle className='mb-3'>Generate Cards</DialogTitle>
                                                    <GenerateCardForm clientId={clientId? clientId: ""} subscriptionId={s.subscription_id} />
                                                </DialogHeader>
                                            </DialogContent>
                                        </Dialog>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
              
            </div>

            

        </>
        }
    </div>
  )
}
