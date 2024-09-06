import { Component } from "react";
import TodoItem from "./components/ui/TodoItem";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import InputField from "./components/form/InputField";
import Button from "./components/ui/Button";
import { uid } from "uid";

class App extends Component {
  // state to manage the tasks list and the current being entered
  state = {
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    newTask: "",
  };

  // sets the value of newTask to the value being entered by the user
  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  // Method used to add the tasks in the local storage
  handleAddTask = (event) => {
    event.preventDefault();
    if (this.state.newTask.trim()) {
      this.setState(
        (prevState) => {
          const updatedTasks = [
            ...prevState.tasks,
            {
              _id: uid(),
              title: this.state.newTask,
              completed: false,
            },
          ];
          localStorage.setItem("tasks", JSON.stringify(updatedTasks));
          return {
            tasks: updatedTasks,
            newTask: "",
          };
        },
        () => toast.success("Task Added !")
      );
    } else {
      toast.error("Please Provide Some Input!");
    }
  };

  // Method handles the enter key while inputting
  handleEnter = (event) => {
    if (event.key === "Enter") {
      this.handleAddTask(event);
    }
  };

  // Method to handle updating a task
  handleUpdateTask = (id, updatedTitle) => {
    const updatedTasks = this.state.tasks.map((task) => {
      if (task._id === id) {
        return { ...task, title: updatedTitle };
      }
      return task;
    });

    this.setState({ tasks: updatedTasks }, () => {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task Updated!");
    });
  };

  // Method that updates the completion status in local storage
  handleToggleComplete = (id, completed) => {
    const updatedTasks = this.state.tasks.map((task) =>
      task._id === id ? { ...task, completed } : task
    );

    this.setState({ tasks: updatedTasks }, () => {
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    });
  };

  // Method used to remove the data from the local storage
  onRemove = (del_id) => {
    console.log(del_id);
    const updatedTasks = this.state.tasks.filter((task) => task._id !== del_id);
    this.setState({ tasks: updatedTasks }, () => toast.error("Task removed!"));
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  render() {
    return (
      <>
        <div className="appContainer text-white flex flex-col justify-center items-center bg-slate-600 w-full min-h-screen">
          {/* App Heading */}
          <h1
            className={`text-4xl font-bold sticky ${
              this.state.tasks.length > 7 ? "pt-16" : ""
            }`}
          >
            ToDo List App
          </h1>
          {/* Tasks Input Container */}
          <div className="inputTaskContainer mt-10 flex gap-3">
            <InputField
              fun={this.handleInputChange}
              value={this.state.newTask}
              addTask={this.handleEnter}
            />
            <Button
              buttonText="Add Task"
              bgColor="#4291bd"
              fun={this.handleAddTask}
            />
          </div>
          {/* Tasks Display Container */}
          <div className="taskListContainer mt-20 w-[90%]">
            {this.state.tasks.length < 1 ? (
              <p className="text-center">No tasks remaining!</p>
            ) : (
              this.state.tasks.map((task) => (
                <TodoItem
                  key={task._id}
                  task={task}
                  onRemove={() => this.onRemove(task._id)}
                  onUpdate={this.handleUpdateTask}
                  onToggleComplete={this.handleToggleComplete}
                />
              ))
            )}
          </div>
        </div>
        {/* Toast Container to show the messages on actions being performed */}
        <ToastContainer autoClose={1500} position="bottom-right" />
      </>
    );
  }
}

export default App;
