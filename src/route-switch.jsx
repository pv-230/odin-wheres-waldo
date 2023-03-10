import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './components/app';
import Leaderboard from './components/leaderboard';
import NotFound from './components/not-found';

function RouteSwitch() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
