// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'get_extension_id') {
      const extensionId = chrome.runtime.id;
      sendResponse({ extensionId });
    }
  });
  