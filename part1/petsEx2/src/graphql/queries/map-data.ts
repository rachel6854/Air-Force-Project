import gql from 'graphql-tag';
import {useLazyQuery} from "@apollo/react-hooks";

export interface HistoryData {
  id: number;
  petType: {
    id: number;
    code: string;
    description: string;
  }
  amount: number;
}

export interface MapData {
  id: number;
  x: number;
  y: number;
  lastPictureUrl: string;
  history: HistoryData[];
}

interface Data {
  mapData: MapData
}

interface Variables {
  x: number;
  y: number;
}

export const GET_MAP_DATA = gql`
  query MapData($x: Int!, $y: Int!) {
    mapData(x: $x, y: $y) {
      id
      x
      y
      lastPictureUrl
      history {
        id
        petType {
          id
          code
          description
        }
        amount
      }
    }
  }
`;

const useMapDataLazyQuery = () => {
  return useLazyQuery<Data, Variables>(GET_MAP_DATA);
};

export {useMapDataLazyQuery};
