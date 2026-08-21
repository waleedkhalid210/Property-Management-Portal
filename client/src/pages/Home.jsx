import { useState, useEffect } from "react";

function Home() {
    const [loggedInUser, setloggedInUser] = useState("");

    useEffect(() => {
        setloggedInUser(localStorage.getItem("loggedInUser"));
    }, []);

    return (
        <>
            <div className="relative">
                <img
                    src="banner2.jpg"
                    alt="Home"
                    className="w-full h-[500px] object-cover"
                />

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">
                    <p className="bg-green-600 text-white text-sm md:text-base font-semibold px-4 py-1.5 rounded-full mb-4 shadow-md">
                        Premium Real Estate Platform
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold">
                        <span>Find Your Next Perfect Place</span>
                        <span className="block mt-2">To Live</span>
                    </h1>
                </div>
            </div>

            <div className="text-center my-20">
                <h2 className="text-2xl md:text-3xl text-black font-bold my-3">Why Choose Property Portal</h2>
                <p className="text-1xl max-w-2xl mx-auto">
                    We provide a comprehensive ecosystem for all your real estate needs, built on trust, transparency, and technology.
                </p>
            </div>

            <div className="my-5 mx-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="border rounded-lg h-[300px] p-8 bg-slate-100">
                        <div className="text-center">
                            <img
                                src="house-icon.png"
                                alt="House"
                                className="w-16 h-16 mx-auto rounded-full"
                            />

                            <h3 className="text-xl font-semibold mt-4">
                                Extensive Listings
                            </h3>

                            <p className="mt-3">
                                Access thousands of verified properties ranging from cozy
                                apartments to luxurious villas across popular cities.
                            </p>
                        </div>
                    </div>

                    <div className="border rounded-lg h-[300px] p-8 bg-slate-100">
                        <div className="text-center">
                            <img
                                src="secure-icon.png"
                                alt="Secure Transactions"
                                className="w-10 h-10 mx-auto rounded-full"
                            />

                            <h3 className="text-xl font-semibold mt-4">
                                Secure Transactions
                            </h3>

                            <p className="mt-3">
                                Every property and owner is verified. We ensure complete
                                transparency and security in your property journey.
                            </p>
                        </div>
                    </div>

                    <div className="border rounded-lg h-[300px] p-8 bg-slate-100">
                        <div className="text-center">
                            <img
                                src="expert-support-icon.png"
                                alt="Expert Support"
                                className="w-10 h-10 mx-auto rounded-full"
                            />

                            <h3 className="text-xl font-semibold mt-4">
                                Expert Support
                            </h3>

                            <p className="mt-3">
                                Our dedicated team and network of professional agents are
                                here to guide you at every step of the process.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;