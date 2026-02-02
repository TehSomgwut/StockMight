import style from './Card.module.css';
 export default function Card({text, value, src}) {
    return(
        <div className={style.Card}>
            <div>
                <p>{text}</p>
                <h3>{value}</h3>
            </div>
            <img src={src} />
        </div>
    )
 }