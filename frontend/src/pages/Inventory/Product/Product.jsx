import styleP from './Product.module.css';


export default function Product({name, src, unit, productID, category, remain, stockStatus, status}) {
    const renderStatus = () => {
        switch(status) {
            case "กำลังใช้งาน" : return <div className={styleP.pending}>กำลังใช้งาน</div>;
            case "ไม่ว่าง" : return <div className={styleP["not-pending"]}>ไม่ว่าง</div>;
            default: return <div>{status}</div>
        }
    }
    return (
        <div className={styleP.Product}>
            <div className={styleP["product-name"]}>
                <img src={src ? src : '/Icon/2-Inventory/Icon.svg'} alt={name} />
                <div>
                    <h5>{name}</h5>
                    <p>{ unit }</p>
                </div>
            </div>
            <p style={{color: 'var(--gray)'}}>{productID}</p>
            <p style={{color: 'var(--gray)'}}>{category}</p>
            <p style={{color: 'var(--gray)'}}>{remain}</p>
            {stockStatus==="ปกติ" ? 
                <div className={`${styleP[stockStatus] || ''} ${styleP.normal}`}>
                    <img src="/Icon/2-Inventory/Vector.svg" />
                    <p className={styleP.normal}>ปกติ</p>
                </div>
            : 

                <div className={`${styleP[stockStatus] || ''} ${styleP.low}`}>
                    <img src="/Icon/2-Inventory/Icon.svg" />
                    <p className={styleP.low}>ต่ำกว่าจุดสั่งซื้อ</p>
                </div>
             }
            {renderStatus()}
            <div className={styleP.manage}>
                <img src="/Icon/2-Inventory/Icon-2.svg" />
                <img src="/Icon/2-Inventory/Icon-1.svg" />
            </div>
        </div>
    )
}