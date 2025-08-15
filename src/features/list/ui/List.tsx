import { observer } from 'mobx-react-lite';
import { mapStore } from '../../../shared/store/mapStore';
import { Flex } from '@mantine/core';
import { UpdateItem } from '../../form/ui/UpdateItem';

const List = observer(() => {
  const { place, changePlace, deletePlace } = mapStore;
  console.log(place);
  return (
    <>
      <Flex direction="column">
        {place.map((pls) => (
          <UpdateItem
            key={pls.id}
            place={pls}
            deleteItem={deletePlace}
            update={changePlace}
          />
        ))}
      </Flex>
    </>
  );
});

export { List };
