import React from 'react';
import Lesson from './Lesson';

function Chapter({ chapter, onComplete, isLast }) {
  return (
    <div className="chapter">
      <h3 className="chapter-title">{chapter.title}</h3>
      <div className="lessons">
        {chapter.lessons.map((lesson, index) => {
          // Calculate if lesson is locked based on previous lesson's activities
          const prevLesson = index > 0 ? chapter.lessons[index - 1] : null;
          const isLocked = prevLesson ? 
            prevLesson.activities.some(activity => !activity.completed) : 
            false;

          return (
            <Lesson
              key={lesson.id}
              lesson={{
                ...lesson,
                locked: isLocked
              }}
              onComplete={onComplete}
              isLast={isLast && index === chapter.lessons.length - 1}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Chapter;

