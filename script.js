/* =========================================
   AdventureOS Terminal - Core Engine
   Version 1
========================================= */

const output = document.getElementById("terminal-output");
const input = document.getElementById("commandInput");

let queue = [];
let typing = false;

/* ---------- TYPEWRITER ENGINE ---------- */

function typeLine(text, speed = 25, callback) {
    typing = true;

    const line = document.createElement("div");
    output.appendChild(line);

    let i = 0;

    function typeChar() {
        if (i < text.length) {
            line.innerHTML += text.charAt(i);
            i++;
            output.scrollTop = output.scrollHeight;
            setTimeout(typeChar, speed);
        } else {
            typing = false;
            if (callback) callback();
        }
    }

    typeChar();
}

/* ---------- QUEUE SYSTEM ---------- */

function runQueue(lines) {
    queue = [...lines];

    function next() {
        if (queue.length === 0) return;

        const item = queue.shift();

        typeLine(item, 18, () => {
            setTimeout(next, 400);
        });
    }

    next();
}

/* ---------- BOOT SEQUENCE ---------- */

function startBoot() {
    const bootLines = [
        "$ boot feelings.exe",
        "Initializing AdventureOS...",
        "Loading memories...",
        "✓ Coffee",
        "✓ Pink peonies detected 🌸",
        "✓ Cuddling subroutine active",
        "",
        "Running emotional diagnostics...",
        "Kindness...............OK",
        "Humour.................OK",
        "Flower appreciation....MAX",
        "",
        "System ready.",
        "",
        "Type 'help' or press ENTER to continue..."
    ];

    runQueue(bootLines);
}

/* ---------- COMMAND HANDLER ---------- */

function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();

    const line = document.createElement("div");
    line.innerHTML = `<span style="color:#58ff58;">$</span> ${cmd}`;
    output.appendChild(line);

    switch (command) {

        case "help":
            runQueue([
                "Available commands:",
                "help - show commands",
                "secret - unlock hidden message",
                "clear - clear terminal"
            ]);
            break;

        case "secret":
            runQueue([
                "Decrypting...",
                "",
                "I had a really nice time yesterday.",
                "The peonies were really sweet 🌸",
                "",
                "See you soon?"
            ]);
            break;

        case "clear":
            output.innerHTML = "";
            break;

        default:
            runQueue([
                `Command not found: ${cmd}`,
                "Type 'help' for available commands."
            ]);
    }
}

/* ---------- INPUT ---------- */

input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const value = input.value;
        input.value = "";

        handleCommand(value);
    }
});

/* ---------- ENTER TO CONTINUE ---------- */

document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !typing) {
        // Optional: you can expand this later into story progression
    }
});

/* ---------- INIT ---------- */

window.onload = startBoot;