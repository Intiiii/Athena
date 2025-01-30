import React, { useState, useEffect, useCallback } from 'react';

function TreeForm({ onSubmit, initialData, onClose }) {
	const [course, setCourse] = useState({
		name: '',
		section: {
			title: '',
			chapters: [{
				title: '',
				lessons: [{
					title: '',
					activities: [{
						title: '',
						xp: 10,
						description: ''
					}]
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
				section: initialData.sections[0]
			});
		}
	}, [initialData]);


	const addChapter = () => {
		setCourse({
			...course,
			section: {
				...course.section,
				chapters: [...course.section.chapters, {
					title: '',
					lessons: [{
						title: '',
						xp: 10,
						description: ''
					}]
				}]
			}
		});
	};

	const addLesson = (chapterIndex) => {
		const newChapters = [...course.section.chapters];
		newChapters[chapterIndex].lessons.push({
			title: '',
			activities: [{
				title: '',
				xp: 10,
				description: ''
			}]
		});
		setCourse({
			...course,
			section: {
				...course.section,
				chapters: newChapters
			}
		});
	};

	const addActivity = (chapterIndex, lessonIndex) => {
		const newChapters = [...course.section.chapters];
		newChapters[chapterIndex].lessons[lessonIndex].activities.push({
			title: '',
			xp: 10,
			description: ''
		});
		setCourse({
			...course,
			section: {
				...course.section,
				chapters: newChapters
			}
		});
	};

	const deleteActivity = (chapterIndex, lessonIndex, activityIndex) => {
		const newChapters = [...course.section.chapters];
		newChapters[chapterIndex].lessons[lessonIndex].activities.splice(activityIndex, 1);
		if (newChapters[chapterIndex].lessons[lessonIndex].activities.length === 0) {
			newChapters[chapterIndex].lessons[lessonIndex].activities.push({
				title: '',
				xp: 10,
				description: ''
			});
		}
		setCourse({
			...course,
			section: {
				...course.section,
				chapters: newChapters
			}
		});
	};

	const handleClickOutside = (e) => {
		if (e.target.classList.contains('tree-form-overlay')) {
			onClose();
		}
	};

	const updateChapter = (index, value) => {
		const newChapters = [...course.section.chapters];
		newChapters[index].title = value;
		setCourse({
			...course,
			section: {
				...course.section,
				chapters: newChapters
			}
		});
	};

	const updateLesson = (chapterIndex, lessonIndex, field, value) => {
		const newChapters = [...course.section.chapters];
		newChapters[chapterIndex].lessons[lessonIndex][field] = value;
		setCourse({
			...course,
			section: {
				...course.section,
				chapters: newChapters
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const newSection = {
			...course.section,
			id: course.section.id || 'section-' + Date.now(),
			chapters: course.section.chapters.map((chapter, i) => ({
				...chapter,
				id: chapter.id || `chapter-${i}-${Date.now()}`,
				lessons: chapter.lessons.map((lesson, j) => ({
					...lesson,
					id: lesson.id || `lesson-${i}-${j}-${Date.now()}`,
					completed: lesson.completed || false,
					locked: lesson.locked !== undefined ? lesson.locked : j !== 0
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

						{course.section.chapters.map((chapter, chapterIndex) => (
							<div key={chapter.id || chapterIndex} className="form-chapter">
								<h3>Chapter {chapterIndex + 1}</h3>
								<input
									type="text"
									placeholder="Chapter Title"
									value={chapter.title}
									onChange={(e) => updateChapter(chapterIndex, e.target.value)}
									required
								/>

								{chapter.lessons.map((lesson, lessonIndex) => (
									<div key={lesson.id || lessonIndex} className="form-lesson">
										<h4>Lesson {lessonIndex + 1}</h4>
										<input
											type="text"
											placeholder="Lesson Title"
											value={lesson.title}
											onChange={(e) => {
												const newChapters = [...course.section.chapters];
												newChapters[chapterIndex].lessons[lessonIndex].title = e.target.value;
												setCourse({
													...course,
													section: { ...course.section, chapters: newChapters }
												});
											}}
											required
										/>

										<div className="activities-container">
											<h5>Activities</h5>
											{lesson.activities.map((activity, activityIndex) => (
												<div key={activityIndex} className="form-activity">
													<div className="activity-header">
														<input
															type="text"
															placeholder="Activity Title"
															value={activity.title}
															onChange={(e) => {
																const newChapters = [...course.section.chapters];
																newChapters[chapterIndex].lessons[lessonIndex].activities[activityIndex].title = e.target.value;
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
													<div className="xp-input">
														<label>XP:</label>
														<input
															type="number"
															value={activity.xp}
															onChange={(e) => {
																const newChapters = [...course.section.chapters];
																newChapters[chapterIndex].lessons[lessonIndex].activities[activityIndex].xp = parseInt(e.target.value);
																setCourse({
																	...course,
																	section: { ...course.section, chapters: newChapters }
																});
															}}
															required
														/>
													</div>
													<textarea
														placeholder="Activity Description (optional)"
														value={activity.description}
														onChange={(e) => {
															const newChapters = [...course.section.chapters];
															newChapters[chapterIndex].lessons[lessonIndex].activities[activityIndex].description = e.target.value;
															setCourse({
																...course,
																section: { ...course.section, chapters: newChapters }
															});
														}}
													/>
												</div>
											))}
											<button
												type="button"
												className="add-activity-button"
												onClick={() => addActivity(chapterIndex, lessonIndex)}
											>
												Add Activity
											</button>
										</div>
									</div>
								))}
								<button
									type="button"
									className="add-lesson-button"
									onClick={() => addLesson(chapterIndex)}
								>
									Add Lesson
								</button>
							</div>
						))}

						<button type="button" onClick={addChapter} className="add-chapter-button">
						  Add Chapter
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
