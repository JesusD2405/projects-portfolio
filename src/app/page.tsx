import { NextPage } from "next";
import { redirect } from "next/navigation";
// Helpers
import { RoutesPath } from "@/helpers/routes";

const LandingPage: NextPage = () => {
  redirect(RoutesPath.HOME);
  return <></>;
}

export default LandingPage;