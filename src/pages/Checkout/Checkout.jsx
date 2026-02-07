import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(1);
  const [editId, setEditId] = useState(null);

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      phone: "9876543210",
      pincode: "122001",
      line1: "123, Green Valley Apartment",
      line2: "Near City Mall, Sector 18",
      city: "Gurugram",
      state: "Haryana",
      type: "Home",
      default: true,
    },
  ]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pincode: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    type: "Home",
    default: false,
  });

  const cartItems = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      price: 3999,
      oldPrice: 5999,
      qty: 1,
      image: "/src/assets/products/p1.jpg",
      color: "Black",
    },
    {
      id: 2,
      title: "Smart Fitness Watch",
      price: 12999,
      oldPrice: 15999,
      qty: 2,
      image: "/src/assets/products/p2.jpg",
      color: "Space Gray",
    },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const saveAddress = () => {
    if (!formData.name || !formData.phone || !formData.line1 || !formData.city) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      setAddresses(
        addresses.map((addr) =>
          addr.id === editId ? { ...formData, id: editId } : addr
        )
      );
      setEditId(null);
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }

    setFormData({
      name: "",
      phone: "",
      pincode: "",
      line1: "",
      line2: "",
      city: "",
      state: "",
      type: "Home",
      default: false,
    });

    setShowForm(false);
  };

  const editAddress = (addr) => {
    setFormData(addr);
    setEditId(addr.id);
    setShowForm(true);
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50">

      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link to="/" className="hover:text-orange-500">Home</Link> {" > "}
        <Link to="/cart" className="hover:text-orange-500">Cart</Link> {" > "}
        <span className="text-gray-800 font-medium">Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">

          {/* Delivery Address */}
          <div className="bg-white p-5 rounded shadow">
            <div className="flex justify-between mb-4">
              <h2 className="font-bold text-lg">Delivery Address</h2>
              <button
                onClick={() => setShowForm(!showForm)}
                className="text-orange-500 text-sm"
              >
                + Add New Address
              </button>
            </div>

            {/* FORM */}
            {showForm && (
              <div className="border rounded p-5 mb-4 space-y-3">
                <h2 className="text-lg font-bold">Add New Address</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                  <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
                </div>

                <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="border p-2 w-full rounded" />
                <input name="line1" placeholder="Address Line 1" value={formData.line1} onChange={handleChange} className="border p-2 w-full rounded" />
                <input name="line2" placeholder="Address Line 2" value={formData.line2} onChange={handleChange} className="border p-2 w-full rounded" />

                <div className="grid grid-cols-2 gap-3">
                  <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 rounded" />
                  <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2 rounded" />
                </div>

                <div className="flex gap-4">
                  {["Home", "Office", "Other"].map((t) => (
                    <label key={t} className="flex items-center gap-2">
                      <input type="radio" name="type" value={t} checked={formData.type === t} onChange={handleChange} />
                      {t}
                    </label>
                  ))}
                </div>

                <label className="flex gap-2 items-center">
                  <input type="checkbox" name="default" checked={formData.default} onChange={handleChange} />
                  Make this my default address
                </label>

                <div className="flex gap-3">
                  <button onClick={saveAddress} className="bg-orange-500 text-white px-6 py-2 rounded">
                    Save Address
                  </button>
                  <button onClick={() => setShowForm(false)} className="border px-6 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* ADDRESS LIST */}
            {addresses.map((addr) => (
              <div key={addr.id}
                className={`border rounded p-4 mb-3 ${selectedAddress === addr.id ? "border-orange-500 bg-orange-50" : ""}`}
              >
                <div className="flex justify-between">
                  <label className="flex gap-3 cursor-pointer">
                    <input type="radio" checked={selectedAddress === addr.id} onChange={() => setSelectedAddress(addr.id)} />
                    <div>
                      <h3 className="font-semibold">{addr.name}</h3>
                      <p className="text-sm">{addr.line1}, {addr.line2}</p>
                      <p className="text-sm">{addr.city}, {addr.state} - {addr.pincode}</p>
                      <p className="text-sm">Phone: {addr.phone}</p>
                      <span className="text-xs bg-gray-200 px-2 rounded">{addr.type}</span>
                    </div>
                  </label>

                  <div className="flex gap-3 text-sm">
                    <button onClick={() => editAddress(addr)} className="text-blue-500">Edit</button>
                    <button onClick={() => deleteAddress(addr.id)} className="text-red-500">Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Items */}
          <div className="bg-white p-5 rounded shadow">
            <h2 className="font-bold mb-4">Order Items</h2>
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between border-b py-4">
                <div className="flex gap-4">
                  <img src={item.image} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm">Color: {item.color}</p>
                    <p>₹{item.price} <span className="line-through text-gray-400">₹{item.oldPrice}</span></p>
                  </div>
                </div>
                <p>Qty: {item.qty}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="bg-white p-5 rounded shadow h-fit">
          <h2 className="font-bold text-lg mb-4">Price Details</h2>

          <div className="space-y-2">
            <div className="flex justify-between"><span>Price</span><span>₹37,997</span></div>
            <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹8,000</span></div>
            <div className="flex justify-between"><span>Delivery</span><span className="text-green-600">FREE</span></div>
            <hr />
            <div className="flex justify-between font-bold"><span>Total</span><span>₹29,997</span></div>
          </div>

          {/* PAYMENT BUTTON */}
          <button
            onClick={() => navigate("/payment")}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded font-semibold"
          >
            Continue to Payment
          </button>
        </div>

      </div>
    </div>
  );
};

export default Checkout;
