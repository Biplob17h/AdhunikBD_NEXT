'use client'
import useUser from '@/hooks/UserHook';
import React from 'react';

const VendorHome = () => {
    const {user} = useUser()
    console.log(user)
    return (
        <div className={``}>
            <h1>home page</h1>
        </div>
    );
};

export default VendorHome;