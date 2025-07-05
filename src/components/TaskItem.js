import React, { useState } from 'react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High':
      return 'red';
    case 'Medium':
      return 'orange';
    case 'Low':
    default:
      return 'green';
  }
};

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [isEditing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDesc, setEditDesc] = useState(task.description);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate);
  const [editCategory, setEditCategory] = useState(task.category);

  const toggleComplete = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  const saveEdit = () => {
    onUpdate({
      ...task,
      title: editTitle,
      description: editDesc,
      priority: editPriority,
      dueDate: editDueDate,
      category: editCategory
    });
    setEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <input value={editDesc} onChange={(e) => setEditDesc(e.target.value)} />
          <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <input type="date" value={editDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
          <input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Priority: <span style={{ color: getPriorityColor(task.priority), fontWeight: 'bold' }}>{task.priority}</span></p>
          <p>Due: {task.dueDate || 'N/A'}</p>
          <p>Category: <strong>{task.category}</strong></p>
          <p className="timestamp">Created: {new Date(task.createdAt).toLocaleString()}</p>
          <p>Status: {task.completed ? '✅ Completed' : '❌ Pending'}</p>
          <button onClick={toggleComplete}>Complete</button>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={() => window.confirm('Delete this task?') && onDelete(task.id)}>Delete</button>
        </>
      )}
    </div>
  );
};

export default TaskItem;

