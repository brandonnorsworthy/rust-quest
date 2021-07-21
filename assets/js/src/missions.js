/*
    {
        ImageURL: ``, //! thumbnail image prefer urls to save memory
        Name: `I am the Captain now`, //! Name that shows under the image
        Difficulty: 2, //! difficulty [0 easy, 1 normal, 2 harder, 3 very hard]
        GameStage: 1 //! [0 any, 1 early game, 2 mid game, 3 late game]
        Description: `Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts`,
        Tasks: [ //! tasks are listed in a bullet point format helps give a challenge
            ["Newbie: Hack 1 Locked Crate", "Last one top or bottom?: Hack 2 Locked Crates", "All mine: Hack all 3 Locked Crates"],
            ["All must die: Kill all scientists", "I really an the Captain: Kill All Bridge Scientists", "Mercenary: Kill only scientists that are absolutely necessary"],
            ["Getaway Driver: Escape with the loot by the Escape Rhiib", "Lazarus Night Ops: Escape with the loot via scuba gear"],
        ],
        IsTimeDependent = true, //! mission can only be completed while a event is active
        PlayersRecommended = 2 //! default 1
        WikiUrl = "" //!links to either wiki or rustlabs
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
        ["Raiding", missions.raiding.length],//todo add support for random weapon choices
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
            ImageURL: `/assets/TEMP/cargoship.png`,
            Name: `I am the Captain now`,
            Difficulty: 2,
            GameStage: 2,
            Description: `Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts.`,
            Tasks: [
                ["Hack 1 Locked Crate", "Hack 2 Locked Crates", "Hack all 3 Locked Crates"],
                ["Kill all scientists", "Kill All Bridge Scientists", "Kill only scientists that are absolutely necessary"],
                ["Escape with the loot by the Escape Rhiib", "Escape with the loot via scuba gear"],
            ],
            IsTimeDependent: true,
            PlayersRecommended: 2,
            WikiURL: "https://rust.fandom.com/wiki/Cargo_Ship",
        },
        {
            ImageURL: `/assets/TEMP/cargoship.png`,
            Name: `Smol Black Gold`,
            Difficulty: 2,
            GameStage: 2,
            Description: `Go to the small oil rig to hijack the facility for yourself. Watch out I hear they call in reinforcements.`,
            Tasks: [
                ["Hack 1 the Locked Crate"],
                ["Kill all Scientists", "Kill every Scientist but the boys just chilling on the dock"],
                ["Unlock the Green Card, Blue Card and Red Card Doors", "Loot the red button room", "Only go for the crate"],
                ["Clear out the helipad from a helicopter and land on it", "Skip the dock and immediatly go scale the ladder"],
            ],
            IsTimeDependent: false,
            PlayersRecommended: 2,
            WikiURL: "https://rust.fandom.com/wiki/Oil_Rig",
        },
    ],
    roleplay: [
        {
            ImageURL: `/assets/TEMP/cargoship.png`,
            Name: `Happy Mothers Day`,
            Difficulty: 3,
            GameStage: 0,
            Description: `Go venture around the map meeting new people trying to find someone who can make you a mom rock.`,
            Tasks: [
                ["Obtain a mom rock",],
            ],
            IsTimeDependent: false,
            PlayersRecommended: 1,
            WikiURL: "https://rustlabs.com/skin/mother's-day-rock",
        },
    ],
    monument: [
        {
            ImageURL: `/assets/TEMP/cargoship.png`,
            Name: `Go say Hi to Thomas`,
            Difficulty: 1,
            GameStage: 1,
            Description: `Go loot the Monument Train Yard.`,
            Tasks: [
                ["Loot just the entire monument", "Access the blue card room", "Access minimum green card room",],
                ["Climb to the top of the water tower", "Leave by Train (Tunnels)"]
            ],
            IsTimeDependent: false,
            PlayersRecommended: 1,
            WikiURL: "https://rust.fandom.com/wiki/Train_Yard",
        }
    ],
    farming: [

    ],
    building: [
        {
            ImageURL: `/assets/TEMP/cargoship.png`,
            Name: `Cookin it big time`,
            Difficulty: 1,
            GameStage: 0,
            Description: `Build a Meta Furnace base with roofs`,
            Tasks: [
                ["Build a furnace base",],
                ["Add a large furnace", "Add support for a future refinery"]
            ],
            IsTimeDependent: false,
            PlayersRecommended: 1,
            WikiURL: "https://www.youtube.com/watch?v=OOqQyTRJWB4",
        },
    ],
    raiding: [

    ],
}
