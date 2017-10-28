import React from 'react';
import TaskListWidget from './TaskListWidget';
import '../assets/css/Project.css';
import ProjectToolBar from './ProjectToolBar';

class Project extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            openTaskListWidgetHeaderId: -1,
        }

        this.handleTaskSubmit = this.handleTaskSubmit.bind(this);
        this.handleWidgetClick = this.handleWidgetClick.bind(this);
        this.handleWidgetHeaderPress = this.handleWidgetHeaderPress.bind(this);
        this.handleTaskListWidgetHeaderSubmit = this.handleTaskListWidgetHeaderSubmit.bind(this);
        this.handleTaskClick = this.handleTaskClick.bind(this);
        this.handleTaskCheckBoxClick = this.handleTaskCheckBoxClick.bind(this);
        this.handleTaskListWidgetRemoveButtonClick = this.handleTaskListWidgetRemoveButtonClick.bind(this);
        this.handleAddTaskButtonClick = this.handleAddTaskButtonClick.bind(this);
        this.handleRemoveTaskButtonClick = this.handleRemoveTaskButtonClick.bind(this);
        this.handleAddTaskListButtonClick = this.handleAddTaskListButtonClick.bind(this);
        this.handleRemoveTaskListButtonClick = this.handleRemoveTaskListButtonClick.bind(this);
        this.handleTaskTwoFingerTouch = this.handleTaskTwoFingerTouch.bind(this);
        this.handleTaskListSettingsChanged = this.handleTaskListSettingsChanged.bind(this);
        this.handleDueDateClick = this.handleDueDateClick.bind(this);
        this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
        this.handleTaskListSettingsButtonClick = this.handleTaskListSettingsButtonClick.bind(this);
    }
    
    componentDidMount() {   
    }

    componentWillUnmount() {
    }

    render() {
        // Build a list of TaskListWidgets to Render out here.
        var taskListWidgets = this.props.taskLists.map((item, index) => {
            // Widget Layer.
            var isFocused = this.props.focusedTaskListId === item.uid;
            var isHeaderOpen = this.state.openTaskListWidgetHeaderId === item.uid;
            var taskListSettings = item.settings;    

            // Task Layer.
            var tasks = this.props.tasks.filter(task => {
                return task.taskList === item.uid;
            })

            var selectedTaskId = -1;
            var openTaskInputId = -1;
            if (this.props.selectedTask.taskListWidgetId === item.uid) {
                selectedTaskId = this.props.selectedTask.taskId;

                if (this.props.selectedTask.isInputOpen) {
                    openTaskInputId = selectedTaskId;
                }
            }

            var movingTaskId = item.uid === this.props.sourceTaskListId ? this.props.movingTaskId : -1;
            return (
                <div key={index} className="TaskListWidgetContainer">
                    <TaskListWidget taskListWidgetId={item.uid} isFocused={isFocused} taskListName={item.taskListName}
                        tasks={tasks} isHeaderOpen={isHeaderOpen} selectedTaskId={selectedTaskId} openTaskInputId={openTaskInputId}
                        onTaskSubmit={this.handleTaskSubmit} onWidgetClick={this.handleWidgetClick} movingTaskId={movingTaskId}
                        onRemoveButtonClick={this.handleTaskListWidgetRemoveButtonClick}
                        onHeaderPress={this.handleWidgetHeaderPress} onHeaderSubmit={this.handleTaskListWidgetHeaderSubmit}
                        onTaskClick={this.handleTaskClick} onTaskCheckBoxClick={this.handleTaskCheckBoxClick}
                        onTaskTwoFingerTouch={this.handleTaskTwoFingerTouch} settings={taskListSettings}
                        onSettingsChanged={this.handleTaskListSettingsChanged} onDueDateClick={this.handleDueDateClick}
                        openCalendarId={this.props.openCalendarId} onNewDateSubmit={this.handleNewDateSubmit}
                        onTaskListSettingsButtonClick={this.handleTaskListSettingsButtonClick}
                        openTaskListSettingsMenuId={this.props.openTaskListSettingsMenuId} />
                </div>
                
            )
        });

        return (
            <div className="Project">
                <div className="ProjectToolBar">
                    <ProjectToolBar onAddTaskButtonClick={this.handleAddTaskButtonClick} onAddTaskListButtonClick={this.handleAddTaskListButtonClick}
                    onRemoveTaskButtonClick={this.handleRemoveTaskButtonClick} onRemoveTaskListButtonClick={this.handleRemoveTaskListButtonClick}
                    />
                </div>
                <div className="TaskListsContainer">
                    <div className="ProjectNameContainer">
                        <label className="ProjectName">
                            {this.props.projectName}
                        </label>
                    </div>
                    {taskListWidgets}
                </div>
            </div>
        )
    }

    handleTaskListSettingsButtonClick(taskListWidgetId) {
        this.props.onTaskListSettingsButtonClick(this.props.projectId, taskListWidgetId);
    }

    handleDueDateClick(taskListWidgetId, taskId) {
        this.props.onDueDateClick(this.props.projectId, taskListWidgetId, taskId);
    }

    handleTaskTwoFingerTouch(taskListWidgetId, taskId) {
        this.props.onTaskTwoFingerTouch(taskListWidgetId, taskId);
    }

    handleRemoveTaskListButtonClick() {
        this.props.onRemoveTaskListButtonClick();
    }

    handleAddTaskListButtonClick() {
        this.props.onAddTaskListButtonClick();
    }

    handleAddTaskButtonClick() {
        this.props.onAddTaskButtonClick();
    }

    handleRemoveTaskButtonClick() {
        this.props.onRemoveTaskButtonClick();
    }

    handleTaskSubmit(taskListWidgetId, taskId, newData) {
        this.props.onTaskChanged(this.props.projectId, taskListWidgetId, taskId, newData)
    }

    handleWidgetClick(taskListWidgetId, isFocused) {
        this.props.onTaskListWidgetFocusChanged(taskListWidgetId, isFocused);
    }

    handleWidgetHeaderPress(taskListWidgetId) {
        this.setState({openTaskListWidgetHeaderId: taskListWidgetId});
    }

    handleTaskListWidgetHeaderSubmit(taskListWidgetId, newData) {
        this.setState({openTaskListWidgetHeaderId: -1});
        // Raise it up to Parent.
        this.props.onTaskListWidgetHeaderChanged(taskListWidgetId, newData);
    }

    handleTaskClick(element, taskListWidgetId) {
        this.props.onTaskClick(element, this.props.projectId, taskListWidgetId);
    }

    handleTaskCheckBoxClick(e, taskListWidgetId, taskId, incomingValue) {
        this.props.onTaskCheckBoxClick(e, this.props.projectId, taskListWidgetId, taskId, incomingValue)
    }

    handleTaskListWidgetRemoveButtonClick(taskListWidgetId) {
        this.props.onTaskListWidgetRemoveButtonClick(this.props.projectId, taskListWidgetId);
    }

    handleTaskListSettingsChanged(taskListWidgetId, newTaskListSettings) {
        this.props.onTaskListSettingsChanged(this.props.projectId, taskListWidgetId, newTaskListSettings);
    }

    handleNewDateSubmit(taskListWidgetId, taskId, newDate) {
        this.props.onNewDateSubmit(this.props.projectId, taskListWidgetId, taskId, newDate);
    }
}

export default Project;