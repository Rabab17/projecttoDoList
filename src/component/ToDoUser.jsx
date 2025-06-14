import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiShare2, FiEyeOff, FiTrash2, FiEdit2, FiCheck, FiClock, FiCalendar, FiSave, FiX } from 'react-icons/fi';
import './ToDo.css';
import { useNavigate } from "react-router-dom";

function ToDoUser() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedTodo, setEditedTodo] = useState({
    name: '',
    description: '',
    date: '',
    priority: 'medium',
    status: 'pending'
  });

  useEffect(() => {
    const fetchToDos = async () => {
      try {
        const response = await axios.get('http://localhost:3200/ToDo/684a02155cad50cbbabb6368');
        const data = response.data?.data || [];
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchToDos();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getPriorityClass = (priority) => {
    const map = {
      low: 'low-priority',
      medium: 'medium-priority',
      high: 'high-priority'
    };
    return map[priority] || '';
  };

  const getStatusClass = (status) => {
    const map = {
      pending: 'pending-status',
      completed: 'completed-status',
      inprogress: 'inprogress-status'
    };
    return map[status] || '';
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditedTodo({
      name: todo.name,
      description: todo.description,
      date: todo.date.split('T')[0],
      priority: todo.priority,
      status: todo.status
    });
  };

  const handleSave = async (id) => {
    try {
      const formattedDate = new Date(editedTodo.date).toISOString();
      const updatedTodo = { ...editedTodo, date: formattedDate };

      const response = await axios.patch(`http://localhost:3200/ToDo/${id}`, updatedTodo);
      setTodos(todos.map(todo => todo._id === id ? response.data.data : todo));
      setEditingId(null);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3200/ToDo/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTodo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="todo-app">
      <header>
        <h1>User ToDos</h1>
        <p>Manage your tasks and stay organized</p>
      </header>

      <div className="todos-container">
        {loading ? (
          <div className="loading-state">
            <FiClock className="loading-icon" />
            <p>Loading todos...</p>
          </div>
        ) : Array.isArray(todos) && todos.length === 0 ? (
          <div className="empty-state">
            <FiCalendar className="empty-icon" />
            <p>No todos found. Add a task to get started!</p>
             <button className="add-task-btn" onClick={() => navigate("/addToDo")}>
    + Add New Task
  </button>
          </div>
        ) : (
          todos.map((todo) => (
            <div className={`todo-card ${editingId === todo._id ? 'editing' : ''}`} key={todo._id}>
              {editingId === todo._id ? (
                <div className="edit-mode">
                  <div className="edit-header">
                    <h2>Edit Task</h2>
                    <button className="close-edit" onClick={() => setEditingId(null)}>
                      <FiX size={20} />
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Task Name</label>
                    <input type="text" name="name" value={editedTodo.name} onChange={handleInputChange} />
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={editedTodo.description} onChange={handleInputChange} />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Due Date</label>
                      <input type="date" name="date" value={editedTodo.date} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                      <label>Priority</label>
                      <select name="priority" value={editedTodo.priority} onChange={handleInputChange}>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <select name="status" value={editedTodo.status} onChange={handleInputChange}>
                      <option value="pending">Pending</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  <div className="edit-actions">
                    <button className="save-btn" onClick={() => handleSave(todo._id)}>
                      <FiSave className="action-icon" /> Save Changes
                    </button>
                    <button className="cancel-btn" onClick={() => setEditingId(null)}>
                      <FiX className="action-icon" /> Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="todo-header">
                    <div className="todo-title-container">
                      <h2 className="todo-title">{todo.name}</h2>
                      <span className={`priority-badge ${getPriorityClass(todo.priority)}`}>
                        <FiClock className="priority-icon" />
                        {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                      </span>
                    </div>
                    <div className="status-container">
                      <span className={`status-tag ${getStatusClass(todo.status)}`}>
                        {todo.status === 'completed' ? <FiCheck /> : <FiClock />}
                        {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="todo-content">
                    <p className="todo-description">{todo.description}</p>
                    <div className="todo-due-date">
                      <FiCalendar className="calendar-icon" />
                      Due: {formatDate(todo.date)}
                    </div>
                  </div>

                  <div className="todo-footer">
                    <div className="todo-actions">
                      <button className="action-button share">
                        <FiShare2 className="action-icon" /> Share
                      </button>
                      <button className="action-button hide">
                        <FiEyeOff className="action-icon" /> Hide
                      </button>
                      <button className="action-button edit" onClick={() => handleEdit(todo)}>
                        <FiEdit2 className="action-icon" /> Update
                      </button>
                      <button className="action-button delete" onClick={() => handleDelete(todo._id)}>
                        <FiTrash2 className="action-icon" /> Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ToDoUser;
