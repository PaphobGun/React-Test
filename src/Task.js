import { useContext, useState } from 'react';
import { Button, Card, Divider, Input, Space, Typography } from 'antd';
import SubTask from './SubTask';
import { TaskContext } from './TaskContext';

const Task = ({ id, taskName, task, isAllDone }) => {
  const [_, dispatch] = useContext(TaskContext);

  const [subValue, setSubValue] = useState('');

  const handleOnChangeInput = (e) => {
    setSubValue(e.target.value);
  };

  const handleOnClickAddSubTask = () => {
    dispatch({ type: 'ADD_SUB', id, payload: { name: subValue } });
    setSubValue('');
  };

  const handleOnClickDupplicateTask = () => {
    dispatch({ type: 'DUP', id });
  };

  const handleOnClickDelTask = () => {
    dispatch({ type: 'DEL', id });
  };

  return (
    <Space direction="vertical" style={{ marginTop: 24 }}>
      <Card
        title={<Typography.Text delete={isAllDone}>{taskName}</Typography.Text>}
        style={{ width: 600 }}
        extra={
          <>
            <Button type="primary" onClick={handleOnClickDupplicateTask}>
              Duplicate
            </Button>{' '}
            <Button type="primary" danger onClick={handleOnClickDelTask}>
              Delete
            </Button>
          </>
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Space>
            <Input
              placeholder="Enter Subtask Name"
              style={{ width: 400 }}
              onChange={handleOnChangeInput}
              value={subValue}
            />
            <Button type="primary" onClick={handleOnClickAddSubTask}>
              Add Subtask
            </Button>
          </Space>
          <Divider />
          {task?.map(({ subId, name, isDone }, index) => (
            <SubTask
              taskId={id}
              subId={subId}
              key={index}
              name={name}
              isDone={isDone}
            />
          ))}
        </Space>
      </Card>
    </Space>
  );
};

export default Task;
