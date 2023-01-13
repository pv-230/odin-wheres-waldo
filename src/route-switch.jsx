import { HashRouter, Routes, Route } from 'react-router-dom';

import App from './components/app/app';
import NotFound from './components/not-found/not-found';

function RouteSwitch() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default RouteSwitch;
