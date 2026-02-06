import LowStockStyles from './LowStock.module.css';
import Item from './Item/Item';

export default function LowStock() {
    const data = [
        {SKU: "ELC-002", name: "หมึกพิมพ์ Cannon 810 สีดำ", remain: "5", danger: 15, status: {src: '/Icon/1-Home/Icon.svg', text: "ใกล้หมด"}},
        {SKU: "OFF-001", name: "กระดาษ A4 Double A 80 แกรม", remain: "3", danger: 8, status: {src: '/Icon/1-Home/Icon.svg', text: "ใกล้หมด"}},
        {SKU: "MAT-001", name: "ปูนซีเมนตราช้าง", remain: "150", danger: 200, status: {src: '/Icon/1-Home/Icon.svg', text: "ใกล้หมด"}}
    ]
    return (
        <div className={LowStockStyles["low-stock"]}>
            <div className={LowStockStyles.status}>
                <h2>รายการใกล้หมด</h2>
                <p>3 รายการ</p>
            </div>
            <div className={LowStockStyles.table}>
                <div className={LowStockStyles.Thead}>

                </div>
                <p>SKU</p>
                <p>ชื่อสินค้า</p>
                <p>คงเหลือ</p>
                <p>จุดแจ้งเตือน</p>
                <p>สถานะ</p>
                {data ? data.map((item, index) => {
                    return <Item key={index}
                    {...item} />
                }) : <p>ไม่พบข้อมูล</p>}
            </div>
        </div>
    )
}