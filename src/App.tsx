/**
 * Genesis App - Life Simulation Game
 * 
 * Main application component that orchestrates the entire React application.
 * This component sets up the foundational infrastructure including:
 * - Global state management via React Query
 * - UI component providers for consistent styling and behavior
 * - Client-side routing for SPA navigation
 * - Error boundaries and fallback handling
 * 
 * Architecture Decision: Uses React Router's BrowserRouter instead of HashRouter
 * for clean URLs and better SEO. This requires proper server configuration
 * for handling client-side routes in production.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/**
 * Global React Query client configuration
 * 
 * Provides centralized cache management for server state with sensible defaults:
 * - Automatic background refetching for data consistency
 * - Error retry logic for improved reliability
 * - Garbage collection of unused queries for memory efficiency
 * 
 * Note: Default configuration is used here, but can be customized for specific
 * performance requirements such as stale time, cache time, and retry strategies.
 */
const queryClient = new QueryClient();

/**
 * Root Application Component
 * 
 * Implements a provider pattern to inject global dependencies down the component tree.
 * The nesting order is crucial for proper functionality:
 * 
 * 1. QueryClientProvider - Enables server state management throughout the app
 * 2. TooltipProvider - Provides consistent tooltip behavior and accessibility
 * 3. Toast components - Global notification system for user feedback
 * 4. BrowserRouter - Enables client-side routing with clean URLs
 * 
 * Route Configuration:
 * - "/" : Main application entry point (Index page)
 * - "*" : Catch-all route for 404 handling (must be last)
 * 
 * @returns {JSX.Element} The complete application component tree
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* Dual toast system for different notification types */}
      <Toaster /> {/* Standard toast notifications with queue management */}
      <Sonner /> {/* Modern sonner-style notifications for better UX */}
      
      <BrowserRouter>
        <Routes>
          {/* Primary application route - serves the main game interface */}
          <Route path="/" element={<Index />} />
          
          {/* 
            Catch-all route for unmatched paths
            IMPORTANT: This must remain the last route to function properly
            Provides graceful fallback for broken links and type-in errors
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
