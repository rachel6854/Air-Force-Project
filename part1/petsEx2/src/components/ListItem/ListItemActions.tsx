import React, {FC} from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import {IconType} from 'react-icons';

export interface ListItemAction {
  icon: IconType;
  onClick: () => void;
  disabled?: boolean;
}

interface ListItemActionsProps {
  actions: ListItemAction[];
}

const ListItemActions: FC<ListItemActionsProps> = ({actions}) => {
  return (
    <Grid
      container
      direction="row"
      justify="space-around"
      alignItems="center"
      spacing={3}>
      {actions.map(({icon: Icon, onClick, disabled = false}, index) => (
        <Grid item key={index}>
          <IconButton disabled={disabled} onClick={onClick}>
            <Icon />
          </IconButton>
        </Grid>
      ))}
    </Grid>
  );
};

export default ListItemActions;
