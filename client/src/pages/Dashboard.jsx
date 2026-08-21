import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MyPropertyCard from "../components/MyPropertyCard";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { handleError } from "../../utils";

function Dashboard() {
  const [user, setUser] = useState("");
  const [myProperties, setMyProperties] = useState([]);
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      navigate("/login");
    } else {
      setUser(loggedInUser);
      fetchMyProperties(userId);
    }
  }, [navigate]);

  const fetchMyProperties = async (userId) => {
    try {
      const url = `http://localhost:8000/api/property/myproperties?userId=${userId}`;
      const response = await axios.get(url);

      if (response.data.success) {
        setMyProperties(response.data.properties);
      }
    } catch (error) {
      handleError(error)
    }
  };

  const activeCount = myProperties.filter((p) => p.status === "Active").length;

  return (
    <>
      <div className="pb-8">
        <div className="w-[400] h-95 bg-[url('/dashs.avif')] bg-cover  bg-no-repeat text-center">
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-shadow-lg text-white mb-4 pt-[130px]">
              Welcome to your Dashboard
            </h1>

            <Link
              to="/addproperty"
              className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300"
            >
              + Add Property
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-bold text-2xl px-2" >

        <div className="h-20 border-1 bg-slate-50 flex items-center justify-center shadow-lg rounded-sm">
          <div className="text-center">
            <h1>Total Properties</h1>
            <span className="text-3xl">{myProperties.length}</span>
          </div>
        </div>

        <div className="h-20 border-1 bg-slate-50 flex items-center justify-center shadow-lg rounded-sm">
          <div className="text-center">
            <h1>Active Listings</h1>
            <span className="text-emerald-600">{activeCount}</span>
          </div>
        </div>

        <div className="h-20 border-1 bg-slate-50 flex items-center justify-center shadow-lg rounded-sm">
          <div className="text-center">
            <h1>Recently Added Listings</h1>
            <span className="text-blue-500">{myProperties.length}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 px-2">
        <div className="border border-grey-200 shadow-lg">
          <div className="border border-slate-200 pl-4 bg-slate-200 font-semibold text-lg py-3 underline text-shadow-md">
            My Properties

          </div>
          <div className='grid grid-cols-4  text-center px-4 py-3 border-b bg-slate-100 font-bold'>
            <div>Image</div>
            <div>Price</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {myProperties.length === 0 ? (
            <div className="p-4 text-center text-gray-500 font-semibold">
              No properties added yet.
            </div>
          ) : (
            myProperties.map((property) => (
              <MyPropertyCard
                key={property._id}
                property={property}
                onDelete={(id) => {
                  setMyProperties(
                    prev => prev.filter(p => p._id !== id)
                  );
                }}
                onUpdate={(updatedProperty) => {
                  setMyProperties(
                    prev => prev.map(p => p._id === updatedProperty._id ? updatedProperty : p)
                  );
                }}
              />
            ))
          )}
        </div>
      </div>

    </>
  );
}

export default Dashboard;
