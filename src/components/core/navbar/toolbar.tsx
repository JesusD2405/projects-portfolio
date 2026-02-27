import { FC } from "react";
import { Languages, Wifi, Volume2, BatteryFull, ChevronDown } from "lucide-react";

const Toolbar: FC = () => {
  return (
    <div className="system-tray">
      <div className="tray-icons">
        <Languages size={16} />
        <Wifi size={16} />
        <Volume2 size={16} />
        <BatteryFull size={16} />
        <ChevronDown size={14} />
      </div>
    </div>
  );
};

export default Toolbar;
