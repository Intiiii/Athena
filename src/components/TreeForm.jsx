import React, { useState, useEffect, useCallback } from 'react';

function TreeForm({ onSubmit, initialData, onClose }) {
	const [course, setCourse] = useState({
		name: '',
		section: {
			title: '',
			lessons: [{
				title: '',
				activities: [{
					title: '',
					xp: 10,
					description: ''
				}]
			}]
		}
	});


	const handleEscKey = useCallback((e) => {
		if (e.key === 'Escape') {
			onClose();
		}
	}, [onClose]);

	useEffect(() => {
		document.addEventListener('keydown', handleEscKey);
		return () => document.removeEventListener('keydown', handleEscKey);
	}, [handleEscKey]);

	useEffect(() => {
		if (initialData) {
			setCourse({
				name: initialData.name,
				section: initialData.sections?.[0] || { title: '', lessons: [] } // Handle potential undefined sections
			});
		}
	}, [initialData]);


	const addChapter = () => {
		setCourse({
			...course,
			section: {
				...course.section,
				lessons: [...course.section.lessons, {
					title: '',
					activities: [{
						title: '',
						xp: 10,
						description: ''
					}]
				}]
			}
		});
	};

	const addLesson = (chapterIndex) => {
		const newChapters = [...course.section.lessons];
		newChapters[chapterIndex].activities.push({
			title: '',
			xp: 10,
			description: ''
		});
		setCourse({
			...course,
			section: {
				...course.section,
				lessons: newChapters
			}
		});
	};

	const addActivity = (chapterIndex, lessonIndex) => {
		const newChapters = [...course.section.lessons];
		newChapters[chapterIndex].activities[lessonIndex].activities.push({
			title: '',
			xp: 10,
			description: ''
		});
		setCourse({
			...course,
			section: {
				...course.section,
				lessons: newChapters
			}
		});
	};

	const deleteActivity = (chapterIndex, lessonIndex, activityIndex) => {
		const newChapters = [...course.section.lessons];
		newChapters[chapterIndex].activities[lessonIndex].activities.splice(activityIndex, 1);
		if (newChapters[chapterIndex].activities[lessonIndex].activities.length === 0) {
			newChapters[chapterIndex].activities[lessonIndex].activities.push({
				title: '',
				xp: 10,
				description: ''
			});
		}
		setCourse({
			...course,
			section: {
				...course.section,
				lessons: newChapters
			}
		});
	};

	const handleClickOutside = (e) => {
		if (e.target.classList.contains('tree-form-overlay')) {
			onClose();
		}
	};

	const updateChapter = (index, value) => {
		const newChapters = [...course.section.lessons];
		newChapters[index].title = value;
		setCourse({
			...course,
			section: {
				...course.section,
				lessons: newChapters
			}
		});
	};

	const updateLesson = (chapterIndex, lessonIndex, field, value) => {
		const newChapters = [...course.section.lessons];
		newChapters[chapterIndex].activities[lessonIndex][field] = value;
		setCourse({
			...course,
			section: {
				...course.section,
				lessons: newChapters
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newSection = {
			...course.section,
			id: course.section.id || 'section-' + Date.now(),
			lessons: course.section.lessons.map((lesson, i) => ({
				...lesson,
				id: lesson.id || `lesson-${i}-${Date.now()}`,
				activities: lesson.activities.map((activity, j) => ({
					...activity,
					id: activity.id || `activity-${i}-${j}-${Date.now()}`,
					completed: activity.completed || false,
				}))
			}))
		};
		onSubmit({ 
			name: course.name,
			sections: [newSection],
			id: initialData?.id,
			xp: initialData?.xp || 0,
			streak: initialData?.streak || 0
		});
	};


	return (
		<div className="tree-form-overlay" onClick={handleClickOutside}>
			<form onSubmit={handleSubmit} className="tree-form" onClick={e => e.stopPropagation()}>
				<div className="form-header">
				  <h2>{initialData ? 'Edit Course' : 'New Course'}</h2>
				  <button type="button" className="close-button" onClick={onClose}>×</button>
				</div>

						<div className="form-section">
							<input
								type="text"
								placeholder="Course Name"
								value={course.name}
								onChange={(e) => setCourse({ ...course, name: e.target.value })}
								required
								className="course-name-input"
							/>
							<input
								type="text"
								placeholder="Section Title"
								value={course.section.title}
								onChange={(e) => setCourse({
									...course,
									section: { ...course.section, title: e.target.value }
								})}
								required
							/>
						</div>

						{course.section.lessons?.map((lesson, chapterIndex) => (
							<div key={lesson.id || chapterIndex} className="form-chapter">
								<h3>Lesson {chapterIndex + 1}</h3>
								<input
									type="text"
									placeholder="Lesson Title"
									value={lesson.title}
									onChange={(e) => updateChapter(chapterIndex, e.target.value)}
									required
								/>

								{lesson.activities?.map((activity, lessonIndex) => (
									<div key={activity.id || lessonIndex} className="form-lesson">
										<h4>Activity {lessonIndex + 1}</h4>
										<input
											type="text"
											placeholder="Activity Title"
											value={activity.title}
											onChange={(e) => {
												const newChapters = [...course.section.lessons];
												newChapters[chapterIndex].activities[lessonIndex].title = e.target.value;
												setCourse({
													...course,
													section: { ...course.section, chapters: newChapters }
												});
											}}
											required
										/>
										<button
											type="button"
											className="delete-button"
											onClick={() => deleteActivity(chapterIndex, lessonIndex, activityIndex)}
										>
											×
										</button>
									</div>
								))}
								<button
									type="button"
									className="add-lesson-button"
									onClick={() => addLesson(chapterIndex)}
								>
									Add Activity
								</button>
							</div>
						))}

						<button type="button" onClick={addChapter} className="add-chapter-button">
						  Add Lesson
						</button>

						<div className="form-buttons">
						  <button type="button" onClick={onClose} className="cancel-button">
							Cancel
						  </button>
						  <button type="submit" className="save-button">
							{initialData ? 'Update Course' : 'Create Course'}
						  </button>
						</div>

			</form>
		</div>
	);
}

export default TreeForm;
