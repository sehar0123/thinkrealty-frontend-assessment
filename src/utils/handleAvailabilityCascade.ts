import type { Unit, Project, Zone } from "../types";


export const handleAvailabilityCascade = (updatedUnit: Unit, allUnits: Unit[], project: Project, zonesInArea: Zone[]): Unit[] => {
  const updatedUnits = [...allUnits];
  const index = updatedUnits.findIndex(u => u.unit_id === updatedUnit.unit_id);
  if (index !== -1) {
    updatedUnits[index] = { ...updatedUnit };
  }
  return updatedUnits;
};