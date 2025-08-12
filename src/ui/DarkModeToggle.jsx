import { useDarkMode } from "@/context/DarkModeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button onClick={toggleDarkMode}>
      {isDarkMode ? (
        <SunIcon className="w-7 h-7 text-primary-900 mt-1"/>
      ) : (
        <MoonIcon className="w-7 h-7 text-primary-900 mt-1"/>
      )}
    </button>
  );
}
export default DarkModeToggle;
