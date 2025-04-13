/**
 * Progress Tracker Utility
 * 
 * This utility provides functions to track and manage a user's progress through modules and chapters.
 * It uses localStorage to persist progress data across sessions.
 */

/**
 * Initialize progress data for a module
 * @param {string} moduleId - The ID of the module
 * @param {Array} chapterIds - Array of chapter IDs in the module
 */
export const initializeProgressData = (moduleId, chapterIds) => {
  try {
    // Check if module progress already exists
    const moduleProgress = localStorage.getItem(`module-progress-${moduleId}`);
    
    if (!moduleProgress) {
      // Initialize module progress to 0
      localStorage.setItem(`module-progress-${moduleId}`, '0');
      
      // Initialize chapter progress
      chapterIds.forEach(chapterId => {
        const chapterKey = `chapter-${moduleId}-${chapterId}`;
        if (localStorage.getItem(chapterKey) === null) {
          localStorage.setItem(chapterKey, 'false');
        }
      });
    }
  } catch (error) {
    console.error('Error initializing progress data:', error);
  }
};

/**
 * Update a chapter's completion status
 * @param {string} moduleId - The ID of the module
 * @param {string|number} chapterId - The ID of the chapter
 * @param {boolean} isCompleted - Whether the chapter is completed
 */
export const updateChapterProgress = (moduleId, chapterId, isCompleted) => {
  try {
    // Update chapter progress
    const chapterKey = `chapter-${moduleId}-${chapterId}`;
    localStorage.setItem(chapterKey, isCompleted.toString());
    
    // Update overall module progress
    updateModuleProgress(moduleId);
    
    return true;
  } catch (error) {
    console.error('Error updating chapter progress:', error);
    return false;
  }
};

/**
 * Calculate and update the overall module completion percentage
 * @param {string} moduleId - The ID of the module
 */
export const updateModuleProgress = (moduleId) => {
  try {
    // Find all chapters for this module
    const allChapterKeys = Object.keys(localStorage).filter(key => 
      key.startsWith(`chapter-${moduleId}-`)
    );
    
    if (allChapterKeys.length === 0) return 0;
    
    // Calculate completion percentage
    const completedChapters = allChapterKeys.filter(key => 
      localStorage.getItem(key) === 'true'
    ).length;
    
    const percentage = Math.round((completedChapters / allChapterKeys.length) * 100);
    
    // Save to localStorage
    localStorage.setItem(`module-progress-${moduleId}`, percentage.toString());
    
    return percentage;
  } catch (error) {
    console.error('Error updating module progress:', error);
    return 0;
  }
};

/**
 * Get a chapter's completion status
 * @param {string} moduleId - The ID of the module
 * @param {string|number} chapterId - The ID of the chapter
 * @returns {boolean} - Whether the chapter is completed
 */
export const getChapterProgress = (moduleId, chapterId) => {
  try {
    const chapterKey = `chapter-${moduleId}-${chapterId}`;
    return localStorage.getItem(chapterKey) === 'true';
  } catch (error) {
    console.error('Error getting chapter progress:', error);
    return false;
  }
};

/**
 * Get the overall module completion percentage
 * @param {string} moduleId - The ID of the module
 * @returns {number} - Percentage of module completion (0-100)
 */
export const getModuleProgress = (moduleId) => {
  try {
    const progress = localStorage.getItem(`module-progress-${moduleId}`);
    return progress ? parseInt(progress, 10) : 0;
  } catch (error) {
    console.error('Error getting module progress:', error);
    return 0;
  }
};

/**
 * Mark a quiz as completed and update chapter progress
 * @param {string} moduleId - The ID of the module
 * @param {string|number} chapterId - The ID of the chapter
 * @param {number} score - The quiz score (0-100)
 * @returns {boolean} - Whether the operation was successful
 */
export const markQuizCompleted = (moduleId, chapterId, score) => {
  try {
    // Save quiz score
    const quizKey = `quiz-${moduleId}-${chapterId}`;
    localStorage.setItem(quizKey, score.toString());
    
    // Mark chapter as completed if score is passing (>=70%)
    if (score >= 70) {
      updateChapterProgress(moduleId, chapterId, true);
    }
    
    return true;
  } catch (error) {
    console.error('Error marking quiz completed:', error);
    return false;
  }
};

/**
 * Get the quiz score for a chapter
 * @param {string} moduleId - The ID of the module
 * @param {string|number} chapterId - The ID of the chapter
 * @returns {number|null} - The quiz score (0-100) or null if not taken
 */
export const getQuizScore = (moduleId, chapterId) => {
  try {
    const quizKey = `quiz-${moduleId}-${chapterId}`;
    const score = localStorage.getItem(quizKey);
    return score ? parseFloat(score) : null;
  } catch (error) {
    console.error('Error getting quiz score:', error);
    return null;
  }
}; 