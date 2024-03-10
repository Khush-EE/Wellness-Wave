import axios from "axios"
import { useEffect, useState } from "react"

const usePlacesFetch = (postalCode) => {
    const [loader, setLoader] = useState(true);
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        setLoader(true)
        ; (async () => {
            try {
                const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=AIzaSyCpWSpiBip2Tz-fb9_LbSDiJlRKsuGtC1o`);
                console.log()
                const lat = location.data.results[0].geometry.location.lat;
                const lng = location.data.results[0].geometry.location.lng;

                const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby', {
                    "includedTypes": [
                        "physiotherapist"
                    ],
                    "maxResultCount": 20,
                    "locationRestriction": {
                        "circle": {
                            "center": {
                                "latitude": lat,
                                "longitude": lng
                            },
                            "radius": 1000
                        }
                    }

                },
                {
                    headers: {"X-Goog-Api-Key": 'AIzaSyCpWSpiBip2Tz-fb9_LbSDiJlRKsuGtC1o', "X-Goog-FieldMask": 'places.displayName,places.nationalPhoneNumber,places.formattedAddress,places.rating,places.googleMapsUri,places.regularOpeningHours,places.reviews,places.photos,places.id'}
                })
                console.log(response.data.places);
                setPlaces(response.data.places);
            } catch (e) {
                console.log(e);
            } finally {
                setLoader(false);
            }
        })()
    }, [postalCode])
    
    return [loader, places];
}

export { usePlacesFetch }