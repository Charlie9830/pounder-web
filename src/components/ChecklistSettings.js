import React from 'react';
import MenuSubtitle from './MenuSubtitle';
import Button from './Button';
import DayPicker from 'react-day-picker';
import Moment from 'moment';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { getNormalizedDate } from 'pounder-utilities';
import '../assets/css/react-day-picker/style.css';
import '../assets/css/ChecklistSettings.css';
import Toggle from 'react-toggle';
import '../assets/css/react-toggle/style.css';

class ChecklistSettings extends React.Component {
    constructor(props) {
        super(props);

        // State.
        this.state = {
            showCustomIntervalInput: false,
            isCustomDaysValid: true,
        }

        // Refs.
        this.checklistModeCheckboxRef = React.createRef();
        this.daysInputRef = React.createRef();
        this.renewIntervalSelectRef = React.createRef();

        // Method Bindings.
        this.getChecklistSettingsControlJSX = this.getChecklistSettingsControlJSX.bind(this);
        this.handleChecklistModeCheckboxChange = this.handleChecklistModeCheckboxChange.bind(this);
        this.getSelectedDates = this.getSelectedDates.bind(this);
        this.handleDayPickerDayClick = this.handleDayPickerDayClick.bind(this);
        this.handleDaysInputChange = this.handleDaysInputChange.bind(this);
        this.handleRenewNowButtonClick = this.handleRenewNowButtonClick.bind(this);
        this.getRenewIntervalJSX = this.getRenewIntervalJSX.bind(this);
        this.getRenewIntervalSelectValue = this.getRenewIntervalSelectValue.bind(this);
        this.getCustomRenewIntervalJSX = this.getCustomRenewIntervalJSX.bind(this);
        this.handleRenewIntervalSelectChange = this.handleRenewIntervalSelectChange.bind(this);
        this.submitRenewIntervalChange = this.submitRenewIntervalChange.bind(this);
        this.handleCustomIntervalInputKeyPress = this.handleCustomIntervalInputKeyPress.bind(this);
        this.handleCustomIntervalInputBlur = this.handleCustomIntervalInputBlur.bind(this);
    }

    componentDidMount() {
        if (this.getRenewIntervalSelectValue() === "custom") {
            this.setState({ showCustomIntervalInput: true });
        }

    }

    render() {
        var checkListSettingsControlJSX = this.getChecklistSettingsControlJSX();

        return (
            <div className="ChecklistSettingsContainer">
                <div className="ChecklistSettingsSwitchContainer">
                    <MenuSubtitle text="Checklist"/>
                    <div className="ChecklistSettingsHorizontalFlexContainer">
                        <Toggle ref={this.checklistModeCheckboxRef} onChange={this.handleChecklistModeCheckboxChange}
                        checked={this.props.settings.isChecklist}/>
                        <div className="ChecklistSettingsItemLabel"></div>
                    </div>
                    <div className="ChecklistSettingsRenewNowContainer" >
                        <Button text="Renew" size="small" onClick={this.handleRenewNowButtonClick}
                        isEnabled={this.props.settings.isChecklist} />
                    </div>
                </div>
                <TransitionGroup>
                    {checkListSettingsControlJSX}
                </TransitionGroup>
            </div>
        )
    }

    getChecklistSettingsControlJSX() {
        var { initialStartDate } = this.getSelectedDates();
        var renewIntervalJSX = this.getRenewIntervalJSX();
        const tomorrow = Moment().add(1,'day').toDate();

        if (this.props.settings.isChecklist) {
            return (
                    <CSSTransition classNames="ChecklistSettingsTransition" timeout={250} key="0">
                        <div>
                            <div className="ChecklistSettingsDayPickerContainer">
                                <MenuSubtitle text="Renew completed tasks on" />
                                <DayPicker enableOutsideDays={true} selectedDays={[initialStartDate]} onDayClick={this.handleDayPickerDayClick}
                                disabledDays={{ before: tomorrow }}/>
                            </div>

                            <div className="ChecklistSettingsIntervalContainer">
                                <MenuSubtitle text="Repeat" />
                                    {renewIntervalJSX}
                            </div>
                        </div>
                    </CSSTransition>
            )
        }
        
    }

    getRenewIntervalJSX() {
        var selectValue = this.getRenewIntervalSelectValue();
        var customRenewIntervalJSX = this.getCustomRenewIntervalJSX();

        return (
            <div className="ChecklistSettingsHorizontalFlexContainer">
                <select className="ChecklistSettingsRenewIntervalSelect" defaultValue={selectValue}
                ref={this.renewIntervalSelectRef} onChange={this.handleRenewIntervalSelectChange}>
                    <option value="daily"> Daily </option>
                    <option value="weekly"> Weekly </option>
                    <option value="fortnightly"> Fortnightly </option>
                    <option value="monthly"> Monthly </option>
                    <option value="custom"> Custom </option>
                </select>

                {customRenewIntervalJSX}

            </div>
        )
    }

    getCustomRenewIntervalJSX() {
        if (this.state.showCustomIntervalInput === true) {
            
            return (
                <React.Fragment>
                    <input className="ChecklistSettingsDaysInput" data-isvalid={this.state.isCustomDaysValid} type="number"
                        ref={this.daysInputRef} onKeyPress={this.handleCustomIntervalInputKeyPress} onBlur={this.handleCustomIntervalInputBlur}
                        defaultValue={this.props.settings.renewInterval}
                        onChange={this.handleDaysInputChange} />
                    <div className="ChecklistSettingsItemLabel"> days </div>
                </React.Fragment>
            )
        }
    }

    handleRenewIntervalSelectChange() {
        var value = this.renewIntervalSelectRef.current.value;

        if (value !== "custom") {
            this.setState({
                 showCustomIntervalInput: false,
                 showDaysApplyButton: false
                })

            var renewInterval = this.coerceDays(this.getDaysFromRenewIntervalSelectValue(value));
            this.submitRenewIntervalChange(renewInterval);
            
        }

        else {
            this.setState({ showCustomIntervalInput: true });
        }
    }

    handleCustomIntervalInputBlur() {
        if (this.state.isCustomDaysValid) {
            var value = this.daysInputRef.current.value;
            this.submitRenewIntervalChange(value)
        }
    }

    handleCustomIntervalInputKeyPress(e) {
        if (e.key === "Enter" ) {
            if (this.state.isCustomDaysValid) {
                var value = this.daysInputRef.current.value;
                this.submitRenewIntervalChange(value)
            }

        }
    }


    submitRenewIntervalChange(renewInterval) {
        this.props.onRenewIntervalChange(renewInterval);
    }

    getRenewIntervalSelectValue() {
        var value = Number.parseInt(this.props.settings.renewInterval, 10);

        switch(value) {
            case 1:
            return "daily";

            case 7:
            return "weekly";

            case 14:
            return "fortnightly";

            case 30:
            return "monthly";

            default:
            return "custom"
        }
    }

    getDaysFromRenewIntervalSelectValue(selectValue) {
        switch(selectValue) {
            case "daily":
            return 1;

            case "weekly":
            return 7;

            case "fortnightly":
            return 14;

            case "monthly":
            return 30;
            
            case "custom":
            return -1;

            default:
            return 0;
        }
    }

    handleRenewNowButtonClick() {
        this.props.onRenewNowButtonClick();
    }

    handleDaysInputChange() {
        var value = this.daysInputRef.current.value;

        this.setState({
            isCustomDaysValid: this.isCustomDaysValueValid(value),
            showDaysApplyButton: true,
        })
    }

    isCustomDaysValueValid(newValue) {
        return newValue > 0
    }

    handleDayPickerDayClick(day, modifiers, e) {
        this.props.onInitialStartDayPick(getNormalizedDate(Moment(day)));
    }

    getSelectedDates() {
        var initialStartDate = Moment(this.props.settings.initialStartDate);
        var nextRenewDate = Moment(this.props.settings.nextRenewDate);
        return {
            initialStartDate: initialStartDate.toDate(),
            nextRenewDate: nextRenewDate.toDate(),
        }
    }

    handleChecklistModeCheckboxChange(e) {
        var value = e.target.checked;
        this.props.onChecklistModeChange(value);
    }

    coerceDays(days) {
        if (!this.isCustomDaysValueValid(days)) {
            return 1;
        }

        else {
            return days;
        }
    }
}

export default ChecklistSettings;