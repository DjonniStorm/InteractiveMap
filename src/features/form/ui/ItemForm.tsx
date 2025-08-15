import { Button, Flex, NativeSelect, NumberInput } from '@mantine/core';
import { placeTypes, type Place } from '../../../shared/types/types';
import { useForm } from '@mantine/form';
import { mapStore } from '../../../shared/store/mapStore';

type NewItem = Omit<Place, 'id'>;

const ItemForm = () => {
  const { addPlace } = mapStore;
  const form = useForm<NewItem>({
    mode: 'uncontrolled',
    initialValues: {
      x: 0,
      y: 0,
      placeType: 'MEETING_ROOM',
    },
    validate: {
      x: (value) => (value >= 0 ? null : 'X не может быть отрицательным'),
      y: (value) => (value >= 0 ? null : 'Y не может быть отрицательным'),
    },
  });

  console.log(form.errors);

  const handleSubmit = (values: NewItem) => {
    addPlace({
      ...values,
      id: crypto.randomUUID(),
    });
    form.reset();
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Flex gap={20} p={5}>
          <NumberInput
            label="x"
            key={form.key('x')}
            {...form.getInputProps('x')}
          />
          <NumberInput
            label="y"
            key={form.key('y')}
            {...form.getInputProps('y')}
          />
          <NativeSelect
            label="тип"
            data={placeTypes}
            key={form.key('placeType')}
            {...form.getInputProps('placeType')}
          />
        </Flex>
        <Button type="submit">Добавить</Button>
      </form>
    </>
  );
};

export { ItemForm };
