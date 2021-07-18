
//! main card elements
const missionImageEl = document.getElementById("mission-thumbnail");
const missionTitleEl = document.getElementById("mission-title");
const missionSubtitleEl = document.getElementById("mission-subtitle");
const missionDescriptionEl = document.getElementById("mission-card-description");
const wikiBtnEl = document.getElementById("learn-more");

function generateCardHtml(category, currentMission) {
    if(currentMission) {
        missionImageEl.setAttribute("src", currentMission.ImageURL);
        missionTitleEl.textContent = currentMission.Name;
        missionSubtitleEl.textContent = `Category: ${category} | Difficulty: ${getMissionDifficulty(currentMission.Difficulty)}`
        missionDescriptionEl.innerHTML = `
        <p>${currentMission.Description}</p>
        <ul>
            ${pickRandomTasks(currentMission.Tasks)}
        </ul>
        <p>People Recommended: ${currentMission.PlayersRecommended} <br>
        Time Dependent: ${currentMission.IsTimeDependent ? "Yes" : "No"}</p>
        `
        wikiBtnEl.setAttribute("href", currentMission.WikiURL)
    } else {
        console.log("Error while generating card information")
    }
}


/* missionTasks: [
    ["Newbie: Hack 1 Locked Crate", "Last one top or bottom?: Hack 2 Locked Crates", "All mine: Hack all 3 Locked Crates"],
    ["All must die: Kill all scientists", "I really an the Captain: Kill All Bridge Scientists", "Mercenary: Kill only scientists that are absolutely necessary"],
    ["Getaway Driver: Escape with the loot by the Escape Rhiib", "Lazarus Night Ops: Escape with the loot via scuba gear"],
], */
function pickRandomTasks(tasks) {
    let str = ``

    if(tasks) {
        for (task of tasks) {
            str += `<li>${task[Math.floor(Math.random() * task.length)]}</li>`
        }
    }

    return str;
}

// missionDifficulty: 2,
//! difficulty [0 easy, 1 normal, 2 harder, 3 very hard]
function getMissionDifficulty(difficulty) {
    let str = ``
    switch (difficulty) {
        case 0:
            str = "Easy";
            break;
        case 1:
            str = "Normal";
            break;
        case 2:
            str = "Hard";
            break;
        case 3:
            str = "Very Hard";
            break;
        default:
            str = "Undefined";
            break;
    }

    return str;
}

// missionGameStage: 2,
//! [0 any, 1 early game, 2 mid game, 3 late game]
function getMissionGameStage(gamestage) {
    let str = ``
    switch (gamestage) {
        case 0:
            str = "Any";
            break;
        case 1:
            str = "Tier 1";
            break;
        case 2:
            str = "Tier 2";
            break;
        case 3:
            str = "Tier 3";
            break;
        default:
            str = "Undefined";
            break;
    }

    return str;
}