const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Drag and drop blocks" },
    "task-2": {
      id: "task-2",
      content: "Vertical cards hold what should be in that group",
    },
    "task-3": {
      id: "task-3",
      content: "Cards can be connected by an AND or an OR",
    },
    "task-4": {
      id: "task-4",
      content: "right hand side shows the final regex",
    },
    "task-5": {
      id: "task-5",
      content: "Character count next to regex",
    },
    "task-6": {
      id: "task-6",
      content: "Copy and paste button next to regex",
    },
  },

  task_holder_column: {
    task_holder: {
      id: "task_holder",
      title: "Task Holder",
      taskIds: ["task-6"],
      columnIds: ["column-5"],
    },
  },
  taskHolderColumnOrder: ["task_holder"],
  columns: {
    "column-1": {
      id: "column-1",
      title: "Or",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "AND",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Or",
      taskIds: [],
    },
    "column-4": {
      id: "column-4",
      title: "AND",
      taskIds: [],
    },
    "column-5": {
      id: "column-5",
      title: "NOR",
      taskIds: ["task-6"],
    },
  },
  columnOrder: ["column-1"],
};

export default initialData;
