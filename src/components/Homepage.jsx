import { Row } from 'antd'
import { Statistic } from 'antd'
import { Col } from 'antd'
import { Typography } from 'antd'
import React from 'react'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import Cryptocurrencies from '../components/Cryptocurrencies'
import News from '../components/News'
import { Link } from 'react-router-dom'


const { Title } = Typography


const Homepage = () => {

  const { data , isFetching } = useGetCryptosQuery(10)
  // console.log(data);

  const globalStats = data?.data?.stats;

  if(isFetching) return 'loading....';

  return (
    <div>
      <Title level={2} className="heading">Global Crypto Statistics</Title>
      <Row>
        <Col span={12}><Statistic title="Total Cryptocurrency" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets )} /></Col>
      </Row>
      <div className="home-heading-container">
          <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
          <Title level={4} className="show-more">
            <Link to="/cryptocurrencies">Show More</Link>
          </Title>
      </div>
      <Cryptocurrencies simplified={true} />
      <div className="home-heading-container">
          <Title level={2} className="home-title">Latest Crypto News</Title>
          <Title level={4} className="show-more">
            <Link to="news">Show More</Link>
          </Title>
      </div>
      <News simplified />
    </div>
  )
}

export default Homepage