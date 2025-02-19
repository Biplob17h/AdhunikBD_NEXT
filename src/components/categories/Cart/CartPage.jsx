import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";
import { handleLocalStorageIncrement } from "@/utils/addToLocalStroge/addToLocalStorage";
import { useRouter } from "next/navigation";

const mockCartItems = [
  {
    serviceId: "457674764",
    name: "Web Development Service",
    subCategoryName: "Development",
    subCategoryId: "478423762347823478",
    categoryName: "Web Development",
    categoryId: "478234782347823478",
    price: 5000,
    quantity: 2,
    discountType: "percentage",
    discountValue: 10, // 10% discount
  },
  {
    serviceId: "44776767",
    name: "SEO Optimization",
    subCategoryName: "Marketing",
    subCategoryId: "389472938479283479",
    categoryName: "Digital Marketing",
    categoryId: "987234987234987234",
    price: 3000,
    quantity: 1,
    discountType: "flat",
    discountValue: 500, // Flat 500 discount
  },
  {
    serviceId: "474767867",
    name: "Graphic Design Package",
    subCategoryName: "Design",
    subCategoryId: "239847928374982374",
    categoryName: "Creative Design",
    categoryId: "239847923847923847",
    price: 2500,
    quantity: 3,
    discountType: null,
    discountValue: 0, // No discount
  },
];

const CartPage = ({ localRef, setLocalRef }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("AdhunikServices"));
    setCartItems(items);
  }, [localRef]);

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => {
      let discountedPrice = item.price;
      if (item.discountType === "percentage") {
        discountedPrice = item.price - (item.price * item.discountValue) / 100;
      } else if (item.discountType === "flat") {
        discountedPrice = item.price - item.discountValue;
      }
      return total + discountedPrice * item.quantity;
    }, 0);
    setTotalAmount(totalAmount);
  }, [localRef]);

  const handleIncrement = (itemId) => {
    const services = JSON.parse(localStorage.getItem("AdhunikServices"));
    const selectedService = services.filter(
      (service) => service.serviceId === itemId,
    );
    const otherServices = services.filter(
      (service) => service.serviceId !== itemId,
    );

    selectedService[0].quantity++;

    const updatedData = [...otherServices, selectedService[0]];

    localStorage.removeItem("AdhunikServices");
    localStorage.setItem("AdhunikServices", JSON.stringify(updatedData));
    setLocalRef((prev) => prev + 1);
  };
  const handleDecrement = (itemId) => {
    const services = JSON.parse(localStorage.getItem("AdhunikServices"));
    const selectedService = services.filter(
      (service) => service.serviceId === itemId,
    );
    const otherServices = services.filter(
      (service) => service.serviceId !== itemId,
    );

    selectedService[0].quantity--;

    const updatedData = [...otherServices, selectedService[0]];

    localStorage.removeItem("AdhunikServices");
    localStorage.setItem("AdhunikServices", JSON.stringify(updatedData));
    setLocalRef((prev) => prev + 1);
  };
  const handleDeleteService = (itemId) => {
    const services = JSON.parse(localStorage.getItem("AdhunikServices"));
    const updatedData = services.filter(
      (service) => service.serviceId !== itemId,
    );

    localStorage.removeItem("AdhunikServices");
    localStorage.setItem("AdhunikServices", JSON.stringify(updatedData));
    setLocalRef((prev) => prev + 1);
  };

  const router = useRouter();

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <ShoppingCart className="h-5 w-5" /> Your Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="space-y-3">
          {cartItems.map((item) => {
            const hasDiscount = item.discountType && item.discountValue > 0;
            let discountedPrice = item.price;
            if (item.discountType === "percentage") {
              discountedPrice =
                item.price - (item.price * item.discountValue) / 100;
            } else if (item.discountType === "flat") {
              discountedPrice = item.price - item.discountValue;
            }

            return (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-md border bg-white p-3 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium">{item.subCategoryName}</p>
                  <p className="text-xs text-gray-500">{item.name}</p>
                  <p className="text-xs text-gray-700">
                    {hasDiscount ? (
                      <>
                        <span className="text-gray-500 line-through">
                          ৳{item.price}
                        </span>
                        <span className="ml-2 font-bold">
                          ৳{discountedPrice}
                        </span>
                      </>
                    ) : (
                      <span className="font-bold">৳{item.price}</span>
                    )}{" "}
                    x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => {
                      handleDecrement(item?.serviceId);
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center text-sm">
                    {item.quantity}
                  </span>
                  <Button
                    onClick={() => {
                      handleIncrement(item?.serviceId);
                    }}
                    variant="outline"
                    size="icon"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={() => {
                      handleDeleteService(item?.serviceId);
                    }}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}

          {/* Pricing Summary */}
          <div className="border-t p-3 text-sm font-medium">
            <div className="flex items-center justify-between">
              <span>Total Amount:</span>
              <span>৳{totalAmount}</span>
            </div>
          </div>

          <Button onClick={()=>{router.push('/checkout')}} className="w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
            Proceed to Checkout
          </Button>
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center text-gray-500">
          <ShoppingCart className="h-12 w-12 opacity-50" />
          <p className="mt-2 text-sm">Your cart is empty</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
