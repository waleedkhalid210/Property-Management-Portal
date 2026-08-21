import React, { useState } from 'react';
import axios from 'axios';
import { handleSuccess, handleError } from '../../utils';
import EditProperty from './EditProperty';

function MyPropertyCard({ property, onDelete, onUpdate }) {
  const [showModalofView, setshowModalofView] = useState(false);
  const [showModalofDelete, setshowModalofDelete] = useState(false);
  const [showModalofEdit, setshowModalofEdit] = useState(false);

  const imageUrl = property.images && property.images.length > 0
    ? `http://localhost:8000/uploads/${property.images[0]}`
    : "";

  const handleYesDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/property/deleteproperty/${property._id}`);
      if (response.data.success) {
        handleSuccess(response.data.message);
        onDelete(property._id);
      } else {
        handleError(response.data.message || "Failed to delete property.");
      }
    } catch (error) {
      handleError("Failed to delete property.");
    }
  };

  return (
    <>
      <div className='grid grid-cols-4 items-center text-center px-4 py-3'>
        <div className='flex justify-center'>
          {imageUrl ? (
            <img src={imageUrl} className='w-20 h-20 object-cover rounded-sm' alt="property" />
          ) : (
            <span className="text-sm font-semibold text-gray-500">No Image</span>
          )}
        </div>

        <div className='font-bold text-gray-800'>
          ${property.price.toLocaleString()}
        </div>

        <div
          className={`font-bold ${property.status === "Active"
            ? "text-emerald-600"
            : "text-amber-600"
            }`}
        >
          {property.status}
        </div>

        <div className='flex justify-center gap-1'>
          <button
            onClick={() => setshowModalofView(true)}
            className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer'
          >
            View
          </button>
          <button onClick={() => setshowModalofEdit(true)} className='px-3 py-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors text-sm font-medium cursor-pointer'>
            Edit
          </button>
          <button onClick={() => setshowModalofDelete(true)} className='px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer'>
            Delete
          </button>
        </div>
      </div>

      {showModalofView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 relative">
            <button
              onClick={() => setshowModalofView(false)}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold w-8 h-8 rounded-full hover:bg-gray-100 absolute right-3"
            >
              ✕
            </button>

            <div className="mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full uppercase tracking-wider">
                {property.propertyType}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                {property.propertyTitle}
              </h2>
              <p className="text-sm text-gray-500">
                📍 {property.fullAddress}, {property.city}
              </p>
            </div>

            {property.images && property.images.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Images</h4>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {property.images.map((img, index) => (
                    <img
                      key={index}
                      src={`http://localhost:8000/uploads/${img}`}
                      alt="property detail"
                      className="w-48 h-32 object-cover rounded-lg border border-gray-200 shadow-xs"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-xl mb-6 text-center">
              <div>
                <span className="text-xs text-gray-500 block">Price</span>
                <span className="font-bold text-lg text-blue-600">${property.price.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Status</span>
                <span className="font-bold text-base text-emerald-600">{property.status}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Bedrooms</span>
                <span className="font-bold text-base text-gray-800">{property.bedRooms}</span>
              </div>
              <div>
                <span className="text-xs text-gray-500 block">Bathrooms</span>
                <span className="font-bold text-base text-gray-800">{property.bathRooms}</span>
              </div>
            </div>

            <div className="mb-6">
              <span className="text-xs text-gray-500 block mb-1 font-semibold">Area</span>
              <span className="text-gray-800 font-medium">{property.area} sq ft</span>
            </div>

            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">Description</h4>
              <p className="text-gray-600 text-sm">
                {property.description}
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-100">
              <button
                onClick={() => setshowModalofView(false)}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModalofDelete && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4'>
          <div className='max-w-[90vh] mx-auto p-5 rounded-sm shadow-lg bg-white font-bold text-center'>
            <p className="mb-3 text-gray-800">Are You Sure You Want To Delete The Property?</p>

            <div className='flex items-center justify-center gap-5 mt-3'>
              <button onClick={handleYesDelete} className='bg-green-500 hover:bg-green-600 cursor-pointer text-white px-3 py-1 rounded-sm font-semibold'>Yes</button>
              <button onClick={() => setshowModalofDelete(false)} className='hover:bg-slate-400 cursor-pointer text-black px-3 py-1 rounded-sm font-semibold'>No</button>
            </div>
          </div>
        </div>
      )}

      {showModalofEdit && (
        <EditProperty
          property={property}
          showModalofEdit={showModalofEdit}
          setshowModalofEdit={setshowModalofEdit}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}

export default MyPropertyCard;