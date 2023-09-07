'use client'

import { Client } from '@/models/Company';
import { getClient } from '@/services/ClientService';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function CompanyProfile({
    params
  }: {
    params: {
      id: string
    }
  }) {
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState<Client>();


    useEffect(() => {
        if(params?.id){
            const fetchClient = async () => {
                const resp = await getClient(params?.id);
                setClient(resp);
                setLoading(false);
            }
      
            fetchClient();
        }

    }, [params?.id])

  return (
    <div>
         {loading? <p>Please wait...</p> :
        <>
            <h1>{client?.company_name}</h1>

            <div className='flex flex-row'>
                <div className='bg-white p-5 basis-4/6 mr-5'>
                    <div className='mb-5'>
                        <p className='font-bold'>Name</p>
                        <p>{client?.company_name}</p>
                    </div>  


                    <div className='mb-5'>
                        <p className='font-bold'>Industry</p>
                        <p>-</p>
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
                <div className='bg-white p-5 basis-2/6'>
                <div>
                        <Image 
                            className='mx-auto mb-5'
                            src="/logo-placeholder.png" 
                            alt="Company Logo" 
                            width={200}
                            height={40}
                        />
                </div>


                <h3 className='text-center font-bold mb-5'>
                        Subscription Details
                </h3>

                <table className='table-fixed w-full'>
                        <tbody>
                            <tr>
                                <td>
                                    <span className='font-bold'>Level</span>
                                </td>
                                <td className='w-2/4'>{client?.subscription_level}</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='font-bold'>Details</span>
                                </td>
                                <td>{client?.subscription}</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className='font-bold'>No. of Cards</span>
                                </td>
                                <td>{client?.card_holders}</td>
                            </tr>
                        </tbody>
                </table>
                </div>
            </div>
        </>
        }
    </div>
  )
}
