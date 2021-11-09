import InfoContainer from "./InfoContainer";
import headerBG from './pattern-bg.png';

const Header = (props) => {

    const { ip, location, utc, isp, getIP } = props;

    const handleClick = (e) => {
        e.preventDefault();
        getIP();
    }

    return (
        <div className='header' style={{
            backgroundImage: `url(${headerBG})`
        }}>
            <h1>IP Address Tracker</h1>
            <form>
                <input type='text' placeholder="Search for any IP address or domain" />
                <button onClick={(e) => {handleClick(e)}}><svg xmlns="http://www.w3.org/2000/svg" width="11" height="14"><path fill="none" stroke="#FFF" stroke-width="3" d="M2 1l6 6-6 6" /></svg></button>
            </form>
            <InfoContainer ip={ip} location={location} utc={utc} isp={isp} />
        </div>
    )
};

export default Header;