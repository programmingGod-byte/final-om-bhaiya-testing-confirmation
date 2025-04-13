# UI/UX Guidelines

This document outlines the design standards and user experience guidelines for the Verilog Learning Platform.

## Brand Identity

### Colors

- **Primary Color**: #6a0dad (Purple)
- **Primary Light**: #9c4dcc
- **Primary Dark**: #3a006c
- **Secondary Color**: #f50057 (Pink)
- **Background**: #f5f5f5 (Light Gray)
- **Paper/Card Background**: #ffffff (White)
- **Text Primary**: #333333 (Dark Gray)
- **Text Secondary**: #666666 (Medium Gray)
- **Success**: #4caf50 (Green)
- **Error**: #f44336 (Red)
- **Warning**: #ff9800 (Orange)
- **Info**: #2196f3 (Blue)

### Typography

- **Primary Font**: Roboto
- **Code Font**: Source Code Pro, Menlo, Monaco, Consolas, 'Courier New', monospace
- **Font Sizes**:
  - H1: 2.5rem
  - H2: 2rem
  - H3: 1.75rem
  - H4: 1.5rem
  - H5: 1.25rem
  - H6: 1rem
  - Body: 1rem
  - Small: 0.875rem
  - XSmall: 0.75rem

### Spacing

- **Base Unit**: 8px
- **Spacing Scale**:
  - XS: 4px
  - SM: 8px
  - MD: 16px
  - LG: 24px
  - XL: 32px
  - XXL: 48px
  - XXXL: 64px

### Shadows

- **Card Shadow**: 0px 4px 8px rgba(0, 0, 0, 0.1)
- **Button Shadow**: 0px 2px 4px rgba(0, 0, 0, 0.1)
- **Dropdown Shadow**: 0px 6px 12px rgba(0, 0, 0, 0.15)
- **Modal Shadow**: 0px 10px 20px rgba(0, 0, 0, 0.2)

## Components

### Buttons

#### Primary Button
- Purple background (#6a0dad)
- White text
- No text transform (preserve case)
- 8px border radius
- Medium shadow on hover
- Padding: 8px 16px
- Font weight: 500

#### Secondary Button
- White background
- Purple text and border
- No text transform
- 8px border radius
- Light shadow on hover
- Padding: 8px 16px
- Font weight: 500

#### Text Button
- No background
- Purple text
- No shadow
- Padding: 8px
- Font weight: 500

### Cards

- White background
- 8px border radius
- Medium shadow
- Padding: 16px
- Title: 1.25rem, dark gray
- Subtitle: 0.875rem, medium gray
- Content padding: 16px

### Navigation

#### Top Navigation Bar
- White background
- Purple highlight for active items
- Drop shadow for elevation
- Logo on the left
- Navigation links in the center
- User profile/actions on the right
- Height: 64px

#### Sidebar Navigation
- Light gray background (#f5f5f5)
- Category headers in bold
- Items with left padding
- Purple highlight for active item
- Width: 250px (collapsible on mobile)

### Forms

#### Input Fields
- Clear labels above fields
- Light gray border
- 8px border radius
- Purple focus state
- Error state with red border and message
- Success state with green border
- Padding: 12px
- Placeholder text in light gray

#### Selects & Dropdowns
- Same styling as input fields
- Custom dropdown icon (chevron)
- Options with padding and hover state

#### Checkboxes & Radio Buttons
- Custom purple components
- Clear labels to the right
- Adequate spacing between options

### Feedback & Notifications

#### Alerts
- Success: Green background, dark green text
- Error: Red background, dark red text
- Warning: Orange background, dark orange text
- Info: Blue background, dark blue text
- 8px border radius
- Padding: 12px 16px
- Close button when dismissible

#### Toast Notifications
- Pop up from bottom right
- Auto-dismiss after 5 seconds
- Same color scheme as alerts
- Medium shadow

#### Progress Indicators
- Linear progress: Purple bar on light gray track
- Circular progress: Purple spinner
- Clean animation, not too fast

## Layout Guidelines

### Responsive Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px
- **Large Desktop**: > 1280px

### Grid System
- 12-column grid
- Gutters: 16px on desktop, 8px on mobile
- Container max-width: 1200px
- Margins: auto for centering

### Content Areas
- Main content: 65-75% of width
- Sidebar content: 25-35% of width
- Page padding: 24px on desktop, 16px on mobile

## Page-Specific Guidelines

### Home Page
- Hero section with platform introduction and CTA
- Featured modules in card grid (3-4 per row on desktop)
- Quick access to recently viewed content
- Progress summary for logged-in users
- Clear navigation to module categories

### Module Listing
- Filterable/sortable grid layout
- Cards with module image, title, difficulty
- Clear categorization
- Search functionality
- Pagination with 12 items per page

### Module Detail Page
- Hero with module title and image
- Table of contents navigation
- Clean section separation with headings
- Code blocks with syntax highlighting
- Interactive elements clearly distinguished
- "Next" and "Previous" navigation at bottom
- Related modules sidebar

### Code Editor
- Dark theme with syntax highlighting
- Line numbers
- Error indicators in the gutter
- Active line highlighting
- Resizable panels for editor/output
- Toolbar with actions (run, reset, etc.)
- Status area for messages

### Exercise Pages
- Clear instructions at the top
- Starter code pre-populated
- Test cases section with pass/fail indicators
- Submit button prominently displayed
- Hints available but not immediately visible
- Timer display when applicable

### Forum Pages
- Clean thread listing with activity indicators
- Clear distinction for resolved/unresolved questions
- Code formatting in posts
- Reply interface with rich text controls
- Upvote/downvote with clear visual feedback

### User Profile
- Profile summary at top
- Progress visualization (charts/graphs)
- Achievement badges
- Activity history
- Bookmarked modules
- Account settings clearly separated

## Interaction Patterns

### Loading States
- Skeleton screens for content loading
- Button loading state with spinner
- Page transitions with subtle animation

### Empty States
- Helpful illustrations
- Clear messaging
- Actionable guidance
- Never just empty space

### Error States
- Clear error messages
- Suggested solutions when possible
- Easy navigation back to safety
- Contact support when appropriate

### Success States
- Clear confirmation messages
- Next steps or related actions
- Celebration for achievements (subtle animation)

### Hover & Focus States
- Clear visual feedback for interactive elements
- Scale or shadow changes for hoverable cards
- Purple highlight for focusable elements

## Accessibility Guidelines

### Color & Contrast
- Minimum contrast ratio of 4.5:1 for normal text
- Minimum contrast ratio of 3:1 for large text
- Don't rely on color alone for conveying information
- Provide alternative indicators (icons, text)

### Keyboard Navigation
- All interactive elements must be keyboard accessible
- Visible focus indicators
- Logical tab order
- Keyboard shortcuts for power users

### Screen Readers
- Appropriate alt text for images
- ARIA labels for interactive elements
- Semantic HTML structure
- Skip navigation links
- Properly labeled forms

### Text & Readability
- Minimum body text size of 16px
- Line height of at least 1.5 for body text
- Maximum width of 80 characters per line
- Left-aligned text (not justified)
- Adequate spacing between paragraphs

## Mobile-Specific Guidelines

### Touch Targets
- Minimum size of 44x44px
- Adequate spacing between touch targets
- Sticky navigation for easy access

### Gestures
- Swipe for card navigation
- Pull to refresh for content lists
- Pinch to zoom for diagrams

### Mobile Navigation
- Bottom navigation bar for primary actions
- Hamburger menu for secondary navigation
- Back button clearly visible

### Mobile Forms
- Full-width input fields
- Native input types for appropriate keyboards
- Autocomplete when applicable
- Minimize typing when possible

## Animation Guidelines

### Principles
- Subtle and purposeful
- Enhance, don't distract
- Quick but not abrupt
- Consistent throughout the platform

### Transitions
- Page transitions: 300ms ease
- Component transitions: 150-200ms ease
- Hover transitions: 100ms ease

### Loading Animations
- Simple spinner or progress indicator
- Brand-colored
- Not too flashy or distracting

### Micro-interactions
- Button ripple effect
- Form field focus animation
- Success/error state transitions
- Dropdown expansion/collapse 