import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  setCityName: React.Dispatch<React.SetStateAction<string>>;
}

function NoDataMessage({ setCityName }: Props) {
  let navigate = useNavigate();

  const handleGoToDashboard = () => {
    setCityName("Budapest"); // Set cityName to "Budapest"
    navigate("/dashboard"); // Navigate to dashboard
  };

  return (
    <div className="text-center mt-20 text-gray-500">
      <p className="text-2xl font-bold mb-4">No forecast data available</p>
      <p className="mb-4">Please check back later</p>

      <button
        onClick={handleGoToDashboard}
        className="px-4 py-2 rounded bg-midnight text-white border-none cursor-pointer"
      >
        Go to Dashboard
      </button>
    </div>
  );
}

export default NoDataMessage;
