import React from 'react';
import BackArrow from '../assets/icons/BackArrow.svg';
import '../assets/css/MenuHeader.css';

class MenuHeader extends React.Component {
    render() {
        return (
            <div className="MenuHeader">
                <div className="MenuHeaderBackArrowContainer" onClick={() => { this.props.onBackButtonClick() }}>
                    <img className="MenuHeaderBackArrow" src={BackArrow} />
                </div>
            </div>
        )
    }
}

export default MenuHeader;