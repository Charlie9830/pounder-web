import React from 'react';
import '../../assets/css/AppSettingsMenu/AppSettingsMenuSubtitle.css';

class AppSettingsMenuSubtitle extends React.Component {
    render() {
        return (
            <div className="AppSettingsMenuSubtitleContainer">
                <label className="AppSettingsMenuSubtitle">{this.props.text}</label>
            </div>
        )
    }
}

export default AppSettingsMenuSubtitle;