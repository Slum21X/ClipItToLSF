/*jshint esversion: 6 */

function getSlugAndTitle(details){

  const body8Array = details.requestBody?.raw['0']?.bytes // jshint ignore:line

  if (body8Array != null){ // jshint ignore:line

    const requestBodyString = String.fromCharCode.apply(null, new Uint8Array(body8Array));
    const parsedBody = JSON.parse(requestBodyString)['0'];

    if (parsedBody != null){
      if (parsedBody.operationName == "PublishClip"){

        const slug = parsedBody.variables.input.slug;
        const title = parsedBody.variables.input.title;
        const url = "https://clips.twitch.tv/" + slug;

        chrome.tabs.create({
          url: "https://www.reddit.com/r/LivestreamFail/submit" +
          "?url=" + url +
          "&title=" + title
        });
      }
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  getSlugAndTitle,
  {urls: ['https://*.twitch.tv/*']},
  ['requestBody']
);
