import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Carousel, Spin,Col, Row, Button, Alert, Image, Segmented, Space } from 'antd';
import { Typography } from 'antd';
import { ArrowLeftOutlined  } from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux';
import { setGameDetails, setLoading, setError } from '../reduxStore/actions';
import './Game.css';

const GameDetails = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { gameId } = useParams();
    const gameDetails = useSelector(state => state.gameDetails);
    const loading = useSelector(state => state.loading);
    const error = useSelector(state => state.error);
    const SegmentationOptions = ["Описание", "Галерея", "Системные требования"]
    // const history = useHistory();
    const [selectedSegment, setSelectedSegment] = useState(() => SegmentationOptions[0]);

    useEffect(() => {
        dispatch(setLoading(true));
        dispatch(setGameDetails({}));
        dispatch(setError(null));

        const storedGameDetails = localStorage.getItem(`gameDetails_${gameId}`)
        const storedGameDetailsTime = localStorage.getItem(`gameDetailsTime_${gameId}`)

        // if data stored and little time passed
        if (storedGameDetails && storedGameDetailsTime) {
            const currTime = new Date().getTime();
            if (currTime - parseInt(storedGameDetailsTime) < 5 * 60 * 1000){
                dispatch(setLoading(false));
                dispatch(setGameDetails(JSON.parse(storedGameDetails)));
                return
            }
        }

        // Fetch data
        fetch(`https://www.freetogame.com/api/game?id=${gameId}`)
            .then(response => response.json())
            .then(data=> {
                dispatch(setGameDetails(data))
                dispatch(setLoading(false));

                // store data
                localStorage.setItem(`gameDetails_${gameId}`, JSON.stringify(data))
                localStorage.setItem(`gameDetailsTime_${gameId}`, new Date().getTime())
            })
            .catch(error=> {
                console.error('Error fetching game details:', error);
                dispatch(setError(error));
                dispatch(setLoading(false));
            })
    }, [gameId, dispatch]);
    const formatDate = (dateString) => {
        if (!dateString) {
            console.log(dateString)
            return
        }
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const formatRequirements = (key) => {
        const map = {
            os: 'ОС',
            processor: 'Процессор',
            memory: 'ОЗУ',
            graphics: 'Графика',
            storage: 'Место'
        };

        return map[key];
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
            <Row gutter={[{xs: 16, sm: 16, md: 24}, {xs: 32, sm: 32, md: 0}]}>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Button
                            style={{marginTop: "10px"}}
                            size={"small"}
                            type={"primary"}
                            icon={<ArrowLeftOutlined />}
                            onClick={() => navigate("/")}
                        >
                            Вернуться к списку
                        </Button>
                        <Image
                            preview={false}
                            src={gameDetails.thumbnail} alt={gameDetails.title}
                            style={{width:"100%", height:"auto", display: "block" }}
                        />
                        <Typography.Title level={2}>Название: {gameDetails.title}</Typography.Title>
                        <Typography.Paragraph>
                            {gameDetails.short_description}
                        </Typography.Paragraph>
                    </Space>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12}>
                    <Segmented
                        style={{ marginTop: '1em' }}
                        size="small"
                        onChange={value => setSelectedSegment(value)}
                        options={SegmentationOptions}
                    />
                    <br/>
                    <br/>
                    {selectedSegment === SegmentationOptions[0] && (
                        <div>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Описание: </Typography.Text>
                                {gameDetails.description}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Платформа: </Typography.Text>
                                {gameDetails.platform}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Жанр: </Typography.Text>
                                {gameDetails.genre}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Издатель: </Typography.Text>
                                {gameDetails.publisher}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Разработчик: </Typography.Text>
                                {gameDetails.developer}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Дата выхода: </Typography.Text>
                                {formatDate(gameDetails.release_date)}
                            </Typography.Paragraph>
                        </div>
                    )}
                    {selectedSegment === SegmentationOptions[1] && (
                        <Carousel autoplay>
                            {gameDetails.screenshots.map((screenshot) => (
                                <div key={screenshot.id}>
                                    <Image
                                        src={screenshot.image}
                                        alt={`Screenshot ${screenshot.id}`}
                                        style={{ maxWidth: '100%', height: 'auto' }}
                                    />
                                </div>
                            ))}
                        </Carousel>
                    )}
                    {selectedSegment === SegmentationOptions[2] && (
                        gameDetails.minimum_system_requirements &&
                        Object.keys(gameDetails.minimum_system_requirements).some(
                            (key) => gameDetails.minimum_system_requirements[key]
                        ) && (
                            <>
                                {Object.entries(gameDetails.minimum_system_requirements).map(
                                    ([key, value]) => value &&
                                        <Typography.Paragraph key={key}>
                                            <Typography.Text strong={true}>{formatRequirements(key)}: </Typography.Text>
                                            {value}
                                        </Typography.Paragraph>
                                )}
                            </>
                        )
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default GameDetails;
