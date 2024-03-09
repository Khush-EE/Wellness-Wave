import React, { useEffect } from 'react';
import { usePlacesFetch } from '../hooks/findPlaces.js'
function App() {

  const [loader, places] = usePlacesFetch(700091);
  console.log(loader, places);

  return (
      <h1>To be done by Asif</h1>
  );
}

export default App;
