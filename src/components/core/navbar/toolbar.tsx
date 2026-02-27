import { FC } from "react";
import { Languages, Wifi, Volume2, BatteryFull } from "lucide-react";

const Toolbar: FC = () => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <Languages />
      <Wifi />
      <Volume2 />
      <BatteryFull />
    </div>
  );
};

export default Toolbar;
