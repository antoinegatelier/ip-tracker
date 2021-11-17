import InfoContainer from "./InfoContainer";
import headerBG from './pattern-bg.png';
import { useState } from "react";

const Header = (props) => {

    const { ip, location, utc, isp, getIP, error } = props;

    const [input, setInput] = useState('');

    const handleClick = async (e) => {
        e.preventDefault();
        const p = document.querySelector('.wrong-input-message');
        if(input.match(/^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/)){
            await getIP(input);
            if(error.isTrue) {
                p.textContent = error.reason;
                if(p.classList.contains('inactive')) { p.classList.remove('inactive')};
                return;
            }
            if(!p.classList.contains('inactive')) {
                p.classList.add('inactive');
            }
        } else {
            if (p.classList.contains('inactive')) {
                p.textContent = 'Please type your requested IP in IPV4 format, ex: 255.255.255.255';
                p.classList.remove('inactive')
            }
        }
    }

    const handleChange = (e) => {
        setInput(e.target.value);
    }

    return (
        <div className='header' style={{
            backgroundImage: `url(${headerBG})`
        }}>
            <h1>IP Address Tracker</h1>
            <div>
                <form>
                    <input
                        type='text'
                        value={input}
                        onChange={(e) => {handleChange(e)}}
                        placeholder="Search for any IP address"
                        pattern='^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$'
                        required />
                    <button onClick={(e) => {handleClick(e)}}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" /></svg></button>
                </form>
                <p className='inactive wrong-input-message'></p>
            </div>
            <InfoContainer ip={ip} location={location} utc={utc} isp={isp} />
        </div>
    )
};

export default Header;