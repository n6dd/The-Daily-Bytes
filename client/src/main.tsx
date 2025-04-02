import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Access from './pages/Access';
import Contact from './pages/Contact';
import Entertainment from './pages/Entertainment';
import Technology from './pages/Technology';
import Home from './pages/Home';
import Horoscope from './pages/Horoscope'; // ✅ Horoscope
import Login from './pages/Login';
import SignUp from './pages/SignUp';       // ✅ SignUp
import Sports from './pages/Sports';
import Trending from './pages/Trending';
import Health from './pages/Health';
import DailyByte from './pages/DailyByte'; // ✅ DailyByte


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },               // ✅ updated path
      { path: 'dailybyte', element: <DailyByte /> },
      { path: 'contact', element: <Contact /> },
      { path: 'entertainment', element: <Entertainment /> },
      { path: 'access', element: <Access /> },
      { path: 'sports', element: <Sports /> },
      { path: 'health', element: <Health /> },
      { path: 'trending', element: <Trending /> },
      { path: 'horoscope', element: <Horoscope /> },
      { path: 'Technology', element: <Technology /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
