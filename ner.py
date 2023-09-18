import spacy
import requests
from bs4 import BeautifulSoup
from spacy.matcher import PhraseMatcher
from spacy.tokens import Span
import sys
import json

print("Youre Here")

# Read a message from Chrome's extension
def read_message():
    raw_length = sys.stdin.buffer.read(4)
    if not raw_length:
        sys.exit(0)
    message_length = int.from_bytes(raw_length, byteorder='little')
    message_text = sys.stdin.buffer.read(message_length).decode('utf-8')
    return json.loads(message_text)

# Write a message to Chrome's extension
def write_message(message):
    message_text = json.dumps(message)
    sys.stdout.buffer.write(len(message_text).to_bytes(4, byteorder='little'))
    sys.stdout.buffer.write(message_text.encode('utf-8'))
    sys.stdout.flush()

'''
if __name__ == "__main__":
    while True:
        message = read_message()
        if 'url' in message:
            url = message['url']
            # Do something with the URL, e.g., fetch the webpage
            print(f"Received URL from extension: {url}")
'''


# Load a spaCy language model with NER capabilities
nlp = spacy.load("en_core_web_sm")

# Initialize the PhraseMatcher for custom patterns (optional)
matcher = PhraseMatcher(nlp.vocab)

# URL of the web page to scrape]
message = read_message()
if 'url' in message:
    url = message['url']
#url = "https://example.com"

# Make a request to the web page and extract text content
response = requests.get(url)
html_content = response.text

# Parse the HTML content using BeautifulSoup
soup = BeautifulSoup(html_content, "html.parser")

# Extract text from the parsed HTML
web_text = soup.get_text()

# Process the extracted text using spaCy
doc = nlp(web_text)

# Define custom patterns for the PhraseMatcher (optional)
# You can add custom phrases you want to match in addition to NER entities
custom_phrases = ["example phrase 1", "example phrase 2"]
pattern_docs = [nlp(phrase) for phrase in custom_phrases]
matcher.add("custom_phrases", pattern_docs)

# Define a function to highlight NER entities
def highlight_entities(doc):
    # Create a list of (start, end, label) tuples for each entity
    entity_spans = [(ent.start_char, ent.end_char, ent.label_) for ent in doc.ents]

    # Iterate over custom pattern matches (optional)
    for match_id, start, end in matcher(doc):
        span = doc[start:end]
        entity_spans.append((span.start_char, span.end_char, "CUSTOM"))

    # Sort entity spans by start position
    entity_spans.sort(key=lambda x: x[0])

    # Create a list to store the highlighted text
    highlighted_text = []

    # Initialize the character index
    char_idx = 0

    # Iterate over the text and add markup to highlight entities
    for start, end, label in entity_spans:
        # Add text before the entity
        highlighted_text.append(doc[char_idx:start].text)

        # Add the entity with markup for highlighting
        entity_text = doc[start:end].text
        highlighted_text.append(f"<{label}>{entity_text}</{label}>")

        # Update the character index
        char_idx = end

    # Add the remaining text
    highlighted_text.append(doc[char_idx:].text)

    return "".join(highlighted_text)

# Highlight entities in the processed text
highlighted_text = highlight_entities(doc)

# Print or use the highlighted text
print(highlighted_text)









