import { toggleFavorite, isFavorite } from "./storage.js";
const championContainer = document.querySelector("#champion-container");
const championError = document.querySelector("#champion-error");
const championModal = document.querySelector("#champion-modal");
const modalContent = document.querySelector("#modal-content");
const modalClose = document.querySelector("#modal-close");


async function getPersonalChampions() {
    try {
        const response = await fetch("data/champions.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const champions = await response.json();

        return champions;
    } catch (error) {
        console.error("Unable to load personal champion data:", error);
        throw error;
    }
}

async function getDataDragonVersion() {
    try {
        const response = await fetch(
            "https://ddragon.leagueoflegends.com/api/versions.json"
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const versions = await response.json();

        return versions[0];
    } catch (error) {
        console.error("Unable to load Data Dragon version:", error);
        throw error;
    }
}

async function getChampionData(version) {
    try {
        const response = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data.data;
    } catch (error) {
        console.error("Unable to load Data Dragon champion data:", error);
        throw error;
    }
}

async function loadChampions() {
    try {
        const personalChampions = await getPersonalChampions();
        const version = await getDataDragonVersion();
        const allChampions = await getChampionData(version);

        const champions = combineChampionData(
            personalChampions,
            allChampions
        );

        displayChampions(champions, version);

    } catch (error) {
        console.error("Unable to load champion information:", error);
        championError.hidden = false;
    }
}

function combineChampionData(personalChampions, allChampions) {
    return personalChampions
        .map((personalChampion) => {
            const champion = allChampions[personalChampion.id];
            if (!champion) {
                console.warn(
                    `Champion not found: ${personalChampion.id}`
                );

                return null;
            }
            return {
                ...champion,
                personalRank: personalChampion.rank
            };
        })
        .filter((champion) => champion !== null);
}

function displayChampions(champions, version) {
    championContainer.innerHTML = "";

    champions.forEach((champion) => {
        const card = document.createElement("article");
        card.classList.add("champion-card");
        const roles = champion.tags.join(" / ");
        const favorite = isFavorite(champion.id);
        card.innerHTML = `
            <img
                src="https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}"
                alt="${champion.name}"
                width="${champion.image.w}"
                height="${champion.image.h}"
                loading="lazy"
            >
            <div class="champion-card-content">
                <p class="champion-rank">
                    Most Played #${champion.personalRank}
                </p>
                <h3>${champion.name}</h3>
                <p class="champion-title">
                    ${champion.title}
                </p>
                <p>
                    <strong>Role:</strong> ${roles}
                </p>
                <p>
                    <strong>Difficulty:</strong> ${champion.info.difficulty}/10
                </p>
                <p>
                    <strong>Resource:</strong> ${champion.partype}
                </p>
                <button
                    type="button"
                    class="favorite-button"
                    data-champion-id="${champion.id}"
                    aria-pressed="${favorite}"
                >
                    ${favorite ? "★ Favorite" : "☆ Favorite"}
                </button>
                <button
                    type="button"
                    class="details-button"
                    data-champion-id="${champion.id}"
                >
                    View Details
                </button>
            </div>
        `;

        championContainer.appendChild(card);
    });

    const detailButtons = document.querySelectorAll(".details-button");

    detailButtons.forEach((button) => {
        button.addEventListener("click", async () => {
            try {
                const championId = button.dataset.championId;

                const champion = await getChampionDetails(
                    championId,
                    version
                );

                displayChampionModal(champion, version);
            } catch (error) {
                console.error(
                    "Unable to open champion details:",
                    error
                );
            }
        });
    });
    
    const favoriteButtons = document.querySelectorAll(".favorite-button");

    favoriteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const championId = button.dataset.championId;

            const favorites = toggleFavorite(championId);

            const favorite = favorites.includes(championId);

            button.setAttribute("aria-pressed", favorite);

            button.textContent = favorite
                ? "★ Favorite"
                : "☆ Favorite";
        });
    });
}

async function getChampionDetails(championId, version) {
    try {
        const response = await fetch(
            `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion/${championId}.json`
        );

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        return data.data[championId];
    } catch (error) {
        console.error(
            `Unable to load details for ${championId}:`,
            error
        );

        throw error;
    }
}

function displayChampionModal(champion, version) {
    const spells = champion.spells
        .map((spell) => `
            <li class="ability">
                <img
                    src="https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${spell.image.full}"
                    alt=""
                    width="${spell.image.w}"
                    height="${spell.image.h}"
                    loading="lazy"
                >
                <div>
                    <h3>${spell.name}</h3>
                    <p>${spell.description}</p>
                </div>
            </li>
        `)
        .join("");

    modalContent.innerHTML = `
        <div class="modal-champion-header">
            <img
                src="https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}"
                alt="${champion.name}"
                width="${champion.image.w}"
                height="${champion.image.h}"
            >

            <div>
                <h2 id="modal-title">${champion.name}</h2>
                <p>${champion.title}</p>
            </div>
        </div>

        <div class="modal-lore">
            <h3>Lore</h3>
            <p>${champion.lore}</p>
        </div>

        <div class="modal-passive">
            <h3>Passive: ${champion.passive.name}</h3>

            <img
                src="https://ddragon.leagueoflegends.com/cdn/${version}/img/passive/${champion.passive.image.full}"
                alt=""
                width="${champion.passive.image.w}"
                height="${champion.passive.image.h}"
                loading="lazy"
            >

            <p>${champion.passive.description}</p>
        </div>

        <div class="modal-abilities">
            <h3>Abilities</h3>
            <ul>
                ${spells}
            </ul>
        </div>
    `;

    championModal.showModal();

    modalClose.addEventListener("click", () => {
    championModal.close();
    });

    championModal.addEventListener("click", (event) => {
    if (event.target === championModal) {
        championModal.close();
    }
    });
}

loadChampions();