import React from 'react';
import { ListItem, ListItemText, ListItemSecondaryAction, ListItemIcon } from '@material-ui/core';
import MemberStatusIcon from './MemberStatusIcon';
import KickUserButton from './KickUserButton';
import ChangeRankButton from './ChangeRankButton';

const MemberListItem = (props) => {
    return (
        <ListItem disabled={props.isUpdating}>
            <ListItemIcon>
                <MemberStatusIcon status={props.status} />
            </ListItemIcon>

            <ListItemText primary={props.displayName} secondary={props.email} />

            <ListItemSecondaryAction>

                <ChangeRankButton
                    canPromote={props.role === "owner"}
                    onPromote={props.onPromote}
                    onDemote={props.onDemote} />

                <KickUserButton
                    canKick={props.canBeKicked}
                    onClick={props.onKick} />

            </ListItemSecondaryAction>
        </ListItem>
    );
};

export default MemberListItem;