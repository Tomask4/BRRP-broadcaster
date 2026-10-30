const { spawn } = require("node:child_process");
const { stdin, stdout } = require("node:process");

const INTERVAL_MS = 60_000;
const categories = [
  {
    name: "Border at OSSO",
    messages: [
      "🚩 Current RP is Border at Osso! Be sure to make a visit — please follow all rules! ⚡️",
      "📢 Current RP is Border at Osso! Skipping line, honking, ramming, or sirens at the Border = KICK. Be PATIENT! ⚠️",
      "🌐 Border RP in progress at Osso! Use RIGHT lanes for checks and LEFT lane ONLY for emergency vehicles! ⚡",
      "⚠️Current RP is Border at Osso!  BANNED ITEMS: Sniper, Shotguns, StopSticks, C4/Grenades/Flashbangs. Using these = KICK! ⚠️",
      "👮 Current RP is Border at Osso! Cops: Park your patrol cars on the side while checking vehicles at the border, NOT in the road! ⚡",
      "⚠️ FRP, RDM, VDM, and Cuff Rushing are strictly banned. Doing these = BAN! ⚠️",
    ],
  },
  {
    name: "Border at Harbour",
    messages: [
      "🚛 Current Border at Harbour! Heavy trucks and cargo vehicles must use the far-left inspection lane at Harbour! ⚓",
      "🚩 Current RP is Border at Harbour! Head over and follow all border guidelines! ⚡",
      "🌐 Harbour Border in progress! Stay in your lane and wait for police instructions! ⚡",
      "⚠️ Skipping the Harbour checkline, ramming, or honking = KICK. Be patient! ⚠️",
      "⚠️ BANNED ITEMS: Sniper, Shotguns, StopSticks, C4/Grenades/Flashbangs. Using these = KICK! ⚠️",
      "⚠️ FRP, RDM, VDM, and Cuff Rushing are strictly banned. Doing these = BAN! ⚠️",
    ],
  },
  {
    name: "Border at Ares Bridge",
    messages: [
      "⚠️ Ares Bridge 2-Way Checkpoint: Stay strict in your direction lane. Do NOT cross the yellow lines or overtake! 🛑",
      "🚨 Emergency vehicles MUST wait in traffic line on Ares Bridge — 2-Way RP with NO open emergency lane active! 🚓",
      "🚩 Current RP is Border at Ares Bridge! Head over and follow all border rules! ⚡",
      "⚠️ BANNED ITEMS: Sniper, Shotguns, StopSticks, C4/Grenades/Flashbangs. Using these = KICK! ⚠️",
      "⚠️ FRP, RDM, VDM, and Cuff Rushing are strictly banned. Doing these = BAN! ⚠️",
    ],
  },
  {
    name: "Realistic Roleplay",
    messages: [
      "📢 REALISTIC RP IN PROGRESS: Follow all speed limits, road signs, and traffic lights! 🚦",
      "🚗 Drive realistically! Reckless driving, excessive speeding, or driving on grass = KICK for FailRP! ⚠️",
      "🚨 Dispatch is ACTIVE! Police units must use radio channels for vehicle and player checks. 📻",
      "👮 Civilians: Pull over to the right side of the road immediately when you hear or see sirens! 🚨",
      "⚠️ Active Scene Warning: Stay clear of crash and crime scenes unless directly involved! 🚧",
      "🏎️ High-performance sports cars MUST follow standard traffic laws. Street racing is strictly BANNED! 🛑",
      "🛑 No random u-turns or driving across highway medians. Use actual intersections! ⚠️",
      "💥 Vehicle Crashes: You MUST stop and RP engine failure or injuries after major accidents! 🩺",
      "⚠️ FRP WARNING: Drive on the correct side of the road, stop at stop signs, and use indicators! 🚦",
    ],
  },
  {
    name: "Discord Broadcasts",
    messages: [
      "📢 BECOME A STAFF MEMBER TODAY! Join BRRP Community Code: brrp ✨ 📱 1) Open Phone 2) Click Server App 3) Click Current Server 4) Read Bio Line! 💗",
      "⚡ Interested in becoming Staff? Join our community! Code: brrp ⚡ 🚧 How to find us? Go to Server Bio in your in-game phone to get started! 🔗",
      "📢 Want to join our Staff Team? Join our main group! Code: brrp | 🚧 How to join? Open Phone -> Server App -> Current Server & read the bio line! 🔗",
      "Looking for a chill & active community? 👀 Join BRRP using the community code: 💫 brrp 💫 JOIN UP — YOU DON'T WANNA MISS IT! 💗",
      "📢 Want to be part of our Admin Team? Join our community. Code:brrp | 🚧 Wondering how to join our community? Go And Look Server Bio to Join Our Community 🔗",
    ],
  },
  {
    name: "Others",
    messages: [
      "🚓 If you hear or see admin/cop sirens flashing, pull over immediately! 🚨",
      "⚠️ BANNED ITEMS: Sniper, Shotguns, StopSticks, C4/Grenades/Flashbangs. Using these = KICK! ⚠️",
      "⚠️ FRP, RDM, VDM, and Cuff Rushing are strictly banned. Doing these = BAN! ⚠️",
      "🚨 Need an Admin? Call 911 using !admin 🚨",
      "🚨 If you are in an active RP Scene, please stay out of the road! 🚓",
    ],
  },
  {
    name: "Meeting",
    messages: [
      "👮 PD MEETING: We are having a meeting at PD. Please join and participate! 🚨",
      "👮 Sit in the meeting room or stand at the back. Unruly behavior = KICK! ⚡",
    ],
  },
  {
    name: "Presidential Roleplay",
    messages: [
      "🏛️ SPECIAL RP: PRESIDENTIAL ESCORT! Protect the President during the city convoy heading to {location}! 🚘",
      "⚠️ Any vehicle attempting to ram or break into the Presidential Convoy will be terminated!",
      "🚨 CONVOY SETUP: All Emergency Services line up at the BACK OF PD immediately — ONLY Emergency Vehicles & the Presidential Vehicle allowed, NO civilian vehicles! 🛑",
    ],
  },
  {
    name: "Crimes vs Cops Roleplay",
    messages: [
      "💥 CURRENT RP: CRIMS VS COPS! Criminals head to {location} 🏦 — All Police units head to {location} immediately! 🚨",
      "💥 CURRENT RP: CRIMS VS COPS! Criminals taking over {location} 🌉 — All Police units head to {location} now! 🚨",
      "⚠️ CRIMS VS COPS RULES: Police are NOT allowed to cuff criminals during active gunfires or pursuits! 🚨",
      "📢 SCENE IS ACTIVE! Criminals & Police may now open fire — NO CUFF RUSHING! 💥",
      "💥 CRIMS VS COPS HAS STARTED! Both sides are authorized to engage — VALUE YOUR LIFE! 🚨",
    ],
  },
  {
    name: "Car meet",
    messages: [
      "🏎️ CURRENT RP: Car meet at {location} Bring your nicest car! 🏎️",
    ],
  },
  {
    name: "Voting",
    messages: [],
    voteOptions: [
      { name: "Realistic RP", gesture: "SPIN" },
      { name: "Border RP", gesture: "SIT" },
      { name: "Special RP (requires permission)", gesture: "JUMP" },
    ],
  },
];

function powershellEncodedCommand(message, soundEnabled) {
  const messageBase64 = Buffer.from(message, "utf8").toString("base64");
  const script = `
$ErrorActionPreference = 'Stop'
$message = [Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('${messageBase64}'))
$soundEnabled = $${soundEnabled ? "true" : "false"}
Add-Type -AssemblyName System.Windows.Forms
Add-Type -TypeDefinition @'
using System;
using System.ComponentModel;
using System.IO;
using System.Media;
using System.Runtime.InteropServices;
public static class RobloxInput {
    [DllImport("user32.dll")] public static extern IntPtr GetForegroundWindow();
    [DllImport("user32.dll")] public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint processId);
    [StructLayout(LayoutKind.Sequential)]
    public struct KEYBDINPUT {
        public ushort wVk;
        public ushort wScan;
        public uint dwFlags;
        public uint time;
        public UIntPtr dwExtraInfo;
    }
    [StructLayout(LayoutKind.Sequential)]
    public struct MOUSEINPUT {
        public int dx;
        public int dy;
        public uint mouseData;
        public uint dwFlags;
        public uint time;
        public UIntPtr dwExtraInfo;
    }
    [StructLayout(LayoutKind.Sequential)]
    public struct HARDWAREINPUT {
        public uint uMsg;
        public ushort wParamL;
        public ushort wParamH;
    }
    [StructLayout(LayoutKind.Explicit)]
    public struct INPUTUNION {
        [FieldOffset(0)] public MOUSEINPUT mi;
        [FieldOffset(0)] public KEYBDINPUT ki;
        [FieldOffset(0)] public HARDWAREINPUT hi;
    }
    [StructLayout(LayoutKind.Sequential)]
    public struct INPUT {
        public uint type;
        public INPUTUNION U;
    }
    [DllImport("user32.dll", SetLastError = true)]
    public static extern uint SendInput(uint count, INPUT[] inputs, int size);
    public static void Key(ushort scanCode, bool keyUp) {
        INPUT input = new INPUT();
        input.type = 1;
        input.U.ki.wScan = scanCode;
        input.U.ki.dwFlags = 8u | (keyUp ? 2u : 0u);
        INPUT[] inputs = new INPUT[] { input };
        if (SendInput(1, inputs, Marshal.SizeOf(typeof(INPUT))) != 1)
            throw new Win32Exception(Marshal.GetLastWin32Error(), "SendInput did not insert the key event.");
    }
}
public static class BroadcastPing {
    public static void Play() {
        const int sampleRate = 44100;
        int firstLength = sampleRate / 10;
        int secondLength = sampleRate * 16 / 100;
        int gapLength = sampleRate / 100;
        int dataLength = (firstLength + secondLength + gapLength) * 2;
        byte[] wave;
        using (MemoryStream stream = new MemoryStream())
        using (BinaryWriter writer = new BinaryWriter(stream)) {
            writer.Write(new char[] { 'R', 'I', 'F', 'F' });
            writer.Write(36 + dataLength);
            writer.Write(new char[] { 'W', 'A', 'V', 'E', 'f', 'm', 't', ' ' });
            writer.Write(16);
            writer.Write((short)1);
            writer.Write((short)1);
            writer.Write(sampleRate);
            writer.Write(sampleRate * 2);
            writer.Write((short)2);
            writer.Write((short)16);
            writer.Write(new char[] { 'd', 'a', 't', 'a' });
            writer.Write(dataLength);
            WriteTone(writer, 880, firstLength, sampleRate);
            for (int i = 0; i < gapLength; i++) writer.Write((short)0);
            WriteTone(writer, 1320, secondLength, sampleRate);
            wave = stream.ToArray();
        }
        using (MemoryStream stream = new MemoryStream(wave))
        using (SoundPlayer player = new SoundPlayer(stream)) {
            player.PlaySync();
        }
    }

    private static void WriteTone(BinaryWriter writer, int frequency, int length, int sampleRate) {
        for (int i = 0; i < length; i++) {
            double attack = Math.Min(1.0, i / 220.0);
            double release = Math.Min(1.0, (length - i) / 1100.0);
            double envelope = Math.Min(attack, release);
            short sample = (short)(Math.Sin(2.0 * Math.PI * frequency * i / sampleRate) * 10000.0 * envelope);
            writer.Write(sample);
        }
    }
}
'@
function Test-RobloxForeground {
    $window = [RobloxInput]::GetForegroundWindow()
    $processId = 0
    [void][RobloxInput]::GetWindowThreadProcessId($window, [ref]$processId)
    $process = Get-Process -Id $processId -ErrorAction SilentlyContinue
    return $process -and $process.ProcessName -eq 'RobloxPlayerBeta'
}
if (-not (Test-RobloxForeground)) {
    Write-Output 'SKIPPED'
    exit 0
}
[Windows.Forms.Clipboard]::SetText($message)
if (-not (Test-RobloxForeground)) {
    Write-Output 'SKIPPED'
    exit 0
}
if ($soundEnabled) {
    [BroadcastPing]::Play()
    Start-Sleep -Milliseconds 3000
}
if (-not (Test-RobloxForeground)) {
    Write-Output 'SKIPPED'
    exit 0
}
function Press-Key([UInt16]$scanCode) {
    [RobloxInput]::Key($scanCode, $false)
    Start-Sleep -Milliseconds 60
    [RobloxInput]::Key($scanCode, $true)
}
# Use the standard PC scan code for F2 rather than its virtual-key code.
Press-Key 0x3C
Start-Sleep -Milliseconds 150
if (-not (Test-RobloxForeground)) {
    Write-Output 'SKIPPED'
    exit 0
}
[RobloxInput]::Key(0x1D, $false)
Press-Key 0x1E
[RobloxInput]::Key(0x1D, $true)
Start-Sleep -Milliseconds 75
if (-not (Test-RobloxForeground)) {
    Write-Output 'SKIPPED'
    exit 0
}
[RobloxInput]::Key(0x1D, $false)
Press-Key 0x2F
[RobloxInput]::Key(0x1D, $true)
Start-Sleep -Milliseconds 150
if (-not (Test-RobloxForeground)) {
    Write-Output 'SKIPPED'
    exit 0
}
Press-Key 0x1C
Write-Output 'INPUT_SUBMITTED'
`;
  return Buffer.from(script, "utf16le").toString("base64");
}

function sendToRoblox(message, soundEnabled) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      "powershell.exe",
      [
        "-NoProfile",
        "-STA",
        "-NonInteractive",
        "-ExecutionPolicy",
        "Bypass",
        "-EncodedCommand",
        powershellEncodedCommand(message, soundEnabled),
      ],
      { windowsHide: true, stdio: ["ignore", "pipe", "pipe"] },
    );
    let output = "";
    let errorOutput = "";
    child.stdout.setEncoding("utf8").on("data", (chunk) => {
      output += chunk;
    });
    child.stderr.setEncoding("utf8").on("data", (chunk) => {
      errorOutput += chunk;
    });
    child.once("error", reject);
    child.once("close", (code) => {
      if (code !== 0) {
        reject(new Error(errorOutput.trim() || `PowerShell exited with code ${code}`));
        return;
      }
      resolve(output.trim());
    });
  });
}

class TerminalUI {
  constructor() {
    if (!stdin.isTTY || typeof stdin.setRawMode !== "function") {
      throw new Error("Run this app in a Windows Terminal or Command Prompt window.");
    }
    this.queue = [];
    this.waiters = [];
    this.onKeypress = (sequence, key) => {
      if (key.ctrl && key.name === "c") {
        this.queueKey({ name: "exit" });
      } else {
        this.queueKey({ name: key.name, sequence });
      }
    };
    require("node:readline").emitKeypressEvents(stdin);
    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("keypress", this.onKeypress);
  }

  queueKey(input) {
    const waiter = this.waiters.shift();
    if (waiter) {
      clearTimeout(waiter.timer);
      waiter.resolve(input);
    } else {
      this.queue.push(input);
    }
  }

  nextKey(timeoutMs) {
    if (this.queue.length) {
      return Promise.resolve(this.queue.shift());
    }
    return new Promise((resolve) => {
      const waiter = { resolve, timer: null };
      if (timeoutMs !== undefined) {
        waiter.timer = setTimeout(() => {
          this.waiters = this.waiters.filter((item) => item !== waiter);
          resolve(null);
        }, timeoutMs);
      }
      this.waiters.push(waiter);
    });
  }

  render(lines) {
    stdout.write(`\x1b[2J\x1b[H\x1b[?25l${lines.join("\n")}\n`);
  }

  async readText(prompt) {
    let value = "";
    while (true) {
      this.render([
        "\x1b[1;36mBRRP BROADCASTER\x1b[0m",
        "",
        prompt,
        `\x1b[1;33m> ${value}\x1b[0m`,
        "",
        "\x1b[90mEnter: confirm    Esc: back\x1b[0m",
      ]);
      const key = await this.nextKey();
      if (key.name === "exit") {
        return null;
      }
      if (key.name === "return") {
        return value.trim();
      }
      if (key.name === "escape") {
        return null;
      }
      if (key.name === "backspace") {
        value = Array.from(value).slice(0, -1).join("");
      } else if (key.sequence && !key.sequence.startsWith("\u001b") && Array.from(key.sequence).length === 1) {
        value += key.sequence;
      }
    }
  }

  async selectVoteOptions(options) {
    const selected = new Set(options.map((_, index) => index));
    let cursor = 0;
    while (true) {
      this.render([
        "\x1b[1;36mBRRP BROADCASTER\x1b[0m",
        "",
        "\x1b[1mCHOOSE VOTE OPTIONS\x1b[0m",
        "Toggle options with Space. At least one choice is required.",
        "",
        ...options.map((option, index) => {
          const checked = selected.has(index) ? "x" : " ";
          const marker = index === cursor ? "\x1b[1;36m ❯ " : "   ";
          return `${marker}[${checked}] ${option.name}${index === cursor ? "\x1b[0m" : ""}`;
        }),
        "",
        "\x1b[90m↑/↓ Navigate   Space: toggle   Enter: confirm   Esc: back\x1b[0m",
      ]);
      const key = await this.nextKey();
      if (key.name === "exit" || key.name === "escape") {
        return null;
      }
      if (key.name === "up") {
        cursor = (cursor + options.length - 1) % options.length;
      } else if (key.name === "down") {
        cursor = (cursor + 1) % options.length;
      } else if (key.name === "space") {
        if (selected.has(cursor)) {
          selected.delete(cursor);
        } else {
          selected.add(cursor);
        }
      } else if (key.name === "return" && selected.size > 0) {
        return options.filter((_, index) => selected.has(index));
      }
    }
  }

  close() {
    stdin.removeListener("keypress", this.onKeypress);
    if (stdin.isTTY && typeof stdin.setRawMode === "function") {
      stdin.setRawMode(false);
    }
    stdout.write("\x1b[?25h\x1b[0m\x1b[2J\x1b[H");
  }
}

function renderPicker(ui, selected, soundEnabled) {
  ui.render([
    "\x1b[1;36m╔══════════════════════════════════════════════╗",
    "║             BRRP BROADCASTER                 ║",
    "╚══════════════════════════════════════════════╝\x1b[0m",
    "",
    "\x1b[90mUse only when authorized. Some roleplays require permission.\x1b[0m",
    "",
    "\x1b[1mSELECT A ROLEPLAY\x1b[0m",
    ...categories.map((category, index) =>
      `${index === selected ? "\x1b[1;36m ❯ " : "   "}${category.name}${index === selected ? "  ◀\x1b[0m" : ""}`,
    ),
    "",
    `\x1b[90m↑/↓ Navigate     Enter: select     S: sound ${soundEnabled ? "ON" : "OFF"}     X: exit\x1b[0m`,
  ]);
}

async function main() {
  if (process.platform !== "win32") {
    throw new Error("This program only runs on Windows.");
  }

  const ui = new TerminalUI();
  try {
    let selected = 0;
    let soundEnabled = true;
    while (true) {
      renderPicker(ui, selected, soundEnabled);
      const key = await ui.nextKey();
      if (key.name === "exit" || key.sequence?.toLowerCase() === "x") {
        return;
      }
      if (key.sequence?.toLowerCase() === "s") {
        soundEnabled = !soundEnabled;
        continue;
      }
      if (key.name === "up") {
        selected = (selected + categories.length - 1) % categories.length;
        continue;
      }
      if (key.name === "down") {
        selected = (selected + 1) % categories.length;
        continue;
      }
      if (key.name !== "return") {
        continue;
      }

      const category = categories[selected];
      let messages = category.messages;
      if (messages.some((message) => message.includes("{location}"))) {
        const location = await ui.readText(`Enter a location for ${category.name}:`);
        if (location === null) {
          continue;
        }
        if (!location) {
          continue;
        }
        messages = messages.map((message) => message.replaceAll("{location}", location));
      }
      if (category.voteOptions) {
        const selectedOptions = await ui.selectVoteOptions(category.voteOptions);
        if (!selectedOptions) {
          continue;
        }
        const chatChoices = selectedOptions
          .map((option, index) => `${index + 1}) ${option.name.replace(" (requires permission)", "")}`)
          .join(" | ");
        const gestureChoices = selectedOptions
          .map((option) => `${option.gesture} = ${option.name.replace(" (requires permission)", "")}`)
          .join(" | ");
        messages = [
          `🚨 VOTE IN CHAT: ${chatChoices} 🚨`,
          `🚨 RP VOTE TIME: ${gestureChoices} | Cast your vote now! 🗳️`,
        ];
      }

      ui.render([
        "\x1b[1;36mBRRP BROADCASTER\x1b[0m",
        "",
        `Selected roleplay: \x1b[1m${category.name}\x1b[0m`,
        `Messages in rotation: ${messages.length}`,
        "",
        "Switch to Roblox before starting. The first broadcast starts after a 3-second countdown.",
        "Messages are sent only while Roblox is the active window.",
        `Pre-broadcast ping and 3-second warning: ${soundEnabled ? "ON" : "OFF"} (press S during rotation to toggle)`,
        "",
        "\x1b[90mEnter: start rotation     Esc: back to roleplay list\x1b[0m",
      ]);
      const confirmation = await ui.nextKey();
      if (confirmation.name === "exit") {
        return;
      }
      if (confirmation.name !== "return") {
        continue;
      }

      let stopReason = null;
      let index = 0;
      let submittedCount = 0;
      let state = "Starting";
      let lastStatus = "Switch to Roblox now; first attempt in 3 seconds.";
      let secondsLeft = 3;
      const renderStatus = () => ui.render([
        "\x1b[1;36mBRRP BROADCASTER  /  ROTATION ACTIVE\x1b[0m",
        "",
        `Roleplay: \x1b[1m${category.name}\x1b[0m`,
        `Status: ${state}`,
        `Pre-broadcast ping + 3-second warning: ${soundEnabled ? "ON" : "OFF"}`,
        `Messages submitted: ${submittedCount}`,
        "",
        lastStatus,
        ...(state === "Starting" ? [`\x1b[1;33mSwitch to Roblox — ${secondsLeft}...\x1b[0m`] : []),
        "",
        "\x1b[90mQ / Esc: change roleplay     X / Ctrl+C: exit\x1b[0m",
      ]);
      const waitForStop = async (durationMs) => {
        const deadline = Date.now() + durationMs;
        while (!stopReason) {
          const key = await ui.nextKey(Math.max(0, deadline - Date.now()));
          if (!key) {
            return;
          }
          if (key.name === "exit" || key.sequence?.toLowerCase() === "x") {
            stopReason = "x";
          } else if (key.sequence?.toLowerCase() === "q" || key.name === "escape") {
            stopReason = "q";
          } else if (key.sequence?.toLowerCase() === "s") {
            soundEnabled = !soundEnabled;
            renderStatus();
          }
        }
      };
      renderStatus();

      for (secondsLeft = 3; secondsLeft > 0 && !stopReason; secondsLeft -= 1) {
          renderStatus();
          await waitForStop(1_000);
      }

      state = "Running";
      while (!stopReason) {
        try {
          const status = await sendToRoblox(`message Broadcast @all ${messages[index]}`, soundEnabled);
          if (status === "INPUT_SUBMITTED") {
            submittedCount += 1;
            lastStatus = `Submitted message ${index + 1}/${messages.length}; verify it appeared in-game.`;
            index = (index + 1) % messages.length;
          } else {
            lastStatus = "Skipped: Roblox lost foreground focus before input was submitted.";
          }
        } catch (error) {
          lastStatus = `Input failed: ${error.message}`;
        }
        renderStatus();
        if (!stopReason) {
          await waitForStop(INTERVAL_MS);
        }
      }

      if (stopReason === "x") {
        return;
      }
    }
  } finally {
    ui.close();
  }
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exitCode = 1;
});
