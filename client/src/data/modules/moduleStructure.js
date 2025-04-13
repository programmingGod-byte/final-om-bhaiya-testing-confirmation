/**
 * Standard module structure with chapters, videos, quizzes, and resources
 * 
 * This template defines the structure for all text-based learning modules.
 * Each module contains multiple chapters, each with sections, examples, videos, and quizzes.
 */

export const ModuleStructureTemplate = {
  id: 0,
  title: "Module Title",
  description: "Module description",
  level: "Beginner/Intermediate/Advanced/Expert",
  duration: "X weeks",
  image: "URL to module image",
  topics: [
    "Topic 1",
    "Topic 2",
    "Topic 3",
    "Topic 4",
    "Topic 5",
    "Topic 6"
  ],
  lessons: 10,
  exercises: 5,
  students: 1000,
  
  // Module instructor information
  instructor: {
    name: "Instructor Name",
    title: "Instructor Title",
    bio: "Instructor biography",
    avatar: "URL to instructor avatar"
  },
  
  // Full module overview
  overview: `
    <p>HTML-formatted overview of the module</p>
  `,
  
  // Prerequisites for this module
  prerequisites: [
    "Prerequisite 1",
    "Prerequisite 2"
  ],
  
  // Skills gained from this module
  skills: [
    "Skill 1",
    "Skill 2"
  ],
  
  // Chapters - main content blocks of the module
  chapters: [
    {
      id: 1,
      title: "Chapter Title",
      description: "Chapter description",
      estimatedTime: "X hours",
      
      // Content sections of the chapter
      sections: [
        {
          id: "1.1",
          title: "Section Title",
          content: `
            <p>HTML-formatted content with text, code examples, images, etc.</p>
            <pre><code>// Code example
module example(
  input wire clk,
  input wire reset,
  output reg [7:0] counter
);
  
  always @(posedge clk or posedge reset) begin
    if (reset)
      counter <= 8'b0;
    else
      counter <= counter + 1;
  end
  
endmodule</code></pre>
            <p>More explanatory text...</p>
          `
        },
        {
          id: "1.2",
          title: "Section Title",
          content: `
            <p>HTML-formatted content</p>
          `
        }
      ],
      
      // Code examples for the chapter
      examples: [
        {
          id: "example_1_1",
          title: "Example Title",
          description: "Example description",
          code: `// Code for the example
module example(
  input wire clk,
  input wire reset,
  output reg [7:0] counter
);
  
  always @(posedge clk or posedge reset) begin
    if (reset)
      counter <= 8'b0;
    else
      counter <= counter + 1;
  end
  
endmodule`,
          explanation: "Explanation of the code example"
        }
      ],
      
      // Video resources for this chapter
      videos: [
        {
          id: "video_1_1",
          title: "Video Title",
          description: "Video description",
          url: "YouTube URL",
          thumbnail: "Video thumbnail URL",
          duration: "Video duration"
        }
      ],
      
      // Quiz for this chapter
      quiz: {
        id: "quiz_1",
        title: "Chapter Quiz",
        description: "Test your knowledge of this chapter",
        questions: [
          {
            id: "q1_1",
            question: "Question text?",
            options: [
              { id: "a", text: "Option A" },
              { id: "b", text: "Option B" },
              { id: "c", text: "Option C" },
              { id: "d", text: "Option D" }
            ],
            correctAnswer: "a",
            explanation: "Explanation of why Option A is correct"
          },
          {
            id: "q1_2",
            question: "Question text?",
            options: [
              { id: "a", text: "Option A" },
              { id: "b", text: "Option B" },
              { id: "c", text: "Option C" },
              { id: "d", text: "Option D" }
            ],
            correctAnswer: "b",
            explanation: "Explanation of why Option B is correct"
          }
        ]
      }
    }
  ],
  
  // Final assessment for the entire module
  finalAssessment: {
    id: "final_assessment",
    title: "Final Module Assessment",
    description: "Test your understanding of the entire module",
    questions: [
      {
        id: "final_q1",
        question: "Question text?",
        options: [
          { id: "a", text: "Option A" },
          { id: "b", text: "Option B" },
          { id: "c", text: "Option C" },
          { id: "d", text: "Option D" }
        ],
        correctAnswer: "c",
        explanation: "Explanation of why Option C is correct"
      },
      // More questions...
    ]
  },
  
  // Additional resources for the module
  resources: [
    {
      id: "resource_1",
      title: "Resource Title",
      description: "Resource description",
      type: "Book/Article/Tool/Website",
      url: "URL to resource",
      author: "Resource author (if applicable)"
    }
  ],
  
  // Related modules
  relatedModules: [
    {
      id: 2,
      title: "Related Module Title",
      description: "Related module description",
      level: "Beginner/Intermediate/Advanced/Expert"
    }
  ]
}; 