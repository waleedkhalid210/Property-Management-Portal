import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";
import axios from "axios";

function AddProperty() {

  const user_id = localStorage.getItem("userId")
  const [user, setUser] = useState({
    propertyTitle: "",
    propertyType: "",
    price: "",
    status: "",
    description: "",
    city: "",
    fullAddress: "",
    bedRooms: "",
    bathRooms: "",
    area: "",
    images: [],
    owner: user_id
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    const copyInfo = { ...user };

    if (type === "file") {
      copyInfo[name] = Array.from(files);
    } else {
      copyInfo[name] = value;
    }
    setUser(copyInfo);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.propertyTitle ||
      !user.propertyType ||
      !user.price ||
      !user.status ||
      !user.description ||
      !user.city ||
      !user.fullAddress ||
      !user.bedRooms ||
      !user.bathRooms ||
      !user.area ||
      user.images.length === 0 ||
      !user.owner
    ) {
      handleError("All Fields Are Required!");
      return;
    }

    if (user.images.length > 2) {
      handleError("You can upload a maximum of 2 images!");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("propertyTitle", user.propertyTitle);
      formData.append("propertyType", user.propertyType);
      formData.append("price", user.price);
      formData.append("status", user.status);
      formData.append("description", user.description);
      formData.append("city", user.city);
      formData.append("fullAddress", user.fullAddress);
      formData.append("bedRooms", user.bedRooms);
      formData.append("bathRooms", user.bathRooms);
      formData.append("area", user.area);
      formData.append("owner", user.owner);

      user.images.forEach((image) => {
        formData.append("images", image);
      });

      const url = "http://localhost:8000/api/property/addproperty";

      const response = await axios.post(url, formData);
      if (response.data.success) {
        handleSuccess(response.data.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);

      }else if(!success){
        handleError(message)
      }

    } catch (error) {
    const errors = error.response?.data?.errors;

    if (Array.isArray(errors)) {
        handleError(errors.join("\n"));
    } 
}
  };

  return (
    <>
      <div className="max-w-3xl mx-auto border-4 border-blue-400 mt-10 rounded-3xl py-6 px-8 shadow-lg bg-white mb-10">
        <div className="font-bold text-2xl text-center mb-6 text-gray-800">
          Add New Property
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label
              htmlFor="propertyTitle"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Property Title
            </label>
            <input
              type="text"
              name="propertyTitle"
              id="propertyTitle"
              value={user.propertyTitle}
              onChange={handleChange}
              placeholder="e.g. Luxury Villa in Downtown"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="propertyType"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Property Type
              </label>
              <select
                id="propertyType"
                name="propertyType"
                value={user.propertyType}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select property type</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="price"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={user.price}
                onChange={handleChange}
                placeholder="e.g. 250000"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="status"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={user.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select status</option>
                <option value="Active">Active</option>
                <option value="Sold">Sold</option>
                <option value="Rented">Rented</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                value={user.city}
                onChange={handleChange}
                placeholder="e.g. New York"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="fullAddress"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Full Address
              </label>
              <input
                type="text"
                name="fullAddress"
                id="fullAddress"
                value={user.fullAddress}
                onChange={handleChange}
                placeholder="e.g. 123 Main Street, Suite 4B"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="bedRooms"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Bedrooms
              </label>
              <input
                type="number"
                name="bedRooms"
                id="bedRooms"
                value={user.bedRooms}
                onChange={handleChange}
                placeholder="e.g. 3"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="bathRooms"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Bathrooms
              </label>
              <input
                type="number"
                name="bathRooms"
                id="bathRooms"
                value={user.bathRooms}
                onChange={handleChange}
                placeholder="e.g. 2"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="area"
                className="text-sm font-medium text-gray-700 mb-1"
              >
                Area (sq ft)
              </label>
              <input
                type="number"
                name="area"
                id="area"
                value={user.area}
                onChange={handleChange}
                placeholder="e.g. 1500"
                className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              value={user.description}
              onChange={handleChange}
              placeholder="Describe the property..."
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="images"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Images
            </label>
            <input
              type="file"
              name="images"
              id="images"
              multiple
              onChange={handleChange}
              placeholder="Upload Images"
              className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <Link to="/dashboard">
              <button
                type="button"
                className="bg-slate-200 px-5 py-2 hover:cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-slate-300 border-2 border-slate-200 rounded-full font-medium"
              >
                ← Back
              </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 hover:cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-blue-700 border-2 border-blue-600 rounded-full font-medium"
            >
              create
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddProperty;