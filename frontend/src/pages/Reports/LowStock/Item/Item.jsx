import StyleItem from './Item.module.css';

export default function Item({ code, name, quantity, minStock, expired, type }) {
    const addStatus = () => {
        switch(type) {
            case "LowStock":
                if(quantity <= minStock * 0.2) {
                    return "danger";
                }
                else {
                    return "risky";
                }
            default:
                return "";
        }
    }

    return(
        <div className={StyleItem.Item}>
            <div>
                <h3>{code || "-"}</h3>
                <p>{name || "ไม่ระบุชื่อ"}</p>
            </div>
            <div className={StyleItem.shift}>
                <h4 className={StyleItem[addStatus()]}>{quantity || 0}</h4>
                { type === "LowStock" ? <p>จุดแจ้งเตือน: {minStock || 0}</p> : <p>วันหมดอายุ: {expired || "-"}</p>}
            </div>
        </div>
    )
}