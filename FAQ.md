# Frequently asked questions

Answers to the most common questions. To learn everything step by step, read the [guide](GUIDE.md).

## Getting started

### Is NOVARA really free?

Yes. Every feature, theme and update is free, with no subscription and no NOVARA account. You can support the project on [Ko-fi](https://ko-fi.com/K4B229QS15) if you like.

### Do I have to pay for the AIs?

The agents use your own account: a Claude subscription, a ChatGPT account or a Google account. What it costs depends on that account. NOVARA picks the right model for each task and only spends tokens where an AI really helps.

### Do I need to know how to code?

No. You describe your game in your own words, the agents write the code and you approve what they make.

### What kinds of games can I make?

Web 2D games, Web 3D games, Roblox Studio games, Unity games and ASCII games, made only of characters.

### Which computers does NOVARA run on?

Macs with macOS 11 or later (Apple Silicon or Intel), and PCs with 64-bit Windows 10 or 11. There is no Linux version for now. NOVARA looks at your machine and suggests a suitable number of agents.

### Is NOVARA available in French?

Yes, in English and French. It follows your computer's language.

## Privacy

### Do my projects go online?

Your projects stay on your computer and NOVARA collects nothing. It goes online to download tools and updates and to list the community's creations. The agents you connect go through your account: what they read is handled by their provider, under its own terms.

### Can I use someone's voice?

Only with their consent. NOVARA copies real voices and asks for that consent before recording.

## Installing

### My Mac says it cannot check the app. What do I do?

That is normal: NOVARA is not notarised by Apple. Open **System Settings › Privacy & Security**, scroll down and click **Open Anyway**. You only do this once.

### Windows says it protected my PC. What do I do?

The installer is not signed by Microsoft. Click **More info**, then **Run anyway**.

### How do I update NOVARA?

NOVARA offers each update on its start screen, with what it changes. Its signature is checked before installing.

## The agents

### macOS keeps asking for my password for the “login” keychain. Why?

Claude Code keeps its login in your macOS keychain and reads it for each agent. If the keychain is locked, macOS asks for your password at each agent. Open the **Keychain Access** app, unlock “login”, then start the agents again. NOVARA warns you when it sees the keychain locked.

### An agent ran out of tokens. What do I do?

NOVARA offers to switch to another AI if you connected several. You can also wait for your limit to end, then go on with **Resume**.

### How do I spend fewer tokens?

Choose **Eco** or **Ultra eco** in the project settings. Pictures, sounds and music made by local tools cost no tokens.

### My computer is slow. What do I do?

Turn on the project's **Light mode** and lower the number of agents in “Resources and agents”.

### I closed NOVARA during the work. Did I lose anything?

No. Tasks, decisions and interrupted work are kept. Reopen the project and use **Resume** to go on with the same team.

### Why do the agents talk to each other in English?

It costs fewer tokens. Everything meant for you stays in your language.

## Phone

### My phone does not connect.

Check that the phone and the computer are on the same Wi-Fi and that NOVARA is open. Scan the QR code in **My phone** again. Away from home, you need Tailscale on both devices.

### The photo or file button does nothing on Android.

Your NOVARA app is probably too old. Install the latest one from the phone page: in Chrome, open your NOVARA's address followed by `/novara-telephone.apk`.

### Is there an iPhone app?

No, but the page works in the iPhone's browser. You can add it to your home screen.

### Can I send any file from the phone?

Yes, in the **Library** tab, up to 200 MB per file. They arrive in the project's resources.

## Assets

### Which 3D formats can NOVARA show?

GLB, GLTF, FBX, OBJ, STL, PLY, DAE, 3DS, 3MF and USDZ, on the computer and on the phone. `.blend` files need Blender.

### My model shows without its colours. Why?

NOVARA looks for textures next to the model, in a `<name>.fbm` folder or in a `textures` folder. If they are somewhere else, the model shows without them.

### Can I put the free resources in a game I sell?

Yes. NOVARA only keeps licences that allow it (CC0, CC-BY, MIT, ISC, OFL, Pixabay licence) and refuses the others. Every file is written in `CREDITS.md`; for CC-BY licences, put the credit text in your game's end credits.

### How do I get a manga or comic-book look?

Pick the **Manga / comic** or **Anime** style for your project. The agents then use hard shadows, an inked outline and the Bangers and Comic Neue comic fonts. Before showing you a model, they compare it with pictures from real games in that style.

### Does image to 3D work on my computer?

TripoSR runs on Apple-chip Macs and on PCs (faster with an NVIDIA card). It does not run on Intel Macs. TRELLIS needs an NVIDIA card with 16 GB of video memory. Either way, it is a draft the agents rework.

### How do I report a bug?

Use **Report a bug** in NOVARA or open an issue on [GitHub](https://github.com/elinahart/novara-releases/issues).
