import React from 'react';

const AdminHome = ({adminShow, setAdminShow}) => {
    return (
        <div className={`${adminShow === "home" ? "" : "hidden"}`}>
            <h1>Admin Home</h1>
        </div>
    );
};

export default AdminHome;