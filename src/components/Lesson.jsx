import React, { useState } from 'react';
import LessonDetail from './LessonDetail';

function Lesson({ lesson, onComplete, isLast }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(true);
  };

  // Calculate total XP for the lesson from all activities
  const totalXP = lesson.activities.reduce((sum, activity) => sum + activity.xp, 0);
  const completedActivities = lesson.activities.filter(activity => activity.completed).length;

  const isCompleted = completedActivities === lesson.activities.length && lesson.activities.length > 0;

  return (
    <>
      <div 
        className={`lesson ${isCompleted ? 'completed' : ''} ${lesson.locked ? 'locked' : ''}`}
        onClick={handleClick}
      >
        <div className="lesson-circle">
          {isCompleted ? (
            <span className="checkmark">✓</span>
          ) : (
            <span className="lesson-title">{lesson.title}</span>
          )}
        </div>
        {!isLast && <div className="path-line"></div>}
        <div className="xp-badge">
          <span className="xp-label">XP:</span> {totalXP}
        </div>
      </div>

      {showDetails && (
        <LessonDetail 
          lesson={lesson} 
          onClose={() => setShowDetails(false)}
          onComplete={onComplete}
        />
      )}
    </>
  );
}

export default Lesson;
