import {Row, Select, Space} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlatform, setSelectedGenre, setSelectedSorting } from '../reduxStore/actions';
import React from "react";

const { Option } = Select;

const FilterData = React.memo(() => {
    const dispatch = useDispatch();
    const selectedPlatform = useSelector(state => state.selectedPlatform);
    const selectedGenre = useSelector(state => state.selectedGenre);
    const selectedSorting = useSelector(state => state.selectedSorting);

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

    return (
        <Row justify={"center"} align={"middle"} style={{marginTop: 10, marginBottom: 20}}>
            <Space size={"large"}>
                <label htmlFor="platformSelect">Платформа:</label>
                <Select
                    popupMatchSelectWidth={false}
                    id="platformSelect"
                    defaultValue={selectedPlatform}
                    onChange={(value) => dispatch(setSelectedPlatform(value))}
                >
                    {platforms.map(platform => (
                        <Option key={platform} value={platform}>
                            {platform}
                        </Option>
                    ))}
                </Select>

                <label htmlFor="genreSelect">Жанр:</label>
                <Select
                    popupMatchSelectWidth={false}
                    id="genreSelect"
                    defaultValue={selectedGenre}
                    onChange={(value) => dispatch(setSelectedGenre(value)) }
                >
                    {genres.map(genre => (
                        <Option key={genre} value={genre}>
                            {genre}
                        </Option>
                    ))}
                </Select>
                <label htmlFor="sortingSelect">Сортировать по:</label>
                <Select
                    popupMatchSelectWidth={false}
                    id="sortingSelect"
                    defaultValue={selectedSorting}
                    onChange={(value) => dispatch(setSelectedSorting(value))}
                >
                    {sorting.map(sort => (
                        <Option key={sort} value={sort}>
                            {sort}
                        </Option>
                    ))}
                </Select>
            </Space>
        </Row>
    );
});
export default FilterData;