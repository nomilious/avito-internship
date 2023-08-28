import React, { useEffect, useState } from 'react';
import './GameList.css';
import { Card, Col, Row, Spin } from 'antd'; // Import Spin component
const { Meta } = Card;

const GameList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://www.freetogame.com/api/games');
                const jsonData = await response.json();
                setData(jsonData);
                setLoading(false); // Set loading state to false after data is fetched
            } catch (error) {
                console.error('Error fetching data:', error);
                alert(`Error fetching data: ${error}`);
                setLoading(false); // Set loading state to false if there's an error
            }
        }
        fetchData();

    }, []);

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    return (
        <div id={"games"}>
            {loading ? ( // Show loading state if loading is true
                <div style={{textAlign: "center", margin: 20}}>
                    <Spin size="large" />
                </div>
            ) : (
                <Row gutter={16}>
                    {data.map(game => (
                        <Col span={8} key={game.id}>
                            <Card
                                cover={<img src={game.thumbnail} alt={game.title} />} // Added alt attribute
                                hoverable
                                bordered
                                size="small"
                                style={{
                                    marginTop: 10,
                                }}
                            >
                                <Meta title={game.title} description={
                                    <>
                                        <p>Дата выпуска: {formatDate(game.release_date)}</p>
                                        <p>Издатель: {game.publisher}</p>
                                        <p>Жанр: {game.genre}</p>
                                    </>
                                } />
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default GameList;
