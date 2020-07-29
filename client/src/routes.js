import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import LinksPage from './pages/LinksPage';
import CreatePage from './pages/CreatePage';
import DetailPage from './pages/DetailPage';
import AuthPage from './pages/AuthPage';

export const useRoutes = isAuthenticated => {
  return (
    <Switch>
      <Route exact path='/'>
        {isAuthenticated ? <CreatePage/> : <AuthPage/>}
      </Route>
      <Route exact path='/links'><LinksPage/></Route>
      <Route exact path='/create'><CreatePage/></Route>
      <Route path='/detail/:id'><DetailPage/></Route>
      <Redirect to='/create'/>
    </Switch>
  );
}