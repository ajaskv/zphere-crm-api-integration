import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import contents from '../../routes/contentRoutes';

const PAGE_404 = lazy(() => import('../../pages/presentation/auth/Page404'));

const Login = lazy(() => import('../../pages/presentation/auth/Login'));
const ContentRoutes = () => {
	return (
		<Routes>
		
			{contents.map((page) => {
				// eslint-disable-next-line react/jsx-props-no-spreading
				if(page.children)
				{
					return page.children.map((page) => {
					return <Route key={page.path} {...page} />;
					})
				}
				else
				{
					return <Route key={page.path} {...page} />;
				}
				
			})}
			{/* <Route path='*' element={<PAGE_404 />} />
			 */}
		</Routes>
	);
};

export default ContentRoutes;
