import '../assets/css/App.css';
import React from 'react';
import Sidebar from './Sidebar';
import Project from './Project';
import MessageBox from './MessageBox';
import VisibleSnackbar from './Snackbar';
import FloatingTextInput from './FloatingTextInput';
import VisibleTaskInspector from './TaskInspector';
import '../assets/css/TaskListWidget.css';
import '../assets/css/Sidebar.css';
import '../assets/css/Project.css';
import { connect } from 'react-redux';
import { MessageBoxTypes } from 'handball-libs/libs/pounder-redux';
import { hot } from 'react-hot-loader';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import Portal from '@material-ui/core/Portal';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { selectTask, openTask, startTaskMove,
setOpenTaskListSettingsMenuId, openCalendar, addNewTaskListAsync, addNewTaskAsync, addNewTaskListWithNameAsync,
changeFocusedTaskList, moveTaskAsync, updateTaskListWidgetHeaderAsync, acceptProjectInviteAsync,
removeSelectedTaskAsync, updateTaskNameAsync, updateTaskCompleteAsync, setFloatingTextInput,
addNewProjectAsync, removeProjectAsync, updateProjectNameAsync, removeTaskListAsync, updateTaskListSettingsAsync,
updateTaskDueDateAsync, updateTaskPriority, openTaskListJumpMenu, closeTaskListJumpMenu, getGeneralConfigAsync,
setIsAppSettingsOpen, getCSSConfigAsync, setAppSettingsMenuPage,setOpenProjectSelectorId, setIsShareMenuOpen,
setMessageBox, attachAuthListenerAsync, denyProjectInviteAsync, postSnackbarMessage, removeTaskAsync,
selectProject, setOpenTaskOptionsId, setShowOnlySelfTasks, addNewTaskWithNameAsync,
setOpenTaskListWidgetHeaderId, updateTaskAssignedToAsync, closeMetadata, addNewProjectWithNameAsync,
setIsSidebarOpen, cancelTaskMove, setShowCompletedTasksAsync, setIsProjectMenuOpen, renewChecklistAsync,
unsubscribeFromDatabaseAsync, openTaskInspectorAsync, openTaskInfo, getTaskCommentsAsync,
moveTaskListToProjectAsync } from 'handball-libs/libs/pounder-redux/action-creators';

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
    this.handleTaskListWidgetFocusChange = this.handleTaskListWidgetFocusChange.bind(this);
    this.handleProjectSelectorClick = this.handleProjectSelectorClick.bind(this);
    this.handleTaskCheckBoxClick = this.handleTaskCheckBoxClick.bind(this);
    this.handleAddProjectClick = this.handleAddProjectClick.bind(this);
    this.handleRemoveProjectClick = this.handleRemoveProjectClick.bind(this);
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
    this.handleTaskListSettingsButtonClick = this.handleTaskListSettingsButtonClick.bind(this);
    this.getSelectedProjectTasks = this.getSelectedProjectTasks.bind(this);
    this.handleTaskListJumpMenuButtonClick = this.handleTaskListJumpMenuButtonClick.bind(this);
    this.initializeLocalConfig = this.initializeLocalConfig.bind(this);
    this.handleAppSettingsButtonClick = this.handleAppSettingsButtonClick.bind(this);
    this.handleAccountIconClick = this.handleAccountIconClick.bind(this);
    this.handleRequestSidebarClose = this.handleRequestSidebarClose.bind(this);
    this.handleShareMenuButtonClick = this.handleShareMenuButtonClick.bind(this);
    this.handleAcceptInviteButtonClick = this.handleAcceptInviteButtonClick.bind(this);
    this.handleDenyInviteButtonClick = this.handleDenyInviteButtonClick.bind(this);
    this.getProjectMembers = this.getProjectMembers.bind(this);
    this.handleTaskOptionsDeleteButtonClick = this.handleTaskOptionsDeleteButtonClick.bind(this);
    this.handleTaskOptionsOpen = this.handleTaskOptionsOpen.bind(this);
    this.handleTaskOptionsCancel = this.handleTaskOptionsCancel.bind(this);
    this.handleTaskListWidgetHeaderDoubleClick = this.handleTaskListWidgetHeaderDoubleClick.bind(this);
    this.handleSettingsMenuClose = this.handleSettingsMenuClose.bind(this);
    this.handleProjectSelectorInputDoubleClick = this.handleProjectSelectorInputDoubleClick.bind(this);
    this.handleShowOnlySelfTasksChanged = this.handleShowOnlySelfTasksChanged.bind(this);
    this.getFloatingTextInputJSX = this.getFloatingTextInputJSX.bind(this);
    this.handleFloatingTextInputSubmit = this.handleFloatingTextInputSubmit.bind(this);
    this.extractMetadata = this.extractMetadata.bind(this);
    this.handleTaskOpenTextInput = this.handleTaskOpenTextInput.bind(this);
    this.handleShowCompletedTasksClick = this.handleShowCompletedTasksClick.bind(this);
    this.handleProjectMenuClose = this.handleProjectMenuClose.bind(this);
    this.handleProjectMenuOpen = this.handleProjectMenuOpen.bind(this);
    this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
    this.dispatchOpenTaskInfo = this.dispatchOpenTaskInfo.bind(this);
    this.getTaskInspectorJSX = this.getTaskInspectorJSX.bind(this);
    this.handleTaskInspectorOpen = this.handleTaskInspectorOpen.bind(this);
    this.handleBackArrowClick = this.handleBackArrowClick.bind(this);
    this.handleMoveTaskListToProject = this.handleMoveTaskListToProject.bind(this);
    this.getProjectJSX = this.getProjectJSX.bind(this);
    this.getSidebarJSX = this.getSidebarJSX.bind(this);
    
  }

  componentDidMount() {
    // Read and Apply Config values.
    this.initializeLocalConfig();
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
          document.getElementsByTagName("body")[0].style.setProperty(property, value);
        }
      }
    }
  }

  componentWillUnmount(){
    // Stop listening to the Database.
    this.props.dispatch(unsubscribeFromDatabaseAsync);
  }

  render() {
    var projectJSX = this.getProjectJSX();
    var sidebarJSX = this.getSidebarJSX();
    var floatingTextInputJSX = this.getFloatingTextInputJSX(false);

    return (
      <React.Fragment>
        
        {floatingTextInputJSX}

        <CssBaseline/>

        <Grid container
        direction="row"
        justify="center"
        alignItems="center">
          <Grid item>
            {projectJSX}
          </Grid>

          <Drawer anchor="left" open={this.props.isSidebarOpen}>
            {sidebarJSX}
          </Drawer>
        </Grid>
      </React.Fragment>
    );
  }

  getSidebarJSX() {
    // eslint-disable-next-line
    var projects = this.props.projects == undefined ? [] : this.props.projects;

    return (
      <Sidebar className="Sidebar" projects={projects} selectedProjectId={this.props.selectedProjectId}
              disableAnimations={this.props.generalConfig.disableAnimations}
              onProjectSelectorClick={this.handleProjectSelectorClick} onAddProjectClick={this.handleAddProjectClick}
              onRemoveProjectClick={this.handleRemoveProjectClick} onProjectNameSubmit={this.handleProjectNameSubmit}
              invites={this.props.invites} isSelectedProjectRemote={this.props.isSelectedProjectRemote}
              projectSelectorIndicators={this.props.projectSelectorIndicators} isLoggedIn={this.props.isLoggedIn}
              favouriteProjectId={this.props.accountConfig.favouriteProjectId} onAppSettingsButtonClick={this.handleAppSettingsButtonClick}
              onAccountIconClick={this.handleAccountIconClick} isLoggingIn={this.props.isLoggingIn}
              onRequestSidebarClose={this.handleRequestSidebarClose} isAppSettingsOpen={this.props.isAppSettingsOpen}
              onAcceptInviteButtonClick={this.handleAcceptInviteButtonClick} onDenyInviteButtonClick={this.handleDenyInviteButtonClick}
              onShareMenuButtonClick={this.handleShareMenuButtonClick} updatingInviteIds={this.props.updatingInviteIds}
              onProjectSelectorInputDoubleClick={this.handleProjectSelectorInputDoubleClick} isShareMenuOpen={this.props.isShareMenuOpen}
              openProjectSelectorId={this.props.openProjectSelectorId}
              isLoggedIn={this.props.isLoggedIn}
            />
    )
  }

  getProjectJSX() {
    var projectName = this.getProjectName(this.props);
    var projectMembers = this.getProjectMembers();

    return (
      <Project taskLists={this.props.taskLists} tasks={this.props.tasks} selectedTask={this.props.selectedTask}
              movingTaskId={this.props.movingTaskId} focusedTaskListId={this.props.focusedTaskListId}
              projectId={this.props.selectedProjectId} onTaskListWidgetRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick}
              onTaskListWidgetFocusChanged={this.handleTaskListWidgetFocusChange}
              isLoggedIn={this.props.isLoggedIn} projects={this.props.projects}
              onTaskCheckBoxClick={this.handleTaskCheckBoxClick} onTaskMoved={this.handleTaskMoved}
              onAddTaskButtonClick={this.handleAddTaskButtonClick} onRemoveTaskButtonClick={this.handleRemoveTaskButtonClick}
              onAddTaskListButtonClick={this.handleAddTaskListButtonClick} onRemoveTaskListButtonClick={this.handleRemoveTaskListButtonClick}
              onTaskListSettingsChanged={this.handleTaskListSettingsChanged} onTaskClick={this.handleTaskClick}
              sourceTaskListId={this.props.sourceTaskListId} projectName={projectName}
              onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch}
              onTaskListSettingsButtonClick={this.handleTaskListSettingsButtonClick}
              openTaskListSettingsMenuId={this.props.openTaskListSettingsMenuId}
              onTaskPriorityToggleClick={this.handleTaskPriorityToggleClick}
              onTaskListJumpMenuButtonClick={this.handleTaskListJumpMenuButtonClick}
              isTaskListJumpMenuOpen={this.props.isTaskListJumpMenuOpen}
              disableAnimations={this.props.generalConfig.disableAnimations}
              projectMembers={projectMembers}
              openTaskListWidgetHeaderId={this.props.openTaskListWidgetHeaderId}
              onTaskListWidgetHeaderDoubleClick={this.handleTaskListWidgetHeaderDoubleClick}
              onTaskOptionsDeleteButtonClick={this.handleTaskOptionsDeleteButtonClick}
              onTaskOptionsOpen={this.handleTaskOptionsOpen} openTaskOptionsId={this.props.openTaskOptionsId}
              onTaskOptionsCancel={this.handleTaskOptionsCancel} onSettingsMenuClose={this.handleSettingsMenuClose}
              onShowOnlySelfTasksChanged={this.handleShowOnlySelfTasksChanged}
              showOnlySelfTasks={this.props.showOnlySelfTasks}
              isRemote={this.props.isSelectedProjectRemote}
              onTaskOpenTextInput={this.handleTaskOpenTextInput}
              onShowCompletedTasksClick={this.handleShowCompletedTasksClick}
              showCompletedTasks={this.props.showCompletedTasks}
              onProjectMenuOpen={this.handleProjectMenuOpen}
              onProjectMenuClose={this.handleProjectMenuClose}
              isProjectMenuOpen={this.props.isProjectMenuOpen}
              onTaskInspectorOpen={this.handleTaskInspectorOpen}
              onBackArrowClick={this.handleBackArrowClick}
              memberLookup={this.props.memberLookup}
              onMoveTaskListToProject={this.handleMoveTaskListToProject}
              onRenewNowButtonClick={this.handleRenewNowButtonClick}
            />
    )
  }


  handleMoveTaskListToProject(sourceProjectId, targetProjectId, taskListWidgetId) {
    if (targetProjectId !== "-1") {
      var projectName = this.props.projects.find(item => {
        return item.uid === targetProjectId;
      }).projectName;

      this.props.dispatch(setMessageBox(true, `Are you sure you want to move this list to ${projectName}`,
        MessageBoxTypes.STANDARD, null, result => {
          this.props.dispatch(setMessageBox(false));

          if (result === "ok") {
            this.props.dispatch(moveTaskListToProjectAsync(sourceProjectId, targetProjectId, taskListWidgetId));
          }
        }))
    }
  }

  handleTaskInspectorOpen(taskId) {
    this.props.dispatch(openTaskInspectorAsync(taskId));
  }

  getTaskInspectorJSX() {
    if (this.props.openTaskInspectorId !== -1) {
      return (
        <VisibleTaskInspector/>
      )
    }
  }

  handleProjectMenuOpen() {
    this.props.dispatch(setIsProjectMenuOpen(true));
  }

  handleProjectMenuClose() {
    this.props.dispatch(setIsProjectMenuOpen(false));
  }

  handleShowCompletedTasksClick() {
    this.props.dispatch(setShowCompletedTasksAsync(!this.props.showCompletedTasks));
  }

  getFloatingTextInputJSX(disableAnimations) {
    var floatingTextInput = this.props.floatingTextInput;

    return (
      <Drawer open={floatingTextInput.isOpen} anchor="top">
        <FloatingTextInput defaultValue={floatingTextInput.currentText} niceTargetName={floatingTextInput.niceTargetName}
          onTextSubmit={(newValue, oldValue) => this.handleFloatingTextInputSubmit(newValue, oldValue, floatingTextInput.targetType, floatingTextInput.targetId)}
          onCancel={() => { this.props.dispatch(setFloatingTextInput(false)) }} />
      </Drawer>
          
    )
  }

  handleFloatingTextInputSubmit(newValue, oldValue, targetType, targetId) {
    switch (targetType) {
      case "task":
        if (targetId === '') {
          // New Task.
          this.props.dispatch(addNewTaskWithNameAsync(newValue));
        }

        else {
          // Update Existing Task List.
          this.props.dispatch(updateTaskNameAsync(
            this.props.taskListWidgetId,
            targetId,
            newValue,
            oldValue,
            this.extractMetadata(targetId)))
        }
        break;

      case "tasklist":
        if (targetId === '') {
          // New Task List.
          this.props.dispatch(addNewTaskListWithNameAsync(newValue));
        }

        else {
          // Update existing Task List.
          this.props.dispatch(updateTaskListWidgetHeaderAsync(targetId, newValue, oldValue));
        }
        break;

      case 'project':
      if (targetId === '') {
        // New Project.
        this.props.dispatch(addNewProjectWithNameAsync(newValue));
      }

      else {
        // Update existing Project.
        this.props.dispatch(updateProjectNameAsync(targetId, newValue, oldValue));
      }
      break;

      default:
        break;
    }
  }

  dispatchOpenTaskInfo(taskId) {
    this.props.dispatch(openTaskInfo(taskId));

    if (this.props.isSelectedProjectRemote) {
      this.props.dispatch(getTaskCommentsAsync(taskId));
    }
  }

  handleRenewNowButtonClick(taskListWidgetId) {
    this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
    
    var taskList = this.props.taskLists.find(item => {
      return item.uid === taskListWidgetId
    })

    if (taskList !== undefined) {
      this.props.dispatch(renewChecklistAsync(taskList, this.props.isSelectedProjectRemote, this.props.selectedProjectId, true));
    }
  }
  
  extractMetadata(taskId) {
    var task = this.props.tasks.find(item => {
      return item.uid === taskId;
    })

    if (task !== undefined) {
      return task.metadata;
    }
  }

  handleShowOnlySelfTasksChanged(newValue) {
    this.props.dispatch(setShowOnlySelfTasks(newValue))
  }

  handleTaskOptionsCancel() {
    this.props.dispatch(setOpenTaskOptionsId(-1));
    this.props.dispatch(cancelTaskMove());
  }

  handleTaskOptionsOpen(taskId) {
    this.props.dispatch(setOpenTaskOptionsId(taskId));
  } 

  handleTaskOptionsDeleteButtonClick(taskId) {
    this.props.dispatch(removeTaskAsync(taskId));
    this.props.dispatch(setOpenTaskOptionsId(-1));
  }

  handleSettingsMenuClose() {
    this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
  }

  handleBackArrowClick() {
    this.props.dispatch(setIsSidebarOpen(true));
  }

  handleProjectSelectorInputDoubleClick(projectSelectorId, currentData) {
    this.props.dispatch(setFloatingTextInput(true, currentData, 'project', "Project", projectSelectorId));
  }

  handleRequestSidebarClose() {
    this.props.dispatch(setIsSidebarOpen(false));
  }

  getProjectMembers() {
    if (this.props.isSelectedProjectRemote) {
      // Filter Members.
      return this.props.members.filter(item => {
        return item.project === this.props.selectedProjectId;
      })
    }

    else {
      return [];
    }
  }

  handleTaskListWidgetHeaderDoubleClick(taskListWidgetId, currentData) {
    this.props.dispatch(setFloatingTextInput(true, currentData, 'tasklist', 'Task List', taskListWidgetId ));
  }

  handleAccountIconClick() {
    this.props.dispatch(setIsAppSettingsOpen(true));
    this.props.dispatch(setAppSettingsMenuPage("account"));
  }

  handleDenyInviteButtonClick(projectId) {
    this.props.dispatch(denyProjectInviteAsync(projectId));
  }

  handleAcceptInviteButtonClick(projectId) {
    this.props.dispatch(acceptProjectInviteAsync(projectId));
  }

  handleShareMenuButtonClick() {
    this.props.dispatch(setIsShareMenuOpen(true));
  }


  handleRequestIsSidebarOpenChange(newValue) {
    this.props.dispatch(setIsSidebarOpen(newValue));
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

  handleTaskClick(element, projectId, taskListWidgetId) {
    // Ye now be venturing into the crypts of Pounder! She be a bit rough, but she holds her keep, yoho.
    var selectedTask = this.props.selectedTask;

      if (this.isShiftKeyDown) {
        this.props.dispatch(startTaskMove(element.props.taskId, taskListWidgetId));
      }

      // If a task is already moving, it's completion will be handled by the Task List Focus change. Letting the selecition handling runs
      // causes problems.
      else if (this.props.isATaskMoving === false) {
          // Otherwise just Select it.
          this.props.dispatch(selectTask(taskListWidgetId, element.props.taskId, this.isModKeyDown));
      }
  }

  handleTaskOpenTextInput(element, taskListWidgetId) {
    this.props.dispatch(openTask(taskListWidgetId, element.props.taskId));
    this.props.dispatch(setFloatingTextInput(true, element.props.text, 'task', 'Task', element.props.taskId));
  }

  handleTaskTwoFingerTouch(taskListWidgetId, taskId) {
    if (this.props.openTaskOptionsId !== -1) {
      this.props.dispatch(setOpenTaskOptionsId(-1));
    }

    this.props.dispatch(startTaskMove(taskId, taskListWidgetId));
  }

  handleRemoveTaskListButtonClick() {
    if (this.props.focusedTaskListId !== -1) {
      this.props.dispatch(setMessageBox(true, "Are you sure you want to delete this Task List?", MessageBoxTypes.STANDARD, null,
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
    this.addNewTask();
    
  }

  handleRemoveTaskButtonClick() {
    this.props.dispatch(removeSelectedTaskAsync());
  }

  addNewTaskList() {
    if (this.props.selectedProject !== -1) {
      this.props.dispatch(setFloatingTextInput(true, '', 'tasklist', 'Task List', ''));
    }
  }

  addNewTask() {
    if (this.props.selectedProjectId !== -1 && this.props.focusedTaskListId !== -1) {
      this.props.dispatch(setFloatingTextInput(true, '', 'task','Task', ''));
    }
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

  handleProjectSelectorClick(e, projectSelectorId) {
    this.props.dispatch(selectProject(projectSelectorId));
  }
  
  handleTaskCheckBoxClick(projectId, taskListWidgetId, taskId, newValue, oldValue, currentMetadata) {
    this.props.dispatch(updateTaskCompleteAsync(taskListWidgetId, taskId, newValue, oldValue, currentMetadata));
  }

  handleAddProjectClick() {
    this.props.dispatch(setFloatingTextInput(true, '', 'project','Project name', ''));
  }

  handleRemoveProjectClick(projectId) {
    if (projectId !== -1) {
      this.props.dispatch(setMessageBox(true, "Are you sure you want to delete this Project?", MessageBoxTypes.STANDARD, null,
        (result) => {
          if (result === "ok") {
            this.props.dispatch(removeProjectAsync(projectId));
          }
          this.props.dispatch(setMessageBox({}));
        }));
    }
  }

  handleTaskListWidgetRemoveButtonClick(projectId, taskListWidgetId) {
    this.props.dispatch(setMessageBox(true, "Are you sure you want to delete this Task List?", MessageBoxTypes.STANDARD, null,
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

  handleTaskListSettingsChanged(projectId, taskListWidgetId, newTaskListSettings, closeMenu) {
    if (closeMenu === true) {
      this.props.dispatch(setOpenTaskListSettingsMenuId(-1));
    }

    this.props.dispatch(updateTaskListSettingsAsync(taskListWidgetId, newTaskListSettings));
  }
}

const mapStateToProps = state => {
  return {
    projects: state.projects,
    taskLists: state.taskLists,
    tasks: state.tasks,
    focusedTaskListId: state.focusedTaskListId,
    openTaskListWidgetHeaderId: state.openTaskListWidgetHeaderId,
    selectedTask: state.selectedTask,
    selectedProjectId: state.selectedProjectId,
    openProjectSelectorId: state.openProjectSelectorId,
    isSelectedProjectRemote: state.isSelectedProjectRemote,
    isATaskMoving: state.isATaskMoving,
    movingTaskId: state.movingTaskId,
    sourceTaskListId: state.sourceTaskListId,
    openCalendarId: state.openCalendarId,
    openTaskListSettingsMenuId: state.openTaskListSettingsMenuId,
    projectSelectorIndicators: state.projectSelectorIndicators,
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
    isShareMenuOpen: state.isShareMenuOpen,
    invites: state.invites,
    updatingInviteIds: state.updatingInviteIds,
    members: state.members,
    memberLookup: state.memberLookup,
    remoteProjectIds: state.remoteProjectIds,
    openTaskOptionsId: state.openTaskOptionsId,
    showOnlySelfTasks: state.showOnlySelfTasks,
    floatingTextInput: state.floatingTextInput,
    showCompletedTasks: state.showCompletedTasks,
    isProjectMenuOpen: state.isProjectMenuOpen,
    openTaskInspectorId: state.openTaskInspectorId,
  }
}

let VisibleApp = connect(mapStateToProps)(App);
export default hot(module)(VisibleApp);


