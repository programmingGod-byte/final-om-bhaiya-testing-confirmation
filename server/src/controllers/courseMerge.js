const CourseContentModel = require('../models/Chapters'); // Adjust the path

/**
 * Function to merge sections and code examples into HTML content
 * @param {Object} courseContent - The course content document
 * @returns {String} - Merged HTML content
 */
function mergeSectionsAndCodeExamples(courseContent) {
  let mergedContent = '';
  
  // Process sections first
  if (courseContent.sections && courseContent.sections.length > 0) {
    courseContent.sections.forEach((section) => {
      if (section.title || section.content) {
        // Add section title in h2 with strong tag
        if (section.title && section.title.trim() !== '') {
          mergedContent += `<h2><strong>${section.title}</strong></h2>`;
        }
        
        // Add break tag
        mergedContent += '<br>';
        
        // Add section content/description
        if (section.content && section.content.trim() !== '') {
          mergedContent += section.content;
        }
        
        // Add break tag after each section
        mergedContent += '<br>';
      }
    });
  }
  
  // Process code examples after sections
  if (courseContent.codeExamples && courseContent.codeExamples.length > 0) {
    courseContent.codeExamples.forEach((example) => {
      mergedContent += '<div style="margin-bottom: 2rem;">';
      
      // Add example title in h3
      if (example.title) {
        mergedContent += `<h3>${example.title}</h3>`;
      } else {
        mergedContent += '<h3>Untitled Example</h3>';
      }
      
      // Add example description
      if (example.description) {
        mergedContent += `<p style="margin-bottom: 0.5rem; font-size: 0.875rem;">${example.description}</p>`;
      }
      
      // Add code block
      mergedContent += '<pre style="background-color: #f5f5f5; padding: 1rem; border-radius: 4px; overflow: auto;">';
      mergedContent += `<code class="${example.language || ''}">${example.code || ''}</code>`;
      mergedContent += '</pre>';
      
      // Add explanation if exists - wrapped in blockquote with h3 heading
      if (example.explanation) {
        mergedContent += '<h3>Explanation</h3>';
        mergedContent += `<blockquote>${example.explanation}</blockquote>`;
      }
      
      mergedContent += '</div>';
      
      // Add break tag after each code example
      mergedContent += '<br>';
    });
  }
  
  return mergedContent;
}

/**
 * Function to update a course content document with merged content
 * @param {String} courseContentId - The ID of the course content document
 * @returns {Promise} - Updated document
 */
async function updateCourseContentWithMergedContent(courseContentId) {
  try {
    // Find the course content document
    const courseContent = await CourseContentModel.findById(courseContentId);
    
    if (!courseContent) {
      throw new Error(`Course content with ID ${courseContentId} not found`);
    }
    
    console.log(`Processing course content: ${courseContent.title}`);
    
    // Generate merged content
    const mergedContent = mergeSectionsAndCodeExamples(courseContent);
    
    // Update the editorContent field and set isNewEditorUsed to true
    courseContent.editorContent = mergedContent;
    courseContent.isNewEditorUsed = true;
    
    // Save the updated document
    const updatedCourseContent = await courseContent.save();
    
    console.log(`Course content "${courseContent.title}" updated successfully`);
    return updatedCourseContent;
    
  } catch (error) {
    console.error('Error updating course content:', error);
    throw error;
  }
}

/**
 * Function to update multiple course content documents
 * @param {Array} courseContentIds - Array of course content IDs
 * @returns {Promise} - Array of updated documents
 */
async function updateMultipleCourseContents(courseContentIds) {
  try {
    const updatedDocuments = [];
    
    console.log(`Starting update for ${courseContentIds.length} course contents...`);
    
    for (let i = 0; i < courseContentIds.length; i++) {
      const id = courseContentIds[i];
      console.log(`Processing ${i + 1}/${courseContentIds.length}: ${id}`);
      
      try {
        const updatedDoc = await updateCourseContentWithMergedContent(id);
        updatedDocuments.push(updatedDoc);
      } catch (error) {
        console.error(`Failed to update course content ${id}:`, error.message);
        // Continue with other documents even if one fails
      }
    }
    
    console.log(`Successfully updated ${updatedDocuments.length} out of ${courseContentIds.length} course contents`);
    return updatedDocuments;
  } catch (error) {
    console.error('Error updating multiple course contents:', error);
    throw error;
  }
}

/**
 * Function to update all course content documents in the database
 * @returns {Promise} - Array of updated documents
 */
async function updateAllCourseContents() {
  try {
    console.log('Fetching all course content documents...');
    
    // Find all course content documents
    const allCourseContents = await CourseContentModel.find({});
    
    console.log(`Found ${allCourseContents.length} course content documents`);
    
    const updatedDocuments = [];
    
    for (let i = 0; i < allCourseContents.length; i++) {
      const courseContent = allCourseContents[i];
      console.log(`Processing ${i + 1}/${allCourseContents.length}: ${courseContent.title}`);
      
      try {
        // Generate merged content
        const mergedContent = mergeSectionsAndCodeExamples(courseContent);
        
        // Update the editorContent field and set isNewEditorUsed to true
        courseContent.editorContent = mergedContent;
        courseContent.isNewEditorUsed = true;
        
        // Save the updated document
        const updatedDoc = await courseContent.save();
        updatedDocuments.push(updatedDoc);
        
        console.log(`✓ Updated: ${courseContent.title}`);
      } catch (error) {
        console.error(`✗ Failed to update: ${courseContent.title}`, error.message);
        // Continue with other documents even if one fails
      }
    }
    
    console.log(`\n🎉 Update completed! Successfully updated ${updatedDocuments.length} out of ${allCourseContents.length} course content documents`);
    return updatedDocuments;
    
  } catch (error) {
    console.error('Error updating all course contents:', error);
    throw error;
  }
}

/**
 * Function to get a preview of merged content without saving
 * @param {String} courseContentId - The ID of the course content document
 * @returns {Promise} - Preview of merged content
 */
async function previewMergedContent(courseContentId) {
  try {
    const courseContent = await CourseContentModel.findById(courseContentId);
    
    if (!courseContent) {
      throw new Error(`Course content with ID ${courseContentId} not found`);
    }
    
    const mergedContent = mergeSectionsAndCodeExamples(courseContent);
    
    console.log(`\n--- Preview for "${courseContent.title}" ---`);
    console.log(mergedContent);
    console.log('--- End Preview ---\n');
    
    return mergedContent;
  } catch (error) {
    console.error('Error previewing merged content:', error);
    throw error;
  }
}

// Usage examples:

// Example 1: Update a single course content by ID
// updateCourseContentWithMergedContent('your-course-content-id-here')
//   .then(updatedDoc => console.log('Updated:', updatedDoc))
//   .catch(err => console.error('Error:', err));

// Example 2: Update multiple course contents by IDs
// const courseIds = ['id1', 'id2', 'id3'];
// updateMultipleCourseContents(courseIds)
//   .then(updatedDocs => console.log('Updated documents:', updatedDocs.length))
//   .catch(err => console.error('Error:', err));

// Example 3: Update all course contents in the database
// updateAllCourseContents()
//   .then(updatedDocs => console.log('All documents updated:', updatedDocs.length))
//   .catch(err => console.error('Error:', err));

// Example 4: Preview merged content without saving
// previewMergedContent('your-course-content-id-here')
//   .then(content => console.log('Preview generated'))
//   .catch(err => console.error('Error:', err));

// Export the functions
module.exports = {
  mergeSectionsAndCodeExamples,
  updateCourseContentWithMergedContent,
  updateMultipleCourseContents,
  updateAllCourseContents,
  previewMergedContent
};