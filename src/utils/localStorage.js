export const saveUser = (username) =>
  localStorage.setItem('username', username);

export const getUser = () =>
  localStorage.getItem('username') || '';

export const saveTasks = (tasks) =>
  localStorage.setItem('tasks', JSON.stringify(tasks));

export const saveTheme = (isDark) =>
  localStorage.setItem('theme', isDark ? 'dark' : 'light');

export const getTheme = () =>
  localStorage.getItem('theme') === 'dark';

export const getTasks = () =>
  JSON.parse(localStorage.getItem('tasks') || '[]');
