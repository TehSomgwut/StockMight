import style from './Card.module.css';
 export default function Card({text, value, src, CN}) {
    return(
        <div className={`${style.Card} ${style[CN] || ''}`}>
            <div>
                <p>{text}</p>
                <h3>{value}</h3>
            </div>
            <img src={src} />
        </div>
    )
 }