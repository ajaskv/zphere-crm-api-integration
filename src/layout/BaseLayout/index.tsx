import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Outlet } from 'react-router-dom';
import Login from '../../pages/presentation/auth/Login';
interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return (<Login></Login>);
};

BaseLayout.propTypes = {
  children: PropTypes.node
};


// const LOADING = (
	
// );
export default BaseLayout;
