import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import FilterData from "./components/FilterData"
import Navbar from "./components/Navbar"
import "./App.css"

function App() {

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <>
                        <FilterData/>
                        <GameList/>
                    </>
                } />
                <Route path="/game/:gameId" element={<GameDetails />} />
            </Routes>
        </>
    );
}

export default App;
