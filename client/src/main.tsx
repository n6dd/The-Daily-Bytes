import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App';
import ErrorPage from './pages/ErrorPage';
import Access from './pages/Access';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import ChatGpt from './pages/ChatGpt';
import Contact from './pages/Contact';
import Entertainment from './pages/Entertainment';
import Gaming from './pages/Gaming';
import Home from './pages/Home';
import Sports from './pages/Sports';
import Trending from './pages/Trending';
import Travel from './pages/Travel';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />, 
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <SignUp /> },
      { path: 'chatgpt', element: <ChatGpt /> },
      { path: 'contact', element: <Contact /> },
      { path: 'entertainment', element: <Entertainment /> },
      { path: 'gaming', element: <Gaming /> },
      { path: 'access', element: <Access /> },
      { path: 'sports', element: <Sports /> },
      { path: 'travel', element: <Travel /> },
      { path: 'trending', element: <Trending /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
