import React from 'react';
import type { PricingResult, Unit } from '../types';


interface PricingDisplayProps {
  pricingCalculations: PricingResult[];
  units: Unit[];
}

const PricingDisplay: React.FC<PricingDisplayProps> = ({ pricingCalculations, units }) => {
  return (
    <div className="card mt-6">
    <h2 className="text-2xl font-semibold mb-4">Pricing Breakdown</h2>
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2 text-center align-middle">Unit</th>
          <th className="border p-2 text-center align-middle">Base Price (AED)</th>
          <th className="border p-2 text-center align-middle">Floor Adjustment (AED)</th>
          <th className="border p-2 text-center align-middle">Total Price (AED)</th>
        </tr>
      </thead>
      <tbody>
        {pricingCalculations.map(calc => {
          const unit = units.find(u => u.unit_id === calc.unit_id);
          return (
            <tr key={calc.unit_id}>
              <td className="border p-2 text-center align-middle">{unit?.unit_number}</td>
              <td className="border p-2 text-center align-middle">{calc.base_price.toLocaleString()}</td>
              <td className="border p-2 text-center align-middle">{calc.floor_adjustment.toLocaleString()}</td>
              <td className="border p-2 text-center align-middle">{calc.total_price.toLocaleString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
  
  );
};

export default PricingDisplay;