import React, { useEffect, useState } from 'react';
import {Card, Col, Row, Spin, Alert, Image, Typography} from 'antd'; // Import Spin component
import './Game.css';
import {Link} from "react-router-dom";

const { Meta } = Card;

const GameList = ({platform, genre, sorting}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // State to store error

    const buildApiUrl = () => {
        let url = 'https://www.freetogame.com/api/games?';
        if (platform !== 'all') url += `platform=${platform}&`;
        if (genre !== 'ALL') url += `category=${genre}&`;
        if (sorting !== "revelance") url += `sort-by=${sorting}`;

        return url;
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(buildApiUrl());
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
                setLoading(false); // Set loading state to false if there's an error
            }
        };
        fetchData();

    }, [platform, genre, sorting]);

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
        <div id={"games"}>
            <Row gutter={16}>
                {data.map(game => (
                    <Col span={8} key={game.id}>
                        <Link to={`/game/${game.id}`}>
                            <Card
                                cover={<Image preview={false} src={game.thumbnail} alt={game.title} />} // Added alt attribute
                                hoverable
                                size="small"
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <Meta title={game.title} description={
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
    );
};

export default GameList;
