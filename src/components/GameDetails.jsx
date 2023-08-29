import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Carousel, Spin,Col, Row, Button, Alert, Image, Segmented, Space } from 'antd';
import { Typography } from 'antd';
import { ArrowLeftOutlined  } from "@ant-design/icons"
import './Game.css';

const GameDetails = () => {
    const { gameId } = useParams();
    const SegmentationOptions = ["Описание", "Галерея", "Системные требования"]
    // const history = useHistory();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSegment, setSelectedSegment] = useState(SegmentationOptions[0]);


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
            storage: 'Место'
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
            <Row gutter={[16,16]}>
                <Col span={12}>
                    <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                        <Button
                            style={{marginTop: "10px"}}
                            size={"small"}
                            type={"primary"}
                            icon={<ArrowLeftOutlined />}>
                            <Link to="/">
                                Вернуться к списку
                            </Link>
                        </Button>
                        <Image
                            preview={false}
                            src={data.thumbnail} alt={data.title}
                            style={{width:"100%", height:"auto", display: "block" }}
                        />
                        <Typography.Title level={2}>Название: {data.title}</Typography.Title>
                        <Typography.Paragraph>
                            {data.short_description}
                        </Typography.Paragraph>
                    </Space>
                </Col>
                <Col span={12}>
                    <Segmented
                        style={{marginTop: "10px"}}
                        size={"small"}
                        onChange={(value) => setSelectedSegment(value)}
                        options={SegmentationOptions}
                    />
                    <br/>
                    <br/>
                    {selectedSegment === SegmentationOptions[0] && (
                        <div>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Описание: </Typography.Text>
                                {data.description}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Платформа: </Typography.Text>
                                {data.platform}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Жанр: </Typography.Text>
                                {data.genre}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Издатель: </Typography.Text>
                                {data.publisher}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Разработчик: </Typography.Text>
                                {data.developer}
                            </Typography.Paragraph>
                            <Typography.Paragraph>
                                <Typography.Text strong={true}>Дата выхода: </Typography.Text>
                                {formatDate(data.release_date)}
                            </Typography.Paragraph>
                        </div>
                    )}
                    {selectedSegment === SegmentationOptions[1] && (
                        <Carousel autoplay>
                            {data.screenshots.map((screenshot) => (
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
                        data.minimum_system_requirements &&
                        Object.keys(data.minimum_system_requirements).some(
                            (key) => data.minimum_system_requirements[key]
                        ) && (
                            <>
                                {Object.entries(data.minimum_system_requirements).map(
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
