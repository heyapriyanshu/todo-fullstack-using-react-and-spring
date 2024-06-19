import { useEffect, useState } from "react";
import {
	createTodoApi,
	retrieveAllTodosForUsernameApi,
	deleteTodoApi,
	updateTodoStatusApi
} from "../api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ListTodosComponent.css"; // Import the CSS file for additional styling

export default function ListTodosComponent() {
	const [message, setMessage] = useState(null);
	const [todos, setTodos] = useState([]);
	const [newTask, setNewTask] = useState("");
	const [loading, setLoading] = useState(true); // State to manage loading status
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteIndex, setDeleteIndex] = useState(null);

	const authContext = useAuth();
	const navigate = useNavigate();
	const username = authContext.username;

	useEffect(() => {
		refreshTodos();
		// eslint-disable-next-line
	}, []);

	function refreshTodos() {
		retrieveAllTodosForUsernameApi(username)
			.then((response) => {
				setTodos(response.data.reverse());
				setLoading(false); // Set loading to false after data is fetched
			})
			.catch((error) => {
				console.log(error);
				setLoading(false); // Set loading to false if there's an error
			});
	}

	function handleUpdateTodo(id) {
		navigate(`/todo/${id}`);
	}

	function handleDeleteTodoConfirmation(index) {
		setDeleteIndex(index);
		setShowDeleteModal(true);
	}

	function handleDeleteTodo() {
		if (deleteIndex !== null) {
			const todoToDelete = todos[deleteIndex];
			deleteTodoApi(username, todoToDelete.id)
				.then(() => {
					setMessage(`Deleted successfully`);
					refreshTodos();
					setTimeout(() => {
						setMessage(null);
					}, 1000);
				})
				.catch((error) => console.log(error));
			const newTodos = todos.filter((_, i) => i !== deleteIndex);
			setTodos(newTodos);
			setDeleteIndex(null);
			setShowDeleteModal(false);
		}
	}

	async function addTask() {
		if (newTask.trim()) {
			const newTodo = {
				description: newTask,
				done: false,
				targetDate: new Date(),
			};
			setLoading(true);
			await createTodoApi(username, newTodo)
				.then((response) => {
					setTodos([response.data, ...todos]); // Add new task at the beginning
					setLoading(false);
				})
				.catch((error) => {
					console.log(error);
					setLoading(false);
				});
			setNewTask("");
		}
	}

	async function toggleTask(index){
		const updatedTodo = { ...todos[index], done: !todos[index].done };
		
		
		await updateTodoStatusApi(updatedTodo.id, updatedTodo.done)
			.then(response => console.log("Task status updated successfully"))
			.catch(error => console.log("Error updating task status", error));

		const newTodos = [...todos];
		newTodos[index] = updatedTodo;
		setTodos(newTodos);
		
	};

	return (
		<div className="container">
			{message && <div className="alert alert-warning ">{message}</div>}
			<h2>To-Do List 📋</h2>

			<div className="input-container mb-3 w-50 mx-auto">
				<textarea
					className="form-control"
					placeholder="Add your task"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
				/>
				<button className="btn btn-outline-success ms-2" onClick={addTask}>
					ADD
				</button>
			</div>
			{loading && (
				<div className="container d-flex justify-content-center align-items-center">
					<div className="spinner-border text-success" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			)}
			{!loading && (
				<ul className="list-group w-75 h-75 mx-auto todo-list">
					{todos.map((todo, index) => (
						<li
							key={index}
							className={`list-group-item d-flex justify-content-between align-items-center ${
								todo.done ? "completed" : ""
							}`}
						>
							<div className="d-flex align-items-center">
								<input
									type="checkbox"
									className="form-check-input me-2"
									checked={todo.done}
									onChange={() => toggleTask(index)}
								/>
								<span>{todo.description}</span>
							</div>
							<div>
								<button
									className="btn btn-sm me-2"
									onClick={() => handleUpdateTodo(todo.id)}
								>
									✏️
								</button>
								<button
									className="btn btn-sm"
									onClick={() => handleDeleteTodoConfirmation(index)}
								>
									❌
								</button>
							</div>
						</li>
					))}
				</ul>
			)}

			{showDeleteModal && <div className="modal-backdrop"></div>}
			{showDeleteModal && (
				<div className="modal" tabIndex="-1" style={{ display: "block" }}>
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h5 className="modal-title">Confirm Delete</h5>
								<button
									type="button"
									className="btn-close"
									onClick={() => setShowDeleteModal(false)}
								></button>
							</div>
							<div className="modal-body">
								<p>Are you sure you want to delete this task?</p>
							</div>
							<div className="modal-footer">
								<button
									type="button"
									className="btn btn-secondary"
									onClick={() => setShowDeleteModal(false)}
								>
									Cancel
								</button>
								<button
									type="button"
									className="btn btn-danger"
									onClick={handleDeleteTodo}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
