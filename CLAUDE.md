# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a study planning web application built with React, TypeScript, Vite, and Tailwind CSS. The app helps students organize their studies with features including subject/topic management, Pomodoro timer, note-taking, progress tracking, and authentication.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (runs on port 2025)
npm run dev

# Build for production
npm run build

# Build for development mode
npm run build:dev

# Lint codebase
npm run lint

# Preview production build
npm run preview
```

## Architecture

### State Management

The application uses **Zustand** with persistence middleware for global state management. The main store is `src/store/useSubjects.ts`, which manages:

- **Subjects**: Course/subject entities with properties like name, color, difficulty, weekly goals, tags, and nested topics
- **Topics**: Individual study topics within subjects, including notes, priority, completion status, estimated time
- **Study Sessions**: Records of study time (from Pomodoro sessions) linked to subjects/topics
- **Computed Values**: Today's study time, weekly study time, subject-specific study times

All state is persisted to localStorage automatically via Zustand's persist middleware.

### Routing & Authentication

- Routes are defined in `src/App.tsx` using `react-router-dom`
- Authentication state is managed by `src/context/AuthContext.tsx` (token-based, stored in localStorage)
- Authentication components: `ProtectedRoute` and `GuestRoute` wrap routes that require or block authentication
- Auth is currently mock-based (no real backend)

### Theme System

The app supports dark/light mode toggle via `src/context/ThemeContext.tsx`. Components should use the theme context for dynamic theming.

### Component Structure

- `src/components/ui/`: Base UI components from **shadcn/ui** (buttons, dialogs, forms, etc.)
- `src/components/auth/`: Authentication-related wrappers and form components
- `src/components/dashboard/`: Dashboard widgets and statistics cards
- `src/components/pomodoro/`: Pomodoro timer implementation
- `src/components/layout/`: Layout components like Header
- `src/components/login/`, `src/components/register/`: Auth forms
- `src/pages/`: Top-level page components

### Key Pages & Flow

1. **Dashboard** (`src/pages/DashboardPage.tsx`): Shows study statistics, graphs (via Recharts), recent topics, and quick timer access
2. **Subjects** (`src/pages/Subjects.tsx`): CRUD interface for managing subjects with colors, categories, tags, and weekly goals
3. **Subject Topics** (`src/pages/SubjectTopics.tsx`): Lists topics within a subject, allows CRUD operations on topics
4. **Topic Page** (`src/pages/TopicPage.tsx`): Note-taking interface for individual topics
5. **Pomodoro** (`src/pages/Pomodoro.tsx`): Timer with subject/topic selection that records study sessions

### Data Models

**Subject**:
- id, name, description, color, icon
- totalTopics, completedTopics
- weeklyGoal, currentWeekStudied
- difficulty, category, tags
- topics array, timestamps

**Topic**:
- id, name, description, notes
- completed, priority, difficulty
- estimatedTime (minutes)
- tags, timestamps, lastStudied

**StudySession**:
- id, subjectId, topicId (optional)
- duration (minutes), date
- type: 'pomodoro' | 'study'

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** + **Radix UI** for component library
- **Zustand** for state management
- **React Router** for navigation
- **React Hook Form** + **Zod** for forms and validation
- **Recharts** for data visualization
- **Lucide React** for icons
- **TanStack Query** for async state (currently minimal usage)

## Path Aliases

The project uses `@/` as an alias for the `src/` directory (configured in `vite.config.ts` and `tsconfig.json`).

Example: `import { Button } from "@/components/ui/button"`

## Development Notes

### TypeScript Configuration

TypeScript is configured with relaxed settings:
- `noImplicitAny: false`
- `strictNullChecks: false`
- `noUnusedLocals: false`
- `noUnusedParameters: false`

This means the codebase may have some loose typing. Be mindful when adding new features.

### Port Configuration

The dev server runs on port **2025** (configured in `vite.config.ts`).

### Styling Approach

- Use Tailwind utility classes for styling
- Component variants managed via `class-variance-authority`
- Use `cn()` utility from `src/lib/utils.ts` for conditional class merging

### Form Handling

Use React Hook Form with Zod schemas for validation. Example pattern:
```typescript
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { ... }
});
```

### Adding New UI Components

shadcn/ui components can be added via the CLI (though this project already has most components). Configuration is in `components.json`.

## Key Workflows

### Adding Study Time

When a Pomodoro session completes:
1. `addStudySession()` creates a StudySession record
2. The subject's `currentWeekStudied` is automatically incremented
3. Dashboard statistics update in real-time due to Zustand reactivity

### Topic Completion

Use `toggleTopicCompletion(subjectId, topicId)` to mark topics complete. This automatically updates the subject's `completedTopics` count.

### Weekly Progress Reset

Call `resetWeeklyProgress()` to clear all weekly study data (useful for testing or manual resets).

## Future Features (See IDEAS.md)

- Flashcards within topics
- Gamification (streaks, points, badges)
- AI integration for summaries and Q&A
- Calendar/agenda system
- Real backend with proper authentication
- Detailed progress reports
