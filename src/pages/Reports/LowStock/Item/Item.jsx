import StyleItem from './Item.module.css';

export default function Item({name, description, quantity, alert, expired, type}) {
    return(
        <div className={StyleItem.Item}>
            <div>

                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div>
                <h4>{quantity}</h4>
                { type=="lowStock" ? <p>จุดแจ้งเตือน: {alert}</p> : <p>วันหมดอายุ: {expired}</p>}
            </div>
        </div>
    )
}