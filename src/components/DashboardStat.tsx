import React from "react";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { HiOutlineChevronDown } from "react-icons/hi";
import PieChart from "./PieChart";
import WaveLineChart from "./LineChart";
import RevenueLineChart from "./RevenueLineChart";
import BarChart from "./BarChart";
import CustomerReview from "./CustomerReview";

interface props {
  imageSrc: string;
  count: string;
  countName: string;
  thirtyDaysPercent: number;
}

const cardData = [
  {
    imageSrc: "/assets/images/checklist.png",
    count: "75",
    countName: "Total Orders",
    thirtyDaysPercent: 4,
  },
  {
    imageSrc: "/assets/images/checklist.png",
    count: "357",
    countName: "Totla Delivered",
    thirtyDaysPercent: 4,
  },
  {
    imageSrc: "/assets/images/checklist.png",
    count: "65",
    countName: "Total Canceled",
    thirtyDaysPercent: 25,
  },
  {
    imageSrc: "/assets/images/checklist.png",
    count: "$128",
    countName: "Total Revenue",
    thirtyDaysPercent: 12,
  },
];

const DashboardStatCard = ({
  imageSrc,
  count,
  countName,
  thirtyDaysPercent,
}: props) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 px-4 py-8 shadow-md bg-white flex-1 rounded-xl items-center justify-center min-w-[150px] md:min-w-[200px]">
      <div className="bg-[#d9f3ea] rounded-full p-2">
        <img
          alt={countName}
          src={imageSrc}
          className="w-16 h-16 object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-[#464356] font-bold text-3xl">{count}</h1>
        <p>{countName}</p>
        <p>{thirtyDaysPercent}% (30 days)</p>
      </div>
    </div>
  );
};

const DashboardStat = () => {
  return (
    <div>
      <div className="flex flex-row justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-[#464356] font-bold text-3xl">Dashboard</h1>
          <p className="text-[#8f8f90]">
            Hi Samantha, Welcome back to Sedap Admin!
          </p>
        </div>

        <div className="flex flex-row gap-4 px-6 py-4 bg-white rounded-lg justify-center items-center shadow-md">
          <div className="bg-[#dff0fa] rounded-md p-2 h-fit">
            <CalendarIcon className="h-7 w-7 shrink-0 text-[#2c9cdb] font-bold text-4xl" />
          </div>
          <div>
            <p className="text-[#4e5a63] text-md font-medium">Filter Periode</p>
            <p className="text-[#4e5a63]  font-light text-sm">
              17 April 2020 - 21 May 2020
            </p>
          </div>
          <HiOutlineChevronDown />
        </div>
      </div>

      <div className="flex flex-row gap-8 items-stretch justify-between mt-12 flex-wrap">
        {cardData.map((item, index) => {
          return (
            <DashboardStatCard
              key={index}
              imageSrc={item.imageSrc}
              count={item.count}
              countName={item.countName}
              thirtyDaysPercent={item.thirtyDaysPercent}
            />
          );
        })}
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between mt-12 flex-wrap">
        <PieChart />
        <WaveLineChart />
      </div>

      <div className="flex flex-col xl:flex-row gap-8 items-stretch justify-between mt-12 flex-wrap">
        <RevenueLineChart />
        <BarChart />
      </div>

      <CustomerReview />
    </div>
  );
};

export default DashboardStat;
