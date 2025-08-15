import type { PropsWithChildren } from 'react';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';

const Mantine = ({ children }: PropsWithChildren) => {
  return (
    <MantineProvider>
      <ModalsProvider>{children}</ModalsProvider>
    </MantineProvider>
  );
};

export { Mantine };
