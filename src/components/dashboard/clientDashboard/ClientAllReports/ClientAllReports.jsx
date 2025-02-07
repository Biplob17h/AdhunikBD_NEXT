import React from 'react';

const ClientAllReports = ({show}) => {
    return (
        <div className={show === 'report' ? "" : "hidden"}>
            <h1>ClientAllReports</h1>
        </div>
    );
};

export default ClientAllReports;