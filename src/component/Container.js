import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const Container = ()=>{
    const [city, setCity] = useState(null);
    const [search, setSearch] = useState("Delhi");
    const [val,setVal] = useState("Delhi");
    const [temp, setTemp] = useState(25);
   const [feelsLike, setFeelsLike] = useState(25);
   const [tempMin, setTempMin] = useState(25);
   const [tempMax, setTempMax] = useState(25);
   const [date, setDate] = useState("0000-00-00");
   const searchButton = (e) => {
            e.preventDefault();
            setVal(search);
   }

   
    useEffect(() => {
          const fetchApi = async() => {
            const today = new Date();

            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            setDate(date);

            
            try{
                const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=d765d356ebd7e11900c84780738686b3`;
                const response = await fetch(url);

                
               
                    const data = await response.json();



                    console.log(data);
                    setCity(data);
                    const t = parseInt(city.main.temp)-273;
                    setTemp(t);
                    const fLike = parseInt(city.main.feels_like)-273;
                    setFeelsLike(fLike);
                    const tMin = parseInt(city.main.temp_min)-273;
                    setTempMin(tMin);
                    const tMax = parseInt(city.main.temp_max)-273;
                    setTempMax(tMax); 

             
            }
            catch(error){
                console.log("Someone seriously needs to get out");
                console.log(error);
            }
                
             
               
             

          }  
        
        
        fetchApi();
    },[val]);
    
    return (
        <>
    <div className="mx-auto p-4 bg-purple-400 h-screen flex flex-col justify-center">
    <form>   
    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
    <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input type="search" id="default-search" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-500 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." onChange={(event) => setSearch(event.target.value)}/>
        <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={searchButton}>Search</button>
    </div>
</form>
{!city ? (<div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">Holy smokes!</strong>
  <span class="block sm:inline">The city doesn't exist</span>
  <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
    <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
  </span>
</div>) :(
    <div className="flex flex-wrap mt-10">
        <div className="w-full   px-2">
            <div className="bg-gray-900 text-white relative min-w-0 break-words rounded-lg overflow-hidden shadow-sm mb-4 w-full bg-white dark:bg-gray-600">
                <div className="px-6 py-6 relative">
                    <div className="flex mb-4 justify-between items-center">
                        <div>
                            <h5 className="mb-0 font-medium text-xl">{val}</h5>
                            <h6 className="mb-0">{date}</h6><small>{city.weather[0].main}                    {city.weather[0].description}</small>
                        </div>
                        <div className="text-right">
                            <h3 className="font-bold text-4xl mb-0"><span>{temp}</span></h3>
                        </div>
                    </div>
                    <div className="block sm:flex justify-between items-center flex-wrap">
                        <div className="w-full sm:w-1/2">
                            <div className="flex mb-2 justify-between items-center"><span>Temp</span><small className="px-2 inline-block">{temp}&nbsp;&deg;</small></div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="flex mb-2 justify-between items-center"><span>Feels like</span><small className="px-2 inline-block">{feelsLike}&nbsp;&deg;</small></div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="flex mb-2 justify-between items-center"><span>Temp min</span><small className="px-2 inline-block">{tempMin}&nbsp;&deg;</small></div>
                        </div>
                        <div className="w-full sm:w-1/2">
                            <div className="flex mb-2 justify-between items-center"><span>Temp max</span><small className="px-2 inline-block">{tempMax}&nbsp;&deg;</small></div>
                        </div>
                    </div>
                </div>
                {/* <div className="divider table mx-2 text-center bg-transparent whitespace-nowrap"><span className="inline-block px-3"><small>Forecast</small></span></div>
                <div className="px-6 py-6 relative">
                    <div className="text-center justify-between items-center flex" >
                        <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Sun</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8"/><span className="block my-1">38.3&deg;</span></div>
                        <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8"/><span className="block my-1">39.9&deg;</span></div>
                        <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8"/><span className="block my-1">40.1&deg;</span></div>
                        <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8"/><span className="block my-1">41.5&deg;</span></div>
                        <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/ffgW9JQ.png" className="block w-8 h-8"/><span className="block my-1">40.1&deg;</span></div>
                        <div className="text-center mb-0 flex items-center justify-center flex-col"><span className="block my-1">Mon</span><img src="https://i.imgur.com/BQbzoKt.png" className="block w-8 h-8"/><span className="block my-1">38&deg;</span></div>
                    </div>
                </div> */}
            </div>
        </div>
    </div>)}
    
</div>
        </>
    );
}

export default Container;