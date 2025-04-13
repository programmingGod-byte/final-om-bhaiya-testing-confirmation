# API Documentation

This document provides detailed information about the backend API endpoints for the Verilog Learning Platform.

## Base URL

```
https://api.verilog-learning-platform.com/api
```

For local development:

```
http://localhost:5000/api
```

## Authentication

Most API endpoints require authentication. Authentication is implemented using JSON Web Tokens (JWT).

To authenticate, include the JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

### Authentication Endpoints

#### Register a New User

```
POST /users/register
```

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-07-15T10:30:00.000Z"
  }
}
```

#### User Login

```
POST /users/login
```

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get Current User

```
GET /users/me
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "profilePicture": "default-profile.jpg",
    "completedModules": [...],
    "completedExercises": [...],
    "bookmarks": [...],
    "createdAt": "2023-07-15T10:30:00.000Z"
  }
}
```

## Module Endpoints

#### Get All Modules

```
GET /modules
```

**Query Parameters:**

- `category` - Filter by category
- `difficulty` - Filter by difficulty level
- `moduleType` - Filter by module type
- `keyword` - Search by keyword
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (default: createdAt)
- `order` - Sort order (asc/desc, default: desc)

**Response:**

```json
{
  "success": true,
  "count": 50,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 5
  },
  "data": [
    {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
      "title": "Full Adder",
      "slug": "full-adder",
      "description": "A full adder circuit implementation in Verilog",
      "category": "combinational-circuits",
      "moduleType": "adder",
      "difficulty": "beginner",
      "thumbnailImage": "full-adder.jpg",
      "averageRating": 4.5,
      "ratingsCount": 15,
      "createdAt": "2023-07-15T10:30:00.000Z"
    },
    // More modules...
  ]
}
```

#### Get Single Module

```
GET /modules/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
    "title": "Full Adder",
    "slug": "full-adder",
    "description": "A full adder circuit implementation in Verilog",
    "category": "combinational-circuits",
    "moduleType": "adder",
    "difficulty": "beginner",
    "content": {
      "introduction": "A full adder is a digital circuit that...",
      "functionality": "The full adder performs addition of...",
      "truthTable": "| A | B | Cin | Sum | Cout |\n|---|---|-----|-----|------|\n...",
      "logicDiagram": "full-adder-diagram.svg",
      "exampleCode": "module full_adder(\n  input a, b, cin,\n  output sum, cout\n);\n  ...\nendmodule",
      "codingTips": "When implementing a full adder, consider...",
      "applications": "Full adders are used in arithmetic logic units..."
    },
    "prerequisites": [...],
    "relatedModules": [...],
    "thumbnailImage": "full-adder.jpg",
    "averageRating": 4.5,
    "ratingsCount": 15,
    "createdBy": {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
      "name": "Admin User"
    },
    "createdAt": "2023-07-15T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z",
    "exercises": [...]
  }
}
```

#### Create Module (Admin/Publisher Only)

```
POST /modules
```

**Request Body:**

```json
{
  "title": "4-Bit Ripple Carry Adder",
  "description": "A 4-bit ripple carry adder implementation",
  "category": "combinational-circuits",
  "moduleType": "adder",
  "difficulty": "intermediate",
  "content": {
    "introduction": "A ripple carry adder is a digital circuit that...",
    "functionality": "The ripple carry adder performs addition by...",
    "truthTable": "...",
    "logicDiagram": "...",
    "exampleCode": "module ripple_carry_adder(\n  input [3:0] a, b,\n  input cin,\n  output [3:0] sum,\n  output cout\n);\n  ...\nendmodule",
    "codingTips": "...",
    "applications": "..."
  },
  "prerequisites": ["5f8a7b6c4e3d2c1b0a9e8d7c"],
  "thumbnailImage": "ripple-carry-adder.jpg"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d7d",
    "title": "4-Bit Ripple Carry Adder",
    "slug": "4-bit-ripple-carry-adder",
    // ... rest of module data
  }
}
```

## Exercise Endpoints

#### Get All Exercises

```
GET /exercises
```

**Query Parameters:**

- `module` - Filter by module ID
- `difficulty` - Filter by difficulty level
- `keyword` - Search by keyword
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Response:**

```json
{
  "success": true,
  "count": 25,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 3
  },
  "data": [
    {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7e",
      "title": "Implement a Full Adder",
      "description": "Create a full adder module in Verilog",
      "module": {
        "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
        "title": "Full Adder"
      },
      "difficulty": "beginner",
      "points": 10,
      "completionRate": 75,
      "createdAt": "2023-07-15T10:30:00.000Z"
    },
    // More exercises...
  ]
}
```

#### Get Single Exercise

```
GET /exercises/:id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d7e",
    "title": "Implement a Full Adder",
    "description": "Create a full adder module in Verilog",
    "module": {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
      "title": "Full Adder",
      "slug": "full-adder"
    },
    "difficulty": "beginner",
    "instructions": "Create a Verilog module for a full adder with inputs a, b, cin and outputs sum, cout...",
    "starterCode": "module full_adder(\n  input a, b, cin,\n  output sum, cout\n);\n  // Your code here\nendmodule",
    "testCases": [
      {
        "input": "a=0, b=0, cin=0",
        "expectedOutput": "sum=0, cout=0",
        "description": "All inputs 0",
        "isHidden": false
      },
      // More test cases...
    ],
    "hints": [
      {
        "text": "Remember that sum = a XOR b XOR cin",
        "cost": 2
      },
      // More hints...
    ],
    "timeLimit": 60,
    "points": 10,
    "completionRate": 75,
    "averageAttempts": 2.3,
    "tags": ["adder", "combinational", "beginner"],
    "createdBy": {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
      "name": "Admin User"
    },
    "createdAt": "2023-07-15T10:30:00.000Z",
    "updatedAt": "2023-07-20T10:30:00.000Z"
  }
}
```

#### Submit Solution

```
POST /exercises/:id/submit
```

**Request Body:**

```json
{
  "code": "module full_adder(\n  input a, b, cin,\n  output sum, cout\n);\n  assign sum = a ^ b ^ cin;\n  assign cout = (a & b) | (b & cin) | (a & cin);\nendmodule"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "score": 10,
    "passedTests": 8,
    "totalTests": 8,
    "results": [
      {
        "testCase": {
          "input": "a=0, b=0, cin=0",
          "expectedOutput": "sum=0, cout=0"
        },
        "passed": true,
        "output": "sum=0, cout=0",
        "message": "Test passed!"
      },
      // More test results...
    ],
    "feedback": "Great job! Your implementation is correct and efficient.",
    "executionTime": 0.05
  }
}
```

## Compiler Endpoints

#### Compile Verilog Code

```
POST /compiler/compile
```

**Request Body:**

```json
{
  "code": "module example(\n  input a, b,\n  output y\n);\n  assign y = a & b;\nendmodule",
  "toplevel": "example"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "compiled": true,
    "errors": [],
    "warnings": [],
    "executionTime": 0.03
  }
}
```

#### Validate Verilog Code

```
POST /compiler/validate
```

**Request Body:**

```json
{
  "code": "module example(\n  input a, b,\n  output y\n);\n  assign y = a & b;\nendmodule",
  "checks": ["syntax", "lint", "style"]
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "valid": true,
    "errors": [],
    "warnings": [],
    "style": [
      {
        "line": 3,
        "column": 12,
        "severity": "info",
        "message": "Consider adding a comment describing the purpose of output y"
      }
    ],
    "score": 95
  }
}
```

#### Run Simulation

```
POST /compiler/simulate
```

**Request Body:**

```json
{
  "code": "module example(\n  input a, b,\n  output y\n);\n  assign y = a & b;\nendmodule",
  "testbench": "module tb;\n  reg a, b;\n  wire y;\n  example dut(a, b, y);\n  initial begin\n    a = 0; b = 0; #10;\n    a = 0; b = 1; #10;\n    a = 1; b = 0; #10;\n    a = 1; b = 1; #10;\n  end\nendmodule",
  "toplevel": "tb",
  "duration": 100
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "signals": [
      {
        "name": "a",
        "wave": "0..1..",
        "times": [0, 10, 20, 30, 40]
      },
      {
        "name": "b",
        "wave": "0.1.0.1",
        "times": [0, 10, 20, 30, 40]
      },
      {
        "name": "y",
        "wave": "0...1",
        "times": [0, 10, 20, 30, 40]
      }
    ],
    "stdout": "",
    "executionTime": 0.08
  }
}
```

## Forum Endpoints

#### Get Forum Posts

```
GET /forum
```

**Query Parameters:**

- `module` - Filter by module ID
- `user` - Filter by user ID
- `keyword` - Search by keyword
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `sort` - Sort field (default: createdAt)
- `order` - Sort order (asc/desc, default: desc)

**Response:**

```json
{
  "success": true,
  "count": 15,
  "pagination": {
    "page": 1,
    "limit": 10,
    "pages": 2
  },
  "data": [
    {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7f",
      "title": "How to implement an efficient 4-bit multiplier?",
      "content": "I'm trying to create a 4-bit multiplier that...",
      "module": {
        "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
        "title": "Multiplier"
      },
      "user": {
        "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
        "name": "John Doe"
      },
      "tags": ["multiplier", "optimization"],
      "upvotes": 5,
      "downvotes": 0,
      "isResolved": false,
      "commentsCount": 3,
      "views": 25,
      "createdAt": "2023-07-15T10:30:00.000Z"
    },
    // More posts...
  ]
}
```

#### Create Forum Post

```
POST /forum
```

**Request Body:**

```json
{
  "title": "Question about Carry Look-ahead Adder",
  "content": "I'm having trouble understanding how the carry propagate and generate signals work in a CLA...",
  "module": "5f8a7b6c4e3d2c1b0a9e8d7c",
  "tags": ["adder", "carry-lookahead", "optimization"],
  "codeSnippet": "module cla_4bit(...)\n  // Code with issue\nendmodule"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "5f8a7b6c4e3d2c1b0a9e8d80",
    "title": "Question about Carry Look-ahead Adder",
    // ... rest of post data
  }
}
```

#### Get Post Comments

```
GET /forum/:postId/comments
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d81",
      "content": "The carry propagate signal (P) indicates whether...",
      "user": {
        "_id": "5f8a7b6c4e3d2c1b0a9e8d7d",
        "name": "Jane Smith"
      },
      "upvotes": 3,
      "downvotes": 0,
      "isAcceptedAnswer": true,
      "codeSnippet": "// Example of P and G signals:\nwire [3:0] P, G;\nassign P = a ^ b; // Propagate\nassign G = a & b; // Generate",
      "createdAt": "2023-07-15T11:30:00.000Z",
      "replies": [
        // Nested comments if any
      ]
    },
    // More comments...
  ]
}
```

## User Progress Endpoints

#### Get User Progress

```
GET /users/progress
```

**Response:**

```json
{
  "success": true,
  "data": {
    "completedModules": [
      {
        "module": {
          "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
          "title": "Full Adder",
          "category": "combinational-circuits"
        },
        "completedAt": "2023-07-20T10:30:00.000Z"
      },
      // More completed modules...
    ],
    "completedExercises": [
      {
        "exercise": {
          "_id": "5f8a7b6c4e3d2c1b0a9e8d7e",
          "title": "Implement a Full Adder",
          "points": 10
        },
        "score": 10,
        "completedAt": "2023-07-20T10:30:00.000Z"
      },
      // More completed exercises...
    ],
    "totalModules": 5,
    "totalExercises": 10,
    "totalPoints": 50,
    "earnedPoints": 30,
    "progressByCategory": {
      "basic": 100,
      "combinational-circuits": 60,
      "sequential-circuits": 20,
      "memory": 0,
      "interview-prep": 0
    }
  }
}
```

#### Get User Bookmarks

```
GET /users/bookmarks
```

**Response:**

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "5f8a7b6c4e3d2c1b0a9e8d7c",
      "title": "Full Adder",
      "slug": "full-adder",
      "description": "A full adder circuit implementation in Verilog",
      "category": "combinational-circuits",
      "moduleType": "adder",
      "difficulty": "beginner",
      "thumbnailImage": "full-adder.jpg"
    },
    // More bookmarked modules...
  ]
}
```

## Error Responses

All API endpoints follow a consistent error format:

```json
{
  "success": false,
  "error": "Error message describing the issue",
  "code": "ERROR_CODE" // Optional error code
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error 