"use client";
import { useRouter } from "next/navigation";
import { Bell, User, Settings } from "lucide-react"; // Import icons
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const VendorNavbar = () => {
  const router = useRouter();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">Vendor Dashboard</h1>

      {/* Navbar Actions */}
      <div className="flex items-center gap-6">
        {/* Notification Icon */}
        <Button variant="ghost" className="relative">
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </Button>

        {/* Settings Icon */}
        <Button variant="ghost">
          <Settings className="h-6 w-6 text-gray-600" />
        </Button>

        {/* Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer">
          <Avatar>
            <AvatarImage src="/auth.png" alt="Profile" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span className="text-gray-700 font-medium">John Doe</span>
        </div>
      </div>
    </nav>
  );
};

export default VendorNavbar;
