# Virtual Chat

**Turn any audio into a conversation.**  
Virtual Chat is a Linux app that transcribes input and output audio from system or Bluetooth-linked devices (headset, phone, etc.) into a real‑time chat format — powered by OpenRouter’s AI models.  

Add your own AI assistant with a custom prompt, get automatic chat summaries, and keep your content flowing for podcasts, live streams, or TikTok Live.

> 🚀 **Paid subscription required** – but a free trial is available.

## Key Features

- 🎧 **Transcribe anything** – system audio or Bluetooth devices (A2DP/HFP) become live chat messages. That means you can connect your phone and transcribe all phone audio to chat.
- 🤖 **AI assistant** – bring your own OpenRouter key, set a custom prompt, and chat with an AI that understands your conversation.
- 📝 **Auto‑summarisation** – get concise recaps of long conversations.
- 🔒 **Secure by default** – API keys are stored in the system keyring, and audio is only sent once speech is detected.
- 🧩 **Works with your workflow** – perfect for podcasters, streamers, and content creators. Yes, works for phone audio, just connect phone, and configure the Linux sound settings to route audio through the headset, then select the headset as the transcribe device.

## Screenshots

| | |
|---|---|
| ![Screenshot 1](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/1.png) | ![Screenshot 2](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/2.png) |
| ![Screenshot 3](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/3.png) | ![Screenshot 4](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/4.png) |
| ![Screenshot 5](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/5.png) | ![Screenshot 6](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/6.png) |

<h2>Demo video</h2>

<p align="center">
  <a href="https://www.youtube.com/watch?v=7Ver6qHS4H4">
    <img src="https://img.youtube.com/vi/7Ver6qHS4H4/0.jpg" alt="Demo Video" width="70%">
  </a>
</p>

## Download & Install

- **Flatpak** (recommended for most Linux distros) – secure sandboxed install.
- **.deb** – for Debian/Ubuntu (needs manual updates).
- **.rpm** – maybe available for RPM‑based distros.

All releases are available on the [Releases page](https://github.com/maxkcy/Virtual-Chat/releases).  
Just download (Flatpak recommended), install, and start transcribing.


## FAQs

**Can smart phone audio be transcribed to chat?**
Yes, just connect the phone and headset to the Linux computer via Bluetooth, then configure Linux sound settings for audio input and output to use your Bluetooth connected headset. Select the headset device and start transcribing with AI assistance.

**Do I need a Bluetooth adapter?**
Only if you plan to use a headset and/or connect phone (strongly recommended). Only adapters that support at least HFP (A2DP strongly recommended) can be used. Many computer have adapters that support these profiles by default. While many adapters support multiple connected devices, we recommend using different adapters for phone and headset, since we noticed it helps with performance. Make sure to set the adapter to "always visible" in Bluetooth adapter preferences.

**Do I need a Bluetooth Headset?**
No, you can use system audio. However, system audio is experimental. The app has a pre-baked list of audio cards to determine if system audio is available. The app may not have your audio card in its list, but it should support any headset with at least HFP (A2DP strongly recommended).

**Does Virtual Chat continuously transmit all audio to OpenRouter while transcription is on?**  
No. Virtual Chat uses both volume level and a built‑in speech‑detection algorithm. Audio is only sent when speech is detected. If you’re away from the computer, turn off transcription to be safe.

**Why is this Linux only?**  
Linux provides the easiest development path for this kind of app. Windows would require extra features, and Android doesn’t allow audio capture. A companion mobile bridge app can be created.

**Is an internet connection required?**  
Yes, you need an internet connection for OpenRouter.

**Does the app support locally running models?**  
No. We don’t have the infrastructure to build/test local models, and cloud models are more powerful, robust, fast, and affordable. OpenRouter respects your privacy and even offers free models.


## Pricing

- Subscription: Low and High Tiers from **US$6.99–15.99** per quarter or year (trial available). Payments processed by Xsolla.
- OpenRouter API costs: **~$0.50 per hour** of active use. (We do not get paid through OpenRouter or add extra hourly charges to the subscription plan).

## ⚠️ Known Issues

- Input and output audio streams on a single Bluetooth adapter causes audio lagging and jittering because both the smart phone, that provides audio, and the headset, that captures audio, are connected and creating two input and output audio streams. This may be a hardware limitation, but we are looking into ways to optimize the code. We suggest you connect the smart phone and the headset to different adapters in the meantime to help with the audio lag issue.

- The transcription system can occasionally crash (rare). If audio suddenly stops being transcribed, it’s often caused by rapidly switching app audio (e.g., watching videos) or pressing buttons too quickly. Simply restart the app and use your computer normally.
