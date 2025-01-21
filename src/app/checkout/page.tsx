"use client";
import { useState, useEffect } from "react";

const Checkout: React.FC = () => {
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    const calculateTotal = savedCart.reduce(
      (acc: any, item: any) => acc + item.price * item.quantity,
      0
    );
    setTotal(calculateTotal);
  }, []);

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError("");

    if (!billingInfo.name || !billingInfo.email || !billingInfo.address || !paymentInfo.cardNumber) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Order placed", { billingInfo, paymentInfo, cart });
      setTimeout(() => {
        setIsLoading(false);
        alert("Order successfully placed!");
      }, 2000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="checkout container mx-auto p-6 max-w-5xl bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Checkout</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="order-summary p-4 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || "/placeholder.jpg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                  <span>{item.name} (x{item.quantity})</span>
                </div>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Billing and Payment Information */}
        <div className="space-y-8">
          {/* Billing Information */}
          <div className="billing-info">
            <h3 className="text-xl font-semibold mb-4">Billing Information</h3>
            <div className="space-y-4">
              {["name", "email", "address", "city", "postalCode"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={(billingInfo as any)[field]}
                  onChange={handleBillingChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="payment-info">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="space-y-4">
              {["cardNumber", "expiryDate", "cvv"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  value={(paymentInfo as any)[field]}
                  onChange={handlePaymentChange}
                  className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className="text-red-600 my-4">{error}</div>}

      {/* Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-3 rounded-md font-semibold text-white ${
            isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Processing..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
