import { Routes, Route, Navigate } from 'react-router-dom';
import Session from '../pages/session/Session';
import Search from '../pages/search/Search';
import FullBodySessionPlay from '../pages/session-play/FullBodySessionPlay';
import Settings from '../pages/settings/Settings';
import SpecificPartSessionPlay from '../pages/session-play/SpecificPartSessionPlay';
import { URL } from './RouteConstants';

function RouterConfiguration() {
  return (
    <Routes>
      <Route path={URL.DEFAULT_URL} element={<Search />} />
      <Route path={URL.SESSION_URL} element={<Session />} />
      <Route path={URL.SEARCH_URL} element={<Search />} />
      <Route path={URL.SETTINGS_URL} element={<Settings />} />
      <Route path={URL.FULL_BODY_PLAY} element={<FullBodySessionPlay />} />
      <Route path={URL.SPECIFIC_PART_PLAY} element={<SpecificPartSessionPlay />} />
      <Route
        path='*'
        caseSensitive={false}
        element={<Navigate to={URL.SEARCH_URL} replace />}
      />
    </Routes>
  );
}

export default RouterConfiguration;
