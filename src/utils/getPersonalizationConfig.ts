import type { Unit, Area, PersonalizationConfig } from "../types";


export const getPersonalizationConfig = (selectedUnits: Unit[], area: Area): PersonalizationConfig => {
  const totalUnits = selectedUnits.length;
  const studioOrOneBed = selectedUnits.filter(u => u.bedrooms <= 1).length;
  const twoPlusBeds = selectedUnits.filter(u => u.bedrooms >= 2).length;
  const avgPricePerSqft = totalUnits > 0
    ? selectedUnits.reduce((sum, u) => sum + u.price / u.area_sqft, 0) / totalUnits
    : 0;

  return {
    showArabic: area.area_name_ar.includes('ar') || area.area_name_ar === 'دبي',
    investmentFocus: totalUnits > 0 && (studioOrOneBed / totalUnits) < 0.8,
    familyFocus: totalUnits > 0 && (twoPlusBeds / totalUnits) < 0.5,
    luxuryFocus: avgPricePerSqft > 1200,
  };
};