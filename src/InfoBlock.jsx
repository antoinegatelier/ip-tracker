const InfoBlock = (props) => {
    const { id, title, data } = props;

    return (
        <div className="grid-item" id={id}>
            <h2>{title}</h2>
            <p>{data}</p>
        </div>
    )
};

export default InfoBlock;