/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedSignUp from '../wrappers/ProtectedSignUp';
import ProtectedDashboard from '../wrappers/ProtectedDashboard';
import SplashScreen from '../pages/SplashScreen';
import Dashboard from '../pages/Dashboard';
import Welcome from '../pages/SignUpFlow/Welcome';
import SelectRole from '../pages/SignUpFlow/SelectRole';
import Bio from '../pages/SignUpFlow/Bio';
import Bank from '../pages/SignUpFlow/Bank';
import routes from './routes.const';
import Login from '../pages/Login';
import Messages from '../pages/Messages';
import Search from '../pages/Search';
import Settings from '../pages/Settings';
import MessageFull from '../pages/Messages/MessageFull';
import PublicProfile from '../pages/PublicProfile';

const RoutesComponent = () => (
  <Routes>
    <Route index element={<SplashScreen />} />
    <Route path={routes.signUp.welcome} element={<Welcome />} />
    <Route path={routes.signUp.login} element={<Login />} />
    <Route path={routes.dashboard.publicProfile} element={<PublicProfile />} />
    <Route
      path={routes.signUp.roles}
      element={
        <ProtectedSignUp>
          <SelectRole />
        </ProtectedSignUp>
      }
    />
    <Route
      path={routes.signUp.bio}
      element={
        <ProtectedSignUp>
          <Bio />
        </ProtectedSignUp>
      }
    />
    <Route
      path={routes.signUp.bank}
      element={
        <ProtectedSignUp>
          <Bank />
        </ProtectedSignUp>
      }
    />
    <Route
      path={routes.dashboard.dashboard}
      element={
        <ProtectedDashboard>
          <Dashboard />
        </ProtectedDashboard>
      }
    />
    <Route
      path={routes.dashboard.messages}
      element={
        <ProtectedDashboard>
          <Messages />
        </ProtectedDashboard>
      }
    />
    <Route
      path={routes.dashboard.search}
      element={
        <ProtectedDashboard>
          <Search />
        </ProtectedDashboard>
      }
    />
    <Route
      path={routes.dashboard.profile}
      element={
        <ProtectedDashboard>
          <Settings />
        </ProtectedDashboard>
      }
    />
    <Route
      path={routes.dashboard.singleMessage}
      element={
        <ProtectedDashboard>
          <MessageFull />
        </ProtectedDashboard>
      }
    />
  </Routes>
);

export default RoutesComponent;
