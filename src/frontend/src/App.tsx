import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ThemeProvider } from 'next-themes';
import AppLayout from './components/layout/AppLayout';
import HomePage from './pages/HomePage';
import Unit1EnvironmentalSystems from './pages/Unit1EnvironmentalSystems';
import Unit2NatureOfScience from './pages/Unit2NatureOfScience';
import Unit3EnergyFlow from './pages/Unit3EnergyFlow';
import Unit4CarryingCapacity from './pages/Unit4CarryingCapacity';
import Unit5NaturalChange from './pages/Unit5NaturalChange';
import Unit6HumanImpact from './pages/Unit6HumanImpact';
import Unit7HumanActions from './pages/Unit7HumanActions';
import Unit8EthicsEconomics from './pages/Unit8EthicsEconomics';
import Unit9Legislation from './pages/Unit9Legislation';
import ProgressDashboard from './components/dashboard/ProgressDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import { Toaster } from './components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const unit1Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit1-environmental-systems',
  component: Unit1EnvironmentalSystems,
});

const unit2Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit2-nature-of-science',
  component: Unit2NatureOfScience,
});

const unit3Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit3-energy-flow',
  component: Unit3EnergyFlow,
});

const unit4Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit4-carrying-capacity',
  component: Unit4CarryingCapacity,
});

const unit5Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit5-natural-change',
  component: Unit5NaturalChange,
});

const unit6Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit6-human-impact',
  component: Unit6HumanImpact,
});

const unit7Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit7-human-actions',
  component: Unit7HumanActions,
});

const unit8Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit8-ethics-economics',
  component: Unit8EthicsEconomics,
});

const unit9Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit9-legislation',
  component: Unit9Legislation,
});

const progressRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/progress',
  component: ProgressDashboard,
});

const teacherRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/teacher',
  component: TeacherDashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  unit1Route,
  unit2Route,
  unit3Route,
  unit4Route,
  unit5Route,
  unit6Route,
  unit7Route,
  unit8Route,
  unit9Route,
  progressRoute,
  teacherRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
