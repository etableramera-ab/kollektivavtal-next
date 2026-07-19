import { permanentRedirect } from "next/navigation";

export default function LegacyWageOverviewPage() {
  permanentRedirect("/yrke");
}
