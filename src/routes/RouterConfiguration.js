import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home/Home';
import Search from '../pages/search/Search';
import Settings from '../pages/settings/Settings';
import { URL } from './RouteConstants';

function RouterConfiguration() {
  return (
    <Routes>
      <Route path={URL.DEFAULT_URL} element={<Home />} />
      <Route path={URL.HOME_URL} element={<Home />} />
      <Route path={URL.SEARCH_URL} element={<Search />} />
      <Route path={URL.SETTINGS_URL} element={<Settings />} />
      <Route
        path='*'
        caseSensitive={false}
        element={<Navigate to={URL.HOME_URL} replace />}
      />
    </Routes>
  );
}

export default RouterConfiguration;
