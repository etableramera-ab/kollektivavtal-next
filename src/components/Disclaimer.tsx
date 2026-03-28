import { AlertCircle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="bg-blue-50 border-t border-blue-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-start gap-2">
        <AlertCircle size={16} className="text-blue-600 mt-0.5 shrink-0" />
        <p className="text-xs text-blue-800">
          Informationen på kollektivavtal.ai är vägledande och ersätter inte det officiella
          kollektivavtalet. AI-svaren kan innehålla fel. Kontakta ditt fackförbund för bindande
          besked.
        </p>
      </div>
    </div>
  );
}
