import React from 'react';
import type { Unit } from '../types';


interface UnitSelectorProps {
  units: Unit[];
  selectedUnits: Unit[];
  countdownTimers: { [unitId: number]: number };
  onSelect: (unit: Unit) => void;
}

const UnitSelector: React.FC<UnitSelectorProps> = ({ units, selectedUnits, countdownTimers, onSelect }) => {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  return (
    <div className="card mt-6">
    <h2 className="text-2xl font-semibold mb-4">Select Units</h2>
    <div className="space-y-4">
      {units.map(unit => (
        <div key={unit.unit_id} className="unit-card flex items-start gap-3">
          <input
            type="checkbox"
            checked={selectedUnits.some(u => u.unit_id === unit.unit_id)}
            onChange={() => onSelect(unit)}
            className="h-5 w-5 mt-1 text-blue-600"
          />
          <div>
            <p className="font-medium">{unit.unit_number} ({unit.property_type})</p>
            <p className="text-sm text-gray-500">Bedrooms: {unit.bedrooms}, Area: {unit.area_sqft} sqft</p>
            <p className="text-sm text-gray-500">Status: {unit.status}</p>
            {unit.status === 'reserved' && countdownTimers[unit.unit_id] && (
              <p className="text-sm text-red-500">
                Reservation expires in: {formatTime(countdownTimers[unit.unit_id])}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default UnitSelector;