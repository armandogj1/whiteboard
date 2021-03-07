let active = false;
console.log('this is background');

chrome.action.onClicked.addListener((tab) => {
  console.log('clicked the icon');
  console.log(tab);

  if (!active) {
    chrome.tabs.sendMessage(tab.id, 'run');
    active = !active;
  } else {
    chrome.tabs.sendMessage(tab.id, 'remove');
    active = !active;
  }
  // here we will get information whether ext is ON or OFF from the popup;
});
