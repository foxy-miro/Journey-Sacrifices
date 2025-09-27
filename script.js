const storyElement = document.getElementById("story");
const choicesElement = document.getElementById("choices");

let sacrificesPool = ["Backpack", "Blood", "Friend", "Memory", "Sight", "Soul"];
let sacrifices = [];
let lost = [];
let round = 0;
const maxRounds = 4;

const deathScenes = [
    "The temple closes its ribs around you. Darkness devours your lungs.",
    "Your heart stops as the air is drunk away.",
    "Chains from the ceiling pierce you like hooks.",
    "The floor melts into teeth. They chew you slowly."
];

const refuseLabels = ["No.", "Never.", "Stop.", "Refuse.", "I won't."];

const altarResponses = [
    "More... the altar growls.",
    "The whispers hiss: more must be given.",
    "The stones rumble: not enough...",
    "A voice claws at your ears: more... always more.",
    "The altar trembles: hunger never ends."
];

const consequences = {
    "Backpack": "Your pack is gone. The world feels heavier without its comforts.",
    "Blood": "You are pale and weak, every step a struggle.",
    "Friend": "The silence where your friend's voice once was will haunt you forever.",
    "Memory": "You stagger in confusion... 'Why am I here?'",
    "Sight": "You reach for light, but there is only endless black.",
    "Soul": "You move, but feel hollow... less than human."
};

function startGame() {
    round = 0;
    lost = [];
    sacrifices = [...sacrificesPool];
    storyElement.textContent = "You awaken inside a temple of stone and bone. The air tastes of iron. A whisper rises from the altar: 'To leave... you must give up what you hold dear.'";
    nextChoices();
}

function nextChoices() {
    choicesElement.innerHTML = "";
    if (round >= maxRounds) {
        endGame();
        return;
    }

    let options = [...sacrifices].sort(() => Math.random() - 0.5).slice(0, 2);
    options.forEach(sac => {
        const btn = document.createElement("button");
        btn.textContent = "Sacrifice " + sac;
        btn.onclick = () => makeSacrifice(sac);
        choicesElement.appendChild(btn);
    });

    const refuse = document.createElement("button");
    refuse.textContent = refuseLabels[Math.floor(Math.random() * refuseLabels.length)];
    refuse.onclick = () => die();
    choicesElement.appendChild(refuse);
}

function makeSacrifice(sac) {
    lost.push(sac);
    sacrifices = sacrifices.filter(s => s !== sac);
    round++;
    let response = altarResponses[Math.floor(Math.random() * altarResponses.length)];
    storyElement.textContent = "The altar drinks your " + sac.toLowerCase() + "... " + response;
    setTimeout(() => nextChoices(), 1200);
}

function die() {
    storyElement.textContent = deathScenes[Math.floor(Math.random() * deathScenes.length)];
    choicesElement.innerHTML = "";
    const restart = document.createElement("button");
    restart.textContent = "Restart";
    restart.onclick = () => startGame();
    choicesElement.appendChild(restart);
}

function endGame() {
    storyElement.textContent = "You crawl into the light again... free, but changed forever.";
    choicesElement.innerHTML = "";

    lost.forEach(sac => {
        const p = document.createElement("p");
        p.textContent = consequences[sac];
        choicesElement.appendChild(p);
    });

    const restart = document.createElement("button");
    restart.textContent = "Restart";
    restart.onclick = () => startGame();
    choicesElement.appendChild(restart);
}

startGame();
