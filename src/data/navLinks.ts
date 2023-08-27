import { GoHome } from "react-icons/go";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { AiOutlineFile } from "react-icons/ai";
import { GoPeople } from "react-icons/go";
import { AiOutlineBarChart } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { BsCup } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { RxPerson } from "react-icons/rx";
import { SlCalender } from "react-icons/sl";
import { BsChatDots } from "react-icons/bs";
import { AiOutlineWallet } from "react-icons/ai";

export const navigation = [
  {
    icon: GoHome,
    name: "Dashboard",
    href: "#",
    current: true,
  },
  {
    icon: AiOutlineAlignLeft,
    name: "Order List",
    href: "#",
    current: false,
  },
  {
    icon: AiOutlineFile,
    name: "Order Detail",
    href: "#",
    current: false,
  },
  {
    icon: GoPeople,
    name: "Customer",
    href: "#",
    current: false,
  },
  {
    icon: AiOutlineBarChart,
    name: "Analytics",
    href: "#",
    current: false,
  },
  {
    icon: BiPencil,
    name: "Reviews",
  },
  {
    icon: BsCup,
    name: "Foods",
    href: "#",
    current: false,
  },

  {
    icon: BsPencilSquare,
    name: "Food Detail",
    href: "#",
    current: false,
  },
  {
    icon: RxPerson,
    name: "Customer Detail",
    href: "#",
    current: false,
  },
  {
    icon: SlCalender,
    name: "Calender",
    href: "#",
    current: false,
  },
  {
    icon: BsChatDots,
    name: "Chat",
    href: "#",
    current: false,
  },
  {
    icon: AiOutlineWallet,
    name: "Wallet",
    href: "#",
    current: false,
  },
];
