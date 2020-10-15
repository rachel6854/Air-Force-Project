import React, {FC, MouseEvent} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {CSSPosition, MapItemDesc, IconSize} from './MapGrid';

const getIconSize = (size: IconSize): string => {
  switch (size) {
    case 'small':
      return '20px';
    case 'large':
      return '32px';
    case 'extra-large':
      return '55px';
    default:
      return '32px';
  }
};

const useStyles = makeStyles<{}, MapItemProps>(
  createStyles({
    icon: {
      position: 'absolute',
      borderRadius: '50%',
      '&:hover': {
        background: 'rgba(1,0,0,0.1)',
      },
      color: ({description: {color}}) => (color ? color : 'green'),
      fontSize: ({description: {size}}) => getIconSize(size),
      top: ({cssPosition, description: {size}}) => `calc(${cssPosition.top} - (${getIconSize(size)}/2))`,
      left: ({cssPosition, description: {size}}) => `calc(${cssPosition.left} - (${getIconSize(size)}/2))`,
    },
    element: {
      position: 'absolute',
      width: 'fit-content',
      top: ({cssPosition, description: {size}}) => `calc(${cssPosition.top} - (${getIconSize(size)}/2))`,
      left: ({cssPosition, description: {size}}) => `calc(${cssPosition.left} + (${getIconSize(size)}/2))`,
    },
  })
);

interface MapItemProps {
  description: MapItemDesc;
  cssPosition: CSSPosition;
  onMapItemClick: (mapItem: MapItemDesc) => void;
}

const MapItem: FC<MapItemProps> = (props) => {
  const {description, onMapItemClick} = props;
  const {icon: Icon, offsetElement} = description;

  const {icon: iconStyle, element: elementStyle} = useStyles(props);

  return (
    <>
      <Icon
        className={iconStyle}
        onClick={(e: MouseEvent) => {
          e.stopPropagation();
          onMapItemClick(description);
        }}
      />
      {offsetElement && (
        <div
          className={elementStyle}
          onClick={(e: MouseEvent) => e.stopPropagation()}>
          {offsetElement}
        </div>
      )}
    </>
  );
};

export default MapItem;