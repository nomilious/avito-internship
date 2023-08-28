// src/reducers/gameSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const gameSlice = createSlice({
    name: 'game',
    initialState: {
        games: [],
        selectedGame: null,
    },
    reducers: {
        setGames: (state, action) => {
            state.games = action.payload;
        },
        selectGame: (state, action) => {
            state.selectedGame = action.payload;
        },
    },
});

export const { setGames, selectGame } = gameSlice.actions;

export const selectAllGames = state => state.game.games;
export const selectSelectedGame = state => state.game.selectedGame;

export default gameSlice.reducer;
