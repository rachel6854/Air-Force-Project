import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from "@material-ui/core/IconButton";
import {IconType} from "react-icons";
import ListItemHeader from './ListItemHeader';
import ListItemActions, {ListItemAction} from "./ListItemActions";

interface ListItemProps {
    icon?: IconType
    heading: string;
    subtitle1: string;
    subtitle2: string;
    actions: ListItemAction[]
}

const ListItem: FC<ListItemProps> = ({icon: Icon, heading, subtitle1, subtitle2, actions}) => {
    return (
        <Grid container alignItems="center">
            <Grid item xs={2}>
                {Icon && (
                    <IconButton disabled>
                        <Icon/>
                    </IconButton>
                )}
            </Grid>
            <Grid item xs={5} >
                <ListItemHeader heading={heading} subtitle1={subtitle1} subtitle2={subtitle2}/>
            </Grid>
            <Grid item xs={5}>
                <ListItemActions actions={actions}/>
            </Grid>
        </Grid>
    );
	};
  

export default ListItem;