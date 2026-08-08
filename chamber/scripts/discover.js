import { discoverItems } from "../data/discover.mjs";

const discoverCards = document.querySelector("#discoverCards");
const visitorMessage = document.querySelector("#visitorMessage");

function displayDiscoverItems() {
    discoverItems.forEach((item) => {
        const card = document.createElement("article");
        card.classList.add("discoverCard");
        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img 
                    src="${item.image}" 
                    alt="${item.name}"
                    width="300"
                    height="200"
                    loading="lazy"
                >
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button">Learn More</button>
        `;
        discoverCards.appendChild(card);
    });
}

function displayVisitorMessage() {
    const currentVisit = Date.now();
    const lastVisit = localStorage.getItem("lastVisit");
    if (!lastVisit) {
        visitorMessage.textContent =
            "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifference = currentVisit - Number(lastVisit);
        const millisecondsPerDay = 1000 * 60 * 60 * 24;

        const daysSinceVisit = Math.floor(
            timeDifference / millisecondsPerDay
        );

        if (daysSinceVisit < 1) {
            visitorMessage.textContent =
                "Back so soon! Awesome!";
        } else {
            const dayWord = daysSinceVisit === 1 ? "day" : "days";

            visitorMessage.textContent =
                `You last visited ${daysSinceVisit} ${dayWord} ago.`;
        }
    }
    localStorage.setItem("lastVisit", currentVisit);
}

displayDiscoverItems();
displayVisitorMessage();
