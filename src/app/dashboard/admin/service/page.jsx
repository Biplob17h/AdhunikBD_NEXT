"use client";
import AdminServiceAdd from "@/components/dashboard/adminDashboard/AdminService/AdminServiceAdd/AdminServiceAdd";
import AdminServiceManage from "@/components/dashboard/adminDashboard/AdminService/AdminServiceManage/AdminServiceManage";

const AdminService = () => {
  return (
    <div className={`space-y-6 p-6`}>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Service Management</h1>
        <AdminServiceAdd />
      </div>
      <AdminServiceManage />
    </div>
  );
};

export default AdminService;
