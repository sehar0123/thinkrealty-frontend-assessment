import type { PricingResult, Unit } from "../types";


export const calculatePricing = (unit: Unit): PricingResult => {
  let floorAdjustment = 0;
  if (unit.floor_level === 0) {
    floorAdjustment = 0; // Ground floor: +0
  } else if (unit.floor_level >= 1 && unit.floor_level <= 3) {
    floorAdjustment = 5; // 1st-3rd floor: +5 per sqft
  } else if (unit.floor_level >= 4) {
    floorAdjustment = 10; // 4th floor and above: +10 per sqft
  }

  const basePrice = unit.price;
  const adjustment = unit.area_sqft * floorAdjustment;
  const totalPrice = basePrice + adjustment;

  return {
    unit_id: unit.unit_id,
    base_price: basePrice,
    floor_adjustment: adjustment,
    total_price: totalPrice,
  };
};