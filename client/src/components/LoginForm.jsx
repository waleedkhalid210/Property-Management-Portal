import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleSuccess, handleError } from "../../utils";
import axios from "axios";
export default function LoginForm() {

  const navigate = useNavigate()

  const [userData, setuserData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    const copyInfo = { ...userData }
    copyInfo[name] = value
    setuserData(copyInfo)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = userData
    if (!email || !password) {
      return handleError("firstname,lastname,email,password is required for registration.")
    }

    try {
      const url = "http://localhost:8000/login"
      const response = await axios.post(url, userData)
      const { message, success, jwtToken, firstname, error, userId } = response.data
      if (success) {
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("loggedInUser", firstname)
        localStorage.setItem("userId", userId)
        handleSuccess(message)
        setTimeout(() => {
          navigate("/")
        }, 2000);
      } else if (error) {
        const details = error?.details[0].message
        handleError(details)
      } else if (!success) {
        handleError(message)
      }

    } catch (error) {
      handleError(error.response.data.error.details[0].message);
    }
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white border-10  border-blue-400 p-6 rounded-4xl shadow-md px-8 py-10">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-8">
        LOGIN
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bor ">
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

            className="w-full px-3 py-2 rounded-md border border-gray-300   focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="text-sm text-gray-700     mb-1"
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
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition"
        >
          Login
        </button>
      </form>
      <div className="mt-6 text-center">
        <span className="text-sm text-gray-500 ">
          Don't have an account?{" "}
        </span>

        <Link
          to="/register"
          className="text-blue-500 hover:text-blue-600 font-medium"
        >
          Register
        </Link>
        <ToastContainer />
      </div>
    </div>
  );
}