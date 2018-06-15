import '../assets/css/App.css';
import React from 'react';
import Sidebar from './Sidebar';
import Project from './Project';
import MessageBox from './MessageBox';
import VisibleSnackbar from './Snackbar';
import Hammer from 'hammerjs';
import '../assets/css/TaskListWidget.css';
import '../assets/css/Sidebar.css';
import '../assets/css/Project.css';
import { connect } from 'react-redux';
import { MessageBoxTypes } from 'pounder-redux';
import { hot } from 'react-hot-loader';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { selectTask, openTask, startTaskMove,
setOpenTaskListSettingsMenuId, openCalendar, addNewTaskListAsync, addNewTaskAsync,
changeFocusedTaskList, moveTaskAsync, updateTaskListWidgetHeaderAsync,
removeSelectedTaskAsync, updateTaskNameAsync, selectProjectAsync, updateTaskCompleteAsync,
addNewProjectAsync, removeProjectAsync, updateProjectNameAsync, removeTaskListAsync, updateTaskListSettingsAsync,
updateTaskDueDateAsync, updateTaskPriority, openTaskListJumpMenu, closeTaskListJumpMenu, getGeneralConfigAsync,
setIsAppSettingsOpen, getCSSConfigAsync, setAppSettingsMenuPage,
setMessageBox, attachAuthListenerAsync,
setIsSidebarOpen, } from 'pounder-redux/action-creators';

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
    this.initializeLocalConfig = this.initializeLocalConfig.bind(this);
    this.handleAppSettingsButtonClick = this.handleAppSettingsButtonClick.bind(this);
    this.handleAccountIconClick = this.handleAccountIconClick.bind(this);
    this.getSidebarOrProjectJSX = this.getSidebarOrProjectJSX.bind(this);
    this.handleRequestSidebarClose = this.handleRequestSidebarClose.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
  }

  componentDidMount() {
    // Read and Apply Config values.
    this.initializeLocalConfig();
    // Attach an Authentication state listener. Will pull down database when Logged in.
    this.props.dispatch(attachAuthListenerAsync());

    var hammer = new Hammer(document.getElementById('root'));
    hammer.on('swipe', event => {
      // Swipe Left.
      if (event.velocityX < 0) {
        // User is in the Sidebar.
        if (this.props.isSidebarOpen === true) {
          this.props.dispatch(setIsSidebarOpen(false));
        }
      }

      // Swipe Right.
      if (event.velocityX > 0) {
        // User is in the Project.
        if (this.props.isSidebarOpen === false) {
          this.props.dispatch(setIsSidebarOpen(true));
        }
      }
    })
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
  }

  render() {
    var sidebarOrProjectJSX = this.getSidebarOrProjectJSX();

    return (
      <div>
      <VisibleSnackbar/>
      <MessageBox config={this.props.messageBox}/>

      {/* Sidebar / Project Transition Group */}
      <TransitionGroup>
        {sidebarOrProjectJSX}
      </TransitionGroup>
          
      </div>
    );
  }

  getSidebarOrProjectJSX() {
    // eslint-disable-next-line
    var projects = this.props.projects == undefined ? [] : this.props.projects;
    if (this.props.isSidebarOpen) {
      return (
        <CSSTransition key={"sidebarContainer"} classNames="SidebarContainer" appear={true} 
        timeout={{enter: 250, exit: 250}}>
          <div>
            <Sidebar className="Sidebar" projects={projects} selectedProjectId={this.props.selectedProjectId}
              onProjectSelectorClick={this.handleProjectSelectorClick} onAddProjectClick={this.handleAddProjectClick}
              onRemoveProjectClick={this.handleRemoveProjectClick} onProjectNameSubmit={this.handleProjectNameSubmit}
              projectSelectorDueDateDisplays={this.props.projectSelectorDueDateDisplays} isLoggedIn={this.props.isLoggedIn}
              favouriteProjectId={this.props.accountConfig.favouriteProjectId} onAppSettingsButtonClick={this.handleAppSettingsButtonClick}
              onAccountIconClick={this.handleAccountIconClick} isLoggingIn={this.props.isLoggingIn}
              onRequestSidebarClose={this.handleRequestSidebarClose} isAppSettingsOpen={this.props.isAppSettingsOpen}
            />
          </div>
        </CSSTransition>
      )
    }

    else {
      var projectName = this.getProjectName(this.props);
      return (
        <CSSTransition key={"projectContainer"} classNames="ProjectContainer" timeout={250}>
          <div>
            <Project taskLists={this.props.taskLists} tasks={this.props.tasks} selectedTask={this.props.selectedTask}
              movingTaskId={this.props.movingTaskId} focusedTaskListId={this.props.focusedTaskListId}
              projectId={this.props.selectedProjectId} onTaskListWidgetRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick}
              onTaskChanged={this.handleTaskChanged} onTaskListWidgetFocusChanged={this.handleTaskListWidgetFocusChange}
              onTaskListWidgetHeaderChanged={this.handleTaskListWidgetHeaderChanged} isLoggedIn={this.props.isLoggedIn}
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
              isTaskListJumpMenuOpen={this.props.isTaskListJumpMenuOpen} onBackArrowClick={this.handleBackArrowClick}
            />
          </div>
        </CSSTransition>
      )
    }
  }

  handleBackArrowClick() {
    this.props.dispatch(setIsSidebarOpen(true));
  }

  handleRequestSidebarClose() {
    this.props.dispatch(setIsSidebarOpen(false));
  }

  handleAccountIconClick() {
    this.props.dispatch(setIsAppSettingsOpen(true));
    this.props.dispatch(setAppSettingsMenuPage("account"));
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

  initializeLocalConfig() {
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
    isLoggedIn: state.isLoggedIn,
    isLoggingIn: state.isLoggingIn,
    isSidebarOpen: state.isSidebarOpen,
  }
}

let VisibleApp = connect(mapStateToProps)(App);
export default hot(module)(VisibleApp);


