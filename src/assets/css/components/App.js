import '../assets/css/App.css';
import React from 'react';
import Sidebar from './Sidebar';
import Project from './Project';
import VisibleAppSettingsMenu from './AppSettingsMenu/AppSettingsMenu';
import MessageBox from './MessageBox';
import Button from './Button';
import VisibleSnackbar from './Snackbar';
import '../assets/css/TaskListWidget.css';
import '../assets/css/Sidebar.css';
import '../assets/css/Project.css';
import { connect } from 'react-redux';
import { MessageBoxTypes } from 'pounder-redux';
import { setFocusedTaskListId, selectTask, openTask, startTaskMove, getProjectsAsync, getTasksAsync,
unsubscribeProjectsAsync, unsubscribeProjectLayoutsAsync, unsubscribeTaskListsAsync, unsubscribeTasksAsync,
setOpenTaskListSettingsMenuId, openCalendar, addNewTaskListAsync, addNewTaskAsync,
changeFocusedTaskList, moveTaskAsync, updateTaskListWidgetHeaderAsync, getTaskListsAsync, getProjectLayoutsAsync,
removeSelectedTaskAsync, updateTaskNameAsync, selectProjectAsync, updateProjectLayoutAsync, updateTaskCompleteAsync,
addNewProjectAsync, removeProjectAsync, updateProjectNameAsync, removeTaskListAsync, updateTaskListSettingsAsync,
updateTaskDueDateAsync, updateTaskPriority, openTaskListJumpMenu, closeTaskListJumpMenu, getGeneralConfigAsync,
unSubscribeAccountConfigAsync, setIsAppSettingsOpen, gegtAccountConfigAsync, getCSSConfigAsync, setAppSettingsMenuPage,
setMessageBox, subscribeToDatabaseAsync, unsubscribeFromDatabaseAsync, attachAuthListenerAsync
} from 'pounder-redux/action-creators';

class App extends React.Component {
  constructor(props) {
    super(props);

    // State.
    this.state = {
      isConnectedToFirebase: false,
      currentErrorMessage: "",
    }; 

    // Class Storage.
    this.isCtrlKeyDown = false;
    
    // Method Bindings.
    this.handleTaskChanged = this.handleTaskChanged.bind(this);
    this.handleTaskListWidgetFocusChange = this.handleTaskListWidgetFocusChange.bind(this);
    this.handleTaskListWidgetHeaderChanged = this.handleTaskListWidgetHeaderChanged.bind(this);
    this.handleProjectSelectorClick = this.handleProjectSelectorClick.bind(this);
    this.handleTaskCheckBoxClick = this.handleTaskCheckBoxClick.bind(this);
    this.handleAddProjectClick = this.handleAddProjectClick.bind(this);
    this.handleRemoveProjectClick = this.handleRemoveProjectClick.bind(this);
    this.handleProjectNameSubmit = this.handleProjectNameSubmit.bind(this);
    this.handleTaskListWidgetRemoveButtonClick = this.handleTaskListWidgetRemoveButtonClick.bind(this);
    this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
    this.addNewTask = this.addNewTask.bind(this);
    this.handleRemoveTaskButtonClick = this.handleRemoveTaskButtonClick.bind(this);
    this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
    this.addNewTaskList = this.addNewTaskList.bind(this);
    this.handleRemoveTaskListButtonClick = this.handleRemoveTaskListButtonClick.bind(this);
    this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
    this.handleTaskClick = this.handleTaskClick.bind(this);
    this.handleTaskTwoFingerTouch = this.handleTaskTwoFingerTouch.bind(this);
    this.handleDueDateClick = this.handleDueDateClick.bind(this);
    this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
    this.handleTaskListSettingsButtonClick = this.handleTaskListSettingsButtonClick.bind(this);
    this.getSelectedProjectTasks = this.getSelectedProjectTasks.bind(this);
    this.handleTaskPriorityToggleClick = this.handleTaskPriorityToggleClick.bind(this);
    this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
    this.initializeConfig = this.initializeConfig.bind(this);
    this.handleAppSettingsButtonClick = this.handleAppSettingsButtonClick.bind(this);
    this.getAppSettingsMenuJSX = this.getAppSettingsMenuJSX.bind(this);
  }

  componentDidMount(){
    // Read and Apply Config values.
    this.initializeConfig();
    // Attach an Authentication state listener. Will pull down database when Logged in.
    this.props.dispatch(attachAuthListenerAsync());
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    // Apply CSS Variables.
    if (JSON.stringify(prevProps.cssConfig) !== JSON.stringify(this.props.cssConfig)) {
      // Enumerate and Apply CSS Values.
      for (var property in this.props.cssConfig) {
        let value = this.props.cssConfig[property];
        if (value !== "") {
          document.getElementById("root").style.setProperty(property, value);
        }
      }
    }
  }

  componentWillUnmount(){
    // Stop listening to the Database.
    this.unSubscribeFromDatabase();
  }

  render() {
    var projects = this.props.projects == undefined ? [] : this.props.projects;
    var projectName = this.getProjectName(this.props);

    return (
      <div>
        <div className="SidebarProjectFlexContainer">
          <div className="SidebarContainer">
            <Sidebar className="Sidebar" projects={projects} selectedProjectId={this.props.selectedProjectId}
              onProjectSelectorClick={this.handleProjectSelectorClick} onAddProjectClick={this.handleAddProjectClick}
              onRemoveProjectClick={this.handleRemoveProjectClick} onProjectNameSubmit={this.handleProjectNameSubmit}
              projectSelectorDueDateDisplays={this.props.projectSelectorDueDateDisplays}
              favouriteProjectId={this.props.accountConfig.favoriteProjectId}
              />
          </div>
          <div className="ProjectContainer">
            <Project taskLists={this.props.taskLists} tasks={this.props.tasks} selectedTask={this.props.selectedTask}
              movingTaskId={this.props.movingTaskId} focusedTaskListId={this.props.focusedTaskListId}
              projectId={this.props.selectedProjectId} onTaskListWidgetRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick}
              onTaskChanged={this.handleTaskChanged} onTaskListWidgetFocusChanged={this.handleTaskListWidgetFocusChange}
              onTaskListWidgetHeaderChanged={this.handleTaskListWidgetHeaderChanged}
              onTaskCheckBoxClick={this.handleTaskCheckBoxClick} onTaskMoved={this.handleTaskMoved}
              onAddTaskButtonClick={this.handleAddTaskButtonClick} onRemoveTaskButtonClick={this.handleRemoveTaskButtonClick}
              onAddTaskListButtonClick={this.handleAddTaskListButtonClick} onRemoveTaskListButtonClick={this.handleRemoveTaskListButtonClick}
              onTaskListSettingsChanged={this.handleTaskListSettingsChanged} onTaskClick={this.handleTaskClick}
              sourceTaskListId={this.props.sourceTaskListId} projectName={projectName}
              onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch} onDueDateClick={this.handleDueDateClick}
              openCalendarId={this.props.openCalendarId} onNewDateSubmit={this.handleNewDateSubmit}
              onTaskListSettingsButtonClick={this.handleTaskListSettingsButtonClick}
              openTaskListSettingsMenuId={this.props.openTaskListSettingsMenuId}
              onTaskPriorityToggleClick={this.handleTaskPriorityToggleClick}
              onTaskListJumpMenuButtonClick={this.handleTaskListJumpMenuButtonClick}
              isTaskListJumpMenuOpen={this.props.isTaskListJumpMenuOpen}
            />
          </div>
        </div>
      </div>
    );
  }

  getAppSettingsMenuJSX() {
    if (this.props.isAppSettingsOpen) {
      return (
        <VisibleAppSettingsMenu/>
      )
    }
  }

  handleAppSettingsButtonClick() {
    this.props.dispatch(setIsAppSettingsOpen(!this.props.isAppSettingsOpen));
  }

  handleTaskListJumpMenuButtonClick() {
    if (this.props.isTaskListJumpMenuOpen) {
      this.props.dispatch(closeTaskListJumpMenu());
    }

    else {
      this.props.dispatch(openTaskListJumpMenu());
    }
  }

  initalizeConfig() {
    this.props.dispatch(getGeneralConfigAsync());
    this.props.dispatch(getCSSConfigAsync());
  }

  handleTaskPriorityToggleClick(taskId, newValue) {
    this.props.dispatch(updateTaskPriority(taskId, newValue));
  }

  getProjectName(props) {
    if (props.selectedProjectId === -1) {
      return ""
    }

    else {
      var selectedProject = this.props.projects.find(project => {
        return project.uid === props.selectedProjectId
      })

      if (selectedProject !== undefined) {
        return selectedProject.projectName;
      }

      else {
        return "";
      }
    }
  }

  getSelectedProjectTasks() {
    if (this.props.selectedProjectId === -1) {
      return [];
    }

    // TODO: Firebase is return a query ordered by projectID, therefore this could bail out once it's found
    // the first matching Task and iterated onto a non matching task for a performance gain.
    else {
      var returnList = [];
      this.props.tasks.forEach(item => {
        if (item.project === this.props.selectedProjectId) {
          returnList.push(item);
        }
      })
    }
  }

  handleTaskListSettingsButtonClick(projectId, taskListWidgetId) {
    this.props.dispatch(setOpenTaskListSettingsMenuId(taskListWidgetId));
  }

  handleDueDateClick(projectId, taskListWidgetId, taskId) {
    this.props.dispatch(openCalendar(taskListWidgetId, taskId));
  }

  handleTaskClick(element, projectId, taskListWidgetId) {
    // TODO: Do you need to provide the entire Element as a parameter? Why not just the taskID?
    var selectedTask = this.props.selectedTask;
    var openCalendarId = this.props.openCalendarId === element.props.taskId ? this.props.openCalendarId : -1; // Keep calendar Open if it already Open.

    // If a task is already moving, it's completion will be handled by the Task List Focus change. Letting the selecition handling runs
    // causes problems.
    if (this.props.isATaskMoving === false) {
      if (selectedTask.taskListWidgetId === taskListWidgetId &&
        selectedTask.taskId === element.props.taskId) {
        // Task Already Selected. Exclusively open it's Text Input.
        this.props.dispatch(openTask(taskListWidgetId, element.props.taskId));
      }

      else {
        // Otherwise just Select it.
        this.props.dispatch(selectTask(taskListWidgetId, element.props.taskId));
      }
    }
  }

  handleTaskTwoFingerTouch(taskListWidgetId, taskId) {
    this.props.dispatch(startTaskMove(taskId, taskListWidgetId));
  }

  handleRemoveTaskListButtonClick() {
    if (this.props.focusedTaskListId !== -1) {
      this.props.dispatch(setMessageBox(true, "Are you sure?", MessageBoxTypes.STANDARD, null,
        (result) => {
          if (result === "ok") {
            this.removeTaskList(this.props.focusedTaskListId);
          }
          this.props.dispatch(setMessageBox({}));
        }));
    }
  }

  handleAddTaskListButtonClick() {
    this.addNewTaskList();
  }

  handleAddTaskButtonClick() {
    // TODO: Make sure this won't crash out if nothing is Selected.
    this.addNewTask();
  }

  handleRemoveTaskButtonClick() {
    this.props.dispatch(removeSelectedTaskAsync());
  }

  handleTaskChanged(projectId, taskListWidgetId, taskId, newData) {
    this.props.dispatch(updateTaskNameAsync(taskListWidgetId, taskId, newData));
  }

  addNewTaskList() {
    this.props.dispatch(addNewTaskListAsync());
  }

  addNewTask() {
    this.props.dispatch(addNewTaskAsync());
  }

  makeNewLayoutEntry(taskListId) {
    return {i: taskListId, x: 0, y: 0, w: 3, h: 5 };
  }

  handleTaskListWidgetFocusChange(taskListWidgetId, isFocused) {
    if (!isFocused) {
      if (this.props.isATaskMoving) {
        this.props.dispatch(moveTaskAsync(taskListWidgetId));
      }

      this.props.dispatch(changeFocusedTaskList(taskListWidgetId));
    }
  }

  handleTaskListWidgetHeaderChanged(taskListWidgetId, newData) {
    this.props.dispatch(updateTaskListWidgetHeaderAsync(taskListWidgetId, newData));
  }

  handleProjectSelectorClick(e, projectSelectorId) {
    this.props.dispatch(selectProjectAsync(projectSelectorId));
  }
  
  handleTaskCheckBoxClick(e, projectId, taskListWidgetId, taskId, incomingValue) {
    this.props.dispatch(updateTaskCompleteAsync(taskListWidgetId, taskId, incomingValue));
  }

  handleAddProjectClick() {
    this.props.dispatch(addNewProjectAsync());
  }

  handleRemoveProjectClick(projectId) {
    if (projectId !== -1) {
      this.props.dispatch(setMessageBox(true, "Are you sure?", MessageBoxTypes.STANDARD, null,
        (result) => {
          if (result === "ok") {
            this.props.dispatch(removeProjectAsync(projectId));
          }
          this.props.dispatch(setMessageBox({}));
        }));
    }
  }

  handleProjectNameSubmit(projectSelectorId, newName) {
    this.props.dispatch(updateProjectNameAsync(projectSelectorId, newName));
  }

  handleTaskListWidgetRemoveButtonClick(projectId, taskListWidgetId) {
    this.props.dispatch(setMessageBox(true, "Are you sure?", MessageBoxTypes.STANDARD, null,
      (result) => {
        if (result === "ok") {
          this.removeTaskList(taskListWidgetId);
        }
        this.props.dispatch(setMessageBox({}));
      }));
  }

  removeTaskList(taskListWidgetId) {
    this.props.dispatch(removeTaskListAsync(taskListWidgetId));
  }

  postFirebaseError(error) {
    // console.error(error);
    // this.setState({
    //   isAwaitingFirebase: false,
    //   currentErrorMessage: "An error has occurred. Please consult Developer Diagnostics Log"});
  }

  handleTaskListSettingsChanged(projectId, taskListWidgetId, newTaskListSettings) {
    this.props.dispatch(updateTaskListSettingsAsync(taskListWidgetId, newTaskListSettings));
  }

  handleNewDateSubmit(projectId, taskListWidgetId, taskId, newDate) {
    this.props.dispatch(updateTaskDueDateAsync(taskId, newDate));
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    taskLists: state.taskLists,
    tasks: state.tasks,
    focusedTaskListId: state.focusedTaskListId,
    selectedTask: state.selectedTask,
    selectedProjectId: state.selectedProjectId,
    isATaskMoving: state.isATaskMoving,
    movingTaskId: state.movingTaskId,
    sourceTaskListId: state.sourceTaskListId,
    openCalendarId: state.openCalendarId,
    openTaskListSettingsMenuId: state.openTaskListSettingsMenuId,
    projectSelectorDueDateDisplays: state.projectSelectorDueDateDisplays,
    isTaskListJumpMenuOpen: state.isTaskListJumpMenuOpen,
    isDexieConfigLoadComplete: state.isDexieConfigLoadComplete,
    generalConfig: state.generalConfig,
    isAppSettingsOpen: state.isAppSettingsOpen,
    accountConfig: state.accountConfig,
    cssConfig: state.cssConfig,
    messageBox: state.messageBox,
  }
}

let VisibleApp = connect(mapStateToProps)(App);
export default VisibleApp;

