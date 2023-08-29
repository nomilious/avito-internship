import {Row, Select, Space} from "antd";
import React, {useState} from "react";

const { Option } = Select;

function FilterData(props) {
    const genres = [
        "ALL",
        "mmorpg", "shooter", "strategy", "moba", "racing", "sports", "social",
        "sandbox", "open-world", "survival", "pvp", "pve", "pixel", "voxel",
        "zombie", "turn-based", "first-person", "third-person", "top-down", "tank",
        "space", "sailing", "side-scroller", "superhero", "permadeath", "card",
        "battle-royale", "mmo", "mmofps", "mmotps", "3d", "2d", "anime", "fantasy",
        "sci-fi", "fighting", "action-rpg", "action", "military", "martial-arts",
        "flight", "low-spec", "tower-defense", "horror", "mmorts"
    ];
    const platforms = ["all", "browser", "pc"];
    const sorting = ["relevance", "release-date", "popularity", "alphabetical"];

    const { selectedPlatform, selectedGenre, selectedSorting, handlePlatformChange, handleGenreChange,
        handleSortingChange } = props;

    return (
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
                <label htmlFor="sortingSelect">Сортировать по:</label>
                <Select popupMatchSelectWidth={false} id="sortingSelect" defaultValue={selectedSorting} onChange={handleSortingChange}>
                    {sorting.map(sort => (
                        <Option key={sort} value={sort}>
                            {sort}
                        </Option>
                    ))}
                </Select>
            </Space>
        </Row>
    );
}
export default FilterData;