import React from 'react';
import { useHistory } from 'react-router-dom';
import { AppBar, Tab, Tabs, Toolbar } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import startsWith from '../../common/utils/startsWith';
import { navigationTheme } from '../Style/navigationTheme';


export default function TopNavigationDesktop () {
  const [value, setValue] = React.useState(0);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const inPrivateLabelMode = false; // Using this setting temporarily
  const showStartACampaign = !(inPrivateLabelMode);
  const showYourCampaigns = !(inPrivateLabelMode);
  const showMembership = !(inPrivateLabelMode);
  const showSearch = false; // inPrivateLabelMode;
  const { location: { pathname } } = window;
  // Change the tab value
  if (inPrivateLabelMode) {
    // If using a private-labeled version, show fewer options
    if (startsWith('/profile', pathname) && value !== 0) {
      // console.log('Render TopNavigationDesktop private labeled, initial value set to 0');
      setValue(0);
    } else if (startsWith('/search', pathname) && value !== 1) {
      // console.log('Render TopNavigationDesktop private labeled, initial value set to 1');
      setValue(1);
    }
  } else if (startsWith('/start-a-campaign', pathname) && value !== 0) {
    // console.log('Render TopNavigationDesktop, initial value set to 0');
    setValue(0);
  } else if (startsWith('/profile', pathname) && value !== 1) {
    // console.log('Render TopNavigationDesktop, initial value set to 1');
    setValue(1);
  } else if (startsWith('/membership', pathname) && value !== 2) {
    // console.log('Render TopNavigationDesktop, initial value set to 2');
    setValue(2);
  } else if (startsWith('/search', pathname) && value !== 3) {
    // console.log('Render TopNavigationDesktop, initial value set to 2');
    setValue(3);
  }

  // Show the indicator underline
  const showIndicatorUnderline = false;
  // if (startsWith('/start-a-campaign', pathname)) {
  //   showIndicatorUnderline = true;
  // } else if (startsWith('/profile', pathname)) {
  //   showIndicatorUnderline = true;
  // } else if (startsWith('/membership', pathname)) {
  //   showIndicatorUnderline = true;
  // }

  // console.log('Render TopNavigationDesktop.jsx');
  return (
    <div>
      <ThemeProvider theme={navigationTheme(true, 30)}>
        <AppBar
          position="relative"
          color="default"
        >
          <Toolbar disableGutters>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="Tab menu"
              TabIndicatorProps={showIndicatorUnderline ? (
                {}
              ) : (
                {
                  style: {
                    display: 'none',
                  },
                }
              )}
            >
              {showStartACampaign && <Tab id="topNav-0" label="Start a campaign" style={{ minWidth: 125 }} onClick={() => history.push('/start-a-campaign')} />}
              {showYourCampaigns && <Tab id="topNav-1" label="Your campaigns" style={{ minWidth: 125 }} onClick={() => history.push('/profile/started')} />}
              {showMembership && <Tab id="topNav-2" label="Membership" style={{ minWidth: 100 }} onClick={() => history.push('/membership')} />}
              {showSearch && <Tab id="topNav-3" label="Search" style={{ minWidth: 60 }} onClick={() => history.push('/search')} />}
            </Tabs>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
}
