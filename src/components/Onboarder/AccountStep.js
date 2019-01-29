import React from 'react';
import VisibleAccountSettingsPage from '../AppSettingsMenu/AccountSettingsPage';
import FullScreenView from '../../layout-components/FullScreenView';

const AccountStep = (props) => {
    return (
        <FullScreenView>
            <VisibleAccountSettingsPage/>
        </FullScreenView>
    );
};

export default AccountStep;