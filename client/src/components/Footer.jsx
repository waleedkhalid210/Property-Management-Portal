import React from "react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" bottom-0 left-0 w-full bg-blue-950 text-white py-4 mt-8 ">
      <div className="border-b border-white pb-4">
      <div className="flex items-center justify-between px-6">
      <div>
        <h3 className="font-medium mb-2 underline">Contact Us</h3>
        <a
    href="https://mail.google.com/mail/u/0/#inbox?compose=new"
    target="_blank"
    className="text-white hover:underline"
>
    waleedmian860@gmail.com
</a>

      </div>

        <div className="flex flex-col items-center">
          <span className="font-medium mb-2 underline">Follow Us</span>

          <div className="flex gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-[#1877F2] transition"
            >
              <FaFacebook size={24} />
            </a>

            <a
              href="https://www.linkedin.com/in/waleed-khalid-08154b268/"
              target="_blank"
              className="hover:text-[#0077b5]  transition"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      
      </div>
      <div>
          <p className="font-semibold mt-1 text-center">
            &copy; {new Date().getFullYear()} Waleed Khalid. All Rights Reserved
          </p>
        </div>
    </footer>
  );
}

export default Footer;