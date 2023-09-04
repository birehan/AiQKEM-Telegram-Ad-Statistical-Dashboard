import { useState } from "react";
import Sidebar from "./components/nav_components/Sidebar";
import Navbar from "./components/nav_components/Navbar";
import SidebarDrawer from "./components/nav_components/SidebarDrawer";
import { statData } from "./data/statData";
import TotalViewsbyCreative from "./components/TotalViewsbyCreative";
import TotalViewsbyChannel from "./components/TotalViewsbyChannel";
import CumulativeViewsOverTime from "./components/CumulativeViewsOverTime";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState(0);

  return (
    <>
      <div className="bg-[#f3f2f7] h-full">
        <SidebarDrawer
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          selectedNav={selectedNav}
          setSelectedNav={setSelectedNav}
        />

        <Sidebar selectedNav={selectedNav} setSelectedNav={setSelectedNav} />
        <div className="lg:pl-72 pt-8">
          <Navbar setSidebarOpen={setSidebarOpen} />

          <main className="py-10 main-content">
            <div className="mx-auto max-w-[90rem] flex flex-col gap-16">
              <TotalViewsbyCreative data={statData} />
              <TotalViewsbyChannel data={statData} />
              <CumulativeViewsOverTime data={statData} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
