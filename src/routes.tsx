import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import XPosure from './pages/XPosure';
import ArticleDetail from './pages/ArticleDetail';
import XPerience from './pages/XPerience';
import Xcelerate from './pages/Xcelerate';
import XcelerateApply from './pages/XcelerateApply';
import Xperts from './pages/Xperts';
import Xchange from './pages/Xchange';
import OurTeam from './pages/OurTeam';
import Mentors from './pages/Mentors';
import Timeline from './pages/Timeline';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'xposure', Component: XPosure },
      { path: 'xposure/:slug', Component: ArticleDetail },
      { path: 'xperience', Component: XPerience },
      { path: 'xcelerate', Component: Xcelerate },
      { path: 'xcelerate/apply', Component: XcelerateApply },
      { path: 'xperts', Component: Xperts },
      { path: 'xchange', Component: Xchange },
      { path: 'our-team', Component: OurTeam },
      { path: 'mentors', Component: Mentors },
      { path: 'timeline', Component: Timeline },
      { path: '*', Component: NotFound },
    ],
  },
]);
