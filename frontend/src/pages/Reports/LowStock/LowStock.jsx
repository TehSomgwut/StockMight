import StyleLS from './LowStock.module.css'
import Item from './Item/Item'

export default function LowStock({ header: { hName, hDescription, svg }, total, ItemData = [] }) {
    const color = () => {
        if(total < 3) {
            return "safe"
        }
        else if (total <= 5) {
            return 'risky'
        }
        else if (total > 5) {
            return 'danger'
        }
    }
    
    return (
         <div className={StyleLS.LowStock}>
            <header>
                <div>
                    <h2>{hName}</h2>
                    <p>{hDescription}</p>
                </div>
                <div className={StyleLS[color()]}>{svg}</div>
            </header>
            <h1 className={StyleLS[color()]}>{total} รายการ</h1>
            <hr />
            <div className={StyleLS["item-container"]}>
                {ItemData.length > 0 ? (
                    ItemData.map((item, index) => {
                        return <Item key={item._id || index} {...item} />
                    })
                ) : (
                    <p style={{ color: 'var(--gray)', padding: '10px 0', fontSize: '14px' }}>ไม่มีรายการในหมวดหมู่นี้</p>
                )}
            </div>
         </div>
    )
}