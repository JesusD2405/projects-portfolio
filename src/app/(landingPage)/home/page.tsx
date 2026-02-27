import { NextPage } from "next";
import Image from "next/image";
import UbuntuWallpaper from "../../../../public/imgs/backgrounds/numbat_wallpaper_color_1920x1080.png";

const Home: NextPage = () => {
  return (
    <div className="d-flex p-5 m-5">
      <div className="d-flex align-middle text-center">
        <h1 className="text-black text-3xl">Home Page</h1>
        <Image
          className="z-0"
          src={UbuntuWallpaper}
          alt="wallpaper Ubuntu 24.04 LTS"
          quality={100}
          fill
        />
      </div>
    </div>
  );
};

export default Home;
