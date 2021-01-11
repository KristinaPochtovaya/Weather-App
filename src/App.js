import './App.css';
import React from 'react';
import  Info from './components/info';
import Form from './components/form';
import Weather from './components/weather';

const API_KEY = '6ddc9bf47cfee7d742eede0564af0677';

class App extends React.Component {

  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined
  }

   refreshPage = ()=>{
    window.location.reload();
 }

  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      try {
      const api_url = await fetch( `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      const  data = await api_url.json();

      let sunset = data.sys.sunset;
      let date = new Date();
      date.setTime(sunset);
      let sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_date,
        error: undefined
        });
      
    } catch (error) {
      this.setState((error) => ({error}));
    }
    }
  }

render() {
  if (this.state.error) {
    return (
      <div className="wrapper">
      <div className="main"> 
      <div className="container">
        <div className="row">
            <div className="col-sm-5 info">
            
            </div>
            <div className="col-sm-7 form">
            <div>
    
      <button onClick={this.refreshPage}>Refresh</button>
    </div>
    </div>
            </div>
        </div>
      </div>
      </div>
    )
  } else {
  return (
    <div className="wrapper">
      <div className="main"> 
      <div className="container">
        <div className="row">
            <div className="col-sm-5 info">
            <Info />
            </div>
            <div className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather}/>
              <Weather 
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunset={this.state.sunset}
              error={this.state.error}
              />
            </div>
        </div>
      </div>
      </div>
    </div>
  )
}
}
}

export default App;
