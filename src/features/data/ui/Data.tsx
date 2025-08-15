import { Button, Code, Modal, ScrollArea, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { observer } from 'mobx-react-lite';
import { mapStore } from '../../../shared/store/mapStore';
import { useCallback } from 'react';

const ModalData = ({ data }: { data: string }) => {
  return (
    <ScrollArea h={300}>
      <Code block>{data}</Code>
    </ScrollArea>
  );
};

const Data = observer(() => {
  const [opened, { open, close }] = useDisclosure(false);
  const { place } = mapStore;

  const finalData = useCallback(() => {
    return JSON.stringify(place, null, 2);
  }, [place]);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Выгрузка">
        <ModalData data={finalData()} />
      </Modal>
      <Button onClick={open}>
        <Text>Выгрузить данные</Text>
      </Button>
    </>
  );
});

export { Data };
