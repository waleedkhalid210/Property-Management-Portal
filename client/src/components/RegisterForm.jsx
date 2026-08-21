import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate();

    const [userData, setuserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copyInfo = { ...userData };
        copyInfo[name] = value;
        setuserData(copyInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, lastName, email, password } = userData;
        if (!firstName || !lastName || !email || !password) {
            return handleError("firstname,lastname,email,password is required for registration.");
        }

        try {
            const url = "http://localhost:8000/register";
            const response = await axios.post(url, userData);
            const { message, success, error } = response.data;
            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else if (error) {
                const details = error?.details[0].message;
                handleError(details);
            }
        } catch (error) {
                handleError(error.response.data.error.details[0].message);

        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 shadow-md border-10 border-blue-400 p-6 rounded-4xl px-8 py-10 flex flex-col items-center">
            <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">
                REGISTER
            </h1>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
                <div className="flex flex-col">
                    <label
                        htmlFor="firstName"
                        className="text-sm text-gray-700 mb-1"
                    >
                        First Name
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userData.firstName}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="lastName"
                        className="text-sm text-gray-700 mb-1"
                    >
                        Last Name
                    </label>
                    <input
                        onChange={handleChange}
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userData.lastName}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-sm text-gray-700 mb-1"
                    >
                        Email
                    </label>
                    <input
                        onChange={handleChange}
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="password"
                        className="text-sm text-gray-700 mb-1"
                    >
                        Password
                    </label>
                    <input
                        onChange={handleChange}
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-300"
                >
                    Register
                </button>
            </form>

            <div className="mt-6 text-center">
                <span className="text-sm text-gray-500 dark:text-gray-300">
                    Already have an account?{" "}
                </span>

                <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-600 font-medium"
                >
                    Login
                </Link>
                <ToastContainer />
            </div>
        </div>
    );
}