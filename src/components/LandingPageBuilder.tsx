import React, { useEffect } from 'react';

import { selectUnit, closeNotification, updateCountdownTimers, addPriceUpdateNotification } from '../store/landingPageSlice';
import ProjectSelector from './ProjectSelector';
import UnitSelector from './UnitSelector';
import PricingDisplay from './PricingDisplay';
import PersonalizationContent from './PersonalizationContent';
import Notification from './Notification';
import { useAppDispatch, useAppSelector } from '../store/hook';
import type { Area, Zone, Project, Unit } from '../types';

const mockAreas: Area[] = [
  { area_id: 1, area_name_en: 'Downtown', area_name_ar: 'دبي' },
  { area_id: 2, area_name_en: 'Marina', area_name_ar: 'مارينا' },
];

const mockZones: Zone[] = [
  { zone_id: 1, area_id: 1, zone_name_en: 'Central', zone_name_ar: 'مركزي' },
  { zone_id: 2, area_id: 2, zone_name_en: 'Waterfront', zone_name_ar: 'واجهة بحرية' },
];

const mockProjects: Project[] = [
  {
    project_id: 1,
    project_name: 'Sky Towers',
    area_id: 1,
    zone_id: 1,
    completion_status: 'under_construction',
    min_price: 1000000,
    max_price: 5000000,
    total_units: 100,
    available_units: 50,
  },
  {
    project_id: 2,
    project_name: 'Marina Heights',
    area_id: 2,
    zone_id: 2,
    completion_status: 'ready',
    min_price: 1500000,
    max_price: 6000000,
    total_units: 80,
    available_units: 30,
  },
  {
    project_id: 3,
    project_name: 'Ocean View',
    area_id: 2,
    zone_id: 2,
    completion_status: 'off_plan',
    min_price: 800000,
    max_price: 4000000,
    total_units: 120,
    available_units: 60,
  },
];

const mockUnits: Unit[] = [
  {
    unit_id: 1,
    project_id: 1,
    unit_number: 'A101',
    property_type: 'apartment',
    bedrooms: 1,
    area_sqft: 800,
    price: 1200000,
    status: 'available',
    floor_level: 2,
    has_balcony: true,
    has_parking: true,
  },
  {
    unit_id: 2,
    project_id: 1,
    unit_number: 'A401',
    property_type: 'studio',
    bedrooms: 0,
    area_sqft: 500,
    price: 800000,
    status: 'reserved',
    floor_level: 4,
    has_balcony: false,
    has_parking: true,
  },
  {
    unit_id: 3,
    project_id: 1,
    unit_number: 'A501',
    property_type: 'apartment',
    bedrooms: 3,
    area_sqft: 1500,
    price: 2500000,
    status: 'available',
    floor_level: 5,
    has_balcony: true,
    has_parking: true,
  },
  {
    unit_id: 4,
    project_id: 2,
    unit_number: 'B201',
    property_type: 'villa',
    bedrooms: 4,
    area_sqft: 2000,
    price: 4000000,
    status: 'available',
    floor_level: 0,
    has_balcony: false,
    has_parking: true,
  },
  {
    unit_id: 5,
    project_id: 2,
    unit_number: 'B301',
    property_type: 'townhouse',
    bedrooms: 2,
    area_sqft: 1200,
    price: 1800000,
    status: 'sold',
    floor_level: 1,
    has_balcony: true,
    has_parking: true,
  },
  {
    unit_id: 6,
    project_id: 3,
    unit_number: 'C101',
    property_type: 'studio',
    bedrooms: 0,
    area_sqft: 600,
    price: 900000,
    status: 'available',
    floor_level: 3,
    has_balcony: false,
    has_parking: false,
  },
];

const LandingPageBuilder: React.FC = () => {
  const dispatch = useAppDispatch();
  const { selectedProject, selectedUnits, pricingCalculations, contentPersonalization, notifications, countdownTimers } =
    useAppSelector(state => state.landingPage);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(updateCountdownTimers());
    }, 1000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(addPriceUpdateNotification());
    }, 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-secondary">
      <div className="container">

        <h1 className="header">Think Realty Landing Page Builder</h1>
        <ProjectSelector projects={mockProjects} />
        {selectedProject && (
          <>
            <UnitSelector
              units={mockUnits.filter(u => u.project_id === selectedProject.project_id && u.status !== 'sold')}
              selectedUnits={selectedUnits}
              countdownTimers={countdownTimers}
              onSelect={(unit: Unit) => dispatch(selectUnit(unit))}
            />
            {pricingCalculations.length > 0 && (
              <PricingDisplay pricingCalculations={pricingCalculations} units={mockUnits} />
            )}
            {contentPersonalization  && (
              <PersonalizationContent
                personalization={contentPersonalization}
                project={selectedProject}
                areas={mockAreas}
              />
            )}
          </>
        )}
        {notifications.length > 0 && (
          <div className="fixed bottom-6 right-6 space-y-3 max-w-sm">
            {notifications.map(notification => (
              <Notification
                key={notification.id}
                notification={notification}
                onClose={() => dispatch(closeNotification(notification.id))}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPageBuilder;