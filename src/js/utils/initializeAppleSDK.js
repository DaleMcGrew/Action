const initializeAppleSDK = () => {
  if (document.documentMode) {
    //  https://gs.statcounter.com/browser-market-share/all/united-states-of-america                                           48%     35%      4%     5%      0.06%
    document.getElementById('loadingMessage').innerHTML = "We're sorry, we no longer support Internet Explorer. We recommend Chrome, Safari, Firefox, Edge or Chromium.";
    console.log('NOT LOADING appleid.auth.js for those who still are using Internet Explorer');
  } else {
    const scriptElementForAppleIdAuth = document.createElement('script');
    scriptElementForAppleIdAuth.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
    scriptElementForAppleIdAuth.type = 'text/javascript';
    const firstExistingScript = document.getElementsByTagName('script')[0];
    firstExistingScript.parentNode.insertBefore(scriptElementForAppleIdAuth, firstExistingScript);
    console.log('Loaded appleid.auth.js');
  }
};

export default initializeAppleSDK;
