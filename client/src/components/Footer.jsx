import React from "react";
const Footer = () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      &copy;
      {new Date().getFullYear()} HeyDev!
    </footer>
  );
};

export default Footer;
