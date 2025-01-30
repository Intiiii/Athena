import React from 'react';
import Chapter from './Chapter';

function Section({ section, onComplete, progress }) {
  return (
    <div className="section">
      <div className="section-header">
        <h2>{section.title}</h2>
        <div className="progress-indicator">
            {progress}% complete
        </div>
      </div>
      <div className="chapters">
        {section.chapters.map((chapter, index) => (
          <Chapter
            key={chapter.id}
            chapter={chapter}
            onComplete={onComplete}
            isLast={index === section.chapters.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default Section;
