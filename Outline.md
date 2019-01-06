# Material UI Full Rebuild

## Screens
Screen Components connect directly to Redux Store.

### AppDrawer - Formerly Sidebar
AppBar Actions:
  - Settings
  - Share Menu
  - Login

Floating Action Button: Adds new Project

List:
  - Invites
  - Personal Projects
  - Shared Projects

### AppSettingsMenu
Floating Action Button: None

Tabs:
  - General
  - Account
  - About

### Project
Floating Action Button: Speed dial Variant
  - Adds new Task
  - Adds new Task List


### Task Inspector
Tabs:
  - Properties
  - Comments
  - Notes
  - Info

### Checklist Settings


## Task Tree
  - Project
    - TaskListWidget
      - TaskContainer
        - TaskCheckbox
        - TaskText
        - TaskDueDate
        - TaskIndicatorPanel
          - TaskUnreadCommentsIndicator
          - TaskNotesIndicator
          - TaskAssignment
