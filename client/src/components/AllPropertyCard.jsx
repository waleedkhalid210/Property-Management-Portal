import React, { useState } from 'react';

function AllPropertyCard({ property }) {
  const [showModalofView, setshowModalofView] = useState(false);

  const imageUrl = property.images && property.images.length > 0
    ? `http://localhost:8000/uploads/${property.images[0]}`
    : "";

  return (
    <>
      <div onClick={() => setshowModalofView(true)} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group">
        <div className="relative h-48 w-full bg-gray-200 overflow-hidden">
            <img
              src={imageUrl}
              alt={property.propertyTitle}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {property.propertyType}
          </span>
          <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
            {property.status}
          </span>
        </div>

        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-800 uppercase mb-1" title={property.propertyTitle}>
              {property.propertyTitle}
            </h3>
            <p className="text-gray-500 text-xs mb-3 uppercase">
              📍 {property.fullAddress}, {property.city}
            </p>

            <div className="text-xl font-extrabold text-blue-600 mb-3">
              ${property.price?.toLocaleString()}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 py-2 border-t border-gray-100 text-center text-xs text-gray-600 font-medium">
            <div>
              <span className="block text-gray-400 text-[10px] uppercase">Bedrooms</span>
              🛏️ {property.bedRooms}
            </div>
            <div>
              <span className="block text-gray-400 text-[10px] uppercase">Bathrooms</span>
              🚿 {property.bathRooms}
            </div>
            <div>
              <span className="block text-gray-400 text-[10px] uppercase">Area</span>
              📐 {property.area} sq ft
            </div>
          </div>
        </div>
      </div>

      {showModalofView && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto p-5 relative shadow-2xl">
            <button
              onClick={() => setshowModalofView(false)}
              className="text-gray-400 hover:text-gray-700 text-2xl font-bold w-8 h-8 rounded-full hover:bg-gray-100 absolute right-3 top-3 flex items-center justify-center cursor-pointer"
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
                <span className="font-bold text-lg text-blue-600">${property.price?.toLocaleString()}</span>
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
                className="px-5 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AllPropertyCard;