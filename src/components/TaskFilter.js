import React from 'react';

const TaskFilter = ({
  current,
  onChange,
  tasks,
  onSearch,
  onToggleTheme,
  currentCategory,
  onCategoryChange
}) => {
  const counts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
    pending: tasks.filter((t) => !t.completed).length
  };

  const categories = Array.from(new Set(tasks.map(t => t.category)));

  return (
    <div className="task-filter">
      <div className="filter-buttons">
        {['all', 'completed', 'pending'].map((type) => (
          <button
            key={type}
            className={current === type ? 'active' : ''}
            onClick={() => onChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} ({counts[type]})
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search tasks..."
        onChange={(e) => onSearch(e.target.value)}
      />

      <select value={currentCategory} onChange={(e) => onCategoryChange(e.target.value)}>
  <option value="all">All Categories</option>
  {categories.map((c, index) => (
  <option key={c + '-' + index} value={c}>{c || 'Uncategorized'}</option>
))}

</select>


      
    </div>
  );
};

export default TaskFilter;

