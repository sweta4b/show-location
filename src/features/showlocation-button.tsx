import React, { useState } from "react";
import axios from 'axios';


export const ShowLocationButton: React.FC = () => {
  const [location, setLocation] = useState<string | null>("Click to Show your Location");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [dataReceived, setDataRecevied] = useState<boolean>(false);
  async function getUserIP(): Promise<string> {
    try {
      const response = await axios.get('https://api.ipify.org?format=json');
      return response.data.ip;
    } catch (error) {
      throw error;
    }
  }

  async function getUserLocation() {
    try {
      setIsLoading(true);
      setLocation("Please wait..")
      const ip = await getUserIP();

      const response = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.PLASMO_PUBLIC_ACCESS_TOKEN}`);
      console.log(response.data); // Log the response data
      const { country = 'N/A', city = 'N/A' } = response.data;
      setLocation(`Your country is ${country}\n Your city is ${city}`);
      setIsLoading(false);
      setDataRecevied(true)
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
      throw error;
    }
  }

  const handleClick = () => {
    getUserLocation();
  };

  return (
    <div className="plasmo-flex plasmo-flex-col plasmo-items-center plasmo-justify-center">

      {
        dataReceived && (
          <div className="block plasmo-text-center plasmo-mb-8 plasmo-rounded-lg plasmo-w-[400px] plasmo-h-[200px] plasmo-bg-gradient-to-r plasmo-from-blue-400 plasmo-to-orange-500 plasmo-via-purple-500  plasmo-animate-gradient-x">
            <h2 className="plasmo-text-2xl plasmo-text-center plasmo-pt-20 plasmo-mb-2 plasmo-font-bold plasmo-tracking-tight plasmo-text-white plasmo-whitespace-pre-line" >{location}</h2>
          </div>
        )
      }

      {
        isLoading ?
          <button disabled type="button" className=" plasmo-text-white plasmo-bg-blue-700 plasmo-hover:bg-blue-800 plasmo-focus:ring-4 plasmo-focus:ring-blue-300 plasmo-font-medium plasmo-rounded-lg plasmo-text-xl plasmo-px-10 plasmo-py-5 plasmo-text-center  plasmo-dark:bg-blue-600 plasmo-dark:hover:bg-blue-700 plasmo-dark:focus:ring-blue-800 plasmo-block plasmo-m-auto">
            <svg aria-hidden="true" role="status" className="plasmo-inline plasmo-w-4 plasmo-h-4 plasmo-mr-3 plasmo-text-white plasmo-animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
            </svg>
            Loading...
          </button> :
          <button
            type="button"
            className="plasmo-bg-black plasmo-relative  plasmo-flex plasmo-items-center plasmo-justify-center plasmo-p-0.5  plasmo-overflow-hidden plasmo-text-sm plasmo-font-medium plasmo-text-gray-900 plasmo-rounded-lg plasmo-group plasmo-bg-gradient-to-br plasmo-from-purple-600 plasmo-to-blue-500 plasmo-focus:ring-4 plasmo-focus:outline-none plasmo-focus:ring-blue-300 plasmo-dark:focus:ring-blue-800 plasmo-font-bold plasmo-tracking-tight plasmo-text-sm plasmo-rounded-lg plasmo-transition-all plasmo-bg-blue-700 plasmo-border-none plasmo-text-indigo plasmo-shadow-lg hover:plasmo-shadow-md active:plasmo-scale-105 plasmo-bg-slate-50 hover:plasmo-bg-slate-100 plasmo-text-slate-700 hover:plasmo-text-slate-900"
            onClick={handleClick}
            disabled={isLoading} // Disable the button while loading
          >
            <span className="plasmo-relative plasmo-text-xl  plasmo-px-10 plasmo-py-5 plasmo-transition-all plasmo-ease-in plasmo-duration-75 plasmo-bg-white plasmo-dark:bg-gray-900 plasmo-rounded-md plasmo-group-hover:bg-opacity-0">
              Show my Location
            </span>
          </button>
      }
    </div>
  );
};
