import { Box, Button, Flex } from '@mantine/core';
import { List } from '../features/list';
import { Map } from '../features/map';
import { ItemForm } from '../features/form';
import { Data } from '../features/data';

function App() {
  return (
    <>
      <Flex component="main" p="lg">
        <Box flex={1} p="lg">
          <Flex direction={'column'}>
            <ItemForm />
            <List />
          </Flex>
          <Box p="lg">
            <Data />
          </Box>
        </Box>
        <Box flex={1}>
          <Map />
        </Box>
      </Flex>
    </>
  );
}

export default App;

