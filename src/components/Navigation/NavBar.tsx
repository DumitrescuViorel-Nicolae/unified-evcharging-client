import { useState } from "react";
import logo from "../../assets/logo.png";
import { BiUser, BiWorld } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import Login from "../Account/Login";

const NavBar = () => {
  const [inputSearch, setInputSearch] = useState<string | null>(null);

  const handleInputSearch = (searchString: string) => {
    setInputSearch(searchString);
  };
  console.log(inputSearch);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border-b sticky top-0 z-50 bg-gray-100/[95%]  ">
        <div className="flex justify-between items-center sm:mx-6 md:mx-10 lg:mx-12 ">
          {/* Left */}
          <div className="h-20 rounded-lg p-1 flex">
            <img src={logo} className=" object-cover -my-3" />
          </div>
          {/* Middle */}
          <div className="hidden ml-24 lg:flex justify-center items-center relative shadow-sm shadow-gray-400 border rounded-full ">
            <input
              type="search"
              placeholder=""
              className="py-2.5 w-[20rem] rounded-full outline-0"
              onClick={() => setInputSearch("")}
              onChange={(e) => {
                handleInputSearch(e.target.value);
              }}
            />
            <button className="bg-[#27961f] p-2 rounded-full mr-2">
              <FiSearch className="text-white w-full" />
            </button>
          </div>
          {/* Right */}
          <div className="flex items-center pr-3  font-semibold text-gray-600">
            <p className="text-[15px]">Add EV Charger</p>
            <div className="flex items-center mx-8 gap-1">
              <BiWorld className="" />
              <div className="">EN</div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center border px-3 py-2 rounded-full gap-2 bg-[#1f8526] text-white font-bold shadow-lg shadow-gray-300 hover:bg-[#0c270b] duration-100 ease-out"
            >
              <p>Sign in</p>
              <BiUser className="text-[22px]" />
            </button>
          </div>
        </div>
      </div>
      <Login isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default NavBar;
