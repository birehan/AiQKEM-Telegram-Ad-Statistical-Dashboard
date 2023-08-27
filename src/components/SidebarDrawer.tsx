import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { navigation } from "../data/navLinks";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
interface props {
  sidebarOpen: boolean;
  setSidebarOpen: (status: boolean) => void;
  selectedNav: number;
  setSelectedNav: (value: number) => void;
}

const SidebarDrawer = ({
  sidebarOpen,
  setSidebarOpen,
  selectedNav,
  setSelectedNav,
}: props) => {
  return (
    <Transition.Root show={sidebarOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 lg:hidden"
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-start flex-col mt-12 gap-2">
                  <h1 className="text-3xl font-bold text-[#464356]">Sedap</h1>
                  <p className="text-[#8a8c90]">Modern Admin Dashboard</p>
                </div>
                <nav className="flex flex-1 flex-col mt-4">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item, index) => (
                          <li
                            key={item.name}
                            onClick={() => [
                              setSelectedNav(index),
                              setSidebarOpen(false),
                            ]}
                          >
                            <a
                              href={item.href}
                              className={classNames(
                                index === selectedNav
                                  ? " text-[#01b075] bg-[#d9f3ea]"
                                  : "text-gray-700 hover:text-[#01b075] hover:bg-gray-50",
                                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}
                            >
                              <item.icon
                                className={classNames(
                                  index === selectedNav
                                    ? "text-[#01b075] "
                                    : "text-gray-400 group-hover:text-[#01b075]  ",
                                  "h-6 w-6 shrink-0"
                                )}
                                aria-hidden="true"
                              />
                              {item.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SidebarDrawer;
