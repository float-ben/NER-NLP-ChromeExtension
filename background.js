// background.js

// Listen for messages from the content script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'get_extension_id') {
      const extensionId = chrome.runtime.id;
      sendResponse({ extensionId });
    }
  });
  

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "sendURL") {
      const url = request.url;

      // Send the URL to your Python script using native messaging
      const port = chrome.runtime.connectNative('your_native_app_id');
      port.postMessage({ url: url });
      port.onDisconnect.addListener(function() {
          console.log("Disconnected");
      });
  }
});
