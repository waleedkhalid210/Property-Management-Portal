import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { handleSuccess, handleError } from "../../utils";

function EditProperty({ property, showModalofEdit, setshowModalofEdit, onUpdate }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    propertyTitle: property?.propertyTitle || "",
    propertyType: property?.propertyType || "",
    price: property?.price || "",
    status: property?.status || "",
    description: property?.description || "",
    city: property?.city || "",
    fullAddress: property?.fullAddress || "",
    bedRooms: property?.bedRooms || "",
    bathRooms: property?.bathRooms || "",
    area: property?.area || "",
    images: property?.images || [],
    owner: property?.owner || ""
  });

  if (!showModalofEdit) return null;

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

      if (Array.isArray(user.images)) {
        user.images.forEach((image) => {
          if (image instanceof File) {
            formData.append("images", image);
          }
        });
      }

      const url = `http://localhost:8000/api/property/editproperty/${property._id}`;
      const response = await axios.put(url, formData);

      const { message, success, property: updatedProperty } = response.data;

      if (success) {
        handleSuccess(message || "Property updated successfully!");
        setshowModalofEdit(false);
        if (onUpdate && updatedProperty) {
          onUpdate(updatedProperty);
        }
      } else {
        handleError(message || "Failed to update property");
      }
    } catch (error) {
      handleError(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="max-w-3xl w-full max-h-[90vh] overflow-y-auto py-6 px-8 bg-white relative">
        <button
          type="button"
          onClick={() => setshowModalofEdit(false)}
          className="text-gray-400 hover:text-gray-700 text-2xl font-bold w-8 h-8 rounded-full hover:bg-gray-100 absolute right-4 top-4 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <div className="font-bold text-2xl text-center mb-6 text-gray-800">
          Edit Property
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
              Images (Optional to replace)
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
            <button
              type="button"
              onClick={() => setshowModalofEdit(false)}
              className="bg-slate-200 px-5 py-2 hover:cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-slate-300 border-2 border-slate-200 rounded-full font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-6 hover:cursor-pointer hover:shadow-lg transition-all duration-300 hover:bg-blue-700 border-2 border-blue-600 rounded-full font-medium cursor-pointer"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProperty;
