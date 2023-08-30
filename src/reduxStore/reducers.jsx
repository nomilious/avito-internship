const initialState = {
    selectedPlatform: 'all',
    selectedGenre: 'ALL',
    selectedSorting: 'relevance',
    gameList: [], // many games
    gameDetails: {}, // one concrete game
    loading: false, // Loading state
    error: null, // Error state
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTED_PLATFORM':
            return { ...state, selectedPlatform: action.payload };
        case 'SET_SELECTED_GENRE':
            return { ...state, selectedGenre: action.payload };
        case 'SET_SELECTED_SORTING':
            return { ...state, selectedSorting: action.payload };
        case 'SET_GAME_LIST':
            return { ...state, gameList: action.payload };
        case 'SET_GAME_DETAILS':
            return { ...state, gameDetails: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default rootReducer;
