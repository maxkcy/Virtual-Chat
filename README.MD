# Virtual Chat

**Turn any audio into a conversation.**  
Virtual Chat is a real-time audio to conversation formatter; it transcribes input and output audio from system or Bluetooth-linked devices (headset, phone, etc.) into text-based chat format — powered by OpenRouter’s AI models.  

Get AI assistance with a user defined custom prompt, and get automatic AI chat summaries. Keep your content flowing for podcasts, live streams, or TikTok Live.

> **[Check out the website for more infomation](https://maxkcy.github.io/Virtual-Chat/) **.

> **Paid subscription required** – but a free trial is available.

## Download & Install

- **Flatpak** (recommended for most Linux distros) – secure sandboxed install.
- **.deb** – for Debian/Ubuntu (needs manual updates and uninstalls).

All releases are available on the [Releases page](https://github.com/maxkcy/Virtual-Chat/releases) for Debian based distros, simply download, click and install. But we recommend installation through the Flatpak build, continue directly below.

### 📦 First-time installation (Flatpak)

1. **Install Flatpak** if you don't already have it:

   ```bash
   # Debian / Ubuntu
   sudo apt install flatpak
   ```

   ```bash
   # Fedora
   sudo dnf install flatpak
   ```

   ```bash
   # Arch
   sudo pacman -S flatpak
   ```

2. **Install Virtual Chat:**

   ```bash
   flatpak install --user https://maxkcy.github.io/Virtual-Chat/io.github.maxkcy.virtual-chat.flatpakref
   ```

3. **Launch the app:**

   ```bash
   flatpak run io.github.maxkcy.virtual-chat
   ```

   Or search for **Virtual Chat** in your application menu.

---

### 🔄 Updating Virtual Chat

Virtual Chat includes a **built-in update checker**. On launch, the app checks the latest release from GitHub. If a newer version is available, a golden **“Update Available: X.Y.Z”** banner appears at the top of the chat list.

1. **Run the update command** in your terminal:

   ```bash
   flatpak update --user io.github.maxkcy.virtual-chat
   ```

   Or simply update all your user-installed Flatpak apps (including Virtual Chat and any apps from Flathub or other Flatpak remotes):

   ```bash
   flatpak update --user
   ```

2. Relaunch Virtual Chat and the banner will disappear.

---

### Uninstalling Virtual Chat

1. **Uninstall**
   ```bash
   flatpak uninstall --user io.github.maxkcy.virtual-chat
   ```
2. Remove all app data (settings, chat history, cache)
  ```bash
   rm -rf ~/.var/app/io.github.maxkcy.virtual-chat/
   ```
