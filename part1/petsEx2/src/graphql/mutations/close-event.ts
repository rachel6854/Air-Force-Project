import gql from 'graphql-tag';
import {useMutation} from "@apollo/react-hooks";

export interface Variables {
  id: number;
  petId?: number;
}

const CLOSE_EVENT = gql`
  mutation CloseEvent($id: Int!, $petId: Int) {
    closeEvent(eventId: $id, petTypeCode: $petId) {
      id
    }
  }
`;


const useCloseEvent = () => {
  return useMutation<{}, Variables>(CLOSE_EVENT);
};

export {useCloseEvent};
