# DeepFlow — Deep Work Protocol Timer

DeepFlow is a desktop app for structured deep-work sessions. Each session follows the **Prepare → Perform → Preserve** framework. The app also has daily streaks, box breathing guides, worry postponement, distraction logging and a stats dashboard.

It runs fully offline on **Windows, macOS and Linux**. Your sessions, custom protocols and sound choice are saved on your own computer.

---

## Download & install

Installers are built automatically on GitHub's servers. You never need to build anything on your own computer.

### Option A: from a Release (recommended)

Open the repository's **Releases** page and download the file for your system:

| System | File |
| --- | --- |
| Windows (most PCs) | `DeepFlow-x.y.z-win-x64-setup.exe` |
| Windows on ARM | `DeepFlow-x.y.z-win-arm64-setup.exe` |
| Windows, no install | `DeepFlow-x.y.z-win-portable.exe` |
| macOS, Apple Silicon (M1/M2/M3/M4…) | `DeepFlow-x.y.z-mac-arm64.dmg` |
| macOS, Intel | `DeepFlow-x.y.z-mac-x64.dmg` |
| Linux (any distro) | `DeepFlow-x.y.z-linux-x86_64.AppImage` |
| Ubuntu / Debian | `DeepFlow-x.y.z-linux-amd64.deb` |

### Option B: from the latest build

1. Open the **Actions** tab, then click the latest green **Build desktop app** run.
2. Scroll to **Artifacts** and download `DeepFlow-Windows`, `DeepFlow-macOS` or `DeepFlow-Linux`. It comes as a zip that contains the installer.

### First launch: security prompts

The app isn't signed with a paid code-signing certificate, so your operating system will warn you the first time you open it:

- **Windows:** SmartScreen shows *"Windows protected your PC"*. Click **More info → Run anyway**.
- **macOS:** right-click the app in Applications and choose **Open**, then confirm with **Open**.
  - If macOS says the app *"is damaged"*, run `xattr -cr /Applications/DeepFlow.app` in Terminal once.
- **Linux (AppImage):** right-click the file, then **Properties → Allow executing as program**. You can also run `chmod +x DeepFlow-*.AppImage`.

---

## Publishing a new version

1. Bump `"version"` in `package.json`, e.g. to `1.0.1`.
2. Commit, then push a matching tag:
   ```bash
   git tag v1.0.1
   git push origin v1.0.1
   ```
3. GitHub Actions builds all installers and publishes them as a new **Release**.

You can also start a build at any time from **Actions → Build desktop app → Run workflow**.

---

## Desktop behaviour

- **Accurate timer in the background.** The countdown and chimes keep running at full accuracy when the window is minimized or behind other windows.
- **Screen stays awake** while a session is playing, as in the web version.
- **Native dialogs** are used for confirmations such as *Abort Flow*, deleting a custom protocol, or resetting progress.
- **Single window.** Opening DeepFlow again focuses the window that's already running.
- **Offline.** All fonts, Bangla included, are bundled with the app, so no internet connection is needed.

Your data is stored in the app's own profile folder:

| System | Folder |
| --- | --- |
| Windows | `%APPDATA%\DeepFlow` |
| macOS | `~/Library/Application Support/DeepFlow` |
| Linux | `~/.config/DeepFlow` |

Uninstalling the app keeps this folder, so reinstalling won't lose your history. Sessions saved in the old web version stay in that browser and don't move over automatically.

---

## Project layout

```
electron/        Desktop shell (main process, preload bridge, window icon)
src/             The React app (UI, protocols, audio, streak logic)
build/           Installer icon sources
.github/workflows/build.yml   Cloud build for Windows, macOS and Linux
```

### For developers (optional)

You need Node.js 22 or newer.

```bash
npm install
npm run dev            # web version at http://localhost:3000
npm run electron:dev   # build and open the desktop app
npm run dist           # build installers for the current OS into ./release
```
