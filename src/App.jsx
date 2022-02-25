import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import DelayedLoad from './js/common/components/Widgets/DelayedLoad';
import MainHeaderBar from './js/components/Navigation/MainHeaderBar';
import muiTheme from './js/common/components/Style/mui-theme';
import ErrorBoundary from './js/common/components/Widgets/ErrorBoundary';
import { renderLog } from './js/common/utils/logging';
import styledTheme from './js/common/components/Style/styled-theme';
import WeVoteRouter from './js/common/components/Widgets/WeVoteRouter';

// Lazy loaded component(s) on this page
const FooterMain  = React.lazy(() => import('./js/components/Navigation/FooterMain'));

// Root URL pages
const Attributions = React.lazy(() => import('./js/pages/Attributions'));
const Credits = React.lazy(() => import('./js/pages/Credits'));
const FAQ = React.lazy(() => import('./js/pages/FAQ'));
const PageNotFound = React.lazy(() => import('./js/pages/PageNotFound'));
const Privacy = React.lazy(() => import('./js/pages/Privacy'));
const TermsOfService = React.lazy(() => import('./js/pages/TermsOfService'));


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      doShowHeader: true,
      doShowFooter: true,
    };
    this.setShowHeader = this.setShowHeader.bind(this);
    this.setShowFooter = this.setShowFooter.bind(this);
    this.setShowHeaderFooter = this.setShowHeaderFooter.bind(this);
  }

  // See https://reactjs.org/docs/error-boundaries.html
  static getDerivedStateFromError (error) { // eslint-disable-line no-unused-vars
    // Update state so the next render will show the fallback UI, We should have a "Oh snap" page
    console.log('App caught error ', error);
    return { hasError: true };
  }

  componentDidCatch (error, info) {
    // We should get this information to Splunk!
    console.error('App caught error: ', `${error} with info: `, info);
  }

  setShowHeader (doShowHeader) {
    this.setState({ doShowHeader });
  }

  setShowFooter (doShowFooter) {
    this.setState({ doShowFooter });
  }

  setShowHeaderFooter (doShow) {
    // console.log('setShowHeaderFooter -------------- doShow:', doShow);
    this.setState({
      doShowHeader: doShow,
      doShowFooter: doShow,
    });
  }

  render () {
    renderLog('App');
    const { doShowHeader, doShowFooter } = this.state;
    // console.log(`App doShowHeader: ${doShowHeader}, doShowFooter:${doShowFooter}`);
    return (
      <ErrorBoundary>
        <Suspense fallback={<span>&nbsp;</span>}>
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={styledTheme}>
              <WeVoteRouter>
                <MainHeaderBar displayHeader={doShowHeader} />
                <Switch>
                  <Route exact path="/attributions"><Attributions /></Route>
                  <Route exact path="/credits"><Credits /></Route>
                  <Route exact path="/faq"><FAQ /></Route>
                  <Route exact path="/privacy"><Privacy /></Route>
                  <Route exact path="/terms"><TermsOfService /></Route>
                  <Route path="*" component={PageNotFound} />
                </Switch>
                <DelayedLoad waitBeforeShow={4000}>
                  <Suspense fallback={<span>&nbsp;</span>}>
                    <FooterMain displayFooter={doShowFooter} />
                  </Suspense>
                </DelayedLoad>
              </WeVoteRouter>
            </ThemeProvider>
          </MuiThemeProvider>
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default App;
