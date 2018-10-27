import React from 'react';
import { connect } from 'react-redux';
import OverlayMenuContainer from '../containers/OverlayMenuContainer';
import Calendar from './Calendar';
import CommentPanel from './CommentPanel/CommentPanel';
import TaskMetadata from './TaskMetadata';
import MenuSubtitle from './MenuSubtitle';
import MenuHeader from './MenuHeader';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs'; 
import '../assets/css/react-tabs/style.css';
import '../assets/css/TaskInspector.css';
import CrossIcon from '../assets/icons/CrossIcon.svg';
import { updateTaskDueDateAsync, updateTaskPriorityAsync, updateTaskAssignedToAsync,
postNewCommentAsync, paginateTaskCommentsAsync, deleteTaskCommentAsync,
updateTaskNoteAsync, closeTaskInspectorAsync} from 'handball-libs/libs/pounder-redux/action-creators';

class TaskInspector extends React.Component {
    constructor(props) {
        super(props);

        // Refs.
        this.noteInputTextAreaRef = React.createRef();

        // Method Bindings.
        this.extractSelectedTask = this.extractSelectedTask.bind(this);
        this.handleNewDateSubmit = this.handleNewDateSubmit.bind(this);
        this.handleTaskPriorityToggleClick = this.handleTaskPriorityToggleClick.bind(this);
        this.handleAssignToMember = this.handleAssignToMember.bind(this);
        this.handleNewComment = this.handleNewComment.bind(this);
        this.handlePaginateTaskCommentsRequest = this.handlePaginateTaskCommentsRequest.bind(this);
        this.handleNoteInputBlur = this.handleNoteInputBlur.bind(this);
        this.updateNote = this.updateNote.bind(this);
        this.handleTaskCommentDelete = this.handleTaskCommentDelete.bind(this);
        this.handleMenuBackButtonClick = this.handleMenuBackButtonClick.bind(this);
    }

    render() {
        var selectedTaskEntity = this.extractSelectedTask();
        
        var dueDate = selectedTaskEntity.dueDate;
        var isHighPriority = selectedTaskEntity.isHighPriority;
        var note = selectedTaskEntity.note === undefined ? "" : selectedTaskEntity.note;
        var metadata = selectedTaskEntity.metadata;
        var assignedTo = selectedTaskEntity.assignedTo === undefined ? "" : selectedTaskEntity.assignedTo;

        var selectedProjectMembers = this.props.members.filter(item => {
            return item.project === this.props.selectedProjectId
        });

        return (
            <OverlayMenuContainer>
                <div className="TaskInspector">
                    <MenuHeader onBackButtonClick={this.handleMenuBackButtonClick}/>
                    <Tabs>
                        <TabList>
                            <Tab> Properties </Tab>
                            <Tab> Comments </Tab>
                            <Tab> Notes </Tab>
                            <Tab> Info </Tab>
                        </TabList>
                        <TabPanel>
                            {/* Calendar  */}
                            <div className="TaskInspectorCalendarContainer">
                                <Calendar dueDate={dueDate} onNewDateSubmit={this.handleNewDateSubmit} projectMembers={selectedProjectMembers}
                                    isHighPriority={isHighPriority} onPriorityToggleClick={this.handleTaskPriorityToggleClick}
                                    onAssignToMember={this.handleAssignToMember} assignedTo={assignedTo} />
                            </div>

                        </TabPanel>

                        <TabPanel>
                            {/* Comments  */}
                            <div className="TaskInspectorCommentPanelContainer">
                                <CommentPanel taskComments={this.props.taskComments} onNewComment={this.handleNewComment}
                                    isGettingTaskComments={this.props.isGettingTaskComments}
                                    onPaginateCommentsRequest={this.handlePaginateTaskCommentsRequest}
                                    isAllTaskCommentsFetched={this.props.isAllTaskCommentsFetched}
                                    onDeleteButtonClick={this.handleTaskCommentDelete}
                                    />
                            </div>
                        </TabPanel>

                        <TabPanel>
                            {/* Notes */}
                            <div className="TaskInspectorNotesContainer">
                                <textarea className="TaskNotePanel" ref={this.noteInputTextAreaRef} onBlur={this.handleNoteInputBlur}
                                    defaultValue={note} placeholder="Add Details" />
                            </div>
                        </TabPanel>
                        

                        <TabPanel>

                            {/* Metadata */}
                            <div className="TaskInspectorMetadataContainer">
                                <TaskMetadata metadata={metadata} />
                            </div>
                        </TabPanel>

                        {/* 
                        <div className="TaskInspectorGrid">
                            <div className="TaskInspectorToolbarContainer">
                                <img className="TaskInspectorCloseIcon" src={CrossIcon} onClick={this.handleCloseButtonClick} />
                            </div>
                        </div>  
                    */} 
                        
                    </Tabs>
                </div>

            </OverlayMenuContainer>
        )
    }

    handleMenuBackButtonClick() {
        this.props.dispatch(closeTaskInspectorAsync());
    }

    extractSelectedTask() {
        return this.props.tasks.find(item => {
            return item.uid === this.props.openTaskInspectorId;
        })
    }

    handleNewDateSubmit(newDate, oldDate) {
        var taskId = this.props.openTaskInspectorId;

        this.props.dispatch(updateTaskDueDateAsync(taskId, newDate, oldDate));
        this.props.dispatch(closeTaskInspectorAsync());
    }

    handleTaskPriorityToggleClick(newValue, oldValue) {
        var taskId = this.props.openTaskInspectorId;

        this.props.dispatch(updateTaskPriorityAsync(taskId, newValue, oldValue));
        this.props.dispatch(closeTaskInspectorAsync());
        
    }

    handleAssignToMember(newUserId, oldUserId, taskId) {
        var taskId = this.props.openTaskInspectorId;

        this.props.dispatch(updateTaskAssignedToAsync(newUserId, oldUserId, taskId));
        this.props.dispatch(closeTaskInspectorAsync());
    }

    handleNewComment(value) {
        var taskId = this.props.openTaskInspectorId;

        this.props.dispatch(postNewCommentAsync(taskId, value));
    }

    handlePaginateTaskCommentsRequest(taskId) {
        var taskId = this.props.openTaskInspectorId;

        this.props.dispatch(paginateTaskCommentsAsync(taskId));
    }

    handleTaskCommentDelete(commentId) {
        var taskId = this.props.openTaskInspectorId;
        this.props.dispatch(deleteTaskCommentAsync(taskId, commentId));
    }

    handleNoteInputBlur() {
        this.updateNote();
    }

    updateNote() {
        var newValue = this.noteInputTextAreaRef.current.value;
        var oldValue = this.extractSelectedTask().note;
        var taskId = this.props.openTaskInspectorId;

        this.props.dispatch(updateTaskNoteAsync(newValue, oldValue, taskId));
    }
}

let mapStateToProps = state => {
    return {
        openTaskInspectorId: state.openTaskInspectorId,
        selectedProjectId: state.selectedProjectId,
        isSelectedProjectRemote: state.isSelectedProjectRemote,
        members: state.members,
        tasks: state.tasks,
        taskComments: state.taskComments,
        isGettingTaskComments: state.isGettingTaskComments,
        isAllTaskCommentsFetched: state.isAllTaskCommentsFetched,
    }
}

let VisibleTaskInspector = connect(mapStateToProps)(TaskInspector);
export default VisibleTaskInspector;