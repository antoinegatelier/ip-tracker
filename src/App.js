
import Map from './Map.jsx';
import Header from './Header.jsx';
import { useState, useEffect } from 'react';

function App() {

  const [error, setError] = useState({ isTrue: false, reason: '' });
  const [ip, setIp] = useState({ id: 'ip', title: 'ip address', data: '' });
  const [location, setLocation] = useState({ id: 'location', title: 'location', data: '' })
  const [utc, setUtc] = useState({ id: 'utc', title: 'timezone', data: '' })
  const [isp, setIsp] = useState({ id: 'isp', title: 'isp', data: '' })
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 })

  const getIP = async (inputIp = null) => {
    let request;
    if (inputIp === null) {
      request = await fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(json => json.ip);
    } else {
      request = inputIp;
    };
    await fetch(`https://ipapi.co/${request}/json/`)
      .then(response => response.json())
      .then(json => {
        if (json.error === true) {
          setError({ isTrue: true, reason: json.reason })
          return;
        };
        setError({ isTrue: false, reason: '' });
        setIp({ ...ip, data: json.ip });
        setLocation({ ...location, data: `${json.city}, ${json.country_name}` });
        if (json.utc_offset) { setUtc({ ...utc, data: `UTC ${json.utc_offset.slice(0, 3)}:${json.utc_offset.slice(3)}` }); } else { setUtc({ ...utc, data: `N/A` }) }
        setIsp({ ...isp, data: json.org });
        if(json.latitude && json.longitude) {setPosition({ latitude: json.latitude, longitude: json.longitude });}
      });
  }

  useEffect(() => { getIP() }, []);

  return (
    <div className="App">
      <Header getIP={getIP} ip={ip} location={location} utc={utc} isp={isp} error={error} />
      {position.latitude === 0 || position.longitude === 0 ? <div id='map'>Loading map</div> : <Map latitude={position.latitude} longitude={position.longitude} />}
      <div className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank" rel='noreferrer'>Frontend Mentor</a>.
        Coded by <a href="https://github.com/antoinegatelier">Antoine Gatelier</a>.
      </div>
    </div>
  );
}

export default App;
