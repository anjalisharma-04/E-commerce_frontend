import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  Headphones,
  LogOut,
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const [editMode, setEditMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    gender: "Male",
    dob: "1990-01-15",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FFF7ED]">

      {/* 🔹 Breadcrumb Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 text-sm text-gray-500">
          <Link to="/" className="hover:text-orange-500">Home</Link>
          <span className="mx-2">{">"}</span>
          <span className="text-gray-800 font-medium">My Profile</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[280px_1fr] gap-6">

          {/* LEFT SIDEBAR */}
          <div className="bg-white rounded-xl shadow p-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-xl font-bold">
                J
              </div>
              <div>
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.email}</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <button className="flex items-center gap-2 w-full px-3 py-2 bg-orange-50 text-orange-500 rounded">
                <User size={16} /> My Profile
              </button>

              <button onClick={() => navigate("/my-orders")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded">
                <ShoppingBag size={16} /> My Orders
              </button>

              <button onClick={() => navigate("/wishlist")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded">
                <Heart size={16} /> Wishlist
              </button>

              <button onClick={() => navigate("/address-book")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded">
                <MapPin size={16} /> Address Book
              </button>

              <button onClick={() => navigate("/support")}
                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 rounded">
                <Headphones size={16} /> Support
              </button>

              <button onClick={() => navigate("/login")}
                className="flex items-center gap-2 w-full px-3 py-2 text-red-500 hover:bg-red-50 rounded">
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">

            {/* PERSONAL INFO */}
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Personal Information</h2>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="border border-orange-500 text-orange-500 px-4 py-1 rounded hover:bg-orange-50"
                >
                  {editMode ? "Cancel" : "Edit Profile"}
                </button>
              </div>

              {/* VIEW MODE */}
              {!editMode && (
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-gray-500">Full Name</p>
                    <p className="font-semibold">{profile.name}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Email Address</p>
                    <p className="font-semibold">{profile.email}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Phone Number</p>
                    <p className="font-semibold">{profile.phone}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Gender</p>
                    <p className="font-semibold">{profile.gender}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Date of Birth</p>
                    <p className="font-semibold">15 January 1990</p>
                  </div>
                </div>
              )}

              {/* EDIT MODE FORM */}
              {editMode && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-500">Full Name</label>
                      <input
                        name="name"
                        value={profile.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Email Address</label>
                      <input
                        name="email"
                        value={profile.email}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Phone Number</label>
                      <input
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Gender</label>
                      <div className="flex gap-4 mt-2">
                        {["Male", "Female", "Other"].map((g) => (
                          <label key={g} className="flex items-center gap-1">
                            <input
                              type="radio"
                              name="gender"
                              value={g}
                              checked={profile.gender === g}
                              onChange={handleChange}
                            />
                            {g}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-sm text-gray-500">Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={profile.dob}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="bg-orange-500 text-white px-6 py-2 rounded">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="border px-6 py-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* ACCOUNT SETTINGS */}
            <div className="bg-white rounded-xl shadow p-6 space-y-4">
              <h2 className="text-lg font-bold">Account Settings</h2>

              <div className="flex justify-between items-center border p-4 rounded">
                <div>
                  <p className="font-medium">Change Password</p>
                  <p className="text-sm text-gray-500">Update your password regularly</p>
                </div>
                <button className="border px-4 py-1 rounded">Change</button>
              </div>

              <div className="flex justify-between items-center border p-4 rounded">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive updates about your orders</p>
                </div>
                <button
                  onClick={() => setEmailNotif(!emailNotif)}
                  className={`w-12 h-6 rounded-full ${emailNotif ? "bg-orange-500" : "bg-gray-300"} relative`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${emailNotif ? "right-1" : "left-1"}`}></span>
                </button>
              </div>

              <div className="flex justify-between items-center border p-4 rounded">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-gray-500">Get order updates via SMS</p>
                </div>
                <button
                  onClick={() => setSmsNotif(!smsNotif)}
                  className={`w-12 h-6 rounded-full ${smsNotif ? "bg-orange-500" : "bg-gray-300"} relative`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition ${smsNotif ? "right-1" : "left-1"}`}></span>
                </button>
              </div>

              {/* DELETE ACCOUNT */}
              <div className="border border-red-300 bg-red-50 p-4 rounded flex justify-between items-center">
                <div>
                  <p className="font-medium text-red-600">Delete Account</p>
                  <p className="text-sm text-red-500">Permanently delete your account and data</p>
                </div>
                <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
