## Project Overview

This is a web application built with React, Vite, TypeScript, and Tailwind CSS. It appears to be a study planner application with features like subjects management, a Pomodoro timer, and user authentication. The project uses `shadcn-ui` for UI components, `react-router-dom` for routing, `react-hook-form` for forms, and `zod` for data validation.

## Building and Running

To work with this project, you need to have Node.js and npm installed.

**Key Commands:**

*   **`npm install`**: Installs the necessary dependencies.
*   **`npm run dev`**: Starts the development server at `http://localhost:8080`.
*   **`npm run build`**: Creates a production-ready build of the application.
*   **`npm run lint`**: Lints the codebase to check for errors and style issues.
*   **`npm run preview`**: Serves the production build locally for preview.

## Development Conventions

*   **Component-Based Architecture:** The project follows a component-based architecture with components organized in the `src/components` directory.
*   **Routing:** Routing is handled by `react-router-dom`, with routes defined in `src/App.tsx`.
*   **Styling:** The project uses Tailwind CSS for styling, with the configuration in `tailwind.config.ts`.
*   **UI Components:** The project uses `shadcn-ui` for its UI components.
*   **State Management:** `react-query` is used for managing server state.
*   **Path Aliases:** The project uses the `@` alias for the `src` directory, configured in `vite.config.ts`.
*   **Linting:** ESLint is used for linting, with the configuration in `eslint.config.js`.
*   **Type Checking:** TypeScript is used for static type checking.