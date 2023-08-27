import { Button } from '@/components/ui/button'
import React from 'react'
import DisplayItem from './DisplayItem'
import FacebookIcon from '@/app/icons/FacebookIcon'
import LinkedInIcon from '@/app/icons/LinkedInIcon'
import InstagramIcon from '@/app/icons/InstagramIcon'
import PinterestIcon from '@/app/icons/PinterestIcon'
import TwitterIcon from '@/app/icons/TwitterIcon'

export default function ExtMemberProfile() {
  return (
    <div>
        <div className='-mb-14 cover-photo h-56 w-full bg-gradient-to-r from-orange-400 to-orange-300 flex items-center text-slate-100 justify-center'>
            <h1 className='text-5xl opacity-20'>SonicLynx</h1>
        </div>
        <div className='profile-picture select-none h-32 w-32 mx-auto border-solid border-white border-4 rounded-full bg-black flex items-center justify-center text-white text-4xl font-bold'>
            CE
        </div>

        <div className='px-4'>
            <div className='member-highlight text-center mb-5 text-slate-700'>
                <h1>
                    Chrisdan Evalla
                </h1>
                <p className='text-lg text-gray-400'>
                    Software Engineer
                </p>
                <p className='text-lg text-gray-400'>
                    SonicLynx
                </p>
            </div>

            <hr className='mb-5'/>

            <div className="member-info pb-14">
                <DisplayItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M64 112c-8.8 0-16 7.2-16 16v22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1V128c0-8.8-7.2-16-16-16H64zM48 212.2V384c0 8.8 7.2 16 16 16H448c8.8 0 16-7.2 16-16V212.2L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64H448c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128z"/></svg>}
                    name="Email Address"
                    value="chrisdanevalla@gmail.com"
                    alternateValue={null}
                />

                <DisplayItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="white" d="M80 0C44.7 0 16 28.7 16 64V448c0 35.3 28.7 64 64 64H304c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H80zm80 432h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H160c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>}
                    name="Phone Number"
                    value="+639121234567"
                    alternateValue={null}
                />
                
                <DisplayItem 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path fill="white" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/></svg>}
                    name="Address"
                    value="San Jose del Monte, Bulacan"
                    alternateValue={null}
                />

                <DisplayItem 
                    icon={<FacebookIcon color='white' />}
                    name="Follow Me"
                    value="https://facebook.com/chrisbrown"
                    alternateValue="Facebook"
                />

                <DisplayItem 
                    icon={<LinkedInIcon color='white' />}
                    name="Follow Me"
                    value="https://facebook.com/chrisbrown"
                    alternateValue="LinkedIn"
                />

                <DisplayItem 
                    icon={<InstagramIcon color='white' />}
                    name="Follow Me"
                    value="https://facebook.com/chrisbrown"
                    alternateValue="Instagram"
                />

                <DisplayItem 
                    icon={<PinterestIcon color='white' />}
                    name="Follow Me"
                    value="https://facebook.com/chrisbrown"
                    alternateValue="Pinterest"
                />

                <DisplayItem 
                    icon={<TwitterIcon color='white' />}
                    name="Follow Me"
                    value="https://facebook.com/chrisbrown"
                    alternateValue="Twitter"
                />
                
            </div>
        </div>

        <div className='fixed bg-white shadow-lg left-0 right-0 bottom-0 w-full flex align-center justify-center'> 
            <Button className='my-3 mr-3 w-40 min-w-max'>Save to Contact</Button>  <Button variant="secondary" className='w-40 my-3'>Share</Button>
        </div>
    </div>
  )
}
