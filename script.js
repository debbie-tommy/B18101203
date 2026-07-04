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
    ],

    /* ---------- MINI CROSSWORD (EDIT ANSWERS HERE) ---------- */
    /* rows/cols define the grid size. Each word has a start row/col,
       a direction ('across' or 'down'), the answer (no spaces),
       and the clue shown in the list. Numbers are assigned
       automatically based on grid position. */
    crossword: {
        rows: 7,
        cols: 8,
        words: [
            { num: 1, dir: "across", row: 0, col: 0, answer: "FELINE", clue: "Rhymes with mine" },
            { num: 2, dir: "down",   row: 0, col: 4, answer: "NOW",     clue: "Wish I could see you" },
            { num: 3, dir: "down",   row: 0, col: 7, answer: "JAZZING", clue: "Together we could be -" },
            { num: 4, dir: "across", row: 4, col: 0, answer: "SLEEP",   clue: "Spoils all our plans but not really" },
            { num: 5, dir: "across", row: 6, col: 0, answer: "APEX",    clue: "Not big on video games but do you play?" }
        ]
    }
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

        case "hey":
        case "hi":
        case "hello":

            await typeLine("");
            await typeLine("Hey handsome 😏");
            await typeLine("");
            await typeLine("Sorry, I can’t reply to your next text...");
            await typeLine("I’m currently distracted thinking about you.");
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

const tracks = [
  {
    title: "Jamiroquai – Blow Your Mind",
    src: "music/blow-your-mind.mp3"
  },
  {
    title: "Emotional Oranges – West Coast Love",
    src: "music/west-coast-love.mp3"
  }
];

let currentIndex = 0;
let isPlaying = false;
let shuffleOn = false;
let repeatOn = false;

const player = document.getElementById("audioPlayer");
const title = document.getElementById("trackTitle");
const artistEl = document.getElementById("trackArtist");
const playBtn = document.getElementById("playBtn");
const seekBar = document.getElementById("seekBar");
const curTimeEl = document.getElementById("curTime");
const durTimeEl = document.getElementById("durTime");
const likeBtn = document.getElementById("likeBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const repeatBtn = document.getElementById("repeatBtn");
const visualizer = document.getElementById("visualizer");
const songButtons = document.querySelectorAll(".song-btn");

/* build the little animated bars once */
const BAR_COUNT = 24;
for (let i = 0; i < BAR_COUNT; i++) {
    const bar = document.createElement("span");
    visualizer.appendChild(bar);
}
const bars = visualizer.querySelectorAll("span");
let visualizerTimer = null;

function fmtTime(sec) {
    if (!isFinite(sec) || sec < 0) sec = 0;
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function splitTitle(full) {
    const parts = full.split(/\s*[–-]\s*/);
    if (parts.length > 1) {
        return { artist: parts[0], song: parts.slice(1).join(" - ") };
    }
    return { artist: "", song: full };
}

function loadTrack(index) {
    currentIndex = index;
    player.src = tracks[index].src;

    const { artist, song } = splitTitle(tracks[index].title);
    title.textContent = song;
    artistEl.textContent = artist;

    songButtons.forEach(btn => {
        btn.classList.toggle("now-playing-btn", Number(btn.dataset.index) === index);
    });

    seekBar.value = 0;
    seekBar.style.setProperty("--progress", "0%");
    curTimeEl.textContent = "0:00";
    durTimeEl.textContent = "0:00";
}

function startVisualizer() {
    clearInterval(visualizerTimer);
    visualizerTimer = setInterval(() => {
        bars.forEach(b => {
            b.style.height = (isPlaying ? 15 + Math.random() * 85 : 20) + "%";
        });
    }, 220);
}

function playTrack(index) {
    loadTrack(index);
    player.play().catch(() => {});
    isPlaying = true;
    playBtn.textContent = "⏸";
    startVisualizer();
}

function togglePlay() {
    if (!player.src) {
        loadTrack(0);
    }

    if (isPlaying) {
        player.pause();
        playBtn.textContent = "▶";
    } else {
        player.play().catch(() => {});
        playBtn.textContent = "⏸";
    }

    isPlaying = !isPlaying;
    startVisualizer();
}

function nextTrack() {
    let next;
    if (shuffleOn && tracks.length > 1) {
        do { next = Math.floor(Math.random() * tracks.length); } while (next === currentIndex);
    } else {
        next = (currentIndex + 1) % tracks.length;
    }
    playTrack(next);
}

function prevTrack() {
    let prev = (currentIndex - 1 + tracks.length) % tracks.length;
    playTrack(prev);
}

/* progress bar sync */
player.addEventListener("loadedmetadata", () => {
    durTimeEl.textContent = fmtTime(player.duration);
});

player.addEventListener("timeupdate", () => {
    if (!player.duration) return;
    const pct = (player.currentTime / player.duration) * 100;
    seekBar.value = pct;
    seekBar.style.setProperty("--progress", pct + "%");
    curTimeEl.textContent = fmtTime(player.currentTime);
});

player.addEventListener("ended", () => {
    if (repeatOn) {
        player.currentTime = 0;
        player.play().catch(() => {});
    } else {
        nextTrack();
    }
});

seekBar.addEventListener("input", () => {
    if (!player.duration) return;
    player.currentTime = (seekBar.value / 100) * player.duration;
});

likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("liked");
});

shuffleBtn.addEventListener("click", () => {
    shuffleOn = !shuffleOn;
    shuffleBtn.classList.toggle("active", shuffleOn);
});

repeatBtn.addEventListener("click", () => {
    repeatOn = !repeatOn;
    repeatBtn.classList.toggle("active", repeatOn);
});

startVisualizer();

/* =====================================================
   MINI CROSSWORD ENGINE
===================================================== */

const cwGrid = document.getElementById("crosswordGrid");
const acrossList = document.getElementById("acrossClues");
const downList = document.getElementById("downClues");
const checkBtn = document.getElementById("checkAnswersBtn");
const clearBtn = document.getElementById("clearAnswersBtn");
const cwResult = document.getElementById("crosswordResult");
const crosswordLike = document.getElementById("crosswordLike");
const crosswordWidget = document.getElementById("crosswordWidget");

function buildCrosswordModel() {
    const { rows, cols, words } = CONFIG.crossword;

    const model = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => null)
    );

    words.forEach(word => {
        for (let i = 0; i < word.answer.length; i++) {
            const r = word.dir === "down" ? word.row + i : word.row;
            const c = word.dir === "across" ? word.col + i : word.col;

            if (!model[r][c]) {
                model[r][c] = { letter: word.answer[i], number: null, inputs: [] };
            }

            if (i === 0) {
                model[r][c].number = word.num;
            }
        }
    });

    return model;
}

function renderCrossword() {
    const { rows, cols } = CONFIG.crossword;
    const model = buildCrosswordModel();

    cwGrid.style.gridTemplateColumns = `repeat(${cols}, 26px)`;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cellData = model[r][c];
            const cellEl = document.createElement("div");
            cellEl.className = "cw-cell";

            if (!cellData) {
                cellEl.classList.add("blocked");
            } else {
                if (cellData.number) {
                    const num = document.createElement("span");
                    num.className = "cw-number";
                    num.textContent = cellData.number;
                    cellEl.appendChild(num);
                }

                const input = document.createElement("input");
                input.maxLength = 1;
                input.dataset.row = r;
                input.dataset.col = c;
                input.dataset.answer = cellData.letter;

                input.addEventListener("input", () => {
                    input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "");
                    input.classList.remove("correct", "incorrect");
                    if (input.value) {
                        focusNextCell(r, c);
                    }
                });

                cellEl.appendChild(input);
            }

            cwGrid.appendChild(cellEl);
        }
    }
}

function focusNextCell(row, col) {
    const inputs = Array.from(cwGrid.querySelectorAll("input"));
    const sameRow = inputs.filter(i => Number(i.dataset.row) === row);
    const next = sameRow.find(i => Number(i.dataset.col) === col + 1);
    if (next) {
        next.focus();
    }
}

function renderClues() {
    const across = CONFIG.crossword.words.filter(w => w.dir === "across");
    const down = CONFIG.crossword.words.filter(w => w.dir === "down");

    across.forEach(w => {
        const li = document.createElement("li");
        li.dataset.num = w.num;
        li.textContent = w.clue;
        acrossList.appendChild(li);
    });

    down.forEach(w => {
        const li = document.createElement("li");
        li.dataset.num = w.num;
        li.textContent = w.clue;
        downList.appendChild(li);
    });
}

function checkCrosswordAnswers() {
    const inputs = cwGrid.querySelectorAll("input");
    let filled = 0;
    let correct = 0;

    inputs.forEach(input => {
        if (input.value) filled++;
        if (input.value === input.dataset.answer) {
            input.classList.add("correct");
            input.classList.remove("incorrect");
            correct++;
        } else if (input.value) {
            input.classList.add("incorrect");
            input.classList.remove("correct");
        }
    });

    if (correct === inputs.length) {
        cwResult.textContent = "💚 all correct — you know me too well";
        cwResult.style.color = "#7dff7d";
    } else if (filled === 0) {
        cwResult.textContent = "fill in a few letters first";
        cwResult.style.color = "#999";
    } else {
        cwResult.textContent = `${correct}/${inputs.length} correct — keep going`;
        cwResult.style.color = "#ffd966";
    }
}

function clearCrosswordAnswers() {
    const inputs = cwGrid.querySelectorAll("input");
    inputs.forEach(input => {
        input.value = "";
        input.classList.remove("correct", "incorrect");
    });
    cwResult.textContent = "";
}

checkBtn.addEventListener("click", checkCrosswordAnswers);
clearBtn.addEventListener("click", clearCrosswordAnswers);
crosswordLike.addEventListener("click", () => crosswordLike.classList.toggle("liked"));

renderCrossword();
renderClues();

/* =====================================================
   MINIMIZE TOGGLES
===================================================== */

const spotifyWidget = document.getElementById("spotifyWidget");
const spotifyMinimize = document.getElementById("spotifyMinimize");
const crosswordMinimize = document.getElementById("crosswordMinimize");

spotifyMinimize.addEventListener("click", () => {
    spotifyWidget.classList.toggle("minimized");
    spotifyMinimize.classList.toggle("rotated");
});

crosswordMinimize.addEventListener("click", () => {
    crosswordWidget.classList.toggle("minimized");
    crosswordMinimize.classList.toggle("rotated");
});

/* =====================================================
   BOTTOM DOCK
===================================================== */

const dockFolder = document.getElementById("dockFolder");
const dockHeart = document.getElementById("dockHeart");
const dockTerminal = document.getElementById("dockTerminal");
const dockSparkle = document.getElementById("dockSparkle");

dockFolder?.addEventListener("click", () => {
    output.innerHTML = "";
    boot();
});

dockHeart?.addEventListener("click", () => {
    handleCommand("secret");
});

dockTerminal?.addEventListener("click", () => {
    input.focus();
});

dockSparkle?.addEventListener("click", () => {
    handleCommand("quests");
});

console.log(tracks);