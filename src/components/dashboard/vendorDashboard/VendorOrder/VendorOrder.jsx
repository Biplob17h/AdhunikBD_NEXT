import React from 'react';

const VendorOrder = ({vendorShow, setVendorShow}) => {
    return (
        <div className={`${vendorShow === "order" ? "" : "hidden"}`}>
            <h1>order page</h1>
        </div>
    );
};

export default VendorOrder;