import styleP from './Product.module.css';
import { useState, useEffect } from 'react';
import DeleteComponent from '../../../components/DeleteComponent/DeleteComponent';
import { Link } from 'react-router-dom';

export default function Product({ name, image, metric, code, category, quantity, minStock, status, _id }) {
    const [isShow, setIsShow] = useState(false);
    const [stockStatus, setStockStatus] = useState("-");

    // 1. renderStatus: ย้าย Logic มาไว้ข้างบนให้ดูง่าย
    const renderStatus = () => {
        switch (status) {
            case "active": return <div className={styleP.pending}>ใช้งาน</div>;
            case "inactive": return <div className={styleP["not-pending"]}>ไม่ใช้งาน</div>;
            default: return <div>{status}</div>;
        }
    };

    // 2. onConfirm: ฟังก์ชันลบสินค้า
    async function onConfirm() {
        try {
            const res = await fetch(`http://localhost:3000/api/product/${_id}`, { method: 'DELETE' });
            if (res.ok) {
                setIsShow(false);
                // แนะนำ: ควรมี callback เพื่อบอกตัวแม่ให้ดึงข้อมูลใหม่หลังจากลบสำเร็จ
            }
        } catch {
            alert("เกิดข้อผิดพลาด");
            setIsShow(false);
        }
    }

    // 3. useEffect: เหลือแค่การคำนวณสถานะสต็อก (ไม่ต้อง Fetch ข้อมูลใหม่แล้ว)
    useEffect(() => {
        if (quantity < minStock) {
            setStockStatus("ต่ำกว่าจุดสั่งซื้อ");
        } else {
            setStockStatus("ปกติ");
        }
    }, [quantity, minStock]); // รันใหม่เมื่อตัวเลขเปลี่ยน

    return (
        <div className={styleP.Product}>
            <div className={styleP["product-name"]}>
                {/* เช็ค Path รูปภาพ */}
                <img 
                    src={image && image !== "/" ? `http://localhost:3000${image}` : '/Icon/2-Inventory/Icon.svg'} 
                    alt={name} 
                />
                <div>
                    <h5>{name}</h5>
                    {/* ดึงชื่อจาก Object metric ที่ populate มาแล้ว */}
                    <p>{metric?.name || "-"}</p> 
                </div>
            </div>

            <p style={{ color: 'var(--gray)' }}>{code}</p>

            {/* ดึงชื่อจาก Object category ที่ populate มาแล้ว */}
            <p style={{ color: 'var(--gray)' }}>{category?.name || "-"}</p>

            <p style={quantity === 0 ? { color: 'var(--danger)' } : { color: 'var(--gray)' }}>
                {quantity}
            </p>

            {/* แสดงสถานะสต็อก */}
            {stockStatus === "ปกติ" ? (
                <div className={`${styleP.normal}`}>
                    <img src="/Icon/2-Inventory/Vector.svg" alt="normal" />
                    <p className={styleP.normal}>ปกติ</p>
                </div>
            ) : (
                <div className={`${styleP.low}`}>
                    <img src="/Icon/2-Inventory/Icon.svg" alt="low" />
                    <p className={styleP.low}>ต่ำกว่าจุดสั่งซื้อ</p>
                </div>
            )}

            {renderStatus()}

            <div className={styleP.manage}>
                <Link to={`${_id}`}>
                    <img style={{ cursor: 'pointer' }} src="/Icon/2-Inventory/Icon-2.svg" alt="edit" />
                </Link>
                <img 
                    style={{ cursor: 'pointer' }} 
                    onClick={() => setIsShow(true)} 
                    src="/Icon/2-Inventory/Icon-1.svg" 
                    alt="delete" 
                />
            </div>

            {/* ส่งข้อมูลเข้า DeleteComponent โดยใช้ Props ที่รับมาได้เลย ไม่ต้องรอ State supply */}
            <DeleteComponent 
                isShow={isShow} 
                setIsShow={setIsShow} 
                h3={"ยืนยันการลบสินค้า"} 
                p={`คุณต้องการลบสินค้า ${name} (${code}) หรือไม่`} 
                onConfirm={onConfirm} 
            />
        </div>
    );
}