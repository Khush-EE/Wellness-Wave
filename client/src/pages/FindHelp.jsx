import React, { useState } from 'react';
import { usePlacesFetch } from '../hooks/findPlaces.js';
import { FaSearch } from 'react-icons/fa';
import Spinner from '../components/Spinner.jsx';
import bg3 from '../assets/bg3.jpg';
function App() {
  const [search, setSearch] = useState();
  const [loader, places] = usePlacesFetch(search);
  console.log(places)
  // const photoReference = places.photos?.[0]?.name.slice(40, places.photos?.[0]?.name.length);
  const photoReference = places.photos?.[0]?.name.slice(41, places.photos?.[0]?.name.length);
  console.log(photoReference)
//"places/ChIJjVSrnGN3AjoR8MfP1oiSO5A/photos/ATplDJYhZZGPvlPuy9OD_Q58ug6HDCzpSUuIb0Kr6COSuClAj4y5G3T9qE_ixymMVmK2XO0_hbB17nHgPbNbqtMsXEQ9SjSO-DCMYuWRZxG9PMbjJf6xUS9muFKOMJS96ZndXZ-hgCI0a495Wotp6wm6kFjvYP_xoDkRWPOb"

  const photoWidth = 500; // Set your desired width for the photo
  const photoHeight = 563; // Set your desired height for the photo
  //"https://places.googleapis.com/v1/places/ChIJ2fzCmcW7j4AR2JzfXBBoh6E/photos/AUacShh3_Dd8yvV2JZMtNjjbbSbFhSv-0VmUN-uasQ2Oj00XB63irPTks0-A_1rMNfdTunoOVZfVOExRRBNrupUf8TY4Kw5iQNQgf2rwcaM8hXNQg7KDyvMR5B-HzoCE1mwy2ba9yxvmtiJrdV-xBgO8c5iJL65BCd0slyI1/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_API_KEY}"
  // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?$photoreference={photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}&maxwidth=${photoWidth}&maxheight=${photoHeight}`;
  // const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}&key=${import.meta.env.VITE_GOOGLE_API_KEY}&maxwidth=${photoWidth}&maxheight=${photoHeight}`;
 const photoUrl = `https://places.googleapis.com/v1/places/ChIJ2fzCmcW7j4AR2JzfXBBoh6E/photos/AUacShh3_Dd8yvV2JZMtNjjbbSbFhSv-0VmUN-uasQ2Oj00XB63irPTks0-A_1rMNfdTunoOVZfVOExRRBNrupUf8TY4Kw5iQNQgf2rwcaM8hXNQg7KDyvMR5B-HzoCE1mwy2ba9yxvmtiJrdV-xBgO8c5iJL65BCd0slyI1/media?maxHeightPx=400&maxWidthPx=400&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
//"places/ChIJ63_9o7p3AjoRjwzjJ2VyPVg/photos/ATplDJaahFQE74sICILFhjkl-2XZel4tO66bwoJElF3oWPkdLz8Ms_5jEDOrxTec34wAJLuPTuzbZrgyfXGvKVPumYqXHLB_OM8SXCjO-R-W0Dk7-2yMF9Bz8NmgfSCIOGQlD71i1CNp1sN22m0yjEAVc3N14VBiVCsQZ_Hm"
  return (
    <>
      <div className='md:mt-0 md:mb-28 md:ml-0 md:mr-0'>
      
      <div className=' relative w-full h-full flex flex-col items-center justify-start gap-6 mt-[60px]' >
        <img src={bg3} className=' absolute w-full h-screen object-cover object-top max-h-48 bg-opacity-30 ' style={{ background: 'linear-gradient(to top, white, transparent)' }} alt="" />
        <div className='w-full h-[15vh] flex items-center justify-center absolute z-10'>
         <div className=' rounded-xl bg-yellow-600 flex'>
         <input
            className='w-80 border-black border-2 bg-white p-2 rounded-xl'
            type='text'
            placeholder='Search for City/ZipCode'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FaSearch id='search-icon' className='size-7 m-2' />
        </div>
         </div>
        <div id='SearchResultList' className=' bg-yellow-50  no-scrollbar flex flex-col justify-center items-start max-h-36 w-80 overflow-hidden overflow-y-scroll absolute z-10 mt-24 '>
          {!loader ? search && (
            places?.map((place, index) => (
              <div key={index} className='flex flex-col p-3 hover:text-amber-600 w-full hover:bg-slate-300 '>
                <a href={place.googleMapsUri}>{place.displayName.text}</a>
                <hr />
              </div>
              
            ))
          ) : (
            <Spinner />
          )}
        </div>
      </div>

      <div id='box' className='flex flex-wrap md:space-x-5 mt-52 '>
        <div id=' card' className='w-80 h-80 border-2'>
        <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner rounded-lg">
              <div className="carousel-item active">
                <img src="https://img.freepik.com/premium-photo/animated-female-doctor-character_982269-293.jpg?w=740" className="d-block w-100 h-80" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className=' text-black text-2xl'>First slide </h5>
                  <p className=' text-black text-xl'>Psychiatrists diagnose, treat, and prevent mental health disorders effectively.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://img.freepik.com/free-vector/doctor-character-background_1270-84.jpg?w=740&t=st=1710010460~exp=1710011060~hmac=8ed7add557536a0fe2e4d6ca8416e8b2fd5494395c8aeefaaf8dbd3918267b85" className="d-block w-100 h-80" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className=' text-black text-2xl'>Second slide</h5>
                  <p className=' text-black text-xl'>Their expertise encompasses medication management, psychotherapy, and etc</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src="https://t4.ftcdn.net/jpg/06/32/90/79/360_F_632907942_M6CVHD1ivhUrWK1X49PkBlSH3ooNPsog.jpg" className="d-block w-100 h-80" alt="..."/>
                <div className="carousel-caption d-none d-md-block">
                  <h5 className=' text-black text-2xl'>Third slide</h5>
                  <p className=' text-black text-xl'>Collaboration with other healthcare professionals ensures holistic care approaches.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev text-black " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next " type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
        </div>
        </div>

        <div id='filter-box' className=' border-4 w-52 h-80 flex justify-center items-center flex-col rounded-xl'>

          <ul className=''>
            <li className=' p-3 bg-slate-50 hover:bg-slate-200 rounded-lg my-4'> Filter by Ratings <input type="checkbox" /> </li>
            <li className=' p-3 bg-slate-50 hover:bg-slate-200 rounded-lg my-4'> Filter by Distance <input type="checkbox" /></li>
            <li className=' p-3 bg-slate-50 hover:bg-slate-200 rounded-lg my-4'> Filter by City <input type="checkbox" /></li>
          </ul>

        </div>

        <div id='fetched-data-boxes' className='flex flex-col w-96 md:w-1/2 m-auto border-4 max-h-screen bg-white bg-cover no-scrollbar overflow-hidden overflow-y-scroll rounded-lg' style={{maxHeight: "700px"}} >
          {!loader ? search && (
            places?.map((place, index) => (
              <div key={index} className='card mb-3 md:w-full bg-slate-100 hover:bg-slate-300'>
                <a href={place.googleMapsUri} className='row g-0'>
                  <div className='col-md-4'>
                    <img src={photoUrl} className='img-fluid rounded-start flex justify-center items-center ' style={{height:"80%", width:"80%"}} alt='...' />
                  </div>
                  <div className='col-md-8  p-3 rounded-xl'>
                    <div className='card-body bg-white rounded-2xl '>
                      <h5 className='card-title'>{place.displayName.text}</h5>
                      <p className='card-text'>{place.formattedAddress}</p>
                      <p className='card-text'>
                        <small className='text-body-secondary'>Phone: {place.nationalPhoneNumber}</small>
                      </p>
                      <p className='card-text'>
                        <small className='text-body-secondary'>Last updated 3 mins ago</small>
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            ))):(
              <div className=' flex justify-center items-center w-96 md:w-1/2 text-2xl h-52'>
                  <p className=' flex justify-center items-center '> Results will be shown here dynamically</p>
              </div>
            )}
        </div>
      </div>

      </div>
    </>
  );
}

export default App;
