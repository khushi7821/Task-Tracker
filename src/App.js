import React, { useState, useEffect } from 'react';
import SignIn from './components/Signin'; // <-- use SignIn instead of Login
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import { getTasks, saveTasks, getUser, saveTheme, getTheme } from './utils/localStorage';

const App = () => {
  const [username, setUsername] = useState(getUser());
  const [tasks, setTasks] = useState(getTasks());
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isDark, setIsDark] = useState(getTheme());
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    document.body.className = isDark ? 'dark' : '';
    saveTheme(isDark);
  }, [isDark]);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const updateTask = (updated) =>
    setTasks(tasks.map((task) => (task.id === updated.id ? updated : task)));
  const deleteTask = (id) =>
    setTasks(tasks.filter((task) => task.id !== id));

  const filteredTasks = tasks.filter((t) => {
    const matchStatus =
      filter === 'all' ||
      (filter === 'completed' && t.completed) ||
      (filter === 'pending' && !t.completed);
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      (t.description && t.description.toLowerCase().includes(search.toLowerCase()));
    const matchCategory =
      categoryFilter === 'all' || t.category === categoryFilter;
    return matchStatus && matchSearch && matchCategory;
  });

  // ✅ Show SignIn form if no user
  if (!username) return <SignIn onSignIn={setUsername} />;

  return (
    <div className="app">
      <div className="header">
  <h2>Welcome, {username} 👋</h2>
  <div className="user-header">
    <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
    <button onClick={() => setIsDark(!isDark)} className="theme-toggle-btn">
      {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  </div>
</div>


      <TaskForm onAdd={addTask} />
      <TaskFilter
        current={filter}
        onChange={setFilter}
        tasks={tasks}
        onSearch={setSearch}
        currentCategory={categoryFilter}
        onCategoryChange={setCategoryFilter}
      />
      <TaskList
        tasks={filteredTasks}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  );
};

export default App;

