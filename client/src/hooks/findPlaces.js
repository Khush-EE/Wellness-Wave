import axios from "axios"
import { useEffect, useState } from "react"

const usePlacesFetch = (postalCode=700091) => {
    const [loader, setLoader] = useState(true);
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        ; (async () => {
            try {
                const location = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`);
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
                    headers: {"X-Goog-Api-Key": `${import.meta.env.VITE_GOOGLE_API_KEY}`, "X-Goog-FieldMask": 'places.displayName,places.nationalPhoneNumber,places.formattedAddress,places.rating,places.googleMapsUri,places.regularOpeningHours,places.reviews,places.photos,places.id'}
                })
                setPlaces(response.data.places);
                console.log(response.data.places)
            } catch (e) {
                console.log(e);
            } finally {
                setLoader(false);
            }
        })()
    }, [])
    
    return [loader, places];
}

export { usePlacesFetch }