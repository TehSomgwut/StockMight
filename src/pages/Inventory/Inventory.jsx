import styleI from './Inventory.module.css';
import Header from '../../components/PageHeader/PageHeader';
import Card from './AllProductCard/Card';
import Product from './Product/Product';
export default function Inventory() {
    const cards = [
        {text: "สินค้าทั้งหมด", value: "7", src:"/Icon/2-Inventory/Icon-7.svg", CN:"blue"},
        {text: "สินค้าใช้งาน", value: "1", src:"/Icon/2-Inventory/Icon-6.svg", CN:"green"},
        {text: "สต๊อกต่ำ", value: "3", src:"/Icon/2-Inventory/Icon.svg", CN: "orange"},
        {text: "หมดสต๊อก", value: "0", src:"/Icon/2-Inventory/Icon-20.svg", CN:"red"}
    ]
    return (
        <div className={styleI["inventory-container"]}>
            <div className={styleI["header-container"]}>
                <Header header="สินค้าคงคลัง" description="จัดการข้อมูลสินค้าทั้งหมด" />
                <button>
                    <img src="/Icon/2-Inventory/Icon-9.svg" />
                    <p>เพิ่มสินค้าใหม่</p>
                </button>
            </div>
            <div className={styleI["card-container"]}>
                {cards.map((item, index) => {
                    return <Card key={index} {...item} />
                })}
            </div>
            <form>
                <label htmlFor='product-search'>
                    <img src="" />
                    <input type='text' id='product-search' name='product-search' placeholder='ค้นหารหัสสินค้า หรือชื่อสินค้า' />
                </label>
                <label htmlFor=".">
                    <img src="" />
                    <select>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
            </form>
            <div className={styleI["product-table"]}>
                <p className={styleI.Thead}>สินค้า</p>
                <p className={styleI.Thead}>รหัสสินค้า</p>
                <p className={styleI.Thead}>หมวดหมู่</p>
                <p className={styleI.Thead}>คงเหลือ</p>
                <p className={styleI.Thead}>สถานะสต๊อก</p>
                <p className={styleI.Thead}>สถานะ</p>
                <p className={styleI.Thead}>จัดการ</p>
            </div>
        </div>
    )
}