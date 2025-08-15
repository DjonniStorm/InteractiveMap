import type { PropsWithChildren } from 'react';

import '@mantine/core/styles.css';

import { MantineProvider } from '@mantine/core';

const Mantine = ({ children }: PropsWithChildren) => {
  return <MantineProvider>{children}</MantineProvider>;
};

export { Mantine };
