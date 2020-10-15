import React, {FC, MouseEvent} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import MapItem from './MapItem';
import {NamedColor} from 'csstype';
import {IconType} from 'react-icons';

export type IconSize = 'small' | 'large' | 'extra-large' | undefined;

export interface MapPosition {
  x: number;
  y: number;
  
}

export interface CSSPosition {
  top: string;
  left: string;
}

export interface MapItemDesc {
  id: any;
  position: MapPosition | undefined;
  icon: IconType;
  offsetElement?: JSX.Element;
  color?: NamedColor;
  size?: IconSize;
}
const demoImageBackground = 'https://previews.123rf.com/images/roxanabalint/roxanabalint1312/roxanabalint131200148/24476498-demo-grunge-rubber-stamp-on-white.jpg'
const useStyles = makeStyles(
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'block',
      background: ({mapSrc}: MapGridProps) => `url(${mapSrc})`,
      position: 'relative',
    }
  })
);

interface MapGridProps {
  mapSrc: string;
  dimX: number;
  dimY: number;
  mapItems?: MapItemDesc[];
  onMapClick?: (position: MapPosition) => void;
  onMapItemClick?: (mapIcon: MapItemDesc) => void;
}

const MapGrid: FC<MapGridProps> = props => {
  const {
    dimX,
    dimY,
    mapItems = [],
    onMapClick = () => {},
    onMapItemClick = () => {},
  } = props;
  const {root} = useStyles(props);

  const getCSSPosition = ({x, y}: MapPosition): CSSPosition => {
    return {
      top: `${(y * 100) / dimY}%`,
      left: `${(x * 100) / dimX}%`,
    };
  };

  const mapClick = (event: MouseEvent<HTMLDivElement>) => {
    const {clientX, clientY, target} = event;
    const {
      width,
      height,
      left,
      top,
    } = (target as HTMLElement).getBoundingClientRect();

    const clickedPosition: MapPosition = {
      x: Math.round((clientX - left) / (width / dimX)),
      y: Math.round((clientY - top) / (height / dimY)),
    };

    onMapClick(clickedPosition);
    event.preventDefault();
  };

  return (
    <div className={root} onClick={mapClick}>
      {mapItems.map(mapItem => {
        const {id, position} = mapItem;

        return (
          position && (
            <MapItem
              key={id}
              description={mapItem}
              cssPosition={getCSSPosition(position)}
              onMapItemClick={onMapItemClick}
            />
          )
        );
      })}
    </div>
  );
};

export default MapGrid;