import { makeAutoObservable } from 'mobx';
import type { Place } from '../types/types';

class MapStore {
  places: Place[];
  image: string | undefined;
  constructor() {
    makeAutoObservable(this);

    this.places = [];
  }

  get place() {
    return this.places;
  }

  deleteImage = (id: string) => {
    this.places.filter((elem) => elem.id == id);
  };

  setImage = (img: string | undefined) => {
    this.image = img;
  };

  setPlaces = (places: Place[]) => {
    this.places = places;
  };

  addPlace = (place: Place) => {
    this.places.push(place);
  };

  changePlace = (place: Place) => {
    const index = this.places.findIndex((pls) => pls.id === place.id);
    if (index !== -1) {
      this.places[index] = place;
    }
  };

  deletePlace = (id: string) => {
    this.places = this.places.filter((pls) => pls.id !== id);
  };
}

export const mapStore = new MapStore();
