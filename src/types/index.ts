export interface Area {
    area_id: number;
    area_name_en: string;
    area_name_ar: string;
  }
  
  export interface Zone {
    zone_id: number;
    area_id: number;
    zone_name_en: string;
    zone_name_ar: string;
  }
  
  export interface Project {
    project_id: number;
    project_name: string;
    area_id: number;
    zone_id: number;
    completion_status: 'under_construction' | 'ready' | 'off_plan';
    min_price: number;
    max_price: number;
    total_units: number;
    available_units: number;
  }
  
  export interface Unit {
    unit_id: number;
    project_id: number;
    unit_number: string;
    property_type: 'apartment' | 'villa' | 'townhouse' | 'studio';
    bedrooms: number;
    area_sqft: number;
    price: number;
    status: 'available' | 'reserved' | 'sold';
    floor_level: number;
    has_balcony: boolean;
    has_parking: boolean;
  }
  
  export interface PricingResult {
    unit_id: number;
    base_price: number;
    floor_adjustment: number;
    total_price: number;
  }
  
  export interface PersonalizationConfig {
    showArabic: boolean;
    investmentFocus: boolean;
    familyFocus: boolean;
    luxuryFocus: boolean;
  }
  
  export interface NotificationState {
    id: number;
    message: string;
    type: 'info' | 'warning' | 'error';
  }
  
  export interface SelectionMetrics {
    totalArea: number;
    luxuryUnits: number;
    phaseConflicts: string[];
  }
  
  export interface AvailabilityStatus {
    [unitId: number]: 'available' | 'reserved' | 'sold';
  }
  
  export interface ConflictState {
    hasConflict: boolean;
    conflictingUnits: number[];
    suggestedMerge: Unit[];
  }
  
  export interface DemandTrigger {
    unit_id: number;
    demand_score: number;
  }
  
  export interface LandingPageState {
    selectedProject: Project | null;
    selectedUnits: Unit[];
    pricingCalculations: PricingResult[];
    availabilityStatus: AvailabilityStatus;
    contentPersonalization: PersonalizationConfig | null;
    countdownTimers: { [unitId: number]: number };
    bulkDiscountEligible: boolean;
    demandTriggers: DemandTrigger[];
    notifications: NotificationState[];
    conflictResolution: ConflictState;
    layoutMode: 'standard' | 'compact';
  }