import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SidebarDrawer from "./components/SidebarDrawer";
import DashboardStat from "./components/DashboardStat";
import ChangeViewsPerPost from "./components/charts/ChangeViewsPerPost";
import { statData } from "./data/statData";
import ChangeViewsOnChannelPerCreative from "./components/charts/ChangeViewsOnChannelPerCreative";
import TotalViewsbyCreative from "./components/charts/TotalViewsbyCreative";
import TotalViewsbyChannel from "./components/charts/TotalViewsbyChannel";
import CumulativeViewsOverTime from "./components/charts/CumulativeViewsOverTime";

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
              {/* <DashboardStat /> */}
              {/* <ChangeViewsPerPost data={statData[0]} /> */}
              {/* <ChangeViewsOnChannelPerCreative posts={statData} /> */}
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
