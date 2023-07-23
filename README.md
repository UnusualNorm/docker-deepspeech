# docker-deepspeech

Mozilla DeepSpeech in a simple Docker container.

## Usage

Make a post request to port 28346 containing the audio file in the body.
Optional query parameters are:

- beam_width (default: 500)
- extended (default: false)
  - num_results (default: 1)

If extended is true, the response will be a json object the the following type:

```typescript
{
    "transcripts": {
        "confidence": number,
        "tokens": {
            "start_time": number,
            "timestep": number,
            "text": string
        }[]
    }[]
}
```
