/*jshint esversion: 6 */

let getSlug = function(details){
  if (details.requestBody?.raw['0']?.bytes != null){ // jshint ignore:line

    const requestBodyString = String.fromCharCode.apply(null, new Uint8Array(details.requestBody.raw['0'].bytes));
    const slug = JSON.parse(requestBodyString)['0']?.variables?.slug; // jshint ignore:line

    if (slug != null){
      console.log(slug);

      let div = document.createElement("div");
      div.setAttribute("id", "ClipItToLSF_Slug");
      div.setAttribute("src", slug);
      document.body.appendChild(div);
      
      chrome.webRequest.onBeforeRequest.removeListener(getSlug);
    }
  }
};

chrome.webRequest.onBeforeRequest.addListener(
  getSlug,
  {urls: ['https://*.twitch.tv/*']},
  ['requestBody']
);
