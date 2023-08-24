import Image from 'next/image'
import React from 'react'

export default function CompanyProfile() {
  return (
    <div>
        <h1>Cognizant</h1>

        <div className='flex flex-row'>
            <div className='bg-white p-5 basis-4/6 mr-5'>
                <div className='mb-5'>
                    <p className='font-bold'>Name</p>
                    <p>Cognizant Technology Solutions India Pvt. Limited</p>
                </div>  


                <div className='mb-5'>
                    <p className='font-bold'>Industry</p>
                    <p>Outsourcing</p>
                </div>

                <div className='mb-5'>
                    <p className='font-bold'>Company Profile</p>
                    <p>{"Cognizant (Nasdaq-100: CTSH) is one of the world's leading professional services companies, transforming clients' business, operating and technology models for the digital era. Our unique industry-based, consultative approach helps clients envision, build and run more innovative and efficient businesses."}</p>
                </div>

                <div className='mb-5'>
                    <p className='font-bold'>Address</p>
                    <p>222 West Las Colinas Blvd. Suite 1250. Irving, TX 75039</p>
                </div>

                <div className='mb-5'>
                    <p className='font-bold'>Contact No.</p>
                    <p>(02) 8976 2270</p>
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

               <table className='table-fixed'>
                    <tbody>
                        <tr>
                            <td>
                                <span className='font-bold'>Level</span>
                            </td>
                            <td className='w-2/4'>II</td>
                        </tr>
                        <tr>
                            <td>
                                <span className='font-bold'>Details</span>
                            </td>
                            <td>Company Business Cards, Membership Cards, School Identity Cards, Barangay Authenticated Identity, Barangay Senior Citizen Authenticated Identity</td>
                        </tr>
                        <tr>
                            <td>
                                <span className='font-bold'>No. of Cards</span>
                            </td>
                            <td>1783</td>
                        </tr>
                    </tbody>
               </table>
            </div>
        </div>
    </div>
  )
}
