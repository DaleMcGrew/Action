import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component, Suspense } from 'react';
import { Link } from 'react-router-dom';
// import styled from 'styled-components';
import AnalyticsActions from '../../actions/AnalyticsActions';
import OrganizationActions from '../../actions/OrganizationActions';
import LoadingWheelComp from '../../common/components/Widgets/LoadingWheelComp';
import OrganizationVoterGuideCard from '../../components/VoterGuide/OrganizationVoterGuideCard';
import AppObservableStore from '../../stores/AppObservableStore';
import OrganizationStore from '../../stores/OrganizationStore';
import VoterStore from '../../stores/VoterStore';
import historyPush from '../../common/utils/historyPush';
import { renderLog } from '../../common/utils/logging';
import { PageContentContainer } from '../../components/Style/pageLayoutStyles';

const DelayedLoad = React.lazy(() => import(/* webpackChunkName: 'DelayedLoad' */ '../../common/components/Widgets/DelayedLoad'));

const AUTO_FOLLOW = 'af';

export default class OrganizationVoterGuide extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // activeRoute: '',
      autoFollowRedirectHappening: false,
      // linkedOrganizationWeVoteId: '',
      // organizationBannerUrl: '',
      organization: {},
      organizationHasBeenRetrievedOnce: {},
      voter: {},
      voterGuideAnalyticsHasBeenSavedOnce: {},
    };
    this.organizationVoterGuideTabsReference = {};
  }

  componentDidMount () {
    window.scrollTo(0, 0);
    const {
      match: { params: {
        modal_to_show: modalToShow,
        shared_item_code: sharedItemCode,
        action_variable: actionVariable,
      } },
      organizationWeVoteId,
    } = this.props;
    // We can enter OrganizationVoterGuide with either organizationWeVoteId or voter_guide_we_vote_id
    // console.log('OrganizationVoterGuide, componentDidMount, params: ', params);
    this.organizationStoreListener = OrganizationStore.addListener(this.onOrganizationStoreChange.bind(this));
    this.voterStoreListener = VoterStore.addListener(this.onVoterStoreChange.bind(this));
    const { organizationHasBeenRetrievedOnce, voterGuideAnalyticsHasBeenSavedOnce } = this.state;
    if (organizationWeVoteId) {
      OrganizationActions.organizationRetrieve(organizationWeVoteId);
      organizationHasBeenRetrievedOnce[organizationWeVoteId] = true;
      AnalyticsActions.saveActionVoterGuideVisit(organizationWeVoteId, VoterStore.electionId());
      voterGuideAnalyticsHasBeenSavedOnce[organizationWeVoteId] = true;
      this.setState({
        organizationHasBeenRetrievedOnce,
        voterGuideAnalyticsHasBeenSavedOnce,
      });
    }

    const modalToOpen = modalToShow || '';
    // console.log('componentDidMount modalToOpen:', modalToOpen);
    if (modalToOpen === 'share') {
      this.modalOpenTimer = setTimeout(() => {
        AppObservableStore.setShowShareModal(true);
      }, 1000);
    } else if (modalToOpen === 'sic') { // sic = Shared Item Code
      // console.log('componentDidMount sharedItemCode:', sharedItemCode);
      if (sharedItemCode) {
        this.modalOpenTimer = setTimeout(() => {
          AppObservableStore.setShowSharedItemModal(sharedItemCode);
        }, 1000);
      }
    }

    // positionListForOpinionMaker is called in js/components/VoterGuide/VoterGuidePositions
    // console.log('action_variable:' + params.action_variable);
    if (actionVariable === AUTO_FOLLOW && organizationWeVoteId) {
      // If we are here,
      // console.log('Auto following');
      AnalyticsActions.saveActionVoterGuideAutoFollow(organizationWeVoteId, VoterStore.electionId());
      OrganizationActions.organizationFollow(organizationWeVoteId);

      // Now redirect to the same page without the '/af' in the route
      const { location: { pathname: currentPathName } } = window;

      // AUTO_FOLLOW is 'af'
      const currentPathNameWithoutAutoFollow = currentPathName.replace(`/${AUTO_FOLLOW}`, '');

      // console.log('OrganizationVoterGuide, currentPathNameWithoutAutoFollow: ', currentPathNameWithoutAutoFollow);
      historyPush(currentPathNameWithoutAutoFollow);
      this.setState({
        autoFollowRedirectHappening: true,
      });
    }
    // console.log('VoterStore.getAddressObject(): ', VoterStore.getAddressObject());
    const voter = VoterStore.getVoter();
    this.setState({
      // activeRoute: this.props.activeRoute || '',
      // linkedOrganizationWeVoteId: voter.linked_organization_we_vote_id,
      voter,
    });
  }

  // // eslint-disable-next-line camelcase,react/sort-comp
  // UNSAFE_componentWillReceiveProps (nextProps) {
  //   const { match: { params: nextParams } } = nextProps;
  //   // console.log('OrganizationVoterGuide, componentWillReceiveProps, nextParams.organization_we_vote_id: ', nextParams.organization_we_vote_id);
  //   // When a new organization is passed in, update this component to show the new data
  //   // if (nextParams.action_variable === AUTO_FOLLOW) {
  //   // Wait until we get the path without the '/af' action variable
  //   // console.log('OrganizationVoterGuide, componentWillReceiveProps - waiting');
  //   // } else
  //
  //   // console.log('OrganizationVoterGuide, componentWillReceiveProps, nextParams: ', nextProps.params);
  //   const { organization_we_vote_id: organizationWeVoteId } = nextParams;
  //   if (organizationWeVoteId) {
  //     this.setState({
  //       organizationWeVoteId,
  //       autoFollowRedirectHappening: false,
  //     });
  //
  //     // We refresh the data for all three tabs here on the top level
  //     const { organizationHasBeenRetrievedOnce, voterGuideAnalyticsHasBeenSavedOnce } = this.state;
  //     if (!this.localOrganizationHasBeenRetrievedOnce(organizationWeVoteId)) {
  //       // console.log('OrganizationVoterGuide organizationHasBeenRetrievedOnce NOT true');
  //       OrganizationActions.organizationRetrieve(organizationWeVoteId);
  //       organizationHasBeenRetrievedOnce[organizationWeVoteId] = true;
  //       this.setState({
  //         organizationHasBeenRetrievedOnce,
  //       });
  //     }
  //
  //     // console.log('VoterStore.getAddressObject(): ', VoterStore.getAddressObject());
  //     // AnalyticsActions.saveActionVoterGuideVisit(organizationWeVoteId, VoterStore.electionId());
  //     if (!this.localVoterGuideAnalyticsHasBeenSavedOnce(organizationWeVoteId)) {
  //       voterGuideAnalyticsHasBeenSavedOnce[organizationWeVoteId] = true;
  //       this.setState({
  //         voterGuideAnalyticsHasBeenSavedOnce,
  //       });
  //     }
  //   }
  //
  //   // positionListForOpinionMaker is called in js/components/VoterGuide/VoterGuidePositions
  //   // DALE 2020-05-13 We only use activeRoute from the props on the first entry
  //   // if (nextProps.activeRoute) {
  //   //   console.log('OrganizationVoterGuide, componentWillReceiveProps, nextProps.activeRoute: ', nextProps.activeRoute);
  //   //   this.setState({
  //   //     activeRoute: nextProps.activeRoute || '',
  //   //   });
  //   // }
  // }

  componentWillUnmount () {
    this.organizationStoreListener.remove();
    this.voterStoreListener.remove();
    if (this.modalOpenTimer) clearTimeout(this.modalOpenTimer);
  }

  onEdit = () => {
    const { organizationWeVoteId } = this.props;
    historyPush(`/voterguideedit/${organizationWeVoteId}`);
    return <div>{LoadingWheelComp}</div>;
  }

  onOrganizationStoreChange () {
    const { organizationWeVoteId } = this.props;
    if (organizationWeVoteId) {
      const organization = OrganizationStore.getOrganizationByWeVoteId(organizationWeVoteId);
      if (organization.organization_id) {
        this.setState({
          organization,
          organizationId: organization.organization_id,
          // organizationLinkedVoterWeVoteId: organization.linked_voter_we_vote_id,
          // organizationType: organization.organization_type,
        });
        // if (organization.organization_banner_url) {
        //   this.setState({
        //     organizationBannerUrl: organization.organization_banner_url,
        //   });
        // }
      }
    }
  }

  onVoterStoreChange () {
    const voter = VoterStore.getVoter();
    this.setState({
      // linkedOrganizationWeVoteId: voter.linked_organization_we_vote_id,
      voter,
    });
  }

  ballotItemLinkHasBeenClicked = (selectedBallotItemId) => {
    if (this.organizationVoterGuideTabsReference &&
        this.organizationVoterGuideTabsReference.voterGuideBallotReference &&
        this.organizationVoterGuideTabsReference.voterGuideBallotReference.ballotItemsCompressedReference &&
        this.organizationVoterGuideTabsReference.voterGuideBallotReference.ballotItemsCompressedReference[selectedBallotItemId] &&
        this.organizationVoterGuideTabsReference.voterGuideBallotReference.ballotItemsCompressedReference[selectedBallotItemId].ballotItem) {
      this.organizationVoterGuideTabsReference.voterGuideBallotReference.ballotItemsCompressedReference[selectedBallotItemId].ballotItem.toggleExpandDetails(true);
    }
  }

  localOrganizationHasBeenRetrievedOnce (organizationWeVoteId) {
    if (organizationWeVoteId) {
      const { organizationHasBeenRetrievedOnce } = this.state;
      return organizationHasBeenRetrievedOnce[organizationWeVoteId];
    }
    return false;
  }

  localVoterGuideAnalyticsHasBeenSavedOnce (organizationWeVoteId) {
    if (organizationWeVoteId) {
      const { voterGuideAnalyticsHasBeenSavedOnce } = this.state;
      return voterGuideAnalyticsHasBeenSavedOnce[organizationWeVoteId];
    }
    return false;
  }

  render () {
    renderLog('OrganizationVoterGuide');  // Set LOG_RENDER_EVENTS to log all renders
    // const { organizationWeVoteId } = this.props;
    const { organizationId } = this.state;
    if (!this.state.organization || !this.state.voter || this.state.autoFollowRedirectHappening) {
      return <div>{LoadingWheelComp}</div>;
    }
    // const { match: { params } } = this.props;
    // const { location } = window;

    const isVoterOwner = this.state.organization.organization_we_vote_id !== undefined &&
      this.state.organization.organization_we_vote_id === this.state.voter.linked_organization_we_vote_id;

    // let voterGuideFollowersList = this.state.voterGuideFollowersList || [];
    // const friendsList = []; // Dummy placeholder till the actual logic is in place
    // if (this.state.voter.linked_organization_we_vote_id === organizationWeVoteId) {
    //   // If looking at your own voter guide, filter out your own entry as a follower
    //   voterGuideFollowersList = voterGuideFollowersList.filter((oneVoterGuide) => (oneVoterGuide.organization_we_vote_id !== this.state.voter.linked_organization_we_vote_id ? oneVoterGuide : null));
    // }
    // const developmentFeatureTurnedOn = false;

    if (!organizationId) {
      return (
        <Suspense fallback={<></>}>
          <DelayedLoad showLoadingText waitBeforeShow={2000}>
            <div style={{ margin: 'auto', width: '50%' }}>
              <Link
                id="OrganizationVoterGuideGoToBallot"
                to="/ballot"
              >
                <Button
                  color="primary"
                  variant="outlined"
                >
                  Go to Ballot
                </Button>
              </Link>
            </div>
          </DelayedLoad>
        </Suspense>
      );
    }

    return (
      <PageContentContainer>
        <div className="card">
          <div className="card-main">
            <OrganizationVoterGuideCard organization={this.state.organization} isVoterOwner={isVoterOwner} />
          </div>
        </div>
      </PageContentContainer>
    );
  }
}
OrganizationVoterGuide.propTypes = {
  // activeRoute: PropTypes.string,
  match: PropTypes.object.isRequired,
  organizationWeVoteId: PropTypes.string,
};

// const TwitterDescription = styled.div`
// `;
