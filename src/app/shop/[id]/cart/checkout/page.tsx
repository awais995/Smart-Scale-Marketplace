"use client";
import { useState, useEffect } from "react";

// Checkout Page
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
    // Retrieve cart items from localStorage
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(savedCart);

    // Calculate total price
    const calculateTotal = savedCart.reduce(
      (acc:any, item:any) => acc + item.price * item.quantity,
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
    setError(""); // Clear previous errors

    // Simple validation
    if (!billingInfo.name || !billingInfo.email || !billingInfo.address || !paymentInfo.cardNumber) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    // Simulate a network request to process the order
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
    <div className="checkout container mx-auto p-6 max-w-lg bg-white shadow-md rounded-md">
      <div></div>
      <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

      {/* Order Summary */}
      <div className="order-summary mb-6">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.name} (x{item.quantity})</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Billing Information */}
      <div className="billing-info mb-6">
        <h3 className="text-lg font-semibold">Billing Information</h3>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={billingInfo.name}
          onChange={handleBillingChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={billingInfo.email}
          onChange={handleBillingChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={billingInfo.address}
          onChange={handleBillingChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={billingInfo.city}
          onChange={handleBillingChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={billingInfo.postalCode}
          onChange={handleBillingChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
      </div>

      {/* Payment Information */}
      <div className="payment-info mb-6">
        <h3 className="text-lg font-semibold">Payment Information</h3>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={paymentInfo.cardNumber}
          onChange={handlePaymentChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          value={paymentInfo.expiryDate}
          onChange={handlePaymentChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
        <input
          type="text"
          name="cvv"
          placeholder="CVV"
          value={paymentInfo.cvv}
          onChange={handlePaymentChange}
          className="w-full p-2 mb-4 border rounded-md"
        />
      </div>

      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className={`w-full py-3 rounded-md ${isLoading ? "bg-gray-500" : "bg-black text-white"} hover:bg-gray-800`}
      >
        {isLoading ? "Processing..." : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
