

//! HTML Screens
let missionCardEl = document.getElementById("mission-card") //card that displays missions
let paintWheelEl = document.getElementById("paint-stroke") //paint stroke mask that holds the wheel inside

function createEventListeners() {
    //todo sound design for completions
    document.getElementById("spin-wheel").addEventListener("click", () => {
        missionCardEl.style.display = "block";
        buildHtml(getMission(), "PVP")
    })

    document.getElementById("complete").addEventListener("click", () => {
        missionCardEl.style.display = "none";
    })

    document.getElementById("skip").addEventListener("click", () => {
        missionCardEl.style.display = "none";
    })
}

createEventListeners();