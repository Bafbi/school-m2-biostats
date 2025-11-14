# Biostatistics Interactive Learning App

## Overview
This is a Next.js web application designed to provide an interactive learning experience for M2 Biostatistics courses. The app allows students to access course content, view resources, interact with visualizations, and take quizzes to reinforce learning.

## Tech Stack
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts for data visualizations
- **Package Manager**: pnpm

## Features Implemented
- **Home Page**: Navigation cards to access different courses
- **Course Pages**: Structured content with sections, interactive elements, and quizzes
- **Resources**: Links to PDFs and code references
- **Visualizations**: Charts for statistical concepts (e.g., normal distribution, scatter plots)
- **Quizzes**: Multiple-choice questions with scoring and retake functionality
- **Tooltips**: Explanations for key terms on hover

## Implementation Guide

### Project Setup
1. Initialize Next.js app with TypeScript and Tailwind: `npx create-next-app@latest learn --yes`
2. Install dependencies: `pnpm add recharts`
3. Set up AGENTS.md for coding guidelines

### Page Structure
- `app/page.tsx`: Home page with course navigation
- `app/course1/page.tsx`: Course 1 content, quiz, resources
- `app/course2/page.tsx`: Course 2 content with interactive sections, graphs, quiz

### Key Components
- **Course Cards**: Link components for navigation
- **Quiz Component**: State-managed multiple-choice questions
- **Chart Components**: Recharts for visualizations
- **Tooltip Elements**: Title attributes for term explanations

### Content Organization
- Extract text from course PDFs
- Structure into sections with headings and explanations
- Add interactive elements like expandable examples
- Include resources (PDFs in public/documents/, code references)

### Interactivity
- Use React hooks (useState) for quiz logic and UI state
- Implement hover tooltips for key terms
- Add graphs to illustrate concepts

## Code Style Guidelines
- **Language**: TypeScript with strict mode enabled
- **Imports**: Group imports (React, then external libs, then internal), use absolute paths with `@/*`
- **Formatting**: Use Prettier if added; otherwise, consistent indentation (2 spaces)
- **Types**: Always type function params/returns; use interfaces for objects; avoid `any`
- **Naming**: camelCase for vars/functions, PascalCase for components/classes, UPPER_SNAKE for constants
- **Error Handling**: Use try/catch for async ops; throw descriptive errors
- **Components**: Functional with hooks; use TypeScript FC type
- **Styling**: Tailwind CSS classes; avoid inline styles
- **Commits**: Use conventional commits (feat:, fix:, etc.)

## Build/Lint/Test Commands
- Build: `pnpm build`
- Lint: `pnpm lint`
- Test: No tests configured yet; add with `pnpm add -D jest @types/jest` and `pnpm test`
- Run single test: `pnpm test -- <test-file>` (once tests are added)

## Future Enhancements
- Add more courses (3-5)
- Implement user progress tracking
- Add more interactive simulations
- Include video explanations
- Expand quiz database
- Add search functionality

## File Structure
```
learn/
├── app/
│   ├── course1/
│   │   └── page.tsx
│   ├── course2/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── documents/
│       └── *.pdf
├── package.json
├── tsconfig.json
└── ...
```

## Development Workflow
1. Run `pnpm dev` to start development server
2. Implement features following code style guidelines
3. Test interactivity and responsiveness
4. Lint code with `pnpm lint`
5. Build for production with `pnpm build`

This document serves as a guide for continuing development and maintaining consistency across the project.
