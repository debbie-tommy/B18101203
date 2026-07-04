/* =====================================================
   AdventureOS v2
   "Date Save File Engine"
   Mobile-friendly interactive memory terminal
===================================================== */

/* ---------- DOM ---------- */

const output = document.getElementById("terminal-output");
const input = document.getElementById("commandInput");

/* ---------- STATE ---------- */

let typing = false;
let storyIndex = 0;

/* ---------- CONFIG (EDIT THIS LATER) ---------- */

const CONFIG = {
    player: "Alexander",
    coOp: "Debbie",

    dateLogs: [
        {
            title: "25/06 - Brunswick District",
            lines: [
                "[BOOT] Session initiated",
                "Location: Eydies Bar",
                "Event: Vodka sodas acquired",
                "Item exchange detected: Butterfly sticker ↔ Jacket",
                "Handholding: ENABLED",
                "",
                "[MINIGAME] Pool Match",
                "Result: Alexander wins (but mercy points detected)",
                "Status: playful cheating suspected"
            ]
        },
        {
            title: "Tram Stop Event",
            lines: [
                "Wind: light",
                "Mood: unstable (good kind)",
                "",
                "[CUTSCENE]",
                "Twirl sequence executed",
                "Unexpected kiss event triggered",
                "",
                "System note: memory saved as FAVORITE"
            ]
        },
        {
            title: "26/06 - Post Dinner Arc",
            lines: [
                "Status: slightly tipsy but functional",
                "Walk mode: slow city exploration",
                "Park event: unlocked",
                "Home return: successful",
                "",
                "[SAVE] overnight co-op sleep detected",
                "Sync: successful"
            ]
        },
        {
            title: "03/07 - Movie Night",
            lines: [
                "Mission: Movie Marathon",
                "Status: FAILED (soft fail)",
                "",
                "Reason:",
                "Cuddling override detected",
                "",
                "System classification updated:",
                "\"Comfort Co-op Mode\""
            ]
        }
    ],

    quests: [
        "Sorrento Trip",
        "Dice Game x Soju",
        "Cook Together",
        "Read in the Park",
        "Pool Rematch",
        "Find Caterpillar",
        "Jam Session",
        "Get yo ass beaten in Badminton",
        "Get my ass beaten in Tennis",
        "Picnic Hamper - Sydney Harbour bridge version for Melb"
    ]
};

/* ---------- TYPE ENGINE ---------- */

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function typeLine(text, speed = 18) {
    typing = true;

    const line = document.createElement("div");
    output.appendChild(line);

    for (let i = 0; i < text.length; i++) {
        line.innerHTML += text[i];
        await sleep(speed);
        output.scrollTop = output.scrollHeight;
    }

    typing = false;
}

/* ---------- PRINT BLOCK ---------- */

async function printBlock(lines, delay = 250) {
    for (const line of lines) {
        await typeLine(line);
        await sleep(delay);
    }
}

/* ---------- BOOT SEQUENCE ---------- */

async function boot() {

    await typeLine("$ boot feelings.save");
    await sleep(300);

    await typeLine("Initializing AdventureOS...");
    await typeLine(`Player: ${CONFIG.player}`);
    await typeLine(`Co-op: ${CONFIG.coOp}`);
    await sleep(500);

    await typeLine("");
    await typeLine("Loading memory fragments...");
    await sleep(300);

    await typeLine("████████████████ 100%");
    await sleep(500);

    await typeLine("");
    await typeLine("System ready.");
    await typeLine("Type 'help' or 'run memory' to begin.");
}

/* ---------- MEMORY PLAYER ---------- */

async function runMemory() {

    for (let session of CONFIG.dateLogs) {

        await typeLine("");
        await typeLine("================================");
        await typeLine(session.title);
        await typeLine("================================");
        await sleep(400);

        await printBlock(session.lines);
        await sleep(700);
    }

    await typeLine("");
    await typeLine("MEMORY STREAM COMPLETE.");
    await typeLine("More data pending future sessions...");
}

/* ---------- QUEST VIEW ---------- */

async function showQuests() {

    await typeLine("");
    await typeLine("=== QUEST LOG ===");
    await sleep(300);

    for (let q of CONFIG.quests) {
        await typeLine("☐ " + q);
    }

    await typeLine("");
    await typeLine("Status: awaiting next adventure 🌸");
}

/* ---------- SECRET MESSAGE ---------- */

async function secret() {

    await typeLine("");
    await typeLine("[DECRYPTING...]");
    await sleep(800);

    await typeLine("");
    await typeLine("You’ve been turning ordinary days into really good ones.");
    await typeLine("I notice it more than I say :*");
    await typeLine("");
    await typeLine("Thanks for yesterday xx");
    await typeLine("See you on the next quest 🌸");
}

/* ---------- HELP ---------- */

async function help() {

    await typeLine("");
    await typeLine("Available commands:");
    await typeLine("run memory   → replay sessions");
    await typeLine("quests       → show future quests");
    await typeLine("secret       → hidden message");
    await typeLine("clear        → reset terminal");
}

/* ---------- COMMAND HANDLER ---------- */

async function handleCommand(cmd) {

    const c = cmd.trim().toLowerCase();

    const line = document.createElement("div");
    line.innerHTML = `<span style="color:#58ff58;">$</span> ${cmd}`;
    output.appendChild(line);

    switch (c) {

        case "help":
            await help();
            break;

        case "run memory":
            await runMemory();
            break;

        case "quests":
            await showQuests();
            break;

        case "secret":
            await secret();
            break;

        case "clear":
            output.innerHTML = "";
            break;

        default:
            await typeLine(`Unknown command: ${cmd}`);
            await typeLine("Type 'help' to see available commands.");
    }
}

/* ---------- INPUT ---------- */

input.addEventListener("keydown", async (e) => {

    if (e.key === "Enter") {

        const value = input.value;
        input.value = "";

        if (!typing) {
            await handleCommand(value);
        }
    }
});

/* ---------- INIT ---------- */

window.onload = boot;