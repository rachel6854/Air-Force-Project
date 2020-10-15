import React, {FC, useEffect, useState} from 'react';
import ContentWrapper from '../content-wrapper/content-wrapper';
import {makeStyles, createStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {MapData} from '../../graphql/queries/map-data';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
//import HistoryChart from '@bit/ofek.catdog.history-chart';
import HistoryChart from '../history-chart/history-chart';

// const history = [
//   {
//     text: 'Dog',
//     value: 7,
//   },
//   {
//     text: 'Cat',
//     value: 5,
//   },
//   {
//     text: 'Pig',
//     value: 2,
//   },
//   {
//     text: 'Cow',
//     value: 1,
//   },
//   {
//     text: 'Horse',
//     value: 9,
//   },
// ];

const useStyles = makeStyles(
  createStyles({
    fullHeight: {
      height: '100%',
    },
    imageContainer: {
      height: '40%',
    },
    historyContainer: {
      height: '60%',
    },
    image: {
      borderRadius: '30%',
      width: '60%',
      maxHeight: '80%',
      padding: '0 20%',
    },
    message: {
      textAlign: 'center',
      padding: '20%',
      fontStyle: 'italic',
    },
  })
);

interface PositionDataProps {
  loading: boolean;
  mapData?: MapData | null;
}

const mapDataToHistory = (mapData: MapData): any[] =>
  mapData.history.map(({amount, petType: {description}}) => ({
    text: description,
    value: amount,
  }));

const PositionData: FC<PositionDataProps> = ({loading, mapData}) => {
  const {
    image,
    message,
    fullHeight,
    imageContainer,
    historyContainer,
  } = useStyles();
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (mapData !== undefined && mapData !== null) {
      setHistory(mapDataToHistory(mapData));
    }
  }, [mapData]);

  if (loading) {
    return (
      <div className={message}>
        <CircularProgress
          style={{
            height: '80px',
            width: '80px',
          }}
        />
      </div>
    );
  }

  // No selected point
  if (mapData === undefined) {
    return (
      <Typography variant="h4" className={message}>
        לחץ על אירוע
      </Typography>
      // <HistoryChart history={history} />
    );
  }

  // No animal exists at location
  if (mapData === null) {
    return (
      <Typography variant="h4" className={message}>
        אין בעלי חיים באירוע הזו
      </Typography>
    );
  }

  return (
    <Grid className={fullHeight} container direction="column">
      <Grid item className={imageContainer}>
        <hr />
        <img className={image} src={mapData.lastPictureUrl} alt="Animal" />
        <hr />
      </Grid>
      <Grid item className={historyContainer}>
        <ContentWrapper header="היסטוריה" variant="body1">
          {<HistoryChart history={mapDataToHistory(mapData)} />}
        </ContentWrapper>
      </Grid>
    </Grid>
  );
};

export default PositionData;
