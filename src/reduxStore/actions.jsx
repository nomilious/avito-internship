//src/reduxStore/actions
export const setSelectedPlatform = (platform) => ({
    type: 'SET_SELECTED_PLATFORM',
    payload: platform,
});

export const setSelectedGenre = (genre) => ({
    type: 'SET_SELECTED_GENRE',
    payload: genre,
});

export const setSelectedSorting = (sorting) => ({
    type: 'SET_SELECTED_SORTING',
    payload: sorting,
});
export const setGameList = (gameList) => ({
    type: 'SET_GAME_LIST',
    payload: gameList,
});

export const setGameDetails = (gameDetails) => ({
    type: 'SET_GAME_DETAILS',
    payload: gameDetails,
});

export const setLoading = (loading) => ({
    type: 'SET_LOADING',
    payload: loading,
});

export const setError = (error) => ({
    type: 'SET_ERROR',
    payload: error,
});