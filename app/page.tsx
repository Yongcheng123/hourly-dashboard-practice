import type { Metadata } from "next";
import { DashboardShell } from "./components/dashboard/DashboardShell";

export const metadata: Metadata = {
  title: "Hourly Pulse · Workshop Dashboard",
  description:
    "A generic hourly performance dashboard scaffold for the Hermes × ClickClack workshop.",
};

export default function Home() {
  return <DashboardShell />;
}
