import React from "react";

export const Loading = (Props: any) => {
  return (
    <div className="flex items-center justify-center space-x-2 h-[70px]">
      <div
        className={`${
          Props.color ? Props.color : "bg-gray-500/80"
        } w-4 h-4 mt-1 rounded-full animate-pulse`}
      ></div>
      <div
        className={`${
          Props.color ? Props.color : "bg-gray-500/80"
        } w-4 h-4 mt-1 rounded-full animate-pulse`}
      ></div>
      <div
        className={`${
          Props.color ? Props.color : "bg-gray-500/80"
        } w-4 h-4 mt-1 rounded-full animate-pulse`}
      ></div>
    </div>
  );
};
