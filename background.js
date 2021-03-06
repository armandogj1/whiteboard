let active = false;

chrome.runtime.onMessage.addListener(function (
  request,
  sender,
  sendResponse
) {
  console.log('Your question was: ' + request.myQuestion);

  // here we will get information whether ext is ON or OFF from the popup;
  active = !active;
  sendResponse({ state: active });
});
