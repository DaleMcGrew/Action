import Dispatcher from '../common/dispatcher/Dispatcher';

let { hostname } = window.location;
hostname = hostname || '';

export default {
  clearEmailAddressStatus () {
    Dispatcher.dispatch({ type: 'clearEmailAddressStatus', payload: true });
  },

  clearSecretCodeVerificationStatus () {
    Dispatcher.dispatch({ type: 'clearSecretCodeVerificationStatus', payload: true });
  },

  clearSMSPhoneNumberStatus () {
    Dispatcher.dispatch({ type: 'clearSMSPhoneNumberStatus', payload: true });
  },

  deviceStoreFirebaseCloudMessagingToken (firebaseFCMToken) {
    Dispatcher.loadEndpoint('deviceStoreFirebaseCloudMessagingToken', {
      firebase_fcm_token: firebaseFCMToken,
    });
  },

  organizationSuggestionTasks (kindOfSuggestionTask, kindOfFollowTask) {
    Dispatcher.loadEndpoint('organizationSuggestionTasks',
      {
        kind_of_suggestion_task: kindOfSuggestionTask,
        kind_of_follow_task: kindOfFollowTask,
      });
  },

  positionListForVoter (showOnlyThisElection, showAllOtherElections) {
    Dispatcher.loadEndpoint('positionListForVoter',
      {
        show_only_this_election: showOnlyThisElection,
        show_all_other_elections: showAllOtherElections,
      });
  },

  removeVoterEmailAddress (emailWeVoteId) {
    Dispatcher.loadEndpoint('voterEmailAddressSave', {
      email_we_vote_id: emailWeVoteId,
      delete_email: true,
    });
  },

  removeVoterSMSPhoneNumber (smsWeVoteId) {
    Dispatcher.loadEndpoint('voterSMSPhoneNumberSave', {
      sms_we_vote_id: smsWeVoteId,
      delete_sms: true,
      hostname,
    });
  },

  // Send the sign in link to their email address
  // We keep this in place for historical purposes, since people who haven't
  // updated their apps are still using this function
  sendSignInLinkEmail (voterEmailAddress) {
    Dispatcher.loadEndpoint('voterEmailAddressSave', {
      text_for_email_address: voterEmailAddress,
      send_link_to_sign_in: true,
      make_primary_email: true,
      hostname,
    });
  },

  // This is for sending a 6 digit code that the voter enters in the same
  // interface where the code is requested
  sendSignInCodeEmail (voterEmailAddress) {
    Dispatcher.loadEndpoint('voterEmailAddressSave', {
      text_for_email_address: voterEmailAddress,
      send_sign_in_code_email: true,
      make_primary_email: true,
      hostname,
    });
  },

  // This is for sending a 6 digit code that the voter enters in the same
  // interface where the code is requested
  sendSignInCodeSMS (voterSMSPhoneNumber) {
    Dispatcher.loadEndpoint('voterSMSPhoneNumberSave', {
      sms_phone_number: voterSMSPhoneNumber,
      send_sign_in_code_sms: true,
      make_primary_sms_phone_number: true,
      hostname,
    });
  },

  sendVerificationEmail (voterEmailWeVoteId) {
    Dispatcher.loadEndpoint('voterEmailAddressSave', {
      email_we_vote_id: voterEmailWeVoteId,
      resend_verification_email: true,
      hostname,
    });
  },

  setAsPrimaryEmailAddress (emailWeVoteId) {
    Dispatcher.loadEndpoint('voterEmailAddressSave', {
      email_we_vote_id: emailWeVoteId,
      make_primary_email: true,
    });
  },

  setAsPrimarySMSPhoneNumber (smsWeVoteId) {
    Dispatcher.loadEndpoint('voterSMSPhoneNumberSave', {
      sms_we_vote_id: smsWeVoteId,
      make_primary_sms_phone_number: true,
      hostname,
    });
  },

  setExternalVoterId (externalVoterId) {
    Dispatcher.dispatch({ type: 'setExternalVoterId', payload: externalVoterId });
  },

  twitterRetrieveIdsIfollow () {
    Dispatcher.loadEndpoint('twitterRetrieveIdsIFollow', {});
  },

  voterAddressRetrieve (id) {
    // console.log("VoterActions, voterAddressRetrieve");
    Dispatcher.loadEndpoint('voterAddressRetrieve', { voter_device_id: id });
  },

  voterAddressSave (text, simple_save = false, google_civic_election_id = 0) {
    Dispatcher.loadEndpoint('voterAddressSave', { text_for_map_search: text, simple_save, google_civic_election_id });
  },

  voterAnalysisForJumpProcess (incomingVoterDeviceId) {
    Dispatcher.loadEndpoint('voterAnalysisForJumpProcess', {
      incoming_voter_device_id: incomingVoterDeviceId,
    });
  },

  voterCompleteYourProfileSave (firstName = '', firstNameChanged = false, lastName = '', lastNameChanged = false, voterPhotoQueuedToSave = '', voterPhotoQueuedToSaveSet = false) {
    Dispatcher.loadEndpoint('voterUpdate',
      {
        first_name: firstName,
        first_name_changed: firstNameChanged,
        last_name: lastName,
        last_name_changed: lastNameChanged,
        voter_photo_from_file_reader: voterPhotoQueuedToSave,
        voter_photo_changed: voterPhotoQueuedToSaveSet,
      });
  },

  voterAppleSignInSave (email, givenName, middleName, familyName, user, identityToken) {
    // eslint-disable-next-line camelcase
    const { device: { platform: apple_platform, version: apple_os_version, model: apple_model } } = window;
    Dispatcher.loadEndpoint('appleSignInSave', {
      email,
      first_name: givenName,
      middle_name: middleName,
      last_name: familyName,
      user_code: user,
      apple_platform,
      apple_os_version,
      apple_model,
      identity_token: identityToken,
    });
  },

  voterContactListDelete (deleteFromGooglePeopleApi = false) {
    Dispatcher.loadEndpoint('voterContactListSave', {
      delete_from_google_people_api: deleteFromGooglePeopleApi,
    });
  },

  voterContactListRetrieve () {
    Dispatcher.loadEndpoint('voterContactListRetrieve', {});
  },

  voterContactListSave (contacts, fromGooglePeopleApi = false) {
    const contactsString = JSON.stringify(contacts);
    Dispatcher.loadEndpoint('voterContactListSave', {
      contacts: contactsString,
      from_google_people_api: fromGooglePeopleApi,
    });
  },

  voterPhotoDelete () {
    Dispatcher.loadEndpoint('voterUpdate',
      {
        voter_photo_from_file_reader: '',
        voter_photo_changed: true,
      });
  },

  voterPhotoSave (voterPhotoQueuedToSave = '', voterPhotoQueuedToSaveSet = false) {
    // console.log('VoterActions voterPhotoSave');
    Dispatcher.loadEndpoint('voterUpdate',
      {
        voter_photo_from_file_reader: voterPhotoQueuedToSave,
        voter_photo_changed: voterPhotoQueuedToSaveSet,
      });
  },

  voterPhotoTooBigReset () {
    Dispatcher.dispatch({ type: 'voterPhotoTooBigReset', payload: true });
  },

  voterEmailAddressRetrieve () {
    Dispatcher.loadEndpoint('voterEmailAddressRetrieve', {});
  },

  voterEmailAddressSave (voterEmailAddress, send_link_to_sign_in = false) {
    Dispatcher.loadEndpoint('voterEmailAddressSave', {
      text_for_email_address: voterEmailAddress,
      send_link_to_sign_in,
      make_primary_email: true,
      hostname,
    });
  },

  voterEmailAddressSignIn (emailSecretKey) {
    Dispatcher.loadEndpoint('voterEmailAddressSignIn', {
      email_secret_key: emailSecretKey,
    });
  },

  voterEmailAddressSignInConfirm (emailSecretKey) {
    Dispatcher.loadEndpoint('voterEmailAddressSignIn', {
      email_secret_key: emailSecretKey,
      yes_please_merge_accounts: true,
    });
  },

  voterEmailAddressVerify (emailSecretKey) {
    Dispatcher.loadEndpoint('voterEmailAddressVerify', {
      email_secret_key: emailSecretKey,
    });
  },

  voterEmailQueuedToSave (voterEmail) {
    Dispatcher.dispatch({ type: 'voterEmailQueuedToSave', payload: voterEmail });
  },

  voterExternalIdSave (externalVoterId, membershipOrganizationWeVoteId) {
    Dispatcher.loadEndpoint('voterUpdate',
      {
        external_voter_id: externalVoterId,
        membership_organization_we_vote_id: membershipOrganizationWeVoteId,
      });
  },

  voterFacebookSaveToCurrentAccount () {
    Dispatcher.loadEndpoint('voterFacebookSaveToCurrentAccount', {
    });
  },

  voterFirstNameQueuedToSave (firstName) {
    Dispatcher.dispatch({ type: 'voterFirstNameQueuedToSave', payload: firstName });
  },

  // Tell the server to only save this name if a name does not currently exist
  voterFullNameSoftSave (firstName, lastName, full_name = '') {
    Dispatcher.loadEndpoint('voterUpdate',
      {
        first_name: firstName,
        last_name: lastName,
        full_name,
        name_save_only_if_no_existing_names: true,
      });
  },

  voterLastNameQueuedToSave (lastName) {
    Dispatcher.dispatch({ type: 'voterLastNameQueuedToSave', payload: lastName });
  },

  voterMergeTwoAccountsByEmailKey (emailSecretKey) {
    Dispatcher.loadEndpoint('voterMergeTwoAccounts',
      {
        email_secret_key: emailSecretKey,
        facebook_secret_key: '',
        incoming_voter_device_id: '',
        invitation_secret_key: '',
        twitter_secret_key: '',
        hostname,
      });
  },

  voterMergeTwoAccountsByFacebookKey (facebookSecretKey) {
    // console.log('VoterActions, voterMergeTwoAccountsByFacebookKey', facebookSecretKey);
    Dispatcher.loadEndpoint('voterMergeTwoAccounts',
      {
        email_secret_key: '',
        facebook_secret_key: facebookSecretKey,
        incoming_voter_device_id: '',
        invitation_secret_key: '',
        twitter_secret_key: '',
        hostname,
      });
  },

  voterMergeTwoAccountsByTwitterKey (twitterSecretKey) {
    Dispatcher.loadEndpoint('voterMergeTwoAccounts',
      {
        email_secret_key: '',
        facebook_secret_key: '',
        incoming_voter_device_id: '',
        invitation_secret_key: '',
        twitter_secret_key: twitterSecretKey,
        hostname,
      });
  },

  voterNameSave (firstName, lastName) {
    Dispatcher.loadEndpoint('voterUpdate',
      {
        first_name: firstName,
        last_name: lastName,
      });
  },

  voterPhotoQueuedToSave (voterPhotoFromFileReader) {
    Dispatcher.dispatch({ type: 'voterPhotoQueuedToSave', payload: voterPhotoFromFileReader });
  },


  voterRetrieve () {
    Dispatcher.loadEndpoint('voterRetrieve');
  },

  voterSignOut (signOutAllDevices = false) {
    Dispatcher.loadEndpoint('voterSignOut', {
      sign_out_all_devices: signOutAllDevices,
    });
  },

  voterSMSPhoneNumberRetrieve () {
    Dispatcher.loadEndpoint('voterSMSPhoneNumberRetrieve', {});
  },

  voterSMSPhoneNumberSave (smsPhoneNumber) {
    Dispatcher.loadEndpoint('voterSMSPhoneNumberSave', {
      sms_phone_number: smsPhoneNumber,
      make_primary_sms_phone_number: true,
      hostname,
    });
  },

  voterSplitIntoTwoAccounts () {
    Dispatcher.loadEndpoint('voterSplitIntoTwoAccounts',
      {
        split_off_twitter: true,
      });
  },

  voterTwitterSaveToCurrentAccount () {
    Dispatcher.loadEndpoint('voterTwitterSaveToCurrentAccount', {
    });
  },

  voterUpdateNotificationSettingsFlags (flagIntegerToSet, flagIntegerToUnset = '') {
    Dispatcher.loadEndpoint('voterUpdate',
      {
        notification_flag_integer_to_set: flagIntegerToSet,
        notification_flag_integer_to_unset: flagIntegerToUnset,
      });
  },

  voterUpdateRefresh () {
    // Just make sure we have the latest voter data
    Dispatcher.loadEndpoint('voterUpdate',
      {
      });
  },

  voterVerifySecretCode (secretCode, codeSentToSMSPhoneNumber) {
    // console.log('VoterActions, voterVerifySecretCode codeSentToSMSPhoneNumber:', codeSentToSMSPhoneNumber);
    Dispatcher.loadEndpoint('voterVerifySecretCode', {
      secret_code: secretCode,
      code_sent_to_sms_phone_number: codeSentToSMSPhoneNumber,
    });
  },

};
