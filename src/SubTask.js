import React, { useContext } from 'react';
import { Row, Col, Typography, Button } from 'antd';

import { TaskContext } from './TaskContext';

const SubTask = ({ taskId, subId, name, isDone }) => {
  const [_, dispatch] = useContext(TaskContext);

  const handleOnClickDelSub = () => {
    dispatch({ type: 'DEL_SUB', id: taskId, subId });
  };

  const handleOnClickToggle = () => {
    dispatch({ type: 'TOGGLE', id: taskId, subId });
  };

  return (
    <Row>
      <Col span={16}>
        <Typography.Text delete={isDone}>{name}</Typography.Text>
      </Col>
      <Col span={8}>
        <Button type="primary" onClick={handleOnClickToggle}>
          {isDone ? 'Undo' : 'Done'}
        </Button>{' '}
        <Button type="danger" onClick={handleOnClickDelSub}>
          Delete
        </Button>
      </Col>
    </Row>
  );
};

export default SubTask;
