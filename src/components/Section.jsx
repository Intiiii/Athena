import React from 'react';
import Lesson from './Lesson';

function Section({ section, onComplete, progress }) {
  return (
    <><div className="section-header">
        <h2>{section.title}</h2>
        <div className="progress-indicator">
          {progress}% complete
        </div>
      </div>
    <div className="lessons">
      {section.lessons.map((lesson, index) => (
        <Lesson
          key={lesson.id}
          lesson={lesson}
          onComplete={onComplete}
          isLast={index === section.lessons.length - 1} />
        ))}
    </div></>
  );
}

export default Section;
