export const defaultCourseTemplate = {
  name: '',
  sections: [
    {
      id: 'section-1',
      title: '',
      lessons: [
        {
          id: 'lesson-1',
          title: '',
          activities: [
            {
              id: 'activity-1',
              title: '',
              description: '',
              xp: 10,
              completed: false
            }
          ]
        }
      ]
    }
  ],
  xp: 0,
  streak: 0
};

export const sampleCourse = {
  name: 'Introduction to Programming',
  sections: [
    {
      id: 'section-1',
      title: 'Getting Started',
      lessons: [
        {
          id: 'lesson-1',
          title: 'Basic Concepts',
          activities: [
            {
              id: 'activity-1',
              title: 'What is Programming?',
              description: 'Learn the fundamentals of programming and why it matters.',
              xp: 10,
              completed: false
            },
            {
              id: 'activity-2',
              title: 'Your First Program',
              description: 'Write your first "Hello, World!" program.',
              xp: 15,
              completed: false
            }
          ]
        },
        {
          id: 'lesson-2',
          title: 'Variables and Data Types',
          activities: [
            {
              id: 'activity-3',
              title: 'Understanding Variables',
              description: 'Learn how to store and manipulate data using variables.',
              xp: 20,
              completed: false
            }
          ]
        }
      ]
    }
  ],
  xp: 0,
  streak: 0
};