import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/home';
import Posts from './pages/posts';
import PostDetail from './pages/PostDetail';
import PageTransition from './components/PageTransition';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<PageTransition><Home /></PageTransition>}
        />
        <Route
          path="posts"
          element={<PageTransition><Posts /></PageTransition>}
        />
        <Route
          path="/posts/:filename"
          element={<PageTransition><PostDetail /></PageTransition>}
        />
      </Routes>
    </AnimatePresence>
  );
}

const Root = () => (
  <Router>
    <App />
  </Router>
);

export default Root;