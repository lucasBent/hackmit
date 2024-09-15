import os
import requests
import subprocess
import urllib.parse

# Custom User-Agent to comply with Wikimedia's policy
headers = {
    'User-Agent': 'YourAppName/1.0 (your-email@example.com)'
}

def download_file(url, save_path):
    """Download the file from the provided URL with a custom User-Agent."""
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # Check if the request was successful
        with open(save_path, 'wb') as f:
            f.write(response.content)
        print(f"Downloaded: {save_path}")
    except requests.exceptions.RequestException as e:
        print(f"Error downloading {url}: {e}")
        return None

def convert_ogg_to_wav(ogg_path, wav_path):
    """Convert the .ogg file to .wav format using ffmpeg via subprocess."""
    try:
        # Run the ffmpeg command through subprocess
        command = ['ffmpeg', '-i', ogg_path, wav_path]
        subprocess.run(command, check=True)
        print(f"Converted {ogg_path} to {wav_path}")
    except subprocess.CalledProcessError as e:
        print(f"Error converting {ogg_path} to .wav: {e}")

def extract_first_urls_and_convert(input_file, download_dir, output_dir):
    with open(input_file, 'r', encoding='utf-8') as infile:
        current_word = None
        first_url = None

        # Ensure directories exist for downloaded files and converted files
        os.makedirs(download_dir, exist_ok=True)
        os.makedirs(output_dir, exist_ok=True)
        
        for line in infile:
            line = line.strip()

            # Identify new word (character)
            if line.startswith("Word:"):
                if current_word and first_url:
                    # Decode the word to handle special characters
                    decoded_word = urllib.parse.unquote(current_word)

                    # Determine if the URL points to a .wav or .ogg file
                    if first_url.endswith(".wav"):
                        wav_filename = os.path.join(output_dir, f"{decoded_word}.wav")
                        download_file(first_url, wav_filename)
                    else:
                        ogg_filename = os.path.join(download_dir, f"{decoded_word}.ogg")
                        wav_filename = os.path.join(output_dir, f"{decoded_word}.wav")
                        download_file(first_url, ogg_filename)
                        convert_ogg_to_wav(ogg_filename, wav_filename)

                # Start a new word and reset first URL
                current_word = line.split("Word:")[1].strip()
                first_url = None

            # Check if the line is a URL and capture the first URL
            elif line.startswith("https://") and not first_url:
                first_url = line

        # Handle the last word and its URL if any
        if current_word and first_url:
            decoded_word = urllib.parse.unquote(current_word)
            if first_url.endswith(".wav"):
                wav_filename = os.path.join(output_dir, f"{decoded_word}.wav")
                download_file(first_url, wav_filename)
            else:
                ogg_filename = os.path.join(download_dir, f"{decoded_word}.ogg")
                wav_filename = os.path.join(output_dir, f"{decoded_word}.wav")
                download_file(first_url, ogg_filename)
                convert_ogg_to_wav(ogg_filename, wav_filename)

    print(f"Extraction and conversion complete. Files saved to {output_dir}")

# Example usage
input_file = "audio_links_output.txt"  # Replace with your input file path
download_directory = "downloaded_audio_files"  # Directory for saving downloaded .ogg/.wav files
output_directory = "converted_wav_files"  # Directory for saving .wav files

extract_first_urls_and_convert(input_file, download_directory, output_directory)
