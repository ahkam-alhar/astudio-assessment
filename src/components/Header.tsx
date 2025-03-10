import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '../assets/icons/MenuIcon.svg';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-black text-white relative h-12">
      <div className="container flex justify-between items-center h-full">
        <h1 className="text-xl font-bold">My App</h1>
        <div
          className={`absolute sm:static top-full right-0 w-auto bg-black sm:flex sm:space-x-4 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <Link
            to="/users"
            className="block py-2 px-4 hover:text-yellow"
            onClick={() => setIsOpen(false)} // Close the menu on link click
          >
            Users
          </Link>
          <Link
            to="/products"
            className="block py-2 px-4 hover:text-yellow"
            onClick={() => setIsOpen(false)} // Close the menu on link click
          >
            Products
          </Link>
        </div>
        <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
          <img src={MenuIcon} alt="Menu" className="w-6 h-6" />
        </button>
      </div>
    </nav>
  );
};

export default Header;
