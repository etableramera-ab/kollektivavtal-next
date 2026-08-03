const baseUrl = process.argv[2] || "http://localhost:3000";
const origin = new URL(baseUrl).origin;

const liveCases = [
  {
    name: "Global guide refuses agreement-specific amounts",
    payload: {
      message: "Hur mycket OB får jag på söndag enligt Handels?",
      mode: "global",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /välj|avtal|käll/i.test(body.response),
      (body) => body.response.endsWith("Kontakta ditt fackförbund för bindande besked."),
    ],
  },
  {
    name: "Lager and e-commerce answers from reviewed facts",
    payload: {
      message:
        "Jag är 20 år och har passerat sexmånadersnivån. Vilken lägsta timlön och vilket OB gäller på söndag från 1 juni 2026?",
      mode: "agreement",
      agreementSlug: "lager-ehandelsavtalet",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /170[,.]86/.test(body.response),
      (body) => /100\s*(%|procent)/i.test(body.response),
      (body) => body.source?.url?.startsWith("https://"),
    ],
  },
  {
    name: "Lager and e-commerce does not fill reviewed gaps",
    payload: {
      message:
        "Vilken uppsägningstid, tjänstepension och föräldralön gäller enligt avtalet?",
      mode: "agreement",
      agreementSlug: "lager-ehandelsavtalet",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /underlag|källgransk|kan inte|går inte/i.test(body.response),
      (body) => !/1[,.]9\s*%|tre månaders uppsägning|180 dagar/i.test(body.response),
    ],
  },
  {
    name: "Bygg agreement retrieves wage table beyond old prefix",
    payload: {
      message:
        "Ange yrkesarbetarens lägsta timlön och månadslön både från 1 maj 2025 och från 1 maj 2026.",
      mode: "agreement",
      agreementSlug: "byggavtalet",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /196([,.]00)?/.test(body.response),
      (body) => /203([,.]00)?/.test(body.response),
      (body) => /34[\s\u00a0]?104/.test(body.response),
      (body) => /35[\s\u00a0]?322/.test(body.response),
    ],
  },
  {
    name: "Bygg agreement keeps holiday OB and time reduction separate",
    payload: {
      message:
        "Är storhelgs-OB 100 procent, och hur många timmars arbetstidsförkortning tjänar en heltidsanställd in under ett helt år?",
      mode: "agreement",
      agreementSlug: "byggavtalet",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /70\s*(%|procent)/i.test(body.response),
      (body) => /40\s*timm/i.test(body.response),
      (body) => !/storhelg[^.\n]{0,40}100\s*(%|procent)/i.test(body.response),
      (body) => !/trettiofem|1\s*\/\s*35/i.test(body.response),
    ],
  },
  {
    name: "HÖK distinguishes wage pool from individual guarantee",
    payload: {
      message:
        "Får alla 915 kronor mer 2026, och är 25 798 kronor en särskild minimilön för undersköterskor?",
      mode: "agreement",
      agreementSlug: "hok-kommunal",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /600/.test(body.response),
      (body) => /inte|nej/i.test(body.response),
      (body) => /generell|yrkesförberedande/i.test(body.response),
    ],
  },
  {
    name: "Installation agreement does not borrow Bygg amounts",
    payload: {
      message:
        "Får alla elektriker Byggavtalets 203 kronor i timmen och 70 procent helg-OB, eller vilka egna nivåer gäller från 1 maj 2026?",
      mode: "agreement",
      agreementSlug: "installationsavtalet",
      history: [],
      locale: "sv",
    },
    checks: [
      (body) => /30[\s\u00a0,.]?987/.test(body.response),
      (body) => /127/.test(body.response),
      (body) => /inte|nej/i.test(body.response),
    ],
  },
  {
    name: "Agreement answer follows selected language",
    payload: {
      message:
        "What is the minimum monthly wage from the third year and the weekend supplement from 1 May 2026?",
      mode: "agreement",
      agreementSlug: "installationsavtalet",
      history: [],
      locale: "en",
    },
    checks: [
      (body) => /30[\s\u00a0,.]?987/.test(body.response),
      (body) => /127/.test(body.response),
      (body) =>
        body.response.endsWith(
          "Contact the parties to the agreement for binding information."
        ),
    ],
  },
];

async function postJson(payload) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 65_000);
  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Origin: origin,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    const text = await response.text();
    let body;
    try {
      body = JSON.parse(text);
    } catch {
      throw new Error(`Non-JSON response (${response.status}): ${text.slice(0, 160)}`);
    }
    return { response, body };
  } finally {
    clearTimeout(timeout);
  }
}

let failures = 0;

for (const testCase of liveCases) {
  try {
    const { response, body } = await postJson(testCase.payload);
    const passed =
      response.ok &&
      typeof body.response === "string" &&
      !/[#*]{2}|```/.test(body.response) &&
      testCase.checks.every((check) => check(body));

    console.log(`\n${passed ? "PASS" : "FAIL"}: ${testCase.name}`);
    console.log(`HTTP ${response.status}: ${body.response || body.error}`);
    if (!passed) failures += 1;
  } catch (error) {
    failures += 1;
    console.log(`\nFAIL: ${testCase.name}`);
    console.log(error instanceof Error ? error.message : String(error));
  }
}

const validationCases = [
  {
    name: "Rejects missing agreement",
    payload: { message: "Hej", mode: "agreement", history: [], locale: "sv" },
  },
  {
    name: "Rejects oversized message",
    payload: { message: "x".repeat(1501), mode: "global", history: [], locale: "sv" },
  },
];

for (const testCase of validationCases) {
  const { response, body } = await postJson(testCase.payload);
  const passed = response.status === 400 && typeof body.error === "string";
  console.log(`\n${passed ? "PASS" : "FAIL"}: ${testCase.name}`);
  console.log(`HTTP ${response.status}: ${body.error}`);
  if (!passed) failures += 1;
}

if (failures > 0) {
  console.error(`\n${failures} smoke test(s) failed.`);
  process.exitCode = 1;
} else {
  console.log(`\nAll ${liveCases.length + validationCases.length} smoke tests passed.`);
}
