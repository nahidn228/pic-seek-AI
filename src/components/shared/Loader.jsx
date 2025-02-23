/* eslint-disable react/prop-types */
import { FaSpinner } from "react-icons/fa";

const Loader = ({ message  }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-b lg:bg-gradient-to-l from-cyan-100 z-50">
      <div className="flex flex-col items-center p-6 bg-white rounded-2xl  shadow-2xl">
        <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
        <p className="text-gray-700 font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default Loader;
