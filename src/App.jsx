// src/App.jsx
import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import GameList from './components/GameList';
import GameDetails from './components/GameDetails';
import FilterData from "./components/FilterData"
import Navbar from "./components/Navbar"
import "./App.css"

function App() {
    const [selectedPlatform, setSelectedPlatform] = useState("all");
    const [selectedGenre, setSelectedGenre] = useState("ALL");
    const [selectedSorting, setSelectedSorting] = useState("relevance");
    const handlePlatformChange = value => setSelectedPlatform(value);
    const handleGenreChange = value => setSelectedGenre(value);
    const handleSortingChange = value => setSelectedSorting(value);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={
                    <>
                        <FilterData
                            selectedPlatform={selectedPlatform}
                            selectedGenre={selectedGenre}
                            selectedSorting={selectedSorting}
                            handlePlatformChange={handlePlatformChange}
                            handleGenreChange={handleGenreChange}
                            handleSortingChange={handleSortingChange}
                        />
                        <GameList platform={selectedPlatform} genre={selectedGenre} sorting={selectedSorting}/>
                    </>
                } />
                <Route path="/game/:gameId" element={<GameDetails />} />
            </Routes>
        </>
    );
}

export default App;
