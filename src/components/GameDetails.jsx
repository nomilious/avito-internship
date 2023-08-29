import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Carousel, Spin, Button, Alert, Col } from 'antd';
import './Game.css';
import { ArrowLeftOutlined  } from "@ant-design/icons"
const { Meta } = Card;

const GameDetails = () => {
    const { gameId } = useParams();
    // const history = useHistory();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data
        const fetchData = async () => {
            try {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                // Replace with actual API call using gameId
                const response = await fetch(`https://www.freetogame.com/api/game?id=${gameId}`);
                const data = await response.json();
                setData(data); // Assuming the API response structure matches Redux state structure
                setLoading(false);
                console.log(gameId);
            } catch (error) {
                console.error('Error fetching game details:', error);
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [gameId]);
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const formatRequirements = (key) => {
        const map = {
            os: 'ОС',
            processor: 'Процессор',
            memory: 'ОЗУ',
            graphics: 'Графика',
            storage: 'Память'
        };

        return map[key];
    };

    const goBack = () => {
        // history.goBack();
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
        <div id="game">
            <Card
                cover={<img src={data.thumbnail} alt={data.title} />} // Added alt attribute
                size="default"
                extra={
                    <Button icon={<ArrowLeftOutlined />}>
                        <a href="/">Вернуться к списку</a>
                    </Button>}
            >

                <Meta title={data.title} description={
                    <>
                        <p>Дата релиза: {formatDate(data.release_date)}</p>
                        <p>Издатель: {data.publisher}</p>
                        <p>Разработчик: {data.developer}</p>
                        <p>Жанр: {data.genre}</p>

                        {/* Add other fields here */}
                        <Carousel autoplay>
                            {data.screenshots.map(screenshot => (
                                <div key={screenshot.id}>
                                    <img
                                        src={screenshot.image}
                                        alt={`Screenshot ${screenshot.id}`}
                                        style={{ maxWidth: '100%', height: 'auto' }} // Add this style
                                    />
                                </div>
                            ))}
                        </Carousel>
                        {/* dont display if data are like  "minimum_system_requirements": {"os": null,...,*/}
                        {data.minimum_system_requirements && Object.keys(data.minimum_system_requirements)
                            .some(key=> data.minimum_system_requirements[key]) && (
                            <p>
                                <strong>Системные требования: </strong>
                                    {Object.entries(data.minimum_system_requirements).map(([key, value]) => (
                                        value && <>{formatRequirements(key)}: {value} </>
                                    ))}
                            </p>
                        )}
                    </>
                }/>
            </Card>
        </div>
    );
};

export default GameDetails;
