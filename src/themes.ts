import type { GlobalThemeOverrides } from 'naive-ui';

export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ea54cFF',
    primaryColorHover: '#36AD6AFF',
    primaryColorPressed: '#0C7A43FF',
    primaryColorSuppl: '#1ea54c20',
  },
  Menu: {
    itemHeight: '32px',
    itemColorActive: '#1ea54c20',
    itemColorActiveHover: '#1ea54c30',
    itemTextColorActive: '#1ea54cFF',
    itemTextColorActiveHover: '#1ea54cFF',
    itemIconColorActive: '#1ea54cFF',
    itemIconColorActiveHover: '#1ea54cFF',
  },

  Layout: { color: '#f1f5f9' },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px' },
    },
  },
};

export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1ea54cFF',
    primaryColorHover: '#36AD6AFF',
    primaryColorPressed: '#0C7A43FF',
    primaryColorSuppl: '#1ea54c20',
  },

  Notification: {
    color: '#333333',
  },

  AutoComplete: {
    peers: {
      InternalSelectMenu: { height: '500px', color: '#1e1e1e' },
    },
  },

  Menu: {
    itemHeight: '32px',
    itemColorActive: '#1ea54c20',
    itemColorActiveHover: '#1ea54c30',
    itemTextColorActive: '#1ea54cFF',
    itemTextColorActiveHover: '#1ea54cFF',
    itemIconColorActive: '#1ea54cFF',
    itemIconColorActiveHover: '#1ea54cFF',
  },

  Layout: {
    color: '#1c1c1c',
    siderColor: '#232323',
    siderBorderColor: 'transparent',
  },

  Card: {
    color: '#232323',
    borderColor: '#282828',
  },

  Table: {
    tdColor: '#232323',
    thColor: '#353535',
  },
};
