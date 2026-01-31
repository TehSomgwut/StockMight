import React, { useRef } from 'react';
import menuStyles from './Menu.module.css';
import gsap from 'gsap';

export default function Menu({ src, alt, text, selectedRef, index, onSelect }) {
    const menuRef = useRef(null);

    function handleClick() {
        if (selectedRef.current && menuRef.current) {
            // สั่งให้กล่องสีแดง (Indicator) วิ่งมาที่ตำแหน่ง Y ของเมนูนี้
            gsap.to(selectedRef.current, {
                y: menuRef.current.offsetTop,
                duration: 0.4,
                ease: "power2.out"
            });
            // แจ้ง Component แม่ว่าเลือกเมนูไหน
            onSelect(index);
        }
    }

    return (
        <div 
            ref={menuRef} 
            onClick={handleClick} 
            className={menuStyles["menu-container"]}
        >
            {/* เลเยอร์ปกติ (มองเห็นเป็นสีดำบนพื้นขาว) */}
            <img className={menuStyles["menus-icon"]} src={src} alt={alt} />
            <p className={menuStyles["text-black"]}>{text}</p>
        </div>
    );
}