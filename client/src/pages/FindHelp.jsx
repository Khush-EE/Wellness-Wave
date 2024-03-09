import React, { useEffect } from 'react';
import Slider from './Slider2';
import { usePlacesFetch } from '../hooks/findPlaces.js'
function App() {

  const [loader, places] = usePlacesFetch(700091);
  console.log(loader, places);

  return (
      <Slider/>
  );
}

export default App;
