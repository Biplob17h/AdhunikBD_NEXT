"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoIosAdd, IoIosArrowBack, IoIosRemove } from "react-icons/io";

const CartModal = () => {
  const [quantity, setQuantity] = useState(1);
  const price = 200;

  const handleAdd = () => setQuantity(quantity + 1);
  const handleRemove = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <div className="lg:p-6">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-primary"
        >
          <IoIosArrowBack className="mr-2" />
          <span>Sink Issues</span>
        </button>
        <h2 className="lg:text-lg font-semibold text-black/75 text-base">
          Plumbing & Sanitary Services in{" "}
          <span className="text-primary">Gulshan</span>
        </h2>
      </div>

      {/* Service Options */}
      <div className="mb-6">
        <h3 className="mb-2 text-base font-medium text-black/75">
          Select service -
        </h3>
        <div className="space-y-4">
          {[
            { id: 1, name: "Sink Installation", price: 700 },
            { id: 2, name: "Sink Repair", price: 500 },
            { id: 3, name: "Sink Blockage", price: 800 },
          ].map((service) => (
            <div
              key={service.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <span className="text-black/75 line-clamp-1">{service.name}</span>
              <span className="font-medium text-primary">
                ৳ {service.price} / unit
              </span>
              <Button className="bg-primary text-white">Add +</Button>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Section */}
      <div className="mb-6 space-y-4 rounded-lg bg-gray-100 p-4">
        <div className="flex flex-wrap items-center justify-between">
          <span className="text-black/75">Plumbing Check Up</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleRemove}
              className="rounded-full border bg-white p-2 text-black/50"
            >
              <IoIosRemove />
            </button>
            <span>{quantity} unit</span>
            <button
              onClick={handleAdd}
              className="rounded-full border bg-white p-2 text-black/50"
            >
              <IoIosAdd />
            </button>
          </div>
          <span className="font-medium text-primary">৳ {price * quantity}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-medium text-black/60">Subtotal</span>
          <span className="font-medium text-primary">৳ {price * quantity}</span>
        </div>
      </div>

      {/* Checkout Button */}
      <div className="text-end">
        <Button className="bg-primary py-3 text-white">
          Proceed To Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartModal;
