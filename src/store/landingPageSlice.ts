import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { calculatePricing } from '../utils/calculatePricing';
import { getPersonalizationConfig } from '../utils/getPersonalizationConfig';
import { handleAvailabilityCascade } from '../utils/handleAvailabilityCascade';
import { runValidationChain } from '../utils/runValidationChain';
import type { Area, LandingPageState, Project, Unit, Zone } from '../types';

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

const initialState: LandingPageState = {
  selectedProject: mockProjects[0],
  selectedUnits: [],
  pricingCalculations: [],
  availabilityStatus: {},
  contentPersonalization: null,
  countdownTimers: {},
  bulkDiscountEligible: false,
  demandTriggers: [],
  notifications: [],
  conflictResolution: { hasConflict: false, conflictingUnits: [], suggestedMerge: [] },
  layoutMode: 'standard',
};

const landingPageSlice = createSlice({
  name: 'landingPage',
  initialState,
  reducers: {
    selectProject: (state, action: PayloadAction<Project>) => {
      state.selectedProject = action.payload;
      state.selectedUnits = [];
      state.pricingCalculations = [];
      state.notifications = [];
      state.countdownTimers = {};
      state.availabilityStatus = {};
      state.demandTriggers = [];
      state.conflictResolution = { hasConflict: false, conflictingUnits: [], suggestedMerge: [] };
      const area = mockAreas.find(a => a.area_id === action.payload.area_id);
      state.contentPersonalization = area ? getPersonalizationConfig([], area) : null;
    },
    selectUnit: (state, action: PayloadAction<Unit>) => {
        if (!state.selectedProject) {
          return; // Guard against null selectedProject
        }
        const newUnits = state.selectedUnits.some(u => u.unit_id === action.payload.unit_id)
          ? state.selectedUnits.filter(u => u.unit_id !== action.payload.unit_id)
          : [...state.selectedUnits, action.payload];
        const updatedUnits = handleAvailabilityCascade(action.payload, mockUnits, state.selectedProject, mockZones);
        state.selectedUnits = newUnits;
        state.pricingCalculations = newUnits.map(calculatePricing);
        const area = mockAreas.find((a:any) => a.area_id === state.selectedProject.area_id);
        state.contentPersonalization = area ? getPersonalizationConfig(newUnits, area) : null;
        const { notifications } = runValidationChain(newUnits, state.selectedProject);
        state.notifications = notifications;
        if (action.payload.status === 'reserved') {
          state.countdownTimers[action.payload.unit_id] = 48 * 3600;
        }
        state.availabilityStatus[action.payload.unit_id] = action.payload.status;
      },
    closeNotification: (state, action: PayloadAction<number>) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    updateCountdownTimers: (state) => {
      const newTimers = { ...state.countdownTimers };
      Object.keys(newTimers).forEach(unitId => {
        newTimers[parseInt(unitId)] = Math.max(0, newTimers[parseInt(unitId)] - 1);
      });
      state.countdownTimers = newTimers;
    },
    addPriceUpdateNotification: (state) => {
      if (state.selectedUnits.length > 0) {
        state.notifications.push({
          id: Date.now(),
          message: 'Unit price updated by external API.',
          type: 'info',
        });
      }
    },
  },
});

export const { selectProject, selectUnit, closeNotification, updateCountdownTimers, addPriceUpdateNotification } = landingPageSlice.actions;
export default landingPageSlice.reducer;