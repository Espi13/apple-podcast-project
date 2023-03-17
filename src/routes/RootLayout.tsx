import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeader from '../components/MainHeader';

const RootLayout: FC = () => {
  return (
    <>
      <MainHeader />
      <Outlet />
    </>
  );
};

export default RootLayout;
