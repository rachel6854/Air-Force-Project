import React, { FC, useState, Fragment } from 'react';
import { MdLocationSearching } from 'react-icons/md';
import DrawerContentLayout from '../DrawerContent/DrawerContentLayout';
import { useCloseEvent } from '../../graphql/mutations/close-event';
import { useEventsQuery, Event } from '../../graphql/queries/events';
import { useMapDataLazyQuery } from '../../graphql/queries/map-data';
import EventItem from '../EventItem/EventItem';
import PositionData from '../PositionData/PositionData';
import AppLayout from '../AppLayout/AppLayout';
import SelectForm, { SelectOption } from '../select-form/select-form';
import {
  useQuadcopterQuery,
  Quadcopter,
} from '../../graphql/queries/quadcopters';
import { usePetTypesQuery } from '../../graphql/queries/pet-types';
import DroneIcon from "../DroneIcon/DroneIcon";
import Footer from "../footer/footer"
import AdoptionInfo from '../AdoptionInfo/AdoptionInfo'
import {MapForPets} from '../MapForPets/MapForPets';
import Typography from '@material-ui/core/Typography';
import MapGrid, {MapItemDesc} from '../Map/MapGrid';

const BACKGROUND_IMAGE =
  'https://previews.123rf.com/images/pbardocz/pbardocz1905/pbardocz190500880/122638204-black-and-white-vector-city-map-of-berlin-with-well-organized-separated-layers-.jpg';

const PetsLayer: FC<{}> = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [closeEvent] = useCloseEvent();

  const {data: petTypesData} = usePetTypesQuery();
  const petTypes: SelectOption[] = petTypesData
    ? petTypesData.allPetTypes.map(({id, description: text}) => ({
        id,
        text,
      }))
    : [];

  const {data: eventsData} = useEventsQuery();
  const events: Event[] = eventsData ? eventsData.openEvents : [];

  const [
    getMapData,
    {data: mapDataResult, loading: mapDataLoading},
  ] = useMapDataLazyQuery();

  const {data: quadcopterData} = useQuadcopterQuery();
  const mapItems: MapItemDesc[] = quadcopterData
    ? quadcopterData.allQuadcopters.map(({id, x, y}: Quadcopter) => ({
        id,
        position: {
          x,
          y,
        },
        icon: DroneIcon,
      }))
    : [];

  if (selectedEvent) {
    mapItems.push({
      id: -1,
      position: selectedEvent.gridCell,
      icon: MdLocationSearching,
      size: 'small',
      color: 'red',
      offsetElement: (
        <SelectForm
          header="סיווג חיה"
          selectText="סוג החיה"
          submitText="בצע"
          options={petTypes}
          onSubmit={(selectedOption: SelectOption | undefined) => {
            if (selectedOption) {
              closeEvent({
                variables: {id: selectedEvent.id, petId: selectedOption.id},
              });
              setSelectedEvent(undefined);
            }
          }}
        />
      ),
    });
  }

  const onClassifyClick = (id: number) => {
    const clickedEvent = events.find(({id: eventId}) => id === eventId);

    if (clickedEvent) {
      getMapData({variables: clickedEvent.gridCell});
      setSelectedEvent(clickedEvent);
    }
  };

  return ( 
    <>
    <Footer/>
    <AppLayout
          map={
            <>
              <MapGrid
                mapSrc={BACKGROUND_IMAGE}
                dimX={100}
                dimY={100}
                mapItems={mapItems}
              />
            </>
          }
          drawer={
            <DrawerContentLayout
              listHeader="אירועים פתוחים"
              listElements={
                <>
                  {events.map((event, index) => (
                    <Fragment key={event.id}>
                      <EventItem
                        event={event}
                        onTrashClick={id => {
                          closeEvent({variables: {id}});
                          setSelectedEvent(undefined);
                        }}
                        onClassifyClick={onClassifyClick}
                      />
                      {index + 1 !== events.length && <hr />}
                    </Fragment>
                  ))}
                </>
              }
              positionData={
                <PositionData
                  loading={mapDataLoading}
                  mapData={selectedEvent && mapDataResult && mapDataResult.mapData}
                />
              }
            />
          }
        />
    </>

  );
};

export default PetsLayer;
