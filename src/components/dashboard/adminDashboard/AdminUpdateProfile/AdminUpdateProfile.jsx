import React from 'react';

const AdminUpdateProfile = ({adminShow, setAdminShow}) => {
    return (
        <div className={`${adminShow === "update" ? "" : "hidden"}`}>
            <h1>Admin update</h1>
        </div>
    );
};

export default AdminUpdateProfile;