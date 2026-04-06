"use client";

import { ShieldCheck, AlertTriangle } from "lucide-react";

interface WageDisclaimerProps {
  isVerified: boolean;
}

export default function WageDisclaimer({ isVerified }: WageDisclaimerProps) {
  if (isVerified) {
    return (
      <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 border border-green-200 mb-6">
        <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-green-800">
            Verifierad lönedata
          </p>
          <p className="text-sm text-green-700 mt-1">
            Löneuppgifterna på denna sida är hämtade från den officiella
            avtalstexten.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
      <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-amber-800">
          Uppskattade löneuppgifter
        </p>
        <p className="text-sm text-amber-700 mt-1">
          Löneuppgifterna på denna sida är uppskattningar baserade på
          branschdata och kan avvika från ditt faktiska kollektivavtal.
          Kontrollera alltid med ditt fackförbund för exakta löner.
        </p>
      </div>
    </div>
  );
}
