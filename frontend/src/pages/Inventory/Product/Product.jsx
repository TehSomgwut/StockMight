import styleP from './Product.module.css';
import { useState, useEffect } from 'react'


export default function Product({name, image, metric, code, category, quantity, minStock, status}) {
    const renderStatus = () => {
        switch(status) {
            case "active" : return <div className={styleP.pending}>ใช้งาน</div>;
            case "inactive" : return <div className={styleP["not-pending"]}>ไม่ใช้งาน</div>;
            default: return <div>{status}</div>
        }
    }

    const [metricName, setMetricName] = useState(metric)
    const [categoryName, setCategoryName] = useState(category)
    const [ stockStatus, setStockStatus ] = useState("-")
    useEffect(() => {
        async function convert() {
            const Mres = await fetch(`http://localhost:3000/api/metric/${metric}`, {method: "GET"})
            const Mtarget = await Mres.json()
            setMetricName(Mtarget.name)

            const Cres = await fetch(`http://localhost:3000/api/category/${category}`, {method: "GET"})
            const Ctarget = await Cres.json()
            setCategoryName(Ctarget.name)
        }

        function convertStatus() {
            if (quantity < minStock ) {
                setStockStatus("ต่ำกว่าจุดสั่งซื้อ")
            }
            else {
                setStockStatus("ปกติ")
            }
        }

        convert()
        convertStatus()
    }, [])

    return (
        <div className={styleP.Product}>
            <div className={styleP["product-name"]}>
                <img src={image != '/' || !image ? `http://localhost:3000${image}` : '/Icon/2-Inventory/Icon.svg'} alt={name} />
                <div>
                    <h5>{name}</h5>
                    <p>{ metricName ? metricName : "-" }</p>
                </div>
            </div>
            <p style={{color: 'var(--gray)'}}>{code}</p>
            <p style={{color: 'var(--gray)'}}>{categoryName ? categoryName : "-"}</p>
            <p style={{color: 'var(--gray)'}}>{quantity}</p>
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