/*document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('wordInput');
    const highlightButton = document.getElementById('highlightButton');
  
    highlightButton.addEventListener('click', function () {
      const wordToHighlight = wordInput.value;
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: highlightWords,
          args: [wordToHighlight]
        });
      });
    });
  });

  */

  /*
  document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('wordInput');
    const highlightButton = document.getElementById('highlightButton');
  
    highlightButton.addEventListener('click', function () {
      const wordToHighlight = wordInput.value;
  
      // Get the current tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const currentTabUrl = currentTab.url;
  
        // Send the current URL and word to the Flask server
        fetch('http://localhost:5000/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: currentTabUrl, word: wordToHighlight }),
        })
        .then(response => response.json())
        .then(data => {
          // Handle the response from the server, which contains the analyzed data
          const analyzedData = data.result;
          // Implement logic to display the analyzed data in your extension
        })
        .catch(error => {
          console.error('Error:', error);
        });
      });
    });
  });
  
  */
 /*
 console.log("This is working!");

  document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('wordInput');
    const highlightButton = document.getElementById('highlightButton');
  
    highlightButton.addEventListener('click', function () {
      const wordToHighlight = wordInput.value;
      console.log("Word to Highlight: " + wordToHighlight);
      // Get the current tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //const currentTabId = tabs[0].id;
        //const currentTabId = tabs[0].url;
        const currentTabId = tabs[0].id;
        console.log("URL: " + currentTabId);
        // Send a message to the content script to highlight the word
        chrome.tabs.sendMessage(currentTabId, { action: 'highlight', word: wordToHighlight });
        console.log('Content script executed. #3');
      });
    });
  });
  
  function scrapeAndHighlight(wordToHighlight) {
    // Function executed in the content script
    const wordRegex = new RegExp(`\\b${wordToHighlight}\\b`, 'gi');
    const bodyText = document.body.innerText;
  
    // Highlight the specified word in the body text
    const highlightedText = bodyText.replace(wordRegex, match => `<span style="background-color: yellow;">${match}</span>`);
  
    // Replace the entire body content with the highlighted text
    document.body.innerHTML = highlightedText;
  }
  */
  /*
  document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('wordInput');
    const highlightButton = document.getElementById('highlightButton');
    const messageContainer = document.getElementById('messageContainer');
  
    highlightButton.addEventListener('click', function () {
      const wordToHighlight = wordInput.value;
  
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const currentTabId = currentTab.id;
  
        // Inject the script directly into the current tab
        chrome.scripting.executeScript({
          target: { tabId: currentTabId },
          function: highlightWords,
          args: [wordToHighlight],
        });
      });
    });
  });
  
  function highlightWords(wordToHighlight) {
    const wordRegex = new RegExp(`\\b${wordToHighlight}\\b`, 'gi');
    const elements = document.getElementsByTagName('*');
  
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.nodeType === Node.TEXT_NODE) {
        const text = element.nodeValue;
        const replacedText = text.replace(wordRegex, match => `<span style="background-color: yellow;">${match}</span>`);
        if (replacedText !== text) {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = replacedText;
          element.parentNode.replaceChild(wrapper.firstChild, element);
        }
      }
    }
  }
  
  */
/*
  document.addEventListener('DOMContentLoaded', function() {
    const countButton = document.getElementById('countButton');
  
    countButton.addEventListener('click', function() {
      const wordToCount = document.getElementById('wordInput').value;
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "countOccurrences", word: wordToCount }, function(response) {
          const count = response.count;
          console.log(`The word "${wordToCount}" appeared ${count} times on the webpage.`);
        });
      });
    });
  });
  */

  document.addEventListener('DOMContentLoaded', function() {
    console.log("Youre Here #3");
    const highlightAndCountButton = document.getElementById('highlightAndCountButton');
  
    highlightAndCountButton.addEventListener('click', function() {
      const wordToHighlightAndCount = document.getElementById('wordInput').value;
      console.log("word: " + wordToHighlightAndCount);
      //const url = document.getElementById('urlInput').value;
      //console.log("urlInput: " + url);
      chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        console.log("urlInput: " + tabs[0].url);
        /*chrome.runtime.sendMessage({ action: "sendURL", url: url }, function(response) {
          console.log(`Sent URL to Python script: ${url}`);
        });*/
        chrome.runtime.sendMessage({ action: "sendURL", url: tabs[0].url }, function(response) {
          console.log(`Sent URL to Python script: ${tabs[0].url}`);
        });
        
        chrome.tabs.sendMessage(tabs[0].url, { action: "sendURL", url: tabs[0].url}, function(response) {
          const count = response.count;
          console.log(`The word "${wordToHighlightAndCount}" appeared ${count} times on the webpage.`);
        });
      });
    });
  });
  
  