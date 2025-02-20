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

    updatedTree.sections.forEach(section => {
      section.lessons.forEach(lesson => {
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

    updatedTree.xp += activityXP;
    setSkillTree(updatedTree);
  };

  return (
    <div className={`skill-tree ${isEditing ? 'editing' : ''}`}>

      {skillTree.sections && skillTree.sections.map(section => ( // Ensure sections exists
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
