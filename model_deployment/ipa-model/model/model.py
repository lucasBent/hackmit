"""
The `Model` class is an interface between the ML model that you're packaging and the model
server that you're running it on.

The main methods to implement here are:
* `load`: runs exactly once when the model server is spun up or patched and loads the
   model onto the model server. Include any logic for initializing your model, such
   as downloading model weights and loading the model into memory.
* `predict`: runs every time the model server is called. Include any logic for model
  inference and return the model output.

See https://truss.baseten.co/quickstart for more.
"""

import io
from transformers import pipeline
import torch, librosa, base64
import soundfile as sf

class Model:
    def __init__(self, **kwargs):
        # Uncomment the following to get access
        # to various parts of the Truss config.

        # self._data_dir = kwargs["data_dir"]
        # self._config = kwargs["config"]
        # self._secrets = kwargs["secrets"]
        self._model = None

    def load(self):
        # Load model here and assign to self._model.
        self.model = pipeline("automatic-speech-recognition",
            model="jonatasgrosman/wav2vec2-large-xlsr-53-english"
        )


    def predict(self, model_input):
        ## Use the Hugging Face pipeline for transcription
        encoded_audio = model_input["audio_data"]

        # Decode the base64-encoded string into raw audio bytes
        audio_bytes = base64.b64decode(encoded_audio)

        # Use soundfile (or similar) to read the raw audio bytes and convert to a waveform
        audio_data, sample_rate = sf.read(io.BytesIO(audio_bytes))

        # Prepare the input in the format expected by Hugging Face's pipeline
        input_data = {
            "raw": audio_data,
            "sampling_rate": sample_rate
        }

        # Run the ASR model on the audio data
        transcription = self.model(input_data)

        return {"transcription": transcription["text"]}
        