const slugToImage: Record<string, string> = {
  "handelsavtalet": "/Images/sectors/handel.jpg",
  "teknikavtalet": "/Images/sectors/industri.jpg",
  "byggavtalet": "/Images/sectors/bygg-anlaggning.jpg",
  "hok-kommunal": "/Images/sectors/vard-omsorg.jpg",
  "it-avtalet": "/Images/sectors/it-tech.jpg",
  "transportavtalet": "/Images/sectors/transport.jpg",
  "hotell-restaurang": "/Images/sectors/hotell-restaurang.jpg",
  "ab-kommunalt": "/Images/sectors/vard-omsorg.jpg",
  "hok-vision": "/Images/sectors/kontor-tjansteman.jpg",
  "villkorsavtal-saco": "/Images/sectors/kontor-tjansteman.jpg",
  "villkorsavtal-ofr": "/Images/sectors/kontor-tjansteman.jpg",
  "villkorsavtal-seko": "/Images/sectors/kontor-tjansteman.jpg",
  "installationsavtalet": "/Images/sectors/bygg-anlaggning.jpg",
  "bemanningsavtalet": "/Images/sectors/kontor-tjansteman.jpg",
  "fastighetsavtalet": "/Images/sectors/kontor-tjansteman.jpg",
  "skogsavtalet": "/Images/sectors/industri.jpg",
  "bankavtalet": "/Images/sectors/kontor-tjansteman.jpg",
  "livsmedelsavtalet": "/Images/sectors/industri.jpg",
  "laraavtalet": "/Images/sectors/skola-utbildning.jpg",
  "sjukskoterska-avtal": "/Images/sectors/vard-omsorg.jpg",
  "lakare-kommun": "/Images/sectors/vard-omsorg.jpg",
};

const sectorToImage: Record<string, string> = {
  "Privat transport": "/Images/sectors/transport.jpg",
  "Privat handel": "/Images/sectors/handel.jpg",
  "Privat hotell/restaurang": "/Images/sectors/hotell-restaurang.jpg",
  "Privat industri": "/Images/sectors/industri.jpg",
  "Privat IT/telekom": "/Images/sectors/it-tech.jpg",
  "Privat bygg": "/Images/sectors/bygg-anlaggning.jpg",
  "Privat installation": "/Images/sectors/bygg-anlaggning.jpg",
  "Privat bank/finans": "/Images/sectors/kontor-tjansteman.jpg",
  "Privat bemanning": "/Images/sectors/kontor-tjansteman.jpg",
  "Privat fastighet": "/Images/sectors/kontor-tjansteman.jpg",
  "Privat vård": "/Images/sectors/vard-omsorg.jpg",
  "Kommun/region": "/Images/sectors/vard-omsorg.jpg",
  "Statlig sektor": "/Images/sectors/kontor-tjansteman.jpg",
  "Statligt skogsbruk": "/Images/sectors/industri.jpg",
};

const categoryToImage: Record<string, string> = {
  "Vård & Omsorg": "/Images/sectors/vard-omsorg.jpg",
  "Skola & Utbildning": "/Images/sectors/skola-utbildning.jpg",
  "Bygg & Anläggning": "/Images/sectors/bygg-anlaggning.jpg",
  "Handel & Service": "/Images/sectors/handel.jpg",
  "Transport & Logistik": "/Images/sectors/transport.jpg",
  "Hotell & Restaurang": "/Images/sectors/hotell-restaurang.jpg",
  "IT & Teknik": "/Images/sectors/it-tech.jpg",
  "Industri & Tillverkning": "/Images/sectors/industri.jpg",
  "Kontor & Administration": "/Images/sectors/kontor-tjansteman.jpg",
  "Bank & Försäkring": "/Images/sectors/kontor-tjansteman.jpg",
};

const DEFAULT_IMAGE = "/Images/misc/meeting-room.jpg";

export function getAgreementHeroImage(slug: string, sectorLabel?: string): string {
  return slugToImage[slug] || (sectorLabel && sectorToImage[sectorLabel]) || DEFAULT_IMAGE;
}

export function getOccupationHeroImage(category: string): string {
  return categoryToImage[category] || DEFAULT_IMAGE;
}
