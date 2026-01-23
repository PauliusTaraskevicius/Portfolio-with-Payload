"use client";

import { IoIosArrowForward } from "react-icons/io";

export const MobileLogo = () => {
  return (
    <div className="flex items-center justify-center gap-2 bg-transparent">
      <div className="flex items-center justify-center rounded-none bg-black p-0.5">
        <IoIosArrowForward size={21} className="text-white" />
      </div>
      <div>
        <span className="font-bebas text-xl tracking-widest text-black">
          paulydev
        </span>
      </div>
    </div>
  );
};
