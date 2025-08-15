import { observer } from 'mobx-react-lite';
import {
  placeTypes,
  type Place,
  type PlaceType,
} from '../../../shared/types/types';
import { Button, Flex, NativeSelect, NumberInput } from '@mantine/core';

type Props = {
  place: Place;
  update: (place: Place) => void;
  deleteItem: (id: string) => void;
};

const UpdateItem = observer(({ place, update, deleteItem }: Props) => {
  return (
    <Flex gap={20} align={'center'}>
      <NumberInput
        label="x"
        value={place.x}
        onChange={(e) => {
          console.log(e);
          if (typeof e === 'number' && e >= 0) {
            update({
              ...place,
              x: e,
            });
            return;
          }
          if (Number.isFinite(e) && +e >= 0) {
            update({
              ...place,
              x: +e,
            });
            return;
          }
        }}
      />
      <NumberInput
        label="y"
        value={place.y}
        onChange={(e) => {
          console.log(e);
          if (typeof e === 'number' && e >= 0) {
            update({
              ...place,
              y: e,
            });
            return;
          }
          if (Number.isFinite(e) && +e >= 0) {
            update({
              ...place,
              y: +e,
            });
            return;
          }
        }}
      />
      <NativeSelect
        value={place.placeType}
        data={placeTypes}
        label="тип"
        onChange={(e) => {
          if (e.target.value) {
            update({
              ...place,
              placeType: e.target.value as PlaceType,
            });
          }
        }}
      />
      <Button
        onClick={() => {
          deleteItem(place.id);
        }}
      >
        x
      </Button>
    </Flex>
  );
});

export { UpdateItem };
