import OrganizerAdminNavbar from '@/components/organizer/layout/OrganizerAdminNavbar'
import SideBar from '@/components/organizer/layout/SideBar'
import React from 'react';

const OrganizerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative w-full'>
            <OrganizerAdminNavbar />
            <main className='max-width flex mt-3 h-[calc(100vh-100px)]'>
                <SideBar/>
                <div className='overflow-y-auto nav-items h-[calc(100vh-100px)] w-[100%] md:w-[70%] lg:w-[80%] main-page absolute right-0'>
                    {children}
                </div>
            </main>
        </div>
    )
}

export default OrganizerLayout