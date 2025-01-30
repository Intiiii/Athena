import React, { useState, useEffect } from 'react';
import SkillTree from './SkillTree';
import TreeForm from './TreeForm';
import CourseCard from './CourseCard';

function SkillTrees() {
	const [trees, setTrees] = useState(() => {
		const saved = localStorage.getItem('skillTrees');
		return saved ? JSON.parse(saved) : [];
	});
	const [showForm, setShowForm] = useState(false);
	const [selectedCourse, setSelectedCourse] = useState(null);
	const [editingCourse, setEditingCourse] = useState(null);

	useEffect(() => {
		localStorage.setItem('skillTrees', JSON.stringify(trees));
	}, [trees]);

	const handleEdit = (course) => {
		setEditingCourse(course);
		setShowForm(true);
	};

	const handleUpdate = (updatedCourse) => {
		const updatedTrees = trees.map(tree => 
			tree.id === editingCourse.id ? updatedCourse : tree
		);
		setTrees(updatedTrees);
		setShowForm(false);
		setEditingCourse(null);
	};

	const handleCloseForm = () => {
		setShowForm(false);
		setEditingCourse(null);
	};

	if (selectedCourse) {
		return (
			<div className="selected-course">
				<div className="course-header">
					<button 
						className="back-button"
						onClick={() => setSelectedCourse(null)}
					>
						← Back to Courses
					</button>
					<button 
						className="edit-button"
						onClick={() => handleEdit(selectedCourse)}
					>
						✏️ Edit Course
					</button>
				</div>
				<SkillTree 
					initialData={selectedCourse}
					standalone={false}
					isEditing={editingCourse === selectedCourse}
				/>
			</div>
		);
	}

	return (
		<div className="skill-trees-container">
			<button 
				className="add-tree-button"
				onClick={() => setShowForm(true)}
			>
				Add New Course
			</button>

			{showForm && (
				<TreeForm 
					onSubmit={editingCourse ? handleUpdate : (newCourse) => {
						setTrees(prev => [...prev, { ...newCourse, id: 'tree-' + Date.now() }]);
						setShowForm(false);
					}}
					initialData={editingCourse}
					onClose={handleCloseForm}
				/>
			)}

			<div className="skill-trees-grid">
				{trees.map(tree => (
					<CourseCard 
						key={tree.id}
						course={tree}
						onSelect={setSelectedCourse}
					/>
				))}
			</div>
		</div>
	);
}

export default SkillTrees;
