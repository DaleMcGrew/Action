import React, { Component } from 'react';
import AppObservableStore, { messageService } from '../../stores/AppObservableStore';
import initializejQuery from '../../utils/initializejQuery';
import { renderLog } from '../../common/utils/logging';
import SignInModal from './SignInModal';
import VoterActions from '../../actions/VoterActions';


class SignInModalController extends Component {
  constructor (props) {
    super(props);
    this.state = {
      showSignInModal: false,
    };
  }

  componentDidMount () {
    this.appStateSubscription = messageService.getMessage().subscribe(() => this.onAppObservableStoreChange());
    this.voterFirstRetrieve();
    // this.start = window.performance.now();
    const showSignInModal = AppObservableStore.showSignInModal();
    this.setState({ showSignInModal });
  }

  componentWillUnmount () {
    this.appStateSubscription.unsubscribe();
  }

  onAppObservableStoreChange () {
    const showSignInModal = AppObservableStore.showSignInModal();
    // console.log('SignInModalController onAppStoreChange, showSignInModal:', showSignInModal);
    this.setState({ showSignInModal });
  }

  closeSignInModal = () => {
    AppObservableStore.setShowSignInModal(false);
    // console.log('closeSignInModal');
    this.setState({ showSignInModal: false });
  };

  voterFirstRetrieve = () => {
    initializejQuery(() => {
      const voterFirstRetrieveInitiated = AppObservableStore.voterFirstRetrieveInitiated();
      // console.log('SignInModalController voterFirstRetrieveInitiated: ', voterFirstRetrieveInitiated);
      if (!voterFirstRetrieveInitiated) {
        AppObservableStore.setVoterFirstRetrieveInitiated(true);
        VoterActions.voterRetrieve();
      }
    });
  }

  render () {
    renderLog('SignInModalController');  // Set LOG_RENDER_EVENTS to log all renders
    const { showSignInModal } = this.state;
    // console.log('SignInModalController showSignInModal at render: ', showSignInModal);

    return (
      <div>
        {showSignInModal ? <SignInModal show={showSignInModal} closeFunction={this.closeSignInModal} /> : null}
      </div>
    );
  }
}

export default SignInModalController;

