# BRRP Roleplay Broadcaster

A Windows console utility that rotates through the supplied roleplay broadcast
messages. Use it only when you have permission to broadcast in the server;
some roleplays may require additional permission.

## Build

Install Node.js 20 or newer, then run:

```powershell
npm install
npm run build
```

The executable is created at `dist\BRRP-Broadcaster-PingTone.exe`.

## Use

1. Run the executable and use the Up/Down arrow keys to navigate roleplay
   categories. The screen redraws in place instead of adding a new list to the
   terminal scrollback.
2. Press Enter to select a category. Enter a location for roleplays with
   location placeholders (including Presidential Roleplay, Crimes vs Cops, and
   Car meet), then press Enter again to start.
3. Voting opens a multi-select list. Use Up/Down to move, Space to toggle
   Realistic RP, Border RP, and Special RP, then Enter to confirm. At least one
   option must be selected. Special RP may require additional permission.
4. Switch to Roblox during the three-second countdown.
5. The first message is attempted after the countdown; subsequent messages are
   attempted once per minute.
6. Input is submitted only if `RobloxPlayerBeta.exe` is the foreground window.
   The app sends F2 directly (not Fn+F2), then Ctrl+A, Ctrl+V, and Enter as
   keyboard scan codes using Windows `SendInput`. Ticks while Roblox is not
   active are skipped and are not queued.
7. A distinct two-tone rising ping is on by default. When enabled, it plays
   three seconds before the key sequence; press `s` in the picker or during a
   rotation to toggle the ping and its warning delay on or off.
8. To change roleplay without closing the app, switch back to the console and
   press `q` or Escape. The roleplay picker will appear again.
9. Press `x` or Ctrl+C to exit.

The app opens the command prompt with F2, selects existing text with Ctrl+A,
pastes the broadcast, and presses Enter. Roblox does not report command
acceptance to this app, so the console reports that input was submitted rather
than claiming the in-game broadcast succeeded. Verify the first message in-game.
If the key sequence still does not reach Roblox, run the app and Roblox at the
same privilege level and check whether Roblox accepts keyboard input from other
macros. The app does not attempt to bypass Roblox permissions or command access.
