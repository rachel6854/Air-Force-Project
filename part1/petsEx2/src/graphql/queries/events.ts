import gql from 'graphql-tag';
import {QueryHookOptions, useQuery} from '@apollo/react-hooks';

export interface Event {
  id: number;
  eventTime: string;
  quadcopter: {
    id: number;
    name: string;
  };
  gridCell: {
    x: number;
    y: number;
  };
}

export interface Data {
  openEvents: Event[];
}

export interface Variables {
  open: boolean;
}

const GET_EVENTS = gql`
  query Events($open: Boolean) {
    openEvents(isOpen: $open) {
      id
      eventTime
      quadcopter {
        id
        name
      }
      gridCell {
        x
        y
      }
    }
  }
`;

const options: QueryHookOptions<Data, Variables> = {
  pollInterval: 1000,
  variables: {open: true},
};

const useEventsQuery = () => {
  return useQuery<Data, Variables>(GET_EVENTS, options);
};

export {useEventsQuery};
