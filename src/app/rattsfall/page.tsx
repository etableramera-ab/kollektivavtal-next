import { courtCases } from "@/data/court-cases";
import RattsfallClient from "./RattsfallClient";

export default function RattsfallPage() {
  return <RattsfallClient courtCases={courtCases} />;
}
