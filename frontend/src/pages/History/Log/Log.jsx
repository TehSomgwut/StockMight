import StyleLog from './Log.module.css'

export default function Log({ date, user, type, product, quantity, previous, current, note, reason }) {
    const dateObj = new Date(date);
    
    const thaiDate = dateObj.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return (
        <div className={StyleLog.log}>
            <p className={StyleLog.normalText}>{thaiDate}</p>
            <p className={StyleLog.normalText}>{user?.realname || "ไม่ระบุชื่อ"} | {user?.role || "-"}</p>
            <p className={type === "import" ? StyleLog["import-type"] : StyleLog["export-type"]}>{type === "import" ? "รับเข้า" : "เบิกออก"}</p>
            <div>
                <p className={StyleLog.productID}>{product?.code || "N/A"}</p>
                <p className={StyleLog.normalText}>{product?.name}</p>
            </div>
            <p className={type === "import" ? StyleLog["import-amount"] : StyleLog["export-amount"]}>{quantity}</p>
            <p className={StyleLog.normalText}>{previous}</p>
            <p>{current}</p>
            <div>
                <p>{note}</p>
                <p className={StyleLog.normalText}>{reason}</p>
            </div>
        </div>
    );
}