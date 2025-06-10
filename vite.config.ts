/**
 * Vite Build Configuration for Genesis Life Simulation App
 * 
 * This configuration optimizes the development experience and production builds
 * for a React-based life simulation game with specific deployment requirements.
 * 
 * Key Configuration Decisions:
 * - Uses SWC for faster compilation than Babel
 * - Configures relative base path for GitHub Pages deployment
 * - Sets up path aliases for cleaner imports
 * - Optimizes for both development speed and production performance
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Vite Configuration Factory
 * 
 * Uses a function to access the build mode (development/production) for
 * conditional configuration based on the environment.
 * 
 * @param {Object} config - Vite configuration context
 * @param {string} config.mode - Build mode ('development' | 'production')
 * @returns {Object} Complete Vite configuration object
 */
export default defineConfig(({ mode }) => ({
  /**
   * Base Path Configuration
   * 
   * Set to "/genesis/" for GitHub Pages subdirectory deployment.
   * This ensures proper asset resolution when deployed to github.io/genesis/
   * 
   * Alternative: Use "./" for relative paths if deploying to root domain
   */
  base: "/genesis/",
  
  /**
   * Development Server Configuration
   * 
   * Optimized for cross-platform development and network accessibility:
   * - host "::" enables IPv6 and IPv4 binding for network access
   * - port 8080 avoids conflicts with common development ports
   */
  server: {
    host: "::", // Bind to all available network interfaces
    port: 8080, // Consistent port for team development
  },
  
  /**
   * Plugin Configuration
   * 
   * React SWC Plugin: Provides faster compilation than traditional Babel
   * - Faster hot module replacement (HMR) during development
   * - Improved build times for production
   * - Better TypeScript integration
   */
  plugins: [
    react(), // Uses @vitejs/plugin-react-swc internally
  ],
  
  /**
   * Module Resolution Configuration
   * 
   * Path aliases improve developer experience and code organization:
   * - "@" points to src directory for cleaner imports
   * - Eliminates complex relative path chains (../../components)
   * - Improves refactoring safety with absolute imports
   * 
   * Example usage: import { Button } from "@/components/ui/button"
   */
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
