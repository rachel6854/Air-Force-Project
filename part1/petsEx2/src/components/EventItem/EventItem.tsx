import React, {FC} from 'react';
import ListItem from '../ListItem/ListItem';
import {FaTrashAlt} from 'react-icons/fa';
import {GiPin} from 'react-icons/gi';
import {Event} from '../../graphql/queries/events';


interface DroneItemProps {
  event: Event;
  onTrashClick: (id: number) => void;
  onClassifyClick: (id: number) => void;
}

const formatDate = (date: string): string => {
  const time = new Date(date).toTimeString();

  return time.split(' ')[0];
};

const EventItem: FC<DroneItemProps> = ({
  event: {
    id,
    eventTime,
    gridCell,
    quadcopter: {name},
  },
  onTrashClick,
  onClassifyClick,
}) => {
  const {x, y} = gridCell ? gridCell : {x: 0, y: 0};
  const eventActions = [
    {
      icon: FaTrashAlt,
      onClick: () => onTrashClick(id),
    },
    {
      icon: GiPin,
      onClick: () => onClassifyClick(id),
    },
  ];

  return (
    <ListItem
      heading={name}
      subtitle1={`נ.צ: ${x}X${y}`}
      subtitle2={`שעת צילום: ${formatDate(eventTime)}`}
      actions={eventActions}
    />
  );
};

export default EventItem;
