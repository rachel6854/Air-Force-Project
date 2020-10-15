import gql from 'graphql-tag';

export interface Animal {
    id: number;
    name: string;
    imageBeforeURL: string;
    imageAfterURL: string;
    petType: PetType;
    x: number;
    y: number;
}

export interface PetType{
    description: string
}

export interface AnimalsData {
  allAdoptees: Animal[];
}

export interface AnimalsIds {
  allAdoptees: Number[];
}

export const GET_ANIMALS = gql`
query animals($adoptionStatusCode:Int!) {
    allAdoptees(adoptionStatusCode:$adoptionStatusCode){
      id
      adoptionStatus{
        id
        code
        description
      }
      petType {
        description
      }
      imageBeforeURL
      imageAfterURL
      x
      y
    }
  }`
  
  export const GET_ANIMALS_IDS = gql`
  query animals($adoptionStatusCode:Int!) {
      allAdoptees(adoptionStatusCode:$adoptionStatusCode){
        id
      }
    }`

  