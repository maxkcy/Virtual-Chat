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
- 🧩 **Works with your workflow** – perfect for podcasters, streamers, and content creators. Yes, works for phone audio, just connect phone, and configure the Linux sound settings to route audio out the headset, then select the headset as the transcribe device.

## Screenshots

| | |
|---|---|
| ![Screenshot 1](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/1.png) | ![Screenshot 2](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/2.png) |
| ![Screenshot 3](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/3.png) | ![Screenshot 4](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/4.png) |
| ![Screenshot 5](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/5.png) | ![Screenshot 6](https://github.com/maxkcy/Virtual-Chat/raw/main/vcscreenshots/6.png) |

## Download & Install

- **Flatpak** (recommended for most Linux distros) – secure sandboxed install.
- **.deb** – for Debian/Ubuntu (needs manual updates).
- **.rpm** – maybe available for RPM‑based distros.

All releases are available on the [Releases page](https://github.com/maxkcy/Virtual-Chat/releases).  
Just download (Flatpak recommended), install, and start transcribing.

## FAQs

**Does Virtual Chat continuously transmit all audio to OpenRouter while transcription is on?**  
No. Virtual Chat uses both volume level and a built‑in speech‑detection algorithm. Audio is only sent when speech is detected. If you’re away from the computer, turn off transcription to be safe.

**Why is this Linux only?**  
Linux provides the easiest development path for this kind of app. Windows would require extra features, and Android doesn’t allow audio capture. A companion mobile bridge app can be created.

**Is an internet connection required?**  
Yes, you need an internet connection for OpenRouter.

**Does the app support locally running models?**  
No. We don’t have the infrastructure to build/test local models, and cloud models are more powerful, robust, fast, and affordable. OpenRouter respects your privacy and even offers free models.

## Pricing

- Subscription: Low and High Tiers **US$6.99–15.99** per quarter or year (trial available). Payments processed by Xsolla
- OpenRouter API costs: **~$0.50 per hour** of active use.

## ⚠️ Known Issue

The transcription system can occasionally crash (rare). If audio suddenly stops being transcribed, it’s often caused by rapidly switching app audio (e.g., watching videos) or pressing buttons too quickly. Simply restart the app and use your computer normally.
