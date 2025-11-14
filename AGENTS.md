# AGENTS.md

## Repository Overview
This is a **dual-language** M2 Biostatistics repository containing:
1. **Course Materials**: R code, PowerPoint presentations, PDFs, and datasets for 5 courses
2. **Learning Web App**: Next.js TypeScript application in `/learn` for interactive learning

### Repository Structure
```
biostats/
├── Course 1 - 20250916/  # Intro to R, dplyr, ggplot2, Rmarkdown, shiny
│   ├── Code R & Data/    # R scripts (base, demo, responses) + CSV datasets
│   ├── Documents/        # Reference PDFs
│   └── Powerpoint/       # Course slides
├── Course 2 - 20250923/  # Statistical tests and linear models
│   ├── Code R & Data/    # R scripts for univariate/multivariate tests & models
│   └── Powerpoint/
├── Course 3 - 20250930/  # Advanced models (ANOVA, ANCOVA, MANOVA, GLMs)
│   ├── Code R & Data/    # R scripts for various regression models
│   └── PowerPoint/
├── Course 4 - 20250930/  # Multivariate analysis & machine learning
│   ├── Code R & Data/    # R scripts for PCA, MCA, FCA, FAMD, k-means, LDA, decision trees
│   └── PowerPoint/
├── Course 5 - 20251007/  # Additional course materials
│   ├── Documents/
│   └── PowerPoint/
└── learn/                # Next.js web application (TypeScript)
    ├── app/
    │   ├── course1/      # Course 1 interactive page
    │   ├── course2/      # Course 2 interactive page
    │   ├── course3/      # Course 3 interactive page
    │   ├── course4/      # Course 4 interactive page
    │   └── components/   # Reusable React components
    │       ├── charts/   # Recharts visualization components
    │       ├── course/   # Course section components
    │       ├── quiz/     # Quiz components
    │       └── ui/       # UI components (CodeBlock, InteractiveSelector)
    ├── public/           # Static assets (PDFs, images)
    └── package.json      # pnpm dependencies
```

### Course Materials (R Code)
- **Pattern**: Each topic has 3 files: `topic.R` (base exercises), `topic_demo.R` (demonstrations), `topic_responses.R` (solutions)
- **Count**: 76 R scripts total across courses (19 + 15 + 21 + 21)
- **Data**: 3 CSV files (quadratic_data.csv, nba_teams_2016.csv, Titanic-Dataset.csv)
- **PDFs**: 24 PDF documents across courses
- **R Packages Used**: dplyr, ggplot2, stringr, lubridate, plotly, shiny, Rmarkdown, FactoMineR, rpart, e1071, and statistical modeling packages

### Learning Web App (`/learn`)
- **Framework**: Next.js 16.0.1 with App Router
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17
- **Charts**: Recharts 3.4.1 for data visualizations
- **Package Manager**: pnpm (required)
- **Features**: Interactive course pages, quizzes, tooltips, statistical visualizations, resource links

## Build/Lint/Test Commands

### For Web App (in `/learn` directory)
- **Development**: `pnpm dev` (starts dev server at http://localhost:3000)
- **Build**: `pnpm build` (production build)
- **Start**: `pnpm start` (runs production build)
- **Lint**: `pnpm lint` (ESLint with Next.js config)
- **Test**: No tests configured yet; add with `pnpm add -D jest @types/jest` and `pnpm test`

### For R Scripts (in course directories)
- **Run R Script**: `Rscript path/to/script.R`
- **Interactive R**: Open RStudio or run `R` in terminal
- **Install Packages**: Run the `install.packages()` commands at the top of each script

## Code Style Guidelines

### TypeScript (Web App)
- **Language**: TypeScript with strict mode enabled
- **Imports**: Group imports (React, then external libs, then internal), use absolute paths with `@/*`
- **Formatting**: Consistent indentation (2 spaces), no trailing semicolons preferred
- **Types**: Always type function params/returns; use interfaces for objects; avoid `any`
- **Naming**: camelCase for vars/functions, PascalCase for components/classes, UPPER_SNAKE for constants
- **Error Handling**: Use try/catch for async ops; throw descriptive errors
- **Components**: Functional with hooks; use TypeScript FC type or explicit return types
- **Styling**: Tailwind CSS classes; avoid inline styles
- **Commits**: Use conventional commits (feat:, fix:, docs:, refactor:, etc.)

### R Scripts (Course Materials)
- **Style**: Follow tidyverse style guide
- **Comments**: Header blocks with module name, goal, and tips
- **Structure**: Load libraries first, then data, then exercises/analyses
- **Naming**: snake_case for variables and functions
- **Pipes**: Use `%>%` for dplyr chains
- **Documentation**: Comment complex operations; keep demo/response files in sync with base files

## Development Workflow

### Working with Web App
1. Navigate to `/learn` directory: `cd learn`
2. Install dependencies if needed: `pnpm install`
3. Start dev server: `pnpm dev`
4. Make changes following TypeScript guidelines
5. Test interactivity and responsiveness in browser
6. Lint before committing: `pnpm lint`
7. Build to verify: `pnpm build`

### Working with R Code
1. Navigate to appropriate course directory
2. Open R script (base, demo, or responses version)
3. Install required packages (see top of each script)
4. Run code chunks interactively in RStudio or R console
5. Test with provided datasets in `data/` subdirectories
6. Keep base/demo/responses files consistent when updating

### Adding New Course Content
1. **R Materials**: Create course directory with structure: `Code R & Data/`, `PowerPoint/`, `Documents/`
2. **R Scripts**: Follow naming pattern: `topic.R`, `topic_demo.R`, `topic_responses.R`
3. **Web App**: Create `app/courseX/page.tsx` and related components in `app/components/course/courseX/`
4. **Update Home**: Add navigation card in `app/page.tsx`

## Git Workflow
- **Branch**: Currently on `master` branch
- **Status**: `learn/` directory is untracked (not yet committed)
- **Last Commit**: "docs: add all class documents" (28057ba)
- **Commit Style**: Use conventional commits format

## Dependencies

### Web App (learn/)
**Production:**
- next: ^16.0.1
- react: ^19.2.0
- react-dom: ^19.2.0
- recharts: ^3.4.1

**Development:**
- @tailwindcss/postcss: ^4
- @types/node: ^20
- @types/react: ^19
- @types/react-dom: ^19
- eslint: ^9
- eslint-config-next: 16.0.1
- tailwindcss: ^4
- typescript: ^5

### R (Course Materials)
See individual script headers for package requirements. Common packages:
- Data manipulation: dplyr, tidyr
- Visualization: ggplot2, plotly
- Dates: lubridate
- Strings: stringr
- Stats: FactoMineR, rpart, e1071
- Interactive: shiny, Rmarkdown

## Important Notes
- **Dual Stack**: This repo mixes R (statistical analysis) and TypeScript (web app) - be aware of context
- **pnpm Required**: Web app uses pnpm, not npm or yarn
- **PDF Assets**: Large PDFs may exist in public/ or Documents/ directories
- **Untracked Files**: The `/learn` app is currently untracked - commit when ready
- **R Working Directory**: When running R scripts, set working directory to script location or use RStudio projects
- **Course Naming**: Dates in folder names (YYYYMMDD format) - preserve when referencing

## Quick Commands Reference
```bash
# Web app development
cd learn && pnpm dev

# Web app build & lint
cd learn && pnpm build && pnpm lint

# Check repo status
git --no-pager status

# Run R script
Rscript "Course 1 - 20250916/Code R & Data/dplyr_demo.R"

# Find specific R functions
grep -r "ggplot" --include="*.R" .

# List all course PDFs
find . -name "*.pdf"
```