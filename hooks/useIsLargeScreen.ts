import { useMediaQuery } from 'react-responsive';
import { useIsClient } from './useIsClient';

export const useIsLargeScreen = () => {
  const isLargeByMediaQuery = useMediaQuery({ query: '(min-width: 1024px)' });
  const isClient = useIsClient();

  return isClient && isLargeByMediaQuery;
};
