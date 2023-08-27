import { navigation } from "../data/navLinks";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface props {
  selectedNav: number;
  setSelectedNav: (value: number) => void;
}

export default function Sidebar({ selectedNav, setSelectedNav }: props) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-start flex-col mt-12 gap-2">
          <h1 className="text-3xl font-bold text-[#464356]">AiQKEM</h1>
          <p className="text-[#8a8c90]">Telegram Ads</p>
        </div>
        <nav className="flex flex-1 flex-col mt-4">
          <ul className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul className="-mx-2 space-y-1">
                {navigation.map((item, index) => (
                  <li key={item.name} onClick={() => setSelectedNav(index)}>
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
    </div>
  );
}
