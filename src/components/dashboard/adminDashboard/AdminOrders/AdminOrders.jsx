import React from 'react';

const AdminOrders = ({adminShow, setAdminShow}) => {
    return (
        <div className={`${adminShow === "order" ? "" : "hidden"}`}>
            <h1>Admin Order</h1>
        </div>
    );
};

export default AdminOrders;