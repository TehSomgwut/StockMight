import React, { useState, useRef, useLayoutEffect } from 'react';
import Menu from './menu/Menu';
import sideStyles from './Side.module.css';
import gsap from 'gsap';

export default function Side() {
    const [username] = useState("ผู้ดูแลระบบ");
    const [activeIndex, setActiveIndex] = useState(0);
    
    const data = [
        { src: '/Icon/Navigator/Icon-17.svg', alt: 'dashboard', text: 'แดชบอร์ด', linkTo:'/pages/home' },
        { src: '/Icon/Navigator/Icon-16.svg', alt: 'stock', text: 'สินค้าคงคลัง', linkTo:'/pages/inventory' },
        { src: '/Icon/Navigator/Icon-15.svg', alt: 'add-menu', text: 'เพิ่มเมนู', linkTo:'/pages/add-product' },
        { src: '/Icon/Navigator/Icon-15.svg', alt: 'imported-exported', text: 'รับเข้า / เบิกออก', linkTo:'/pages/request' },
        { src: '/Icon/Navigator/Icon-14.svg', alt: 'history', text: 'ประวัติการเคลื่อนไหว', linkTo:'/pages/history' },
        { src: '/Icon/Navigator/Icon-13.svg', alt: 'catagory', text: 'หมวดหมู่สินค้า', linkTo:'/pages/home' },
        { src: '/Icon/Navigator/Icon-12.svg', alt: 'metrics', text: 'หน่วยนับ', linkTo:'/pages/home' },
        { src: '/Icon/Navigator/Icon-11.svg', alt: 'report', text: 'รายงาน', linkTo:'/pages/home' },
        { src: '/Icon/Navigator/Icon-9.svg', alt: 'user-manage', text: 'จัดการผู้ใช้', linkTo:'/pages/home' }
    ];

    const selectedRef = useRef(null);
    const menusContainerRef = useRef(null);

    // ใช้ useLayoutEffect เพื่อคำนวณตำแหน่งทันทีก่อนวาดหน้าจอ ป้องกันหน้าขาว/กระพริบ
    useLayoutEffect(() => {
        if (selectedRef.current && menusContainerRef.current) {
            // ให้ Indicator ไปอยู่ที่เมนูแรก (index 0) ทันทีที่โหลด
            const firstMenu = menusContainerRef.current.children[1]; // children[0] คือตัว selected เอง
            if (firstMenu) {
                gsap.set(selectedRef.current, { y: 0 });
            }
        }
    }, []);

    return (
        <aside className={sideStyles.sidebar}>
            <div>
                <div className={sideStyles["profile-container"]}>
                    <div className={sideStyles["profile-text"]}>
                        {username ? username.slice(0, 1) : "U"}
                    </div>
                    <div>
                        <p className={sideStyles.username}>{username}</p>
                        <p className={sideStyles.role}>ผู้ดูแลระบบ</p>
                    </div>
                </div>

                <div className={sideStyles.menus} ref={menusContainerRef}>
                    {/* ตัวเลื่อนสีแดง (Indicator) */}
                    <div className={sideStyles.selected} ref={selectedRef}>
                        {/* เทคนิคพิเศษ: ใส่ข้อความสีขาวไว้ในกล่องแดง 
                            แล้วเลื่อนสวนทางกับกล่องแดงเพื่อให้ข้อความดูเหมือนอยู่กับที่ */}
                        <div style={{ position: 'relative', height: '100%' }}>
                            {/* ส่วนนี้สามารถเพิ่ม Logic การทำ Masking ได้ถ้าต้องการความเป๊ะของตัวอักษรขาว */}
                        </div>
                    </div>
                    
                    {data.map((item, index) => (
                        <Menu 
                            key={index}
                            {...item}
                            selectedRef={selectedRef}
                            index={index}
                            onSelect={setActiveIndex}
                            active={activeIndex === index}
                        />
                    ))}
                </div>
            </div>

            <div className={sideStyles.exit}>
                <img src="/Icon/Navigator/Icon-8.svg" alt="exit-icon" />
                <p>ออกจากระบบ</p>
            </div>
        </aside>
    );
}