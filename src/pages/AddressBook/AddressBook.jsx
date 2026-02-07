import { useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, X } from "lucide-react";

const AddressBook = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "John Doe",
      address: "123, Green Valley Apartment, Near City Mall, Sector 18",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122001",
      phone: "+91 9876543210",
      type: "HOME",
      default: true,
    },
    {
      id: 2,
      name: "John Doe",
      address: "456, Business Park, Tower A, 5th Floor",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122002",
      phone: "+91 9876543210",
      type: "OFFICE",
      default: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    type: "HOME",
    default: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const saveAddress = () => {
    if (!formData.name || !formData.address || !formData.city) {
      alert("Please fill all required fields");
      return;
    }

    if (editId) {
      setAddresses(
        addresses.map((a) =>
          a.id === editId ? { ...formData, id: editId } : a
        )
      );
    } else {
      setAddresses([...addresses, { ...formData, id: Date.now() }]);
    }

    setShowForm(false);
    setEditId(null);
    setFormData({
      name: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      type: "HOME",
      default: false,
    });
  };

  const editAddress = (addr) => {
    setFormData(addr);
    setEditId(addr.id);
    setShowForm(true);
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const setDefault = (id) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        default: a.id === id,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">{">"}</span>
          <span className="font-medium text-gray-800">Address Book</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Saved Addresses</h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600"
          >
            + Add New Address
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="bg-white border rounded-xl p-6 shadow mb-8 relative">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <h3 className="font-bold mb-4">
              {editId ? "Edit Address" : "Add New Address"}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="border p-2 rounded" />
              <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
              <input name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="border p-2 rounded" />
              <input name="city" placeholder="City" value={formData.city} onChange={handleChange} className="border p-2 rounded" />
              <input name="state" placeholder="State" value={formData.state} onChange={handleChange} className="border p-2 rounded" />
              <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 rounded md:col-span-2" />
            </div>

            <div className="flex gap-4 mt-3">
              {["HOME", "OFFICE"].map((t) => (
                <label key={t} className="flex gap-2">
                  <input type="radio" name="type" value={t} checked={formData.type === t} onChange={handleChange} />
                  {t}
                </label>
              ))}
            </div>

            <label className="flex gap-2 mt-2">
              <input type="checkbox" name="default" checked={formData.default} onChange={handleChange} />
              Make default
            </label>

            <div className="flex gap-3 mt-4">
              <button onClick={saveAddress} className="bg-orange-500 text-white px-5 py-2 rounded hover:bg-orange-600">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="border px-5 py-2 rounded hover:bg-gray-100">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ADDRESS LIST */}
        <div className="grid md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className="border rounded-xl p-5 shadow-sm bg-white">

              <div className="flex justify-between mb-2">
                <div className="flex gap-2">
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded">{addr.type}</span>
                  {addr.default && (
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex gap-3 text-gray-500">
                  <Pencil onClick={() => editAddress(addr)} className="cursor-pointer hover:text-orange-500" size={18} />
                  <Trash2 onClick={() => deleteAddress(addr.id)} className="cursor-pointer hover:text-red-500" size={18} />
                </div>
              </div>

              <h3 className="font-semibold mb-1">{addr.name}</h3>
              <p className="text-sm text-gray-600">{addr.address}</p>
              <p className="text-sm text-gray-600">
                {addr.city}, {addr.state} - {addr.pincode}
              </p>
              <p className="text-sm text-gray-600 mt-1">Phone: {addr.phone}</p>

              {!addr.default && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="mt-4 w-full border border-orange-500 text-orange-500 py-2 rounded hover:bg-orange-50"
                >
                  Set as Default
                </button>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AddressBook;
