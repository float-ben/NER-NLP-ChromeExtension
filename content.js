/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "countOccurrences") {
    const wordToCount = request.word;
    const regex = new RegExp(wordToCount, 'gi');
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let count = 0;
    
    while (textNodes.nextNode()) {
      const textNode = textNodes.currentNode;
      const matches = textNode.nodeValue.match(regex);
      
      if (matches) {
        count += matches.length;
      }
    }
    
    sendResponse({ count });
  }
});*/

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "highlightAndCount") {
    const wordToHighlight = request.word;
    const regex = new RegExp(wordToHighlight, 'gi');
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let count = 0;

    while (textNodes.nextNode()) {
      const textNode = textNodes.currentNode;
      const matches = textNode.nodeValue.match(regex);

      if (matches) {
        count += matches.length;

        const replacedText = textNode.nodeValue.replace(regex, match => {
          return `<span style="background-color: yellow;">${match}</span>`;
        });

        const newNode = document.createElement('span');
        newNode.innerHTML = replacedText;
        textNode.parentNode.replaceChild(newNode, textNode);
      }
    }

    sendResponse({ count });
  }
});

/*
const text = document.querySelectorAll('h1, h2, h3, h4, h5, p, li, td, caption, span, a')

for (let i=0; i < text.length; i++) {
  if (text[i].innerHTML.includes('Tom Brady')) {
    text[i].innerHTML = text[i].innerHTML.replace( 'Tom Brady', '6-time Super Bowl champion Tom Brady')
  } else if (text[i].innerHTML.includes('Brady')) {
    text[i].innerHTML = text[i].innerHTML.replace( 'Brady', '6-time SuperBowl champion Tom Brady')
  }
}*/