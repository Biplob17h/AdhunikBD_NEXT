import React from 'react';

const VendorReview = ({ vendorShow, setVendorShow }) => {
    return (
        <div className={`${vendorShow === "review" ? "block" : "hidden"}`}>
            <h1>VendorReview</h1>
        </div>
    );
};

export default VendorReview;