import React, { Component, Suspense } from 'react';
import loadable from '@loadable/component';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import AppObservableStore, { messageService } from '../../stores/AppObservableStore';


const TopNavigationDesktop = loadable(() => import('./TopNavigationDesktop'));


class TopNavigationDesktopController extends Component {
  constructor (props) {
    super(props);
    this.state = {
      siteConfigurationHasBeenRetrieved: false,
    };
  }

  componentDidMount () {
    // console.log('TopNavigationDesktopController componentDidMount');
    this.onAppObservableStoreChange();
    this.appStateSubscription = messageService.getMessage().subscribe((msg) => this.onAppObservableStoreChange(msg));
  }

  componentWillUnmount () {
    this.appStateSubscription.unsubscribe();
  }

  onAppObservableStoreChange () {
    // console.log('------ TopNavigationDesktopController, onAppObservableStoreChange received: ', msg);
    const siteConfigurationHasBeenRetrieved = AppObservableStore.siteConfigurationHasBeenRetrieved();
    this.setState({
      siteConfigurationHasBeenRetrieved,
    });
  }

  render () {
    const { siteConfigurationHasBeenRetrieved } = this.state;

    return (
      <HeaderBarWrapper>
        {siteConfigurationHasBeenRetrieved && (
          <Suspense fallback={<span>&nbsp;</span>}>
            <TopNavigationDesktop />
          </Suspense>
        )}
      </HeaderBarWrapper>
    );
  }
}

const styles = () => ({
  logoLinkRoot: {
    height: 0,
    fontSize: 0,
  },
});

const HeaderBarWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 42px;
`;

export default withStyles(styles)(TopNavigationDesktopController);
