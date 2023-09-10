document.addEventListener('DOMContentLoaded', function () {
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