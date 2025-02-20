import React from 'react';
import './LessonDetail.css'; // Import the CSS file

function LessonDetail({ activity, onClose, onComplete }) {
	if (!activity) {
		return null; // Or a loading state, or a fallback UI
	}

	const totalXP = (activity.activities || []).reduce((sum, activity) => sum + activity.xp, 0);
	const completedActivities = (activity.activities || []).filter(activity => activity.completed).length;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>×</button>
				<h2>{activity.title}</h2>
				
				<div className="lesson-info">
					<div className="xp">Total XP: {totalXP}</div>
					<div className="progress">
						{completedActivities} of {(activity.activities || []).length} activities completed
					</div>
				</div>

				<div className="activities-list">
					{(activity.activities || []).map((activity, index) => (
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
							{!activity.completed && !activity.locked && (
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
