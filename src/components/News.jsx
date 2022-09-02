import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'https://imageio.forbes.com/specials-images/imageserve/5dc8af63ea103f0006522230/Many-central-banks-are-striving-to-issue-digital-currencies-/960x0.jpg?format=jpg&width=960'

const News = ({ simplified }) => {

  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'CryptoCurrency', count: simplified ? 6 : 12 })

  if(!cryptoNews?.value) return 'Loading...';


  return (
    <Row gutter={[ 32, 32 ]}>
        {cryptoNews.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target="_blank" rel="noreferrer">
                    <div className="news-image-container">
                        <Title className='news-title' level={4}>{news.name}</Title>
                        <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage } alt="" />
                    </div>
                    <p>
                      {news.description > 100
                      ? `${news.description.substring(0,100)} ...`
                        : news.description
                      }
                    </p>
                    <div className="provider-container">
                        <div>
                            <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                            <Text className='provider-name'>{news.provider[0]?.name}</Text>
                        </div>
                        <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                    </div>
                   
                </a>
              </Card>
          </Col>
        ))}
    </Row>
   
  )
}

export default News