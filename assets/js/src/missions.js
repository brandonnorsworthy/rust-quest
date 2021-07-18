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

function getMission() {
    return missions.pvp[0]
}

missions = {
    pvp: [
        {
            missionImageURL: `/assets/TEMP/cargoship.png`,
            missionName: `I am the Captain now`,
            missionDifficulty: 2,
            missionGameStage: 2,
            missionDescription: `Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts.`,
            missionTasks: [
                ["Newbie: Hack 1 Locked Crate", "Last one top or bottom?: Hack 2 Locked Crates", "All mine: Hack all 3 Locked Crates"],
                ["All must die: Kill all scientists", "I really an the Captain: Kill All Bridge Scientists", "Mercenary: Kill only scientists that are absolutely necessary"],
                ["Getaway Driver: Escape with the loot by the Escape Rhiib", "Lazarus Night Ops: Escape with the loot via scuba gear"],
            ],
            missionIsTimeDependent: true,
            missionPlayersRecommended: 2,
        },
    ],
    pve: [],
    roleplay: [],
    monument: [],
    farming: [],
    building: [],
    raiding: [],
}
