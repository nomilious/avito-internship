import {Row, Select, Col} from "antd";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedPlatform, setSelectedGenre, setSelectedSorting } from '../reduxStore/actions';
import React from "react";

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
        <Row justify={"space-evenly"} align={"middle"} style={{marginTop: 10, marginBottom: 20}}>
                <Col>
                    <label htmlFor="platformSelect">Платформа:</label>
                    <Select
                        popupMatchSelectWidth={false}
                        id="platformSelect"
                        defaultValue={selectedPlatform}
                        onChange={(value) => dispatch(setSelectedPlatform(value))}
                    >
                        {platforms.map(platform => (
                            <Select.Option key={platform} value={platform}>
                                {platform}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>

                <Col>
                    <label htmlFor="genreSelect">Жанр:</label>
                    <Select
                        popupMatchSelectWidth={false}
                        id="genreSelect"
                        defaultValue={selectedGenre}
                        onChange={(value) => dispatch(setSelectedGenre(value)) }
                    >
                        {genres.map(genre => (
                            <Select.Option key={genre} value={genre}>
                                {genre}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col>
                    <label htmlFor="sortingSelect">Сортировать по:</label>
                    <Select
                        popupMatchSelectWidth={false}
                        id="sortingSelect"
                        defaultValue={selectedSorting}
                        onChange={(value) => dispatch(setSelectedSorting(value))}
                    >
                        {sorting.map(sort => (
                            <Select.Option key={sort} value={sort}>
                                {sort}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
        </Row>
    );
});
export default FilterData;