import './Card.css';

const Card = ({ url }) => {
    const randomRotation = Math.floor(Math.random() * 360);
    const style = {
        transform: `rotate(${randomRotation}deg)`
    }

    return (
        <div>
            <img style= {style} className="Card" src={url} alt="Card image" />
        </div>
    )
}

export default Card