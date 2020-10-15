import React, {useState} from 'react';
import MapGrid, { MapItemDesc } from '../Map/MapGrid';
import {MdLocationSearching} from 'react-icons/md';
import {GiAirplane} from 'react-icons/gi';
import {FiTarget} from 'react-icons/fi';

const BACKGROUND_IMAGE =
  'https://previews.123rf.com/images/pbardocz/pbardocz1905/pbardocz190500880/122638204-black-and-white-vector-city-map-of-berlin-with-well-organized-separated-layers-.jpg';

const items = [
	{
		id: "1",
		position: {x: 3, y: 7},
		icon: GiAirplane
	},
	{
		id: "2",
		position: {x: 8, y: 1},
		icon: GiAirplane
	},
		{
		id: "3",
		position: {x: 2, y: 4},
		icon: FiTarget
	}
];

export const MapForPets =  (() => {
	const [pinPosition, setPinPosition] = useState();

	const onMapItemClick = ({id, position} : {id : number, position : any}) => {
		console.log(`Map Item ID: ${id} Clicked!`);
	};

	const mapItems: MapItemDesc[] = [
		{
			id: '0',
  		position: pinPosition,
  		icon: MdLocationSearching,
  		size: 'small',
  		color: 'red',
			offsetElement: pinPosition && 
				(<span>Position: {pinPosition.x.toFixed(2)}, {pinPosition.y.toFixed(2)}</span>)
		},
		...items
	];

	return (
			<MapGrid
				mapSrc={BACKGROUND_IMAGE}
				dimX={5}
				dimY={5}
				mapItems={mapItems}
				onMapItemClick={onMapItemClick}
				onMapClick={setPinPosition}
			/>
	)
	}
)