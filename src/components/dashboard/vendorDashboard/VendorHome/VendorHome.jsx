import useUser from '@/hooks/UserHook';
import React from 'react';

const VendorHome = ({vendorShow, setVendorShow}) => {
    const {user} = useUser()
    console.log(user)
    return (
        <div className={`${vendorShow === "home" ? "" : "hidden"}`}>
            <h1>home page</h1>
        </div>
    );
};

export default VendorHome;