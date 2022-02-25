import { Subject } from 'rxjs';
import { stringContains } from '../utils/textFormat';
import { isCordova } from '../common/utils/isCordovaOrWebApp';

const subject = new Subject();

export const messageService = {
  sendMessage: (message) => subject.next({ text: message }),
  clearMessages: () => subject.next(),
  getMessage: () => subject.asObservable(),
};

const nonFluxState = {
  chosenGoogleAnalyticsTrackingID: false,
  chosenPreventSharingOpinions: false,
  chosenReadyIntroductionText: '',
  chosenReadyIntroductionTitle: '',
  chosenSiteLogoUrl: '',
  chosenWebsiteName: '',
  currentPathname: '',
  getVoterGuideSettingsDashboardEditMode: '',
  googleAnalyticsEnabled: false,
  googleAnalyticsPending: false,
  hideWeVoteLogo: false,
  hostname: '',
  observableUpdateCounter: 0,
  scrolledDown: false,
  shareModalStep: '',
  sharedItemCode: '',
  showAdviserIntroModal: false,
  showEditAddressButton: false,
  showHeader: 0,
  showHowItWorksModal: false,
  showPaidAccountUpgradeModal: false,
  showPersonalizedScoreIntroModal: false,
  showShareModal: false,
  showSharedItemModal: false,
  showSignInModal: false,
  signInStateChanged: false,
  siteConfigurationHasBeenRetrieved: true, // set to false if we use siteConfiguration
  siteOwnerOrganizationWeVoteId: '',
  storeSignInStartFullUrl: false,
  voterExternalIdHasBeenSavedOnce: {}, // Dict with externalVoterId and membershipOrganizationWeVoteId as keys, and true/false as value
  voterFirstRetrieveInitiated: false,
};


export default {
  // getNonFluxState () {
  //   return nonFluxState;
  // },

  incrementObservableUpdateCounter () {
    nonFluxState.observableUpdateCounter += 1;
    messageService.sendMessage('state incremented ObservableUpdateCounter');
  },

  setCurrentPathname (currentPathname) {
    nonFluxState.currentPathname = currentPathname;
    messageService.sendMessage('state updated currentPathname');
  },

  setEvaluateHeaderDisplay () {
    // Force the Header to evaluate whether it should display
    nonFluxState.showHeader = Date.now();
    messageService.sendMessage('state updated showHeader');
  },

  setGoogleAnalyticsEnabled (enabled) {
    nonFluxState.googleAnalyticsEnabled = enabled;
    messageService.sendMessage('state updated googleAnalyticsEnabled');
  },

  setGoogleAnalyticsPending (enabled) {
    nonFluxState.googleAnalyticsPending = enabled;
    messageService.sendMessage('state updated googleAnalyticsPending');
  },

  setScrolled (scrolledDown) {
    nonFluxState.scrolledDown = scrolledDown;
    messageService.sendMessage('state updated scrolledDown');
  },

  setShareModalStep (step) {
    // console.log('setShareModalStep, step:', step);
    nonFluxState.shareModalStep = step;
    messageService.sendMessage('state updated shareModalStep');
  },

  setShowAdviserIntroModal (show) {
    nonFluxState.showAdviserIntroModal = show;
    messageService.sendMessage('state updated showAdviserIntroModal');
  },

  setShowCompleteYourProfileModal (show) {
    nonFluxState.showCompleteYourProfileModal = show;
    messageService.sendMessage('state updated showCompleteYourProfileModal');
  },

  setShowEditAddressButton (show) {
    nonFluxState.showEditAddressButton = show;
    messageService.sendMessage('state updated showEditAddressButton');
  },

  setShowHowItWorksModal (show) {
    // The chosenPaidAccount values are: free, professional, enterprise
    nonFluxState.showHowItWorksModal = show;
    messageService.sendMessage('state updated showHowItWorksModal');
  },

  setShowImageUploadModal (show) {
    // console.log('Setting image upload modal to open!');
    nonFluxState.showImageUploadModal = show;
    messageService.sendMessage('state updated showImageUploadModal');
  },

  setShowPaidAccountUpgradeModal (chosenPaidAccount) {
    // The chosenPaidAccount values are: free, professional, enterprise
    nonFluxState.showPaidAccountUpgradeModal = chosenPaidAccount;
    messageService.sendMessage('state updated showPaidAccountUpgradeModal');
  },

  setShowPersonalizedScoreIntroModal (show) {
    nonFluxState.showPersonalizedScoreIntroModal = show;
    messageService.sendMessage('state updated showPersonalizedScoreIntroModal');
  },

  setShowShareModal (show) {
    // The chosenPaidAccount values are: free, professional, enterprise
    nonFluxState.showShareModal = show;
    messageService.sendMessage('state updated showShareModal');
  },

  setShowSharedItemModal (sharedItemCode) {
    nonFluxState.sharedItemCode = sharedItemCode;
    nonFluxState.showSharedItemModal = Boolean(sharedItemCode);
    messageService.sendMessage('state updated showSharedItemModal');
  },

  setShowSignInModal (show) {
    nonFluxState.showSignInModal = show;
    messageService.sendMessage('state updated showSignInModal');
  },

  setSignInStateChanged (signin) {
    nonFluxState.signInStateChanged = signin;
    messageService.sendMessage('state updated signInStateChanged');
  },

  setVoterFirstRetrieveInitiated (voterFirstRetrieveInitiated) {
    nonFluxState.voterFirstRetrieveInitiated = voterFirstRetrieveInitiated;
    messageService.sendMessage('state updated voterFirstRetrieveInitiated');
  },

  setVoterGuideSettingsDashboardEditMode (getVoterGuideSettingsDashboardEditMode) {
    nonFluxState.getVoterGuideSettingsDashboardEditMode = getVoterGuideSettingsDashboardEditMode;
    messageService.sendMessage('state updated getVoterGuideSettingsDashboardEditMode');
  },

  setVoterBallotItemsRetrieveHasBeenCalled (voterBallotItemsRetrieveHasBeenCalled) {
    nonFluxState.voterBallotItemsRetrieveHasBeenCalled = voterBallotItemsRetrieveHasBeenCalled;
    messageService.sendMessage('state updated voterBallotItemsRetrieveHasBeenCalled');
  },

  setStoreSignInStartFullUrl () {
    nonFluxState.storeSignInStartFullUrl = true;
    messageService.sendMessage('state updated storeSignInStartFullUrl');
  },

  unsetStoreSignInStartFullUrl () {
    nonFluxState.unsetStoreSignInStartFullUrl = false;
    messageService.sendMessage('state updated unsetStoreSignInStartFullUrl');
  },

  getChosenAboutOrganizationExternalUrl () {
    return nonFluxState.chosenAboutOrganizationExternalUrl;
  },

  getChosenGoogleAnalyticsTrackingID () {
    return nonFluxState.chosenGoogleAnalyticsTrackingID;
  },

  getChosenPreventSharingOpinions () {
    return nonFluxState.chosenPreventSharingOpinions;
  },

  getChosenReadyIntroductionText () {
    return nonFluxState.chosenReadyIntroductionText;
  },

  getChosenReadyIntroductionTitle () {
    return nonFluxState.chosenReadyIntroductionTitle;
  },

  getChosenSiteLogoUrl () {
    return nonFluxState.chosenSiteLogoUrl;
  },

  getChosenWebsiteName () {
    return nonFluxState.chosenWebsiteName || 'WeVote.US Campaigns';
  },

  getCurrentPathname () {
    return nonFluxState.currentPathname;
  },

  getGoogleAnalyticsEnabled () {
    return nonFluxState.googleAnalyticsEnabled;
  },

  getGoogleAnalyticsPending () {
    return nonFluxState.googleAnalyticsPending;
  },

  getHideWeVoteLogo () {
    return nonFluxState.hideWeVoteLogo;
  },

  getHostname () {
    return nonFluxState.hostname || '';
  },

  getScrolledDown () {
    return nonFluxState.scrolledDown;
  },

  getSharedItemCode () {
    return nonFluxState.sharedItemCode;
  },

  getShareModalStep () {
    // console.log('AppObservableStore shareModalStep:', nonFluxState.shareModalStep);
    return nonFluxState.shareModalStep;
  },

  getSignInStateChanged () {
    return nonFluxState.signInStateChanged;
  },

  getSiteOwnerOrganizationWeVoteId () {
    return nonFluxState.siteOwnerOrganizationWeVoteId;
  },

  getVoterGuideSettingsDashboardEditMode () {
    return nonFluxState.getVoterGuideSettingsDashboardEditMode;
  },

  isOnWeVoteRootUrl () {
    let onWeVoteRootUrl = nonFluxState.onWeVoteRootUrl || false;
    if (onWeVoteRootUrl === undefined) {
      // onChosenFullDomainUrl, onFacebookSupportedDomainUrl, onWeVoteSubdomainUrl,
      const { hostname } = window.location;
      ({ onWeVoteRootUrl } = this.calculateUrlSettings(hostname));
    }
    return onWeVoteRootUrl || isCordova() || stringContains('localhost:', window.location.href);
  },

  isOnWeVoteSubdomainUrl () {
    let onWeVoteSubdomainUrl = nonFluxState.onWeVoteSubdomainUrl || false;
    if (onWeVoteSubdomainUrl === undefined) {
      // onChosenFullDomainUrl, onFacebookSupportedDomainUrl, onWeVoteSubdomainUrl,
      const { hostname } = window.location;
      ({ onWeVoteSubdomainUrl } = this.calculateUrlSettings(hostname));
    }
    return onWeVoteSubdomainUrl;
  },

  isOnPartnerUrl () {
    return nonFluxState.onWeVoteSubdomainUrl || nonFluxState.onChosenFullDomainUrl;
  },

  isVoterAdminForThisUrl (linkedOrganizationWeVoteId) {
    // const linkedOrganizationWeVoteId = VoterStore.getLinkedOrganizationWeVoteId();
    return nonFluxState.siteOwnerOrganizationWeVoteId === linkedOrganizationWeVoteId;
  },

  isOnFacebookSupportedDomainUrl () {
    return nonFluxState.onFacebookSupportedDomainUrl;
  },

  isOnChosenFullDomainUrl () {
    return nonFluxState.onChosenFullDomainUrl;
  },

  showAdviserIntroModal () {
    return nonFluxState.showAdviserIntroModal;
  },

  showCompleteYourProfileModal () {
    return nonFluxState.showCompleteYourProfileModal;
  },

  showEditAddressButton () {
    return nonFluxState.showEditAddressButton;
  },

  showHowItWorksModal () {
    return nonFluxState.showHowItWorksModal;
  },

  showPaidAccountUpgradeModal () {
    // The chosenPaidAccount values are: free, professional, enterprise
    return nonFluxState.showPaidAccountUpgradeModal;
  },

  showPersonalizedScoreIntroModal () {
    return nonFluxState.showPersonalizedScoreIntroModal;
  },

  showShareModal () {
    return nonFluxState.showShareModal;
  },

  showSharedItemModal () {
    return nonFluxState.showSharedItemModal;
  },

  showSignInModal () {
    return nonFluxState.showSignInModal;
  },

  showImageUploadModal () {
    return nonFluxState.showImageUploadModal;
  },

  siteConfigurationHasBeenRetrieved () {
    let { hostname } = window.location;
    hostname = hostname || '';
    if (hostname === 'campaigns.wevote.us') {
      // Bypass for default site
      return true;
    } else {
      return nonFluxState.siteConfigurationHasBeenRetrieved;
    }
  },

  storeSignInStartFullUrl () {
    return nonFluxState.storeSignInStartFullUrl;
  },

  voterBallotItemsRetrieveHasBeenCalled () {
    return nonFluxState.voterBallotItemsRetrieveHasBeenCalled;
  },

  voterFirstRetrieveInitiated () {
    return nonFluxState.voterFirstRetrieveInitiated;
  },
};
