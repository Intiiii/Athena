import React, { useState } from 'react';
import LessonDetail from './LessonDetail';
import './Activity.css';

function Activity({ activity, onComplete, isLast }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true);
  };

  const handleClose = () => {
    setShowDetails(false);
  };

  // Calculate total XP for the lesson from all activities
  const totalXP = (activity.activities || []).reduce((sum, activity) => sum + activity.xp, 0);
  const completedActivities = (activity.activities || []).filter(activity => activity.completed).length;

  const isCompleted = completedActivities === (activity.activities || []).length && (activity.activities || []).length > 0;

  return (
    <>
      <div 
        className={`activity ${isCompleted ? 'completed' : ''} ${activity.locked ? 'locked' : ''}`}
        onClick={handleClick}
      >
        <div className="activity-circle">
          {isCompleted ? (
            <span className="checkmark">✓</span>
          ) : (
            <span className="star">★</span> // Reverted to the previous star icon
          )}
        </div>
        <div className="activity-title">{activity.title}</div>
        {!isLast && <div className="path-line"></div>}
        <div className="xp-badge">
          <span className="xp-label">XP:</span> {totalXP}
        </div>
      </div>

      {showDetails && (
        <LessonDetail 
          activity={activity} 
          onClose={handleClose}
          onComplete={onComplete}
        />
      )}
    </>
  );
}

export default Activity;
