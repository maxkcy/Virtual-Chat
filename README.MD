Virtual Chat is a Linux app that can transcribe input and output audio of system or Bluetooth linked devices (i.e. headset, phone) into chat format using OpenRouter provided transcription models over the internet. Users can further request AI assistance, based on their custom prompt, and chat summaries. The app requires an active paid subscription (trail available). Works for podcasters, or on Tiktok live. Hate promoting prompts and chats are strictly forbidden for AI assistance.

Price: After quarterly or yearly subscription costs from US$6.00-15.99, AI costs apx. $0.50 per hour use.

This repository is for Virtual Chat Releases.

Download:
Use the Flatpak download for most Linux distros to run this application in a secure sandbox. If that doesn't work, the .deb release is available in the releases (but can't be updated without checking back), .rpm release may be available. Click to install.

FAQs:

Question: Does Virtual Chat continuously transmit all audio to OpenRouter while the transcription service is turned on?

Answer: No. Virtual Chat detects uses both volume level and internal algorithm to check for speech in the audio. If the volume is too low or speech isn't detected, it does not. However, if you intend to be away from the computer, and are not using transcription, turn it off, Virtual Chat does not automatically turn off the transcription service.

Question: Why is this Linux only?

Answer: Because Linux provided the easiest development path for making this type of app. For windows we would need to create features that are pre-available in Linux. Android does not allow audio capture. A bridge app can be made to control the Linux app directly from the phone and display the transcribed chat on the phone screen.

Question: Is internet connect required?

Answer: Yes, you need an internet connection for OpenRouter.

Question: Does the app support locally running models?

Answer: No, because as the app developer, we do not have the computer infrastructure to build and test this, moreover, internet provided AI models are extremely powerful, robust, fast, and fairly cheap. OpenRouter respects user privacy, and provides free models too. 

WARNING: We noticed that the transcription system can sometimes (mostly rarely) crash. For the front user there are no errors displayed. If audio suddenly stops being transcribed and you have tried to force recreate app streams, it was probably because buttons were pressed harum-scarum, or the different app audios are changed rapidly, such as from switching videos (video audio), or opening a new video in the background, etc. Restart the app and use your computer mildly.
