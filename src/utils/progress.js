export const calculateProgress = (section) => {
  let totalActivities = 0;
  let completedActivities = 0;

  section.chapters.forEach(chapter => {
    chapter.lessons.forEach(lesson => {
      lesson.activities.forEach(activity => {
        totalActivities++;
        if (activity.completed) {
          completedActivities++;
        }
      });
    });
  });

  return totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;
};
