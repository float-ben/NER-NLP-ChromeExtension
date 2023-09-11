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

  document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('wordInput');
    const highlightButton = document.getElementById('highlightButton');
  
    highlightButton.addEventListener('click', function () {
      const wordToHighlight = wordInput.value;
  
      // Get the current tab's URL
      chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentTab = tabs[0];
        const currentTabId = currentTab.id;
  
        // Send a message to the content script to scrape and highlight
        chrome.scripting.executeScript({
          target: { tabId: currentTabId },
          function: scrapeAndHighlight,
          args: [wordToHighlight]
        });
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
  
  
/*
document.addEventListener('DOMContentLoaded', function () {
    const wordInput = document.getElementById('wordInput');
    const highlightButton = document.getElementById('highlightButton');
  
    highlightButton.addEventListener('click', function () {
      const wordToHighlight = wordInput.value;
  
      // Send a POST request to your Flask server
      fetch('http://localhost:5000/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: wordToHighlight }),
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
*/