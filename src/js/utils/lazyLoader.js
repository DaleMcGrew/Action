export function libraryNeedsLoading (library) {
  if (!window.lazyLoaderWe) {
    window.lazyLoaderWe = [];
    return true;
  }
  return !window.lazyLoaderWe.includes(library);
}

export function lazyLoader (library) {
  if (!window.lazyLoaderWe) {
    window.lazyLoaderWe = [];
  }

  // Don't reload a library, they are global to the app
  if (window.lazyLoaderWe.includes(library)) {
    return new Promise((resolve) => {
      resolve(`${library} was already loaded`);
    });
  }

  switch (library) {
    case 'fontawesome':
      return new Promise((resolve) => {
        const linkElementForFontAwesome = document.createElement('link');
        linkElementForFontAwesome.rel = 'stylesheet';
        linkElementForFontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
        linkElementForFontAwesome.as = 'style';
        linkElementForFontAwesome.crossOrigin = 'anonymous';
        linkElementForFontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
        const firstExistingLink = document.getElementsByTagName('link')[0];
        firstExistingLink.parentNode.insertBefore(linkElementForFontAwesome, firstExistingLink);
        window.lazyLoaderWe.push(library);
        resolve(`${library} has been loaded`);
      });
    case 'stripe':
      return new Promise((resolve) => {
        const firstExistingScript = document.getElementsByTagName('script')[0];
        const scriptElement1 = document.createElement('script');
        scriptElement1.src = 'https://checkout.stripe.com/checkout.js';
        scriptElement1.type = 'text/javascript';
        firstExistingScript.parentNode.insertBefore(scriptElement1, firstExistingScript);

        const scriptElement2 = document.createElement('script');
        scriptElement2.src = 'https://js.stripe.com/v3/';
        scriptElement2.type = 'text/javascript';
        firstExistingScript.parentNode.insertBefore(scriptElement2, firstExistingScript);
        window.lazyLoaderWe.push(library);
        resolve(`${library} has been loaded`);
      });
    case 'googleApi':
      return new Promise((resolve) => {
        const firstExistingScript = document.getElementsByTagName('script')[0];
        const scriptElement1 = document.createElement('script');
        scriptElement1.src = 'https://apis.google.com/js/api.js';
        scriptElement1.type = 'text/javascript';
        firstExistingScript.parentNode.insertBefore(scriptElement1, firstExistingScript);
        window.lazyLoaderWe.push(library);
        resolve(scriptElement1);
      });
    default:
      return new Promise((resolve) => {
        console.error(`${library} has not been configured, and did not load`);
        resolve(`${library} has not been configured, and did not load`);
      });
  }
}
