import React, { useEffect, useState } from 'react';
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

const App = () => {

  const apiKey = "0d8017fad7e9c31311cdafd2ad5d647e"
  const [inputCity,setInputCity] = useState("");
  const [data,setData] = useState({})

  const getWetherDetails = (cityName) =>{
    if(!cityName) return
    const apiURL = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${cityName}`;
    axios.get(apiURL).then((res) =>{
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) =>{
      console.log("err", err)
    })
  }

  const handleChangeInput = (e)=>{
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
    setInputCity("");
  }

  const handleSuggestion = (e)=>{
    getWetherDetails(e.target.innerText);
    setInputCity("");
  }

  useEffect(()=>{
    getWetherDetails("delhi")
  },[])

  

  return (
    <div className="container-fluid px-1 px-sm-3 py-5 mx-auto">
    <div className="row d-flex justify-content-center">
        <div className="row card0">
            <div className="card1 col-lg-8 col-md-7">
                <small>Weather</small>
                <div className="text-center">
                    {/* <img class="image mt-5" src=""/> */}
                </div>
                <div className="row px-3 mt-3 mb-3">
                    <h1 className="large-font mr-3">{data?.current?.temperature}°C</h1>
                    <div className="d-flex flex-column mr-3">
                        <h2 className="mt-3 mb-0">{(data?.location?.name)?data?.location?.name:<p>location Loading...</p>}</h2>
                        <small>{data?<p>{data?.location?.localtime}</p>:<p>Time Loading...</p>}</small>
                    </div>
                    <div className="d-flex flex-column text-center">
                        {/* <h3 class="fa fa-sun-o mt-4"></h3> */}
                        <h5>{data?<p>{data?.current?.weather_descriptions[0]}</p>:null}</h5>
                    </div>
                </div>
                  <div class="container">
                  <h5>Weather Details</h5>
                    <div class="row">
                      <div class="col-sm">
                          <p className="text-danger">Cloudy</p><img className='icon' src='https://cdn-icons-png.flaticon.com/128/3222/3222801.png' alt='logo'/>
                          {data?<p className="ml-auto">{data?.current?.cloudcover}</p>:null}
                      </div>
                      <div class="col-sm">
                          <p className="text-danger">Humidity</p><img className='icon' src='https://cdn-icons-png.flaticon.com/128/6474/6474692.png' alt='logo'/>
                          {data?<p className="ml-auto">{data?.current?.humidity}%</p>:null}
                      </div>
                      <div class="col-sm">
                          <p className="text-danger">Wind</p><img className='icon' src='https://cdn-icons-png.flaticon.com/128/1506/1506761.png' alt='logo'/>
                          {data?<p className="ml-auto">{data?.current?.wind_speed}km/h</p>:null}
                      </div>
                    </div>
                  </div>
                  <div class="container">
                    <div class="row">
                      <div class="col-sm">
                          <p className="text-danger">feelslike</p><img className='icon' src='https://cdn-icons-png.flaticon.com/128/481/481431.png' alt='logo'/>
                          {data?<p className="ml-auto">{data?.current?.feelslike}°C</p>:null}
                      </div>
                      <div class="col-sm">
                          <p className="text-danger">Day/Night</p><img className='icon' src='https://cdn-icons-png.flaticon.com/512/391/391513.png' alt='logo'/>
                          {(data?.current?.is_day)?<p className="ml-auto">{(data?.current?.is_day === "yes")?<p>Day</p>:<p>Night</p>}</p>:null}
                      </div>
                      <div class="col-sm">
                          <p className="text-danger">TimeZone</p><img className='icon' src='https://cdn.iconscout.com/icon/premium/png-64-thumb/time-zone-5989490-5041881.png' alt='logo'/>
                          {data?<p className="ml-auto">{data?.location?.timezone_id}</p>:null}
                      </div>
                    </div>
                  </div>
            </div>
            <div className="card2 col-lg-4 col-md-5">
                <div className="row px-3">
                    <input type="text" name="location" placeholder="Another location" className="mb-5" value={inputCity} onChange={handleChangeInput}/>
                    <button className="fa fa-search mb-5 mr-0 text-center button" onClick={handleSearch}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
                </div>
                <div className="mr-5">
                    <p>Quick Search</p>
                    <p className="light-text suggestion" onClick={handleSuggestion}>Mumbai</p>
                    <p className="light-text suggestion" onClick={handleSuggestion}>Bengaluru</p>
                    <p className="light-text suggestion" onClick={handleSuggestion}>Kolkata</p>
                    <p className="light-text suggestion" onClick={handleSuggestion}>Bhopal</p>

                    <div className="line my-5"></div>
                </div>
            </div>
        </div>
    </div>
</div>
  );
}

export default App;
