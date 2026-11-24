import StaticAuth from '@/components/commen/staticAuth'
import React from 'react'

export default function LayoutAuth({children}:LayoutProps<"/"> ) {
    return (
        <>
          <div className="container mx-auto">
            <div className="grid grid-cols-12 ">
                <div className='col-span-6'>
                    <StaticAuth/>
                </div>
                <div className='col-span-6'>
                    {children}
                </div>
            
            </div>
            </div>  
        </>
    )
}
