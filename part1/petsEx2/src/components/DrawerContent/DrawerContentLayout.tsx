import React, {FC} from 'react';
import ContentWrapper from '../content-wrapper/content-wrapper';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(
  createStyles({
    full: {
      height: '100%',
      width: '100%'
    },
    dronesList: {
      height: '40%',
    },
    positionData: {
      height: '60%',
    },
    listHeader: {
      height: '15%',
    },
    list: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      height: '85%',
    },
  })
);

interface DrawerContentLayoutProps {
  listHeader: string;
  listElements: JSX.Element;
  positionData: JSX.Element;
}

const DrawerContentLayout: FC<DrawerContentLayoutProps> = ({
                                                             listHeader,
                                                             listElements,
                                                             positionData,
                                                           }) => {
  const {
    list: listStyle,
    positionData: positionDataStyle,
    full,
    listHeader: listHeaderStyle,
    dronesList,
  } = useStyles();

  return (
    <Grid className={full} container direction="column">
      <Grid item className={dronesList}>
        <ContentWrapper
          header={listHeader}
          variant="body1"
          classes={{
            content: listStyle,
            header: listHeaderStyle,
            root: full,
          }}>
          {listElements}
        </ContentWrapper>
        <hr/>

      </Grid>

      <Grid className={positionDataStyle} item>
        {positionData}
      </Grid>
    </Grid>
  );
};

export default DrawerContentLayout;
