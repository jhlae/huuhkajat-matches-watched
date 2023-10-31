import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Radio, Table, Divider } from 'antd';

import './App.scss';

function App() {
  const [count, setCount] = useState(0);
  const [matches, setMatches] = useState([]);
  const [visibleMatches, setVisibleMatches] = useState([]);
  const [filter, setFilter] = useState('');

  const columns = [
    {
      key: 'pvm',
      title: 'Pvm',
      dataIndex: 'Pvm',
      width: 150
    },
    {
      key: 'ottelu',
      title: 'Ottelu',
      dataIndex: 'Ottelu',
      width: 400
    },
    {
      key: 'tulos',
      title: 'Tulos',
      dataIndex: 'Tulos',
      width: 150
    },
    {
      key: 'tv_live',
      title: 'TV / Live',
      dataIndex: 'Live'
    }
  ];

  useEffect(() => {
    axios.get('/matches.json').then((response) => {
      const data = response.data;
      setMatches([...matches, ...data]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const liveMatches = matches.filter((match) => match.Live !== 'TV');
    setCount([liveMatches.length]);
  }, [matches]);

  const filterTable = (result) => {
    const visibleMatches = [...matches];

    if (result == 'wins') {
      const visibleMatchesFiltered = matches.filter(
        (visibleMatches) => visibleMatches.Voitto == '1'
      );
      setFilter('wins');
      setVisibleMatches(visibleMatchesFiltered);
    } else if (result == 'draws') {
      const visibleMatchesFiltered = matches.filter(
        (visibleMatches) => visibleMatches.Tasapeli == '1'
      );
      setFilter('draws');
      setVisibleMatches(visibleMatchesFiltered);
    } else if (result == 'losses') {
      const visibleMatchesFiltered = matches.filter(
        (visibleMatches) => visibleMatches.Tappio == '1'
      );
      setFilter('losses');
      setVisibleMatches(visibleMatchesFiltered);
    } else {
      setFilter('');
    }
  };

  return (
    <>
      <Row align="middle" justify="center">
        <Col xs={24} lg={24}>
          <Divider>
            <h1>
              <span>
                🦉<sub>⚽️</sub>
              </span>
              2010–2023
            </h1>
          </Divider>

          <p align="middle" justify="center">
            🙃 {count} live matches from total of {matches.length} watched
          </p>
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col>
          <h3>Filters</h3>
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col>
          <Radio.Group value={filter} onChange={(e) => filterTable(e.target.value)}>
            <Radio.Button value="">Show all</Radio.Button>
            <Radio.Button value="wins">Wins</Radio.Button>
            <Radio.Button value="draws">Draws</Radio.Button>
            <Radio.Button value="losses">Losses</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col>
          {filter != '' && (
            <Table
              columns={columns}
              dataSource={visibleMatches}
              rowKey="Pvm"
              pagination={{ position: ['bottomCenter'], defaultPageSize: 20 }}
              size="small"
            />
          )}

          {filter === '' && (
            <Table
              columns={columns}
              dataSource={matches}
              rowKey="Pvm"
              pagination={{ position: ['bottomCenter'], defaultPageSize: 20 }}
              size="small"
            />
          )}
        </Col>
      </Row>
    </>
  );
}

export default App;
