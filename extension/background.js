/*jshint esversion: 6 */

function submitClip(innerBody){
  const inputs = innerBody.variables.input;

  const slug = inputs.slug;
  const title = inputs.title;

  const slugUrl = "https://clips.twitch.tv/" + slug;
  const subreddit= "LivestreamFail";

  const url = "https://www.reddit.com/r/" + subreddit + "/submit" +
  "?url=" + slugUrl +
  "&title=" + title;

  chrome.tabs.create({
    url: url
  });
}

function postClip(details){

  if (details.requestBody?.raw != null){ // jshint ignore:line

    const body8Array = details.requestBody.raw['0']?.bytes // jshint ignore:line

    if (body8Array != null){ // jshint ignore:line

      const requestBodyString = String.fromCharCode.apply(null, new Uint8Array(body8Array));
      const parsedBody = JSON.parse(requestBodyString);

      if (parsedBody != null){
        if (parsedBody['0'] != null){

          const innerBody = parsedBody['0'];

          if (innerBody.operationName == "PublishClip"){
            submitClip(innerBody);
          }
        }
      }
    }
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  postClip,
  {urls: ['https://gql.twitch.tv/gql']},
  ['requestBody']
);
