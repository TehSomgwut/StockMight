import StyleItem from './Item.module.css';

export default function Item({ code, name, quantity, minStock, expired, type, EXP }) {
    
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

    // ฟังก์ชันเช็คว่า "เลยวันที่กำหนดหรือยัง"
    const checkIsExpiredAlready = () => {
        if (type !== "LowStock" && EXP) {
            const expDate = new Date(EXP);
            const today = new Date();
            today.setHours(0, 0, 0, 0); 
            
            return expDate.getTime() < today.getTime(); 
        }
        return false;
    }

    const isExpiredAlready = checkIsExpiredAlready();

    return(
        <div className={StyleItem.Item}>
            <div>
                <h3>{code || "-"}</h3>
                <p>{name || "ไม่ระบุชื่อ"}</p>
            </div>
            <div className={StyleItem.shift}>
                <h4 className={StyleItem[addStatus()]}>{quantity || 0}</h4>
                
                {/* 🟢 เช็ค type ว่าเป็นล้างสต๊อก, หมดอายุ หรือ ใกล้หมด */}
                { type === "LowStock" ? (
                    <p>จุดแจ้งเตือน: {minStock || 0}</p> 
                ) : type === "ClearStock" ? (
                    <p style={isExpiredAlready ? { color: 'var(--danger, red)', fontWeight: 'bold' } : {}}>
                        วันล้างสต๊อก: {expired || "-"} {isExpiredAlready && " (เลยกำหนดแล้ว)"}
                    </p>
                ) : (
                    <p style={isExpiredAlready ? { color: 'var(--danger, red)', fontWeight: 'bold' } : {}}>
                        วันหมดอายุ: {expired || "-"} {isExpiredAlready && " (หมดอายุแล้ว)"}
                    </p>
                )}
            </div>
        </div>
    )
}