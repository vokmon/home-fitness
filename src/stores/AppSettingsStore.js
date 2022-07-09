import { blueGrey, deepOrange } from '@mui/material/colors';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { DEFAULT_APP_SETTINGS } from '../constants/AppSettingConstants';

let appSettingsStore = persist(
  (set) => ({
    theme: {
      themePrimary: blueGrey,
      themeSecondary: {
        main: deepOrange[900],
        
      },
    },
    setTheme: ({ themePrimary, themeSecondary }) => set({ themePrimary, themeSecondary }),

    bodyParts: DEFAULT_APP_SETTINGS.bodyParts,
    setBodyParts: (bodyParts) => set({ bodyParts }),

    equipments: DEFAULT_APP_SETTINGS.equipments,
    setEquipments: (equipments) => set({ equipments }),

    sessionDuration: DEFAULT_APP_SETTINGS.sessionDuration,
    setSessionDuration: (sessionDuration) => set({ sessionDuration }),

    specificPartDuration: DEFAULT_APP_SETTINGS.specificPartDuration,
    setSpecificPartDuration: (specificPartDuration) => set({ specificPartDuration }),

    exerciseDurationInSecond: DEFAULT_APP_SETTINGS.exerciseDurationInSecond,
    smallBreakInSecond: DEFAULT_APP_SETTINGS.smallBreakInSecond,
  }),
  {
    name: 'home-fitness-app-settings', // name of item in the storage (must be unique)
    getStorage: () => localStorage, // (optional) by default the 'localStorage' is used
  }
);

export const useAppSettingsStore = create(appSettingsStore);
