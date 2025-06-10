# Genesis - Life Simulation Game

A sophisticated life simulation web application that explores the origins and evolution of life through interactive gameplay mechanics. Built with modern React architecture and optimized for both development experience and production performance.

## 🎯 Project Overview

Genesis is a comprehensive life simulation game that focuses on:
- **Life Cycle Mechanics**: Birth, growth, reproduction, and death systems
- **Environmental Interactions**: Dynamic ecosystems that affect life forms
- **Evolutionary Processes**: Genetic algorithms and natural selection
- **Scenario-Based Gameplay**: Guided experiences and sandbox mode
- **Data Visualization**: Real-time charts and analytics of life systems

## 🏗️ Architecture & Technology Stack

### Core Technologies
- **React 18.3.1**: Modern React with concurrent features and optimized rendering
- **TypeScript**: Type-safe development with enhanced IDE support
- **Vite**: Lightning-fast build tool with HMR and optimized bundling
- **React Router 6**: Client-side routing with modern navigation patterns
- **TanStack Query**: Advanced server state management with caching and synchronization

### UI Framework & Styling
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Radix UI**: Accessible, unstyled UI primitives for consistent behavior
- **shadcn/ui**: Pre-built components with design system integration
- **Lucide React**: Consistent icon library with tree-shaking support

### State Management & Forms
- **React Hook Form**: Performant form handling with minimal re-renders
- **Zod**: Runtime type validation for form data and API responses
- **Class Variance Authority**: Type-safe variant management for components

### Data Visualization & Animation
- **Recharts**: Declarative charting library for life simulation data
- **Embla Carousel**: Touch-friendly carousel for content presentation
- **Tailwind Animate**: CSS animations with utility classes

## 📁 Project Structure

```
genesis/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # Base UI primitives (buttons, inputs, etc.)
│   │   └── game/            # Game-specific components
│   ├── pages/               # Route-level components
│   ├── hooks/               # Custom React hooks
│   ├── utils/               # Helper functions and utilities
│   ├── types/               # TypeScript type definitions
│   ├── lib/                 # External library configurations
│   └── styles/              # Global styles and CSS
├── public/                  # Static assets
├── dist/                    # Production build output
└── docs/                    # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (or equivalent yarn/pnpm)
- **Git**: For version control and deployment

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/igor-kan/genesis.git
   cd genesis
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The application will be available at `http://localhost:8080`

### Available Scripts

#### Development
- `npm run dev`: Start development server with hot module replacement
- `npm run build:dev`: Create development build for testing

#### Production
- `npm run build`: Create optimized production build
- `npm run preview`: Preview production build locally

#### Quality Assurance
- `npm run lint`: Run ESLint for code quality checks
- `npm run type-check`: Run TypeScript compiler for type checking

#### Deployment
- `npm run deploy`: Deploy to GitHub Pages (includes build step)
- `npm run predeploy`: Automatic pre-deployment build hook

## 🌐 Deployment

### GitHub Pages (Automated)
The project is configured for automatic deployment to GitHub Pages:

1. **Push to main branch** triggers GitHub Actions workflow
2. **Automated build** process creates production assets
3. **Deployment** to `gh-pages` branch serves the application

**Live URL**: [https://igor-kan.github.io/genesis](https://igor-kan.github.io/genesis)

### Manual Deployment
For manual deployment or other hosting providers:

```bash
npm run build
# Deploy contents of 'dist' folder to your hosting service
```

### Environment Configuration
- **Base Path**: Configured for relative paths (`./`) for flexible hosting
- **Asset Optimization**: Automatic code splitting and compression
- **Browser Compatibility**: Supports all modern browsers with ES6+ features

## 🛠️ Development Guidelines

### Code Organization
- **Component Structure**: Each component should have a single responsibility
- **Hook Patterns**: Extract complex logic into custom hooks for reusability
- **Type Safety**: All props, state, and API responses should be typed
- **Import Conventions**: Use absolute imports with `@/` alias for src directory

### Performance Considerations
- **React Query**: Implement proper cache invalidation and background refetching
- **Component Optimization**: Use React.memo for expensive components
- **Bundle Analysis**: Monitor bundle size and implement code splitting where needed
- **Asset Optimization**: Compress images and use appropriate formats

### Accessibility Standards
- **ARIA Labels**: All interactive elements must have proper labeling
- **Keyboard Navigation**: Ensure full keyboard accessibility
- **Screen Reader Support**: Test with screen readers for visually impaired users
- **Color Contrast**: Maintain WCAG 2.1 AA compliance for color combinations

## 🎮 Game Features

### Core Simulation Systems
1. **Life Cycle Management**
   - Birth and initialization of life forms
   - Growth and development phases
   - Reproduction mechanics with genetic variation
   - Death and decomposition processes

2. **Environmental Factors**
   - Temperature and climate effects
   - Resource availability and scarcity
   - Natural disasters and events
   - Ecosystem balance mechanics

3. **Evolutionary Mechanics**
   - Genetic trait inheritance
   - Mutation probability and effects
   - Natural selection pressures
   - Speciation and divergence

### User Interface Features
- **Real-time Visualization**: Live charts showing population dynamics
- **Interactive Controls**: Pause, speed adjustment, and scenario selection
- **Data Export**: CSV export for analysis and research
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

## 🤝 Contributing

### Development Workflow
1. **Fork** the repository and create a feature branch
2. **Implement** changes following the coding guidelines
3. **Test** thoroughly in development environment
4. **Submit** pull request with detailed description

### Code Review Process
- All changes require review before merging
- Automated testing must pass
- Documentation updates for significant features
- Performance impact assessment for core systems

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [https://igor-kan.github.io/genesis](https://igor-kan.github.io/genesis)
- **Repository**: [https://github.com/igor-kan/genesis](https://github.com/igor-kan/genesis)
- **Issues**: [https://github.com/igor-kan/genesis/issues](https://github.com/igor-kan/genesis/issues)
- **Discussions**: [https://github.com/igor-kan/genesis/discussions](https://github.com/igor-kan/genesis/discussions)

---

For more detailed documentation, please refer to the `/docs` directory or visit our [comprehensive documentation site](https://igor-kan.github.io/genesis/docs).
