import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ReviewCard from "./ReviewCard";

const CustomerReview: React.FC = () => {
  const customerContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollToLeft = () => {
    if (customerContainerRef.current) {
      customerContainerRef.current.scrollLeft -= 200; // Adjust the scroll amount as needed
    }
  };

  const scrollToRight = () => {
    if (customerContainerRef.current) {
      customerContainerRef.current.scrollLeft += 200; // Adjust the scroll amount as needed
    }
  };

  return (
    <div>
      <div className="flex flex-row gap-8 items-stretch justify-between mt-12 flex-wrap">
        <div className="flex flex-col gap-1">
          <h2 className="text-[#494659] font-bold text-3xl">Customer Review</h2>
          <p className="text-[#8f8f90]">Esum fuga consequuutur utsadsjn et.</p>
        </div>

        <div className="flex flex-row gap-2">
          <button
            onClick={scrollToLeft}
            className="bg-white p-2 rounded-lg w-10 h-10 align-center flex items-center justify-center text-[#1db984]"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={scrollToRight}
            className="bg-white p-2 rounded-lg w-10 h-10 align-center flex items-center justify-center text-[#1db984]"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={customerContainerRef}
        id="customer-container"
        className="flex flex-row gap-36 mt-8 mb-8 overflow-x-auto no-scrollbar"
      >
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
    </div>
  );
};

export default CustomerReview;
