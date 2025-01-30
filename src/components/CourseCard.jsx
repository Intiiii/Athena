import React from 'react';

function CourseCard({ course, onSelect }) {
	const totalLessons = course.sections.reduce((total, section) => 
		total + section.chapters.reduce((chTotal, chapter) => 
			chTotal + chapter.lessons.length, 0
		), 0
	);

	const completedLessons = course.sections.reduce((total, section) => 
		total + section.chapters.reduce((chTotal, chapter) => 
			chTotal + chapter.lessons.filter(lesson => 
				lesson.activities.every(activity => activity.completed)
			).length, 0
		), 0
	);

	return (
		<div className="course-overview-card" onClick={() => onSelect(course)}>
			<h2 className="course-title">{course.name}</h2>
			<div className="course-stats">
				<div className="stat-row">
					<span className="xp">XP: {course.xp}</span>
					<span className="streak">🔥 {course.streak}</span>
				</div>
				<div className="progress">
					{completedLessons} / {totalLessons} lessons completed
				</div>
			</div>
		</div>
	);
}

export default CourseCard;
