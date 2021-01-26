import { useState, useEffect, useReducer } from 'react';
import { Button, Input, Space } from 'antd';
import styled from 'styled-components';
import Task from './Task';
import { TaskContext } from './TaskContext';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  padding: 16px 24px;
`;

let id = 0;
let subId = 0;

const initialState = [];
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // prevent empty string
      if (!action.payload.name) {
        return [...state];
      } else {
        id++;
        return [...state, action.payload];
      }
    case 'ADD_SUB':
      const selectedTask = state.find(({ id }) => id === action.id);
      // prevent empty string
      if (!action.payload.name) {
        return [...state];
      } else {
        subId++;
        selectedTask.task = [
          ...selectedTask?.task,
          { subId, name: action.payload.name, isDone: false },
        ];
        return [...state];
      }
    case 'DUP':
      const targetTask = state.find(({ id }) => id === action.id);
      id++;
      const newDupTask = {
        ...targetTask,
        id,
        task: targetTask.task.map((subTask) => ({
          ...subTask,
        })),
      };
      return [...state, newDupTask];
    case 'DEL':
      return state.filter(({ id }) => id !== action.id);
    case 'DEL_SUB':
      const target = state.find(({ id }) => id === action.id);
      target.task = target.task.filter(({ subId }) => subId !== action.subId);
      return [...state];
    case 'TOGGLE':
      const toggleTargetTask = state.find(({ id }) => id === action.id);
      const toggleTarget = toggleTargetTask.task.find(
        ({ subId }) => subId === action.subId
      );
      toggleTarget.isDone = !toggleTarget.isDone;

      if (toggleTargetTask.task.every(({ isDone }) => isDone !== false)) {
        toggleTargetTask.isAllDone = true;
      } else {
        toggleTargetTask.isAllDone = false;
      }
      return [...state];
    default:
      return [...state];
  }
};

function App() {
  const [taskValue, setTaskValue] = useState('');
  const TaskContextReducer = useReducer(reducer, initialState);
  const [data, dispatch] = TaskContextReducer;

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleOnChangeInputTask = (e) => {
    setTaskValue(e.target.value);
  };

  const handleOnClickAddTask = () => {
    dispatch({
      type: 'ADD',
      payload: { id, name: taskValue, task: [], isAllDone: false },
    });
    setTaskValue('');
  };

  return (
    <Container>
      <Space>
        <Input
          style={{ width: 400 }}
          placeholder="Enter Task Name"
          value={taskValue}
          onChange={handleOnChangeInputTask}
        />
        <Button type="primary" onClick={handleOnClickAddTask}>
          Create Task
        </Button>
      </Space>
      <TaskContext.Provider value={TaskContextReducer}>
        {data?.map(({ id, name, task, isAllDone }, index) => (
          <Task
            key={index}
            id={id}
            taskName={name}
            task={task}
            isAllDone={isAllDone}
          />
        ))}
      </TaskContext.Provider>
    </Container>
  );
}

export default App;
