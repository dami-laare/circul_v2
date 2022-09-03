import React, { Suspense } from 'react';
import RoutesComponent from './Routes';

const App = () => (
  <Suspense fallback={null}>
    <RoutesComponent />
  </Suspense>
);

export default App;
