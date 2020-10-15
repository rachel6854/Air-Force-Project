import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";

export interface PetType {
  id: number;
  code: string;
  description: string;
}

interface Data {
  allPetTypes: PetType[];
}

export const GET_PET_TYPES = gql`
  query PetTypes {
    allPetTypes {
      id
      code
      description
    }
  }
`;


const usePetTypesQuery = () => {
  return useQuery<Data, {}>(GET_PET_TYPES);
};

export {usePetTypesQuery};
