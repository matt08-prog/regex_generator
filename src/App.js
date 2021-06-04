import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
import { v4 as uuid } from "uuid";
import React, { useState, useCallback, useEffect } from "react";
import initialData from "./initial-data.js";
import { Column } from "./column.js";
import { ColumnContainer } from "./columnContainer.js";
import { TaskContainer } from "./taskContainer.js";
import { RegexContainer } from "./regexContainer.js";
import { Scrollable } from "./scrollable.js"
import { Button } from "./button.js"
import { ButtonContatiner } from "./buttonContatiner";
import AddImage from "./Add.png";

import "@atlaskit/css-reset";

function App({ bind }) {
  //let state = initialData;
  let t = bind;
  let [state, setState] = useState(initialData);

  function onDragStart(start) {
    console.log("start", start);
    // document.body.style.color = "white";
    // document.body.style.transition = "background-color 0.2s ease";
  }

  function onDragUpdate(update) {
    console.log("update");
    // const { destination } = update;
    // const opacity = destination
    //   ? destination.index / Object.keys(state.tasks).length
    //   : 0;
    // document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`;
  }

  function onDragEnd({ destination, source, draggableId, type }) {
    console.log("end");
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let startColumn = state.columns[source.droppableId];

    //dragging from task holder
    if (!startColumn) {
      startColumn = state.task_holder_column.task_holder;
    }

    let finishColumn = state.columns[destination.droppableId];

    //dragging to task holder
    if (!finishColumn) {
      finishColumn = state.task_holder_column.task_holder;
    }

    // Dragging column
    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };

      setState(newState);
      return;
    }

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      // re order array
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };
      setState(newState);
      return;
    }
    // handle cross column movement
    else {
      console.log("cross-column movement");
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };
      let newState;
      //dragging from task holder
      if (newStart.id == "task_holder") {
        newState = {
          ...state,
          task_holder_column: {
            [newStart.id]: newStart,
          },
          columns: {
            ...state.columns,

            [newFinish.id]: newFinish,
          },
          columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5"],
        };
      } else if (newFinish.id == "task_holder") {
        newState = {
          ...state,
          task_holder_column: {
            [newFinish.id]: newFinish,
          },
          columns: {
            ...state.columns,

            [newStart.id]: newStart,
          },
        };
      } else {
        newState = {
          ...state,
          columns: {
            ...state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
          },
        };
      }
      console.log(newState);
      setState(newState);
    }
  }

  return (
    <>
      {/* <img src={AddImage}/> */}
      <div className="Adder">
        {/* <ButtonContatiner> */}
        <Button></Button>
        <Button></Button>
        <Button></Button>
        <Button></Button>
        <Button></Button>
        {/* </ButtonContatiner> */}
      </div>
      <DragDropContext
        onDragEnd={onDragEnd}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
      >
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Scrollable>
              <ColumnContainer
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {state.columnOrder.map((columnId, index) => {
                  const column = state.columns[columnId];
                  const tasks = column.taskIds.map(
                    (taskId) => state.tasks[taskId]
                  );
                  //console.log(Object.keys(state.columns).length);
                  return (
                    <Column
                      key={column.id}
                      id={column.id}
                      column={column}
                      tasks={tasks}
                      index={index}
                    />
                  );
                })}
                {provided.placeholder}
              </ColumnContainer>
            </Scrollable>
          )}
        </Droppable>

        <Droppable
          droppableId="taskHolder"
          direction="horizontal"
          type="taskHolder"
        >
          {(provided) => (
            <TaskContainer {...provided.droppableProps} ref={provided.innerRef}>
              {state.taskHolderColumnOrder.map((columnId, index) => {
                const column = state.task_holder_column[columnId];
                const tasks = column.taskIds.map(
                  (taskId) => state.tasks[taskId]
                );
                const columns = column.columnIds.map(
                  (columnId) => state.columns[columnId]
                );

                //console.log(Object.keys(state.columns).length);
                return (
                  <Column
                    key={column.id}
                    id={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                    columns={columns}
                    state={state}
                  />
                );
              })}
              {provided.placeholder}
            </TaskContainer>
          )}
        </Droppable>
        <RegexContainer></RegexContainer>
      </DragDropContext>
    </>
  );
}

export default App;
