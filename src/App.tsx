import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import SidebarDrawer from "./components/SidebarDrawer";
import DashboardStat from "./components/DashboardStat";
import ChangeViewsPerPost from "./components/charts/ChangeViewsPerPost";
import { statData } from "./data/statData";
import ChangeViewsOnChannelPerCreative from "./components/charts/ChangeViewsOnChannelPerCreative";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNav, setSelectedNav] = useState(0);

  return (
    <>
      <div className="bg-[#f3f2f7]">
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
            <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
              {/* <DashboardStat /> */}
              <ChangeViewsPerPost data={statData[0]} />
              <ChangeViewsOnChannelPerCreative posts={statData} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
