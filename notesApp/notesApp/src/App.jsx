import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

// Pages
import Dashboard from './pages/dashboard/dashboard.jsx'
import Signup from './pages/signUp/SignUp.jsx'
import Login from './pages/signIn/SignIn.jsx'
import Trash from './pages/trash/trash.jsx'
import Archive from './pages/archive/archive.jsx'

// Import the new Routes
import AuthRoute from './routing/AuthRoutes.jsx'
import ProtectedRoute from './routing/ProtectedRoutes.jsx'

const router = createBrowserRouter([
  // --- PUBLIC ROUTES (Restricted if logged in) ---
  {
    path: '/signup',
    element: (
      <AuthRoute>
        <Signup />
      </AuthRoute>
    )
  },
  {
    path: '/login',
    element: (
      <AuthRoute>
        <Login />
      </AuthRoute>
    )
  },

  // --- PRIVATE ROUTES (Restricted if NOT logged in) ---
  {
    path: '/',
    // Redirect root to dashboard (which is then protected)
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/trash',
    element: (
      <ProtectedRoute>
        <Trash />
      </ProtectedRoute>
    )
  },
  {
    path: '/archive',
    element: (
      <ProtectedRoute>
        <Archive />
      </ProtectedRoute>
    )
  },
  // Placeholders for sidebar links to prevent crashes
  {
    path: '/reminders',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/labels',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App