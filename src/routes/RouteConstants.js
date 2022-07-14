export const URL = {
  DEFAULT_URL: '/',
  SESSION_URL: '/session',
  SEARCH_URL: '/search',
  SETTINGS_URL: '/settings',
  FULL_BODY_PLAY: '/exercises/full-body-sessions/:sessionId',
  SPECIFIC_PART_PLAY: '/exercises/specific-part-sessions/:bodyPart/:sessionId',
};

export const PAGES = [{
  label: 'Session',
  to: URL.SESSION_URL,
},
{
  label: 'Search',
  to: URL.SEARCH_URL,
},
{
  label: 'Settings',
  to: URL.SETTINGS_URL,
},
];
