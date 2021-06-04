import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid darkgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  text-align: center;
  // get refference to the props of the Container element and then change color based on isDragging property
  background-color: ${(props) =>
    props.isDragDisabled ? "red" : props.isDragging ? "green" : "white"};
  color: ${(props) => props.isDragDisabled ? "white" : "inherit"};
  display: flex;
  
`;

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`;

export const Task = ({ task, index }) => {
  const isDragDisabled = task.id === "task-1";
  //console.log(`${task.id} => ${isDragDisabled}`)
  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          <Handle />
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};
