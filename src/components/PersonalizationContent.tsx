import React from 'react';
import type { PersonalizationConfig, Project, Area } from '../types';

interface PersonalizationContentProps {
  personalization: PersonalizationConfig | null;
  project: Project;
  areas: Area[];
}

const PersonalizationContent: React.FC<PersonalizationContentProps> = ({ personalization, project, areas }) => {
  const area = areas.find(a => a.area_id === project.area_id);

  // Guard clause to prevent rendering if personalization or area is undefined
  if (!personalization || !area) {
    return null;
  }

  // Check if any personalization content is available
  const hasContent = personalization.showArabic || personalization.investmentFocus || personalization.familyFocus || personalization.luxuryFocus;

  // Return null if no personalization content is available
  if (!hasContent) {
    return null;
  }

  return (
    <div className="card-gradient mt-6">
      <h2 className="text-2xl font-semibold mb-4">Personalized Content</h2>
      {personalization.showArabic && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">{area.area_name_ar}</h3>
          <p>مرحبًا بكم في {project.project_name}، مشروع مميز في قلب {area.area_name_ar}</p>
        </div>
      )}
      {personalization.investmentFocus && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Investment Opportunity</h3>
          <p>ROI calculations show strong potential for studios and 1-bedroom units in {project.project_name}.</p>
        </div>
      )}
      {personalization.familyFocus && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Family-Friendly Amenities</h3>
          <p>{project.project_name} offers spacious 2+ bedroom units with family-oriented facilities.</p>
        </div>
      )}
      {personalization.luxuryFocus && (
        <div className="mb-4">
          <h3 className="text-lg font-medium">Luxury Living</h3>
          <p>Experience premium living in {project.project_name} with units priced above AED 1,200/sqft.</p>
        </div>
      )}
    </div>
  );
};

export default PersonalizationContent;