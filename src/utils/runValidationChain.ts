import type { Unit, Project, NotificationState, SelectionMetrics } from "../types";


export const runValidationChain = (selectedUnits: Unit[], project: Project): { notifications: NotificationState[] } => {
  const notifications: NotificationState[] = [];
  const totalArea = selectedUnits.reduce((sum, u) => sum + u.area_sqft, 0);
  const luxuryUnits = selectedUnits.filter(u => u.has_balcony && u.has_parking && u.bedrooms >= 4).length;
  const phaseConflicts = selectedUnits
    .filter(u => u.project_id === project.project_id)
    .reduce((acc: string[], u, i, arr) => {
      const otherUnits = arr.filter(o => o.unit_id !== u.unit_id);
      const hasConflict = otherUnits.some(o => project.completion_status === 'under_construction' && o.status === 'sold');
      return hasConflict ? [...acc, `Unit ${u.unit_number} conflicts with sold units in ${project.completion_status} phase`] : acc;
    }, []);

  const metrics: SelectionMetrics = {
    totalArea,
    luxuryUnits,
    phaseConflicts,
  };

  if (totalArea > project.available_units * 1.2) {
    notifications.push({
      id: Date.now(),
      message: 'Selected units exceed project common area ratio (1.2x).',
      type: 'error',
    });
  }

  if (selectedUnits.length > 0 && luxuryUnits / selectedUnits.length > 0.4) {
    notifications.push({
      id: Date.now(),
      message: 'Luxury features (balcony + parking + 4+ bedrooms) exceed 40% of selection.',
      type: 'error',
    });
  }

  if (phaseConflicts.length > 0) {
    notifications.push({
      id: Date.now(),
      message: `Phase conflicts detected: ${phaseConflicts.join(', ')}`,
      type: 'error',
    });
  }

  return { notifications };
};