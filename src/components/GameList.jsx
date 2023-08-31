import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Card, Col, Row, Spin, Alert, Image, Typography, theme, ConfigProvider} from 'antd'; // Import Spin component
import {Link} from "react-router-dom";
import { setGameList, setLoading, setError } from '../reduxStore/actions';
import './Game.css';


const GameList = () => {
    const dispatch = useDispatch();
    const itemsPerLoad = 12;
    const [visibleItems, setVisibleItems] = useState(itemsPerLoad);
    const gameList = useSelector(state => state.gameList);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const platform = useSelector(state => state.selectedPlatform);
    const genre = useSelector(state => state.selectedGenre);
    const sorting = useSelector(state => state.selectedSorting);

    const buildApiUrl = () => {
        let url = 'https://www.freetogame.com/api/games?';
        if (platform !== 'all') url += `platform=${platform}&`;
        if (genre !== 'ALL') url += `category=${genre}&`;
        if (sorting !== "revelance") url += `sort-by=${sorting}`;

        return url;
    }
    // scrollling load u content
    useEffect(() => {
        const handleScroll = () => {
            const isScrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.offsetHeight;

            if (isScrolledToBottom) {
                setVisibleItems((prevVisibleItems) => prevVisibleItems + itemsPerLoad);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [itemsPerLoad]);

    useEffect(() => {

        dispatch(setError(null));
        dispatch(setLoading(true));

        fetch(buildApiUrl())
            .then(response => response.json())
            .then(data => {
                dispatch(setGameList(data));
                dispatch(setLoading(false));
            })
            .catch(error => {
                dispatch(setError(error));
                dispatch(setLoading(false));
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [platform, genre, sorting, dispatch]);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    if (loading)
        return (
            <div style={{textAlign: "center"}}>
                <Spin size="large" />
            </div>
        );
    if (error)
        return <Alert type="error" showIcon message="Error" description={`Error: ${error}`}/>;

    return (
        <ConfigProvider
            theme={{
                algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],


            }}
        >
        <div id={"games"}>
            <Row gutter={[{xs: 2, sm: 8, md: 16}, {xs: 2, sm: 8, md: 16}]}>
                {gameList.slice(0, visibleItems).map(game => (
                    <Col xs={24} sm={12} md={8} lg={8} key={game.id}>
                        <Link to={`/game/${game.id}`}>
                            <Card
                                cover={<Image preview={false} src={game.thumbnail} alt={game.title} />} // Added alt attribute
                                hoverable
                                size="small"
                            >
                                <Card.Meta title={
                                    <Typography.Title level={2}>
                                        {game.title}
                                    </Typography.Title>
                                } description={
                                    <>
                                        <Typography.Paragraph>Дата выпуска: {formatDate(game.release_date)}</Typography.Paragraph>
                                        <Typography.Paragraph>Издатель: {game.publisher}</Typography.Paragraph>
                                        <Typography.Paragraph>Жанр: {game.genre}</Typography.Paragraph>
                                    </>
                                } />
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

        </div>
        </ConfigProvider>
    );
};

export default GameList;
