import React, { useState, useEffect } from 'react';
import Section from './Section';
import { calculateProgress } from '../utils/progress';

function SkillTree({ initialData, standalone = true, isEditing = false }) {
  const [skillTree, setSkillTree] = useState(initialData);

  useEffect(() => {
    if (standalone) {
      localStorage.setItem('skillTree', JSON.stringify(skillTree));
    }
  }, [skillTree, standalone]);

  const completeActivity = (activityId) => {
    const updatedTree = { ...skillTree };
    let activityXP = 0;

    // Find and complete the activity
    updatedTree.sections.forEach(section => {
      section.chapters.forEach(chapter => {
        chapter.lessons.forEach(lesson => {
          lesson.activities.forEach(activity => {
            if (activity.id === activityId) {
              activity.completed = true;
              activityXP = activity.xp;
            }
          });

          // Check if all activities in the lesson are completed
          const allActivitiesCompleted = lesson.activities.every(activity => activity.completed);
          if (allActivitiesCompleted) {
            lesson.completed = true;
          }
        });
      });
    });

    updatedTree.xp += activityXP;
    setSkillTree(updatedTree);
  };

  return (
    <div className={`skill-tree ${isEditing ? 'editing' : ''}`}>
      <div className="header">
        <div className="header-stats">
          <div className="xp-counter">XP: {skillTree.xp}</div>
          <div className="streak-counter">🔥 {skillTree.streak}</div>
        </div>
      </div>
      
      {skillTree.sections.map(section => (
        <Section 
          key={section.id}
          section={section}
            onComplete={completeActivity}
          progress={calculateProgress(section)}
        />
      ))}
    </div>
  );
}

export default SkillTree;
