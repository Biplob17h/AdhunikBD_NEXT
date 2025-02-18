"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IoIosArrowForward } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import useUser from "@/hooks/UserHook";
import { ClipLoader } from "react-spinners";
import { Textarea } from "@/components/ui/textarea";

const timeSlots = Array.from({ length: 24 }, (_, i) => {
  const startHour = i % 12 || 12;
  const endHour = (i + 1) % 12 || 12;
  const period = i < 12 ? "am" : "pm";
  const nextPeriod = i + 1 < 12 ? "am" : "pm";

  return `${startHour}${period} - ${endHour}${nextPeriod}`;
});

const locationOptions = ["Dhaka"];

const DetailSection = ({ subCategories, category }) => {
  const { user } = useUser();
  const router = useRouter();
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  

 

  useEffect(() => {
    if (selectedSubCategory) {
      setLoading(true);
      fetch(`/api/subcategory/service?subCategoryId=${selectedSubCategory}`)
        .then((res) => res.json())
        .then((data) => {
          setServices(data.data);
          setLoading(false);
        });
    }
  }, [selectedSubCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitLoading(true);

    if (!date || !time || !selectedService) {
      setSubmitLoading(false);
      return toast.error("Please select a date, time, and service");
    }

    const order = {
      customerName: e.target.customerName.value,
      customerPhone: e.target.customerPhone.value,
      customerEmail: e.target.customerEmail.value,
      location: e.target.location.value,
      area: e.target.area.value,
      road: e.target.road.value,
      house: e.target.house.value,
      problem: e.target.problem.value,
      service: selectedService?._id,
      serviceName: selectedService?.name,
      price: selectedService?.price,
      date: format(date, "yyyy-MM-dd"),
      time,
      user: user._id,
      subCategoryId: selectedSubCategory,
      totalPrice: selectedService?.price,
    };
    

    fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        
        setSubmitLoading(false);
        if (data.status === "success") {
          toast.success("Order placed successfully");
          e.target.reset();
          router.push('/profile/user/orders')
        }
      });
  };

  return (
    <div>
      <div className="mx-auto mt-10 w-full">
        <h3 className="mb-4 text-[26px] font-semibold leading-[48px] text-black/75 underline decoration-primary decoration-wavy underline-offset-8">
          Details
        </h3>

        <div className="flex gap-10">
          <div className="grid grid-cols-1">
            <div className="space-y-6 lg:col-span-2">
              <div>
                <img
                  src="/images/categories/details/details-tab-img.png"
                  alt="details-service"
                  className="max-h-[372px] w-full rounded-2xl object-cover"
                />
              </div>
              <p className="text-base text-black/60 lg:leading-[32px]">
                Plumbing and sanitary services are essential for ensuring the
                proper functioning of water supply, drainage, and sanitation
                systems in residential, commercial, and industrial settings...
              </p>
            </div>
          </div>
          {/* Order Form */}
          <div className="w-full rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Place Your Order</h2>
            <form onSubmit={handleSubmit} className="">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Subcategory Selection */}
                  <Select onValueChange={setSelectedSubCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories.map((sub) => (
                        <SelectItem key={sub._id} value={sub._id}>
                          {sub.subCategory}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Service Selection */}
                  <Select
                    onValueChange={(value) => {
                      const service = services.find((s) => s.name === value);
                      setSelectedService(service || null);
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

                  {/* Price (Read-only) */}
                  <Input
                    name="price"
                    value={selectedService?.price || ""}
                    readOnly
                    required
                  />

                  {/* Address Inputs */}
                  <Input
                    name="customerName"
                    placeholder="Customer Name"
                    defaultValue={user?.name}
                    required
                  />
                  <Input
                    name="customerPhone"
                    defaultValue={user?.phone}
                    placeholder="Customer Phone"
                    required
                  />

                  {/* Date Selection */}
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
                        onSelect={(selected) => setDate(selected || new Date())}
                        fromDate={new Date()}
                        className="rounded-md border shadow"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <Input
                    name="customerEmail"
                    defaultValue={user?.email}
                    placeholder="Customer Email"
                    required
                  />
                  {/* Location (Fixed to Dhaka) */}
                  <Select name="location" defaultValue="Dhaka" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Dhaka" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dhaka">Dhaka</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* Address Inputs */}
                  <Input name="area" placeholder="Area" required />
                  <Input name="road" placeholder="Road" required />
                  <Input name="house" placeholder="House" required />

                  {/* Time Selection */}
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
              </div>
              <div>
                <Textarea
                  name="problem"
                  placeholder="describe your problem"
                  className="my-5 border"
                  required
                ></Textarea>
              </div>

              {/* Full-width Submit Button */}
              <div className="col-span-1 md:col-span-2">
                <Button type="submit" className="w-full">
                  {submitLoading ? (
                    <ClipLoader size={24} color="#fff" />
                  ) : (
                    "Submit Order"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Loading Spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50">
          <ClipLoader size={50} color="#4B5563" />
        </div>
      )}
    </div>
  );
};

export default DetailSection;
