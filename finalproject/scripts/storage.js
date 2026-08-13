const FAVORITES_KEY = "league-experience-favorites";

export function getFavorites() {
    const favorites = localStorage.getItem(FAVORITES_KEY);

    if (favorites) {
        return JSON.parse(favorites);
    }

    return [];
}

export function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}

export function toggleFavorite(championId) {
    const favorites = getFavorites();
    const isFavorite = favorites.includes(championId);
    let updatedFavorites;
    if (isFavorite) {
        updatedFavorites = favorites.filter(
            (id) => id !== championId
        );
    } else {
        updatedFavorites = [...favorites, championId];
    }
    saveFavorites(updatedFavorites);
    return updatedFavorites;
}

export function isFavorite(championId) {
    return getFavorites().includes(championId);
}