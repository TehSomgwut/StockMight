import StyleItem from './Item.module.css';

export default function Item({productID, name, quantity, alert, expired, type}) {
    const  addStatus = () => {
        switch(type) {
            case "LowStock":
                if(quantity <= alert*0.2) {
                    return "danger"
                }
                else {
                    return "risky"
                }
            default:
                return "";
        }
    }
    return(
        <div className={StyleItem.Item}>
            <div>

                <h3>{productID}</h3>
                <p>{name}</p>
            </div>
            <div className={StyleItem.shift}>
                <h4 className={StyleItem[addStatus()]}>{quantity}</h4>
                { type=="LowStock" ? <p>จุดแจ้งเตือน: {alert}</p> : <p>วันหมดอายุ: {expired}</p>}
            </div>
        </div>
    )
}