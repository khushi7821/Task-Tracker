import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, filter, onUpdate, onDelete }) => {
  const filtered = tasks.filter((t) =>
    filter === 'completed' ? t.completed :
    filter === 'pending' ? !t.completed : true
  );

  return (
    <div className="task-list">
      {filtered.length === 0 ? <p>No tasks.</p> :
        filtered.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default TaskList;
