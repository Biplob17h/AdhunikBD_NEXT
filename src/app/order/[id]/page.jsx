"use client";

import Navbar from "@/components/shared/navbar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import toast from "react-hot-toast";
import useUser from "@/hooks/UserHook";
import { format } from "date-fns";
import { ClipLoader } from "react-spinners"; // Import loading spinner

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const startHour = i % 12 || 12;
  const endHour = (i + 1) % 12 || 12;
  const period = i < 12 ? "am" : "pm";
  const nextPeriod = i + 1 < 12 ? "am" : "pm";

  return `${startHour}${period} - ${endHour}${nextPeriod}`;
});

const locationOptions = ["Dhaka"];

const OrderPage = () => {
  const { id } = useParams();
  const { user } = useUser();
  const [subCategory, setSubCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(new Date()); // ✅ Default to today
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false); // State for loading
  const [submitLoading, setSubmitLoading] = useState(false); // State for submit loading

  useEffect(() => {
    setLoading(true); // Start loading when fetching data
    fetch(`/api/subcategory?subCategoryId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSubCategory(data?.data);
        setLoading(false); // End loading after data is fetched
      });

    fetch(`/api/subcategory/service?subCategoryId=${id}`)
      .then((res) => res.json())
      .then((data) => setServices(data.data));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true); // Show loading when submitting the form
    const formData = new FormData(e.target);
    const orderData = Object.fromEntries(formData.entries());

    if (!date || !time || !selectedService) {
      setSubmitLoading(false); // Hide loading when validation fails
      return toast.error("Please select a date, time, and service");
    }

    const order = {
      ...orderData,
      service: selectedService?._id, // ✅ Ensure service ID is accessed safely
      serviceName: selectedService?.name,
      price: selectedService?.price,
      date: format(date, "yyyy-MM-dd"),
      time,
      user: user._id,
      subCategoryId: subCategory?._id,
      totalPrice: selectedService?.price,
    };

    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        setSubmitLoading(false); // Hide loading when request is done
        if (data.status === "success") {
          toast.success("Order placed successfully");
          e.target.reset();
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Banner */}
      {subCategory && (
        <div className="relative mx-auto h-80 w-full max-w-4xl text-slate-800">
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-4">
            <h1 className="mb-4 text-4xl font-semibold uppercase">
              {subCategory.subCategory}
            </h1>
            <p className="mb-3 text-center text-lg">
              Choose the best service for your needs and place an order with
              ease!
            </p>
            <p className="text-md mx-auto max-w-md text-center">
              Our team is here to provide you with the most reliable and
              efficient solutions. Don't wait – get started now and enjoy a
              seamless experience with top-quality service!
            </p>
          </div>
        </div>
      )}

      {/* Order Form */}
      <div className="mx-auto max-w-3xl p-6">
        <h2 className="mb-4 text-2xl font-semibold">Place Your Order</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Left Column */}
          <div className="flex flex-col space-y-4">
            <Input
              name="customerName"
              defaultValue={user?.name}
              placeholder="Full Name"
              required
            />
            <Input
              name="customerPhone"
              defaultValue={user?.phone}
              placeholder="Phone"
              required
            />
            <Input
              name="customerEmail"
              defaultValue={user?.email}
              placeholder="Email"
              required
            />

            {/* Location Dropdown */}
            <Select name="location" defaultValue="Dhaka" required>
              <SelectTrigger>
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent>
                {locationOptions.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-4">
            <Input name="area" placeholder="Area" required />
            <Input name="road" placeholder="Road" required />
            <Input name="house" placeholder="House" required />
            <Input name="problem" placeholder="Describe the problem" required />

            {/* Service Dropdown */}
            <Select
              onValueChange={(value) => {
                const service = services.find((s) => s.name === value);
                setSelectedService(service || null); // ✅ Ensure valid service object
              }}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Service" />
              </SelectTrigger>
              <SelectContent>
                {services.map((service) => (
                  <SelectItem key={service._id} value={service.name}>
                    {service.name} - {service.price} Tk
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Price Field (Read-only) */}
            <Input
              name="price"
              value={selectedService?.price || ""}
              readOnly
              required
            />

            {/* Calendar for Date Selection */}
            <div className="relative">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left"
                  >
                    {date ? format(date, "PPP") : "Select a Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selected) => setDate(selected || new Date())} // ✅ Default to today
                    fromDate={new Date()}
                    className="rounded-md border shadow"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Slot Dropdown */}
            <Select onValueChange={setTime} required>
              <SelectTrigger>
                <SelectValue placeholder="Select Time Slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>
                    {slot}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="col-span-2 w-full">
            {submitLoading ? (
              <ClipLoader size={24} color="#fff" />
            ) : (
              "Submit Order"
            )}
          </Button>
        </form>
      </div>

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center bg-gray-50 bg-opacity-50">
          <ClipLoader size={50} color="#4B5563" />
        </div>
      )}
    </div>
  );
};

export default OrderPage;
