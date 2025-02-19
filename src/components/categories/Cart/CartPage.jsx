import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Minus, Plus } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      service: "1 - 2 Ton",
      price: 500,
      quantity: 1,
      subCategory: "Ac Basic wash",
      discount: 5,
      discountType: "percentage",
    },
    {
      id: 2,
      service: "1 - 2 Ton",
      price: 1000,
      quantity: 1,
      subCategory: "Ac Jet wash",
      discount: 200,
      discountType: "flat",
    },
  ]);

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate discount for each item
  const calculateDiscountedPrice = (item) => {
    let discountAmount =
      item.discountType === "percentage"
        ? (item.price * item.discount) / 100
        : item.discount;
    return item.price - discountAmount;
  };

  // Total calculations
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalDiscount = cartItems.reduce(
    (discount, item) =>
      discount +
      (item.discountType === "percentage"
        ? (item.price * item.discount) / 100
        : item.discount) *
        item.quantity,
    0,
  );
  const totalAfterDiscount = totalAmount - totalDiscount;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="mb-4 flex items-center gap-2 text-lg font-semibold">
        <ShoppingCart className="h-5 w-5" /> Your Cart
      </h1>

      {cartItems.length > 0 ? (
        <div className="space-y-3">
          {cartItems.map((item) => {
            const discountedPrice = calculateDiscountedPrice(item);
            return (
              <div
                key={item.id}
                className="flex items-center justify-between rounded-md border bg-white p-3 shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium">{item.subCategory}</p>
                  <p className="text-xs text-gray-500">{item.service}</p>
                  <p className="text-xs text-gray-700">
                    <span className="line-through text-red-500">৳{item.price}</span>{" "}
                    <span className="font-bold">৳{discountedPrice}</span> x {item.quantity}
                  </p>
                  {item.discount > 0 && (
                    <p className="text-xs text-green-500">
                      {item.discountType === "percentage"
                        ? `(${item.discount}% off)`
                        : `(৳${item.discount} off)`}{" "}
                      per unit
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-6 text-center text-sm">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeItem(item.id)}
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
            {totalDiscount > 0 && (
              <>
                <div className="flex items-center justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-৳{totalDiscount}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-2 font-semibold">
                  <span>Total After Discount:</span>
                  <span>৳{totalAfterDiscount}</span>
                </div>
              </>
            )}
          </div>

          <Button className="w-full rounded-lg bg-blue-600 py-2 text-sm text-white hover:bg-blue-700">
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
