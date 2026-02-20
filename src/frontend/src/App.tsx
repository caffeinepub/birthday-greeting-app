import { createRouter, RouterProvider, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import SenderForm from './pages/SenderForm';
import RecipientView from './pages/RecipientView';
import { Toaster } from '@/components/ui/sonner';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Toaster />
    </>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: SenderForm,
});

const greetingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/greeting/$linkId',
  component: RecipientView,
});

const routeTree = rootRoute.addChildren([indexRoute, greetingRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
