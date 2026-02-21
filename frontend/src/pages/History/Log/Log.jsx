import StyleLog from './Log.module.css'

export default function Log({date, manager: {name, role}, type, product: {productID, pname}, amount, stock, remain, note: {noteName, noteDescription}}) {
    const thaiDate = date.toLocaleDateString('th-TH', {
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
            <p className={StyleLog.normalText}>{name} | {role}</p>
            <p className={type=="รับเข้า" ? StyleLog["import-type"] : StyleLog["export-type"]}>{type}</p>
            <div>
                <p className={StyleLog.productID}>{productID}</p>
                <p className={StyleLog.normalText}>{pname}</p>
            </div>
            <p className={type=="รับเข้า" ? StyleLog["import-amount"] : StyleLog["export-amount"]}>{amount}</p>
            <p className={StyleLog.normalText}>{stock}</p>
            <p>{remain}</p>
            <div>
                <p>{noteName}</p>
                <p className={StyleLog.normalText}>{noteDescription}</p>
            </div>
         </div>
    )
}