import {Row, Select, ConfigProvider, theme, Form} from "antd";
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
        <ConfigProvider
            theme={{
                algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}
            >
        <Row justify={"center"}  style={{marginTop: 10, marginBottom: 20}}>
            <Form layout="inline" size="middle">
                <Form.Item label={"Платформа"}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue={selectedPlatform}
                        onChange={(value) => dispatch(setSelectedPlatform(value))}
                    >
                        {platforms.map(platform => (
                            <Select.Option key={platform} value={platform}>
                                {platform}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label={"Жанр"}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue={selectedGenre}
                        onChange={(value) => dispatch(setSelectedGenre(value)) }
                    >
                        {genres.map(genre => (
                            <Select.Option key={genre} value={genre}>
                                {genre}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label={"Сортировать"}>
                    <Select
                        popupMatchSelectWidth={false}
                        defaultValue={selectedSorting}
                        onChange={(value) => dispatch(setSelectedSorting(value))}
                    >
                        {sorting.map(sort => (
                            <Select.Option key={sort} value={sort}>
                                {sort}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Row>
        </ConfigProvider>
    );
});
export default FilterData;