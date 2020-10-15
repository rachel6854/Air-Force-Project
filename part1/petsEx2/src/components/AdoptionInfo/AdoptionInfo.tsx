import React from 'react';
import {GET_ANIMALS_IDS, AnimalsIds} from '../../graphql/queries/animal';
import {useQuery} from '@apollo/react-hooks';
import Alert from '@material-ui/lab/Alert';
import {FaInfoCircle} from 'react-icons/fa';
import {makeStyles, createStyles, Theme} from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  }),
);

const AdoptionInfo: React.FC = () => {
  const {data: adoptedIds} = useQuery<AnimalsIds>(GET_ANIMALS_IDS, {
    variables: {
      adoptionStatusCode: 1,
    }, pollInterval: 3000,
  });
  const {data: notAdoptedIds} = useQuery<AnimalsIds>(GET_ANIMALS_IDS, {
    variables: {
      adoptionStatusCode: 2,
    }, pollInterval: 3000,
  });
  const [anchorEl, setAnchorEl] = React.useState<SVGElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const classes = useStyles();

  return (
    <React.Fragment>
      <FaInfoCircle
        style={{
          fontSize: '1.5em',
          marginRight: '1em',
          marginLeft: '0.4em',
        }}
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}/>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Alert severity="info">animals adopted so far
          : {adoptedIds?.allAdoptees.length} </Alert>
        <Alert style={{marginTop: '8px'}} severity="info">animals waiting for
          adoptions : {notAdoptedIds?.allAdoptees.length} </Alert>
      </Popover>
    </React.Fragment>

  );
};
export default AdoptionInfo;
