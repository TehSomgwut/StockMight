import React, { useRef } from 'react';
import menuStyles from './Menu.module.css';
import gsap from 'gsap';
import { Route, Link } from 'react-router-dom'

export default function Menu({ src, alt, text, selectedRef, index, onSelect, linkTo, active }) {
    const menuRef = useRef(null);

    const textColor = active ? "white" : "black";
    const imageStyle = {
        filter: active ? "brightness(0) invert(1)" : "none",
        transition: "filter 0.3s ease" // เพิ่มความนุ่มนวลตอนเปลี่ยนสี
    };

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
                className={`${menuStyles["menu-container"]} ${active ? menuStyles.active : ''}`}
            >
                <img className={menuStyles["menus-icon"]} src={src} alt={alt} style={imageStyle} />
                <p className={menuStyles["text-black"]} style={{ color: textColor }}>{text}</p>
            </div>
        </Link>
    );
}