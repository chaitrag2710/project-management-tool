import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "https://project-management-tool-os2t.onrender.com/api/users/login";

function App() {
  const [page, setPage] = useState("login");
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");

  const [taskTitle, setTaskTitle] = useState("");
  const [status, setStatus] = useState("To-Do");

  const fetchData = async () => {
    const p = await axios.get(`${API}/api/projects`);
    const t = await axios.get(`${API}/api/tasks`);
    setProjects(p.data);
    setTasks(t.data);
  };

  useEffect(() => {
    if (page === "dashboard") fetchData();
  }, [page]);

  const register = async () => {
    await axios.post(`${API}/api/users/register`, { name, email, password });
    alert("Registered");
    setPage("login");
  };

  const login = async () => {
    await axios.post(`${API}/api/users/login`, { email, password });
    alert("Login Success");
    setPage("dashboard");
  };

  const addProject = async () => {
    await axios.post(`${API}/api/projects`, {
      name: projectName,
      description,
      createdBy: "Chaitra",
    });
    setProjectName("");
    setDescription("");
    fetchData();
  };

  const deleteProject = async (id) => {
    await axios.delete(`${API}/api/projects/${id}`);
    fetchData();
  };

  const addTask = async () => {
    await axios.post(`${API}/api/tasks`, { title: taskTitle, status });
    setTaskTitle("");
    setStatus("To-Do");
    fetchData();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`);
    fetchData();
  };

  if (page === "register") {
    return (
      <div className="container">
        <h2>Register</h2>
        <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={register}>Register</button>
        <p onClick={() => setPage("login")}>Already have account? Login</p>
      </div>
    );
  }

  if (page === "login") {
    return (
      <div className="container">
        <h2>Login</h2>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
        <p onClick={() => setPage("register")}>New user? Register</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Project Management Dashboard</h2>
      <button onClick={() => setPage("login")}>Logout</button>

      <div className="card">
        <h3>Dashboard Statistics</h3>
        <p>Total Projects: {projects.length}</p>
        <p>Total Tasks: {tasks.length}</p>
        <p>To-Do: {tasks.filter((t) => t.status === "To-Do").length}</p>
        <p>In Progress: {tasks.filter((t) => t.status === "In Progress").length}</p>
        <p>Done: {tasks.filter((t) => t.status === "Done").length}</p>
      </div>

      <h3>Add Project</h3>
      <input placeholder="Project Name" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
      <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <button onClick={addProject}>Add Project</button>

      <h3>Projects</h3>
      {projects.map((p) => (
        <div className="card" key={p._id}>
          <h4>{p.name}</h4>
          <p>{p.description}</p>
          <button onClick={() => deleteProject(p._id)}>Delete</button>
        </div>
      ))}

      <h3>Add Task</h3>
      <input placeholder="Task Title" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>To-Do</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <button onClick={addTask}>Add Task</button>

      <h3>Tasks</h3>
      {tasks.map((t) => (
        <div className="card" key={t._id}>
          <p>{t.title} - {t.status}</p>
          <button onClick={() => deleteTask(t._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default App;