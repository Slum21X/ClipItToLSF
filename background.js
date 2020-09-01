/*jshint esversion: 6 */

function getSlugAndTitle(details){

  if (details.requestBody?.raw != null){ // jshint ignore:line

    const body8Array = details.requestBody.raw['0']?.bytes // jshint ignore:line

    if (body8Array != null){ // jshint ignore:line

      const requestBodyString = String.fromCharCode.apply(null, new Uint8Array(body8Array));
      const parsedBody = JSON.parse(requestBodyString);

      if (parsedBody != null){
        if (parsedBody['0'] != null){

          const innerBody = parsedBody['0'];

          if (innerBody.operationName == "PublishClip"){

            const inputs = innerBody.variables.input;

            const slug = inputs.slug;
            const title = inputs.title;
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
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  getSlugAndTitle,
  {urls: ['https://*.twitch.tv/*']},
  ['requestBody']
);
