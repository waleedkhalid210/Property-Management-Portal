import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AllPropertyCard from '../components/AllPropertyCard';
import { handleError } from '../../utils';

function Properties() {
    const [properties, setProperties] = useState([]);

    const [filters, setFilters] = useState({
        title: "",
        city: "",
        propertyType: "",
        minprice: "",
        maxprice: ""
    });

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8);

    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentProperties = properties.slice(firstIndex, lastIndex);

    const totalNumberOfPages = Math.ceil(properties.length / itemsPerPage);
    const pages = Array.from({ length: totalNumberOfPages }, (_, index) => index + 1);

    useEffect(() => {
        fetchAllProperties();
    }, [filters]);

    const fetchAllProperties = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/property/allproperties", {
                params: filters
            });
            if (response.data.success) {
                setProperties(response.data.properties);
            }
        } catch (error) {
            handleError("Failed to fetch properties");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
                    Explore All Properties
                </h1>

                <p className="text-gray-500 text-center mb-8">
                    Find your dream house, apartment, villa, or commercial space.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-4 m-2 p-4 shadow-xl rounded-lg border border-slate-200 gap-5 mb-6">
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                            Search By Title
                        </label>
                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-slate-400"
                            type="text"
                            name="title"
                            id="title"
                            onChange={handleChange}
                            value={filters.title}
                            placeholder="e.g. Luxury, Brand New"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="city"
                            className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                            Search By City
                        </label>

                        <input
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg placeholder:text-slate-400"
                            type="text"
                            name="city"
                            id="city"
                            onChange={handleChange}
                            value={filters.city}
                            placeholder="e.g. Lahore, Islamabad"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="propertyType"
                            className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                            Filter By
                        </label>

                        <select
                            onChange={handleChange}
                            value={filters.propertyType}
                            name="propertyType"
                            id="propertyType"
                            className="cursor-pointer border border-gray-300 bg-slate-50 rounded-lg w-full pl-1 py-2 hover:bg-slate-100"
                        >
                            <option value="">Property Type</option>
                            <option value="House">House</option>
                            <option value="Villa">Villa</option>
                            <option value="Apartment">Apartment</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                    <div>
                        <label
                            className="block text-sm font-semibold text-slate-700 mb-2"
                        >
                            Price Range
                        </label>

                        <div className='mt-2 flex items-center gap-2'>
                            <input
                                type="number"
                                name="minprice"
                                id="minprice"
                                min="0"
                                placeholder='Min Price'
                                onChange={handleChange}
                                value={filters.minprice}
                                className='border border-gray-300 rounded-md placeholder:text-slate-400 p-1.5 w-full text-sm'
                            />

                            <span> - </span>

                            <input
                                type="number"
                                name="maxprice"
                                id="maxprice"
                                min="0"
                                placeholder='Max Price'
                                onChange={handleChange}
                                value={filters.maxprice}
                                className='border border-gray-300 rounded-md placeholder:text-slate-400 p-1.5 w-full text-sm'
                            />
                        </div>
                    </div>
                </div>

                {properties.length === 0 ? (
                    <div className="text-center py-12 text-gray-500 font-semibold">
                        No property found.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {currentProperties.map((property) => (
                                <AllPropertyCard
                                    key={property._id}
                                    property={property}
                                />
                            ))}
                        </div>
                        {totalNumberOfPages > 1 && (
                            <div className="flex justify-center items-center gap-2 mt-8">
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-gray-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                >
                                    Prev
                                </button>

                                {pages.map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className={`px-3 py-1.5 rounded-md font-semibold text-sm cursor-pointer transition-colors ${currentPage === page
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-slate-100 text-gray-700 hover:bg-slate-200'
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalNumberOfPages))}
                                    disabled={currentPage === totalNumberOfPages}
                                    className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-gray-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}

export default Properties;