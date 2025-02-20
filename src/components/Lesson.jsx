import React from 'react';
import Activity from './Activity';
import LessonDetail from './LessonDetail';

function Lesson({ lesson, onComplete, isLast }) {
  return (
    <div className="chapter">
      <div className="chapter-header">
        <h2>{lesson.title}</h2>
      </div>
      <div className="lessons">
        {lesson.activities.map((activity, index) => {
          // Calculate if lesson is locked based on previous lesson's activities
          const prevLesson = index > 0 ? lesson.activities[index - 1] : null;
          const isLocked = prevLesson ?
            (prevLesson.activities || []).some(activity => !activity.completed) :
            false;

          return (
            <Activity
              key={activity.id}
              activity={{
                ...activity,
                locked: isLocked
              }}
              onComplete={onComplete}
              isLast={isLast && index === lesson.activities.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Lesson;
