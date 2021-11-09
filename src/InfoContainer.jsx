import InfoBlock from "./InfoBlock";

const InfoContainer = (props) => {
    const {ip, location, utc, isp} = props;
    
    const data = [ip, location, utc, isp];

    return (
        <div className='grid-container'>
            {data.map(entry => {
                return (<InfoBlock title={entry.title} data={entry.data} key={entry.id}/>)
            })}
        </div>
    )
};

export default InfoContainer;