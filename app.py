'''
from flask import Flask, request, jsonify
import requests
from bs4 import BeautifulSoup
import spacy

app = Flask(__name__)

# Your scraping function
def scrape_website(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check for HTTP errors
        soup = BeautifulSoup(response.text, 'html.parser')
        return soup
    except requests.exceptions.RequestException as e:
        print("Error: ", e)
        return None

# Your NLP analysis function
def analyze_text(text):
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    # Implement your NLP analysis here
    return doc

@app.route('/scrape', methods=['POST'])
def scrape_and_analyze():
    # Get the word to scrape and analyze from the request
    data = request.get_json()
    word_to_scrape = data.get('word')

    # Scrape a website (example URL)
    url_to_scrape = 'https://example.com'
    scraped_data = scrape_website(url_to_scrape)

    if scraped_data:
        # Extract text from the scraped webpage
        text_to_analyze = scraped_data.get_text()

        # Analyze the extracted text using NLP
        analyzed_data = analyze_text(text_to_analyze)

        # Return the analyzed data as JSON
        return jsonify({'result': str(analyzed_data)})
    else:
        return jsonify({'error': 'Failed to scrape the website'}), 400

if __name__ == '__main__':
    app.run(debug=True)
'''

# ... Previous code ...
from flask import Flask, request

app = Flask(__name__)

@app.route('/scrape', methods=['POST'])
def scrape_and_highlight():
    # Get the word to scrape and highlight from the request
    data = request.get_json()
    word_to_highlight = data.get('word')

    # Send the word to the content script for highlighting
    chrome.scripting.executeScript({
        target: { tabId: chrome.devtools.inspectedWindow.tabId },
        function: scrapeAndHighlight,
        args: [word_to_highlight]
    })

    return 'Scraping and highlighting initiated'

if __name__ == '__main__':
    app.run(debug=True)


# ... Rest of the code ...
