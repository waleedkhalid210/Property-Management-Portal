import { useState, useEffect } from "react";
import logo from "../assets/logo2.png";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("userId")
        setIsLoggedIn(false);
        setMenuOpen(false);
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur bg-white/80 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link to="/">
                    <img src={logo} alt="Logo" className="w-40" />
                </Link>

                <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
                    <li>
                        <Link
                            to="/"
                            className="hover:text-blue-600 hover:underline transition"
                        >
                            Home
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/properties"
                            className="hover:text-blue-600 hover:underline transition"
                        >
                            Properties
                        </Link>
                    </li>
                </ul>

                <div className="hidden md:flex gap-4 items-center">
                    {isLoggedIn ? (
                        <>
                            <Link to="/dashboard">
                                <button className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition">
                                    Dashboard
                                </button>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white">
                                    Login
                                </button>
                            </Link>

                            <Link to="/register">
                                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                    Register
                                </button>
                            </Link>
                        </>
                    )}
                </div>

                <button
                    className="md:hidden text-3xl"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ${
                    menuOpen ? "max-h-125" : "max-h-0"
                }`}
            >
                <div className="flex flex-col px-6 pb-6 bg-white">
                    <Link
                        to="/"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 border-b"
                    >
                        Home
                    </Link>

                    <Link
                        to="/properties"
                        onClick={() => setMenuOpen(false)}
                        className="py-3 border-b"
                    >
                        Properties
                    </Link>

                    <div className="flex flex-col gap-3 mt-5">
                        {isLoggedIn ? (
                            <>
                                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
                                    <button className="w-full py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700 transition">
                                        Dashboard
                                    </button>
                                </Link>
                                <button
                                    onClick={() => {
                                        setMenuOpen(false);
                                        handleLogout();
                                    }}
                                    className="w-full py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" onClick={() => setMenuOpen(false)}>
                                    <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white">
                                        Login
                                    </button>
                                </Link>

                                <Link to="/register" onClick={() => setMenuOpen(false)}>
                                    <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                        Register
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;