"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface BillingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState<BillingInfo>({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if (Array.isArray(savedCart)) {
        setCart(savedCart);
        const calculateTotal = savedCart.reduce(
          (acc: number, item: CartItem) => acc + item.price * item.quantity,
          0
        );
        setTotal(calculateTotal);
      } else {
        throw new Error("Invalid cart data");
      }
    } catch (err) {
      console.error("Failed to load cart data:", err);
      setCart([]);
      setTotal(0);
    }
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateInputs = (): boolean => {
    // Billing validation
    if (
      !billingInfo.name.trim() ||
      !billingInfo.email.trim() ||
      !billingInfo.address.trim() ||
      !billingInfo.city.trim() ||
      !billingInfo.postalCode.trim()
    ) {
      setError("All billing fields are required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(billingInfo.email)) {
      setError("Invalid email address.");
      return false;
    }
    if (!/^\d{5,6}$/.test(billingInfo.postalCode)) {
      setError("Postal code must be 5 or 6 digits.");
      return false;
    }

    // Payment validation
    if (
      !paymentInfo.cardNumber.trim() ||
      !paymentInfo.expiryDate.trim() ||
      !paymentInfo.cvv.trim()
    ) {
      setError("All payment fields are required.");
      return false;
    }
    if (!/^\d{16}$/.test(paymentInfo.cardNumber)) {
      setError("Card number must be a valid 16-digit number.");
      return false;
    }
    if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
      setError("Expiry date must be in MM/YY format.");
      return false;
    }
    if (!/^\d{3}$/.test(paymentInfo.cvv)) {
      setError("CVV must be a valid 3-digit number.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    if (!validateInputs()) {
      setIsLoading(false);
      return;
    }

    try {
      console.log("Order placed:", { billingInfo, paymentInfo, cart });
      setTimeout(() => {
        setIsLoading(false);
        alert("Order successfully placed!");
        localStorage.removeItem("cart");
        setCart([]);
        setTotal(0);
      }, 2000);
    } catch (err) {
      console.error("Order submission failed:", err);
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout container mx-auto p-6 max-w-5xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="order-summary p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    width={700}
                    height={600}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                </div>
                <span className="font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="billing-info">
            <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
            <div className="space-y-4">
              {["name", "email", "address", "city", "postalCode"].map(
                (field) => (
                  <input
                    key={field}
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    value={billingInfo[field as keyof BillingInfo]}
                    onChange={handleBillingChange}
                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                )
              )}
            </div>
          </div>

          <div className="payment-info">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              {["cardNumber", "expiryDate", "cvv"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={paymentInfo[field as keyof PaymentInfo]}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && <div className="text-red-600 my-4">{error}</div>}

      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-3 rounded-md font-semibold text-white ${
            isLoading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
