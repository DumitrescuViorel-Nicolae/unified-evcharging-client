import React from "react";
import { BsStarFill } from "react-icons/bs";

const EVStation = ({
  name,
  image,
  position,
  totalNumberOfConnectors,
  connectorDetails,
}) => {
  // Assuming connectorDetails is an array and we want to show the first connector's type
  const firstConnector =
    connectorDetails.length > 0 ? connectorDetails[0] : null;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative">
        {/* Image of the station */}
        <img
          src={image}
          alt={`EV Station ${name}`}
          className="object-cover rounded-t-lg w-full h-48"
        />
        {/* Station Name */}
        <div className="absolute bottom-4 left-4 text-white text-lg font-bold">
          {name}
          <span className="text-sm block text-slate-200">
            Located at: {position.latitude}, {position.longitude}
          </span>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4">
        {/* Connector Info */}
        <div className="flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold">
              {totalNumberOfConnectors} Connectors
            </p>
            {firstConnector && (
              <p className="text-sm text-gray-500">
                {firstConnector.connectorType}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <BsStarFill className="text-yellow-500" />
            <p>4.9</p>
          </div>
        </div>

        {/* Additional Connector Info if exists */}
        {firstConnector && (
          <div className="mt-2">
            <p className="text-gray-700">
              Charge Capacity: {firstConnector.chargeCapacity}
            </p>
            <p className="text-gray-700">
              Max Power: {firstConnector.maxPowerLevel} kW
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EVStation;
