// src/App.jsx
import React, {useState} from 'react';
import GameList from './components/GameList';
// import GameDetails from './components/GameDetails';
import { Routes, Route, Link } from 'react-router-dom';
import {Row, Select, Space} from "antd";
import "./App.css"



const { Option } = Select;


function App() {
    const genres = [
        "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social",
        "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel",
        "zombie", "turn-based", "first-person", "third-person", "top-down", "tank",
        "space", "sailing", "side-scroller", "superhero", "permadeath", "card",
        "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy",
        "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts",
        "flight", "low-spec", "tower-defense", "horror", "mmorts"
    ];
    const platforms = ["all", "browser", "pc"];
    const [selectedPlatform, setSelectedPlatform] = useState("all");
    const [selectedGenre, setSelectedGenre] = useState("strategy");
    const handlePlatformChange = value => {
        setSelectedPlatform(value);
    };

    const handleGenreChange = value => {
        setSelectedGenre(value);
    };
    return (
        <>
            <Row justify={"center"} align={"middle"} style={{marginTop: 10, marginBottom: 20}}>
                <Space size={"large"}>
                    <label htmlFor="platformSelect">Платформа:</label>
                    <Select popupMatchSelectWidth={false} id="platformSelect" defaultValue={selectedPlatform} onChange={handlePlatformChange}>
                        {platforms.map(platform => (
                            <Option key={platform} value={platform}>
                                {platform}
                            </Option>
                        ))}
                    </Select>

                    <label htmlFor="genreSelect">Жанр:</label>
                    <Select popupMatchSelectWidth={false} id="genreSelect" defaultValue={selectedGenre} onChange={handleGenreChange}>
                        {genres.map(genre => (
                            <Option key={genre} value={genre}>
                                {genre}
                            </Option>
                        ))}
                    </Select>
                </Space>
            </Row>
            <Routes>
                <Route path="/" element={
                    <GameList platform={selectedPlatform} genre={selectedGenre} />
                } />
                {/*<Route path="/game/:gameId" element={<GameDetails />} />*/}
            </Routes>
        </>
    );
}

export default App;
