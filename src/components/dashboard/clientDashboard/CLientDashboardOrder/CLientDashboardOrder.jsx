import React from 'react';

const CLientDashboardOrder = ({show}) => {
    return (
        <div className={show === 'orders' ? "" : "hidden"}>
            CLientDashboardOrder
        </div>
    );
};

export default CLientDashboardOrder;