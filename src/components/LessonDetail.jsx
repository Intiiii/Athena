import React from 'react';

function LessonDetail({ lesson, onClose, onComplete }) {
	const totalXP = lesson.activities.reduce((sum, activity) => sum + activity.xp, 0);
	const completedActivities = lesson.activities.filter(activity => activity.completed).length;

	return (
		<div className="lesson-detail-overlay" onClick={onClose}>
			<div className="lesson-detail-content" onClick={e => e.stopPropagation()}>
				<button className="close-button" onClick={onClose}>×</button>
				<h2>{lesson.title}</h2>
				
				<div className="lesson-info">
					<div className="xp">Total XP: {totalXP}</div>
					<div className="progress">
						{completedActivities} of {lesson.activities.length} activities completed
					</div>
				</div>

				<div className="activities-list">
					{lesson.activities.map((activity, index) => (
						<div 
							key={activity.id || index} 
							className={`activity-item ${activity.completed ? 'completed' : ''}`}
						>
							<div className="activity-header">
								<h3>{activity.title}</h3>
								<div className="activity-xp">XP: {activity.xp}</div>
							</div>
							{activity.description && (
								<p className="activity-description">{activity.description}</p>
							)}
							{!activity.completed && !lesson.locked && (
								<button 
									className="complete-button"
									onClick={() => onComplete(activity.id)}
								>
									Complete Activity
								</button>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}


export default LessonDetail;