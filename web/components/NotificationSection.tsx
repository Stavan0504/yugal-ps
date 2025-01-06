import React, { useEffect, useState } from "react";
import SentRequestHistory from "./SentRequestHistory";
import ReceiveRequestHistory from "./ReceiveRequestHistory";
import AccesptedRequestHistory from "./AccesptedRequestHistory";
import VisitorsHistory from "./VisitorsHistory";

const NotificationSection = () => {
  const [activeTab, setActiveTab] = useState("Interest Sent");

  return (
    <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg  border border-gray-200">
      <div className="flex justify-between items-center mb-8 pb-2 border-b border-gray-300">
        <h2 className="text-2xl font-semibold text-brand-cyan">
          Notifications
        </h2>
      </div>

      <div className="flex sm:flex-nowrap flex-wrap justify-start mb-6 border-b-[1px] gap-2 sm:gap-0 border-brand-darkGreen/35 pb-2 sm:pb-0">
        {["Interest Sent", "Interest Received", "Accepted", "Visitors"]?.map(
          (tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 md:px-6 py-2 text-[18px] md:text-xl font-medium border-[1px] rounded-lg sm:rounded-t-lg sm:rounded-b-none bg-white hover:border-brand-darkGreen/35  sm:border-b-0 BasicTransition hover:text-brand-cyan ${
                activeTab === tab
                  ? " text-brand-cyan border-brand-darkGreen/35 sm:border-b-0 sm:mb-[-1px]"
                  : "border-transparent"
              } transition-colors duration-300`}  
            >
              {tab}
            </button>
          )
        )}
      </div>

      <div className="space-y-4">
        {activeTab === "Interest Sent" && (
          <div>
            <SentRequestHistory />
          </div>
        )}

        {activeTab === "Interest Received" && (
          <div>
            <ReceiveRequestHistory />
          </div>
        )}

        {activeTab === "Accepted" && (
          <div>
            <AccesptedRequestHistory />
          </div>
        )}
        {activeTab === "Visitors" && (
          <div>
            <VisitorsHistory />
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationSection;
