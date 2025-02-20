import React, { useState, useEffect } from 'react';
import SkillTree from './SkillTree';
import TreeForm from './TreeForm';
import CourseCard from './CourseCard';

function SkillTrees() {
  const [trees, setTrees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [editingCourse, setEditingCourse] = useState(null);
  useEffect(() => {
    // Load courses from local storage
    const savedTrees = localStorage.getItem('skillTrees');
    if (savedTrees) {
      setTrees(JSON.parse(savedTrees));
    }
  }, []);

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowForm(true);
  };

  const handleUpdate = (updatedCourse) => {
    const newTrees = editingCourse
      ? trees.map(tree => tree.id === editingCourse.id ? updatedCourse : tree)
      : [...trees, { ...updatedCourse, id: Date.now().toString() }];
    
    setTrees(newTrees);
    localStorage.setItem('skillTrees', JSON.stringify(newTrees));
    setShowForm(false);
    setEditingCourse(null);
    setSelectedCourse(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCourse(null);
  };



  if (selectedCourse) {
    return (
      <div className="selected-course">
        <div className="course-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              className="back-button"
              onClick={() => setSelectedCourse(null)}
            >
              ← Back to Courses
            </button>
            <h2>{selectedCourse.name}</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="streak-counter">🔥 {selectedCourse.streak}</div>
            <div className="xp-counter">XP: {selectedCourse.xp}</div>
            <button
              className="edit-button"
              onClick={() => handleEdit(selectedCourse)}
            >
              ✏️
            </button>

          </div>
        </div>
        <SkillTree
          initialData={selectedCourse}
          standalone={false}
          isEditing={editingCourse && editingCourse.id === selectedCourse.id}
        />
        {showForm && (
          <TreeForm
            onSubmit={handleUpdate}
            initialData={editingCourse}
            onClose={handleCloseForm}
          />
        )}
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
          onSubmit={handleUpdate}
          initialData={editingCourse}
          onClose={handleCloseForm}
        />
      )}

      <div className="skill-trees-grid">
        {trees.map(tree => (
          tree && tree.name ? (
            <CourseCard
              key={tree.id}
              course={tree}
              onSelect={setSelectedCourse}
            />
          ) : null
        ))}
      </div>
    </div>
  );
}

export default SkillTrees;
