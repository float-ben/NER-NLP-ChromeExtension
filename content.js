function highlightWords(word) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    const replacement = `<span style="background-color: yellow;">$&</span>`;
    document.body.innerHTML = document.body.innerHTML.replace(regex, replacement);
  }
  