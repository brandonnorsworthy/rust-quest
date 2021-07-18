/*
    {
        missionImageURL: ``, //! thumbnail image prefer urls to save memory
        missionName: `I am the Captain now`, //! Name that shows under the image
        missionDifficulty: 2, //! difficulty [0 easy, 1 normal, 2 harder, 3 very hard]
        missionGameStage: 1 //! [0 any, 1 early game, 2 mid game, 3 late game]
        missionDescription: `Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts`,
        missionTasks: [ //! tasks are listed in a bullet point format helps give a challenge
            ["Newbie: Hack 1 Locked Crate", "Last one top or bottom?: Hack 2 Locked Crates", "All mine: Hack all 3 Locked Crates"],
            ["All must die: Kill all scientists", "I really an the Captain: Kill All Bridge Scientists", "Mercenary: Kill only scientists that are absolutely necessary"],
            ["Getaway Driver: Escape with the loot by the Escape Rhiib", "Lazarus Night Ops: Escape with the loot via scuba gear"],
        ],
        missionIsTimeDependent = true, //! mission can only be completed while a event is active
        missionPlayersRecommended = 2 //! default 1
    },
*/

//? stay away from rng cause it cant always be completed not satisfying
//? needs to be reproducable on every attempt

function getCategoryAmounts() {
    let categoryWeights = [ //! to add weights in the future multiply by weight so if its empty it cant be chosen
        ["PVP", missions.pvp.length],
        ["PVE", missions.pve.length],
        ["Roleplay", missions.roleplay.length],
        ["Monument", missions.monument.length],
        ["Farming", missions.farming.length],
        ["Building", missions.building.length], //todo add a lot more missions
        ["Raiding", missions.raiding.length],
    ];

    let weightTotal = 0;

    for (categoryWeight of categoryWeights){
        weightTotal += categoryWeight[1];
        categoryWeight[2] = weightTotal;
    }

    return [["Total Weight", weightTotal], ...categoryWeights];
}

function getMission(category, index) {
    let mission = {};

    switch(category.toLowerCase()){
        case "pvp":
            mission = missions.pvp[index];
            break;
        case "pve":
            mission = missions.pve[index];
            break;
        case "roleplay":
            mission = missions.roleplay[index];
            break;
        case "monument":
            mission = missions.monument[index];
            break;
        case "farming":
            mission = missions.farming[index];
            break;
        case "building":
            mission = missions.building[index];
            break;
        case "raiding":
            mission = missions.raiding[index];
            break;
        default:
            console.log("150: couldn't find category chosen log issue immediately");
    }


    return mission;
}

const missions = {
    pvp:[
    ],
    pve: [
        {
            missionImageURL: `/assets/TEMP/cargoship.png`,
            missionName: `I am the Captain now`,
            missionDifficulty: 2,
            missionGameStage: 2,
            missionDescription: `Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts.`,
            missionTasks: [
                ["Hack 1 Locked Crate", "Hack 2 Locked Crates", "Hack all 3 Locked Crates"],
                ["Kill all scientists", "Kill All Bridge Scientists", "Kill only scientists that are absolutely necessary"],
                ["Escape with the loot by the Escape Rhiib", "Escape with the loot via scuba gear"],
            ],
            missionIsTimeDependent: true,
            missionPlayersRecommended: 2,
        },
        {
            missionImageURL: `/assets/TEMP/cargoship.png`,
            missionName: `Black Gold`,
            missionDifficulty: 2,
            missionGameStage: 2,
            missionDescription: `Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts.`,
            missionTasks: [
                ["Hack 1 Locked Crate", "Hack 2 Locked Crates", "Hack all 3 Locked Crates"],
                ["Kill all scientists", "Kill All Bridge Scientists", "Kill only scientists that are absolutely necessary"],
                ["Escape with the loot by the Escape Rhiib", "Escape with the loot via scuba gear"],
            ],
            missionIsTimeDependent: false,
            missionPlayersRecommended: 2,
        },
    ],
    roleplay: [
        {
            missionImageURL: `/assets/TEMP/cargoship.png`,
            missionName: `Happy Mothers Day`,
            missionDifficulty: 3,
            missionGameStage: 0,
            missionDescription: `Go venture around the map meeting new people trying to find someone who can make you a mom rock.`,
            missionTasks: [
                ["Obtain a mom rock",],
            ],
            missionIsTimeDependent: false,
            missionPlayersRecommended: 1,
        },
    ],
    monument: [

    ],
    farming: [

    ],
    building: [

    ],
    raiding: [
        
    ],
}
