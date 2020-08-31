/*jshint esversion: 6 */

let currentSlug = "NO SLUG SET";
let currentTitle = "NO TITLE SET";

function getSlug(details){
  if (details.requestBody?.raw['0']?.bytes != null){ // jshint ignore:line

    const requestBodyString = String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw['0'].bytes));
    const slug = JSON.parse(requestBodyString)['0']?.variables?.slug; // jshint ignore:line

    if (slug != null){

      currentSlug = slug;
      console.log(currentSlug);
      chrome.webRequest.onBeforeRequest.removeListener(getSlug);
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  getSlug,
  {urls: ['https://*.twitch.tv/*']},
  ['requestBody']
);

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    const title = request.setTitle;

    if (title != null){
      currentTitle = title;
      console.log(currentTitle);
    }
});
