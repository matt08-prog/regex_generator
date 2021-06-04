import { React, useState } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { Task } from "./task.js";

const Title = styled.h3`
  padding: 8px;
  text-align: center;
`;
const TaskList = styled.div`
  display: inline-block;
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? "skyblue" : "white")};
  flex-grow: 1;
  min-height: 100px;
  
`;

function TasksOrColumns({ tasks, columns, provided, snapshot, state }) {
  if (tasks) {
    console.log("task children", provided.innerRef)
    return (
      <TaskList
        ref={provided.innerRef}
        {...provided.droppableProps}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {tasks.map((task, Index) => (
          <Task key={task.id} task={task} index={Index} />
        ))}
        {provided.placeholder}
      </TaskList>
    );
  } else if(columns){
    console.log("column children", provided.innerRef);
    console.log(columns)
    console.log(state)
    return (
      <TaskList
        ref={provided.innerRef}
        {...provided.droppableProps}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {/* {columns.map((column, Index) => (
          <Column
            column={column}
            
            key={column.id}
            isDropDisabled={false}
            index={Index}
          />
        ))} */}
        {provided.placeholder}
      </TaskList>
    );
  } else {
    console.log("empty column inside column")
    return (
      <TaskList
        ref={provided.innerRef}
        {...provided.droppableProps}
        isDraggingOver={snapshot.isDraggingOver}
      >
        {provided.placeholder}
      </TaskList>
    );
  }
}

export const Column = ({
  column,
  tasks,
  id,
  isDropDisabled,
  index,
  columns,
  state,
}) => {
  const Container1 = styled.div`
    margin: 8px;
    border: 2px solid lightgrey;
    border-radius: 2px;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: white;
    width: 98%;
    height: 95%;

    display: flex;
    flex-direction: column;
    flex-grow: 1;
  `;

  const Container = styled.div`
    margin: 8px;
    border: 2px solid lightgrey;
    border-radius: 2px;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-color: white;
    width: 20%;
    height: 95%;
    min-width: 20%;

    display: block;
    //flex-direction: column;
    //flex-grow: 1;
  `;

  console.log(column.id);
  const isDragDisabled = column.id === "task_holder";

  //render for task holder or just a random task
  if(column.id == "task_holder") {
    return (
      <Draggable
        draggableId={column.id}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <Container1 {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{column.title}</Title>
            <Droppable
              // type={column.id === "task_holder" ? "done" : "active"}
              droppableId={column.id}
              // isDropDisabled={isDropDisabled}
            >
              {(provided, snapshot) => (
                <TasksOrColumns
                  tasks={tasks}
                  columns={columns}
                  provided={provided}
                  snapshot={snapshot}
                  state={state}
                ></TasksOrColumns>
              )}
            </Droppable>
          </Container1>
        )}
      </Draggable>
    );

  } else {
    return (
      <Draggable
        draggableId={column.id}
        index={index}
        isDragDisabled={isDragDisabled}
      >
        {(provided) => (
          <Container {...provided.draggableProps} ref={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{column.title}</Title>
            <Droppable
              // type={column.id === "task_holder" ? "done" : "active"}
              droppableId={column.id}
              // isDropDisabled={isDropDisabled}
            >
              {(provided, snapshot) => (
                <TasksOrColumns
                  tasks={tasks}
                  columns={columns}
                  provided={provided}
                  snapshot={snapshot}
                  state={state}
                ></TasksOrColumns>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
};
