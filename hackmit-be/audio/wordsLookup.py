import requests
import json

def get_wiktionary_audio(word):
    # Define the URL for the API request
    url = f'https://en.wiktionary.org/api/rest_v1/page/media-list/{word}'
    
    # Set the headers as specified in the curl command
    headers = {
        'accept': 'application/json; charset=utf-8; profile="https://www.mediawiki.org/wiki/Specs/Media/1.3.1"'
    }
    
    # Send the GET request
    response = requests.get(url, headers=headers)
    
    # Check if the request was successful
    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        
        # Iterate over the items and look for audio files
        audio_urls = []
        for item in data.get('items', []):
            if item['type'] == 'audio':  # Check if the item is an audio file
                # Construct the URL for the audio file based on its title
                file_name = item['title'].replace("File:", "")
                audio_url = f"https://commons.wikimedia.org/wiki/Special:FilePath/{file_name}"
                audio_urls.append(audio_url)
        return audio_urls
    else:
        print(f"Error fetching data for '{word}': {response.status_code}")
        return []

def process_words_from_json(input_file, output_file):
    # Use 'utf-8' encoding to open the file
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
        # Load the JSONL data from the input file
        data = [json.loads(line) for line in infile]
        
        for entry in data:
            word = entry.get('word', '').strip()  # Get the word from the JSON object
            ipa = entry.get('ipa', '').strip()    # Get the IPA notation if needed (for output)
            
            if word:
                # Fetch audio links for the current word
                audio_urls = get_wiktionary_audio(word)
                if audio_urls:
                    # Write the word, its IPA, and audio URLs to the output file
                    outfile.write(f"Word: {word}\nIPA: {ipa}\n")
                    for url in audio_urls:
                        outfile.write(f"{url}\n")
                    outfile.write("\n")  # Add an extra newline between words
                else:
                    outfile.write(f"Word: {word} (IPA: {ipa}) - No audio found\n\n")

    print(f"Processing complete. Results written to {output_file}")

# Example usage
input_file = "documents.jsonl"  # JSONL file with words and IPA
output_file = "audio_links_output.txt"  # File to write the audio URLs
process_words_from_json(input_file, output_file)
