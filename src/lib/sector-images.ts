const slugToImage: Record<string, string> = {
  "handelsavtalet": "/images/sectors/handel.jpg",
  "teknikavtalet": "/images/sectors/industri.jpg",
  "byggavtalet": "/images/sectors/bygg-anlaggning.jpg",
  "hok-kommunal": "/images/sectors/vard-omsorg.jpg",
  "it-avtalet": "/images/sectors/it-tech.jpg",
  "transportavtalet": "/images/sectors/transport.jpg",
  "hotell-restaurang": "/images/sectors/hotell-restaurang.jpg",
  "ab-kommunalt": "/images/sectors/vard-omsorg.jpg",
  "hok-vision": "/images/sectors/kontor-tjansteman.jpg",
  "villkorsavtal-saco": "/images/sectors/kontor-tjansteman.jpg",
  "villkorsavtal-ofr": "/images/sectors/kontor-tjansteman.jpg",
  "villkorsavtal-seko": "/images/sectors/kontor-tjansteman.jpg",
  "installationsavtalet": "/images/sectors/bygg-anlaggning.jpg",
  "bemanningsavtalet": "/images/sectors/kontor-tjansteman.jpg",
  "fastighetsavtalet": "/images/sectors/kontor-tjansteman.jpg",
  "skogsavtalet": "/images/sectors/industri.jpg",
  "bankavtalet": "/images/sectors/kontor-tjansteman.jpg",
  "livsmedelsavtalet": "/images/sectors/industri.jpg",
  "laraavtalet": "/images/sectors/skola-utbildning.jpg",
  "sjukskoterska-avtal": "/images/sectors/vard-omsorg.jpg",
  "lakare-kommun": "/images/sectors/vard-omsorg.jpg",
};

const sectorToImage: Record<string, string> = {
  "Privat transport": "/images/sectors/transport.jpg",
  "Privat handel": "/images/sectors/handel.jpg",
  "Privat hotell/restaurang": "/images/sectors/hotell-restaurang.jpg",
  "Privat industri": "/images/sectors/industri.jpg",
  "Privat IT/telekom": "/images/sectors/it-tech.jpg",
  "Privat bygg": "/images/sectors/bygg-anlaggning.jpg",
  "Privat installation": "/images/sectors/bygg-anlaggning.jpg",
  "Privat bank/finans": "/images/sectors/kontor-tjansteman.jpg",
  "Privat bemanning": "/images/sectors/kontor-tjansteman.jpg",
  "Privat fastighet": "/images/sectors/kontor-tjansteman.jpg",
  "Privat vård": "/images/sectors/vard-omsorg.jpg",
  "Kommun/region": "/images/sectors/vard-omsorg.jpg",
  "Statlig sektor": "/images/sectors/kontor-tjansteman.jpg",
  "Statligt skogsbruk": "/images/sectors/industri.jpg",
};

const categoryToImage: Record<string, string> = {
  "Vård & Omsorg": "/images/sectors/vard-omsorg.jpg",
  "Skola & Utbildning": "/images/sectors/skola-utbildning.jpg",
  "Bygg & Anläggning": "/images/sectors/bygg-anlaggning.jpg",
  "Handel & Service": "/images/sectors/handel.jpg",
  "Transport & Logistik": "/images/sectors/transport.jpg",
  "Hotell & Restaurang": "/images/sectors/hotell-restaurang.jpg",
  "IT & Teknik": "/images/sectors/it-tech.jpg",
  "Industri & Tillverkning": "/images/sectors/industri.jpg",
  "Kontor & Administration": "/images/sectors/kontor-tjansteman.jpg",
  "Bank & Försäkring": "/images/sectors/kontor-tjansteman.jpg",
};

const DEFAULT_IMAGE = "/images/misc/meeting-room.jpg";

export function getAgreementHeroImage(slug: string, sectorLabel?: string): string {
  return slugToImage[slug] || (sectorLabel && sectorToImage[sectorLabel]) || DEFAULT_IMAGE;
}

export function getOccupationHeroImage(category: string): string {
  return categoryToImage[category] || DEFAULT_IMAGE;
}
