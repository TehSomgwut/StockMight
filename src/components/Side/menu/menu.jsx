import React, { useRef, useEffect } from 'react';
import menuStyles from './Menu.module.css';
import gsap from 'gsap';
import { Route, Link } from 'react-router-dom'

export default function Menu({ src, alt, text, selectedRef, index, onSelect, linkTo }) {
    const menuRef = useRef(null);

    function handleClick() {
        if (selectedRef.current && menuRef.current) {
            // สั่งให้กล่องสีแดง (Indicator) วิ่งมาที่ตำแหน่ง Y ของเมนูนี้
            gsap.to(selectedRef.current, {
                y: menuRef.current.offsetTop - selectedRef.current.offsetHeight/2 + 14,
                duration: 0.15,
            });
            // แจ้ง Component แม่ว่าเลือกเมนูไหน
            onSelect(index);
        }
    }

    return (
        <Link to={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div 
                ref={menuRef} 
                onClick={handleClick} 
                className={menuStyles["menu-container"]}
            >
                {/* เลเยอร์ปกติ (มองเห็นเป็นสีดำบนพื้นขาว) */}
                <img className={menuStyles["menus-icon"]} src={src} alt={alt} />
                <p className={menuStyles["text-black"]}>{text}</p>
            </div>
        </Link>
    );
}