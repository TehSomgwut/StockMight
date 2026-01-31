import menuStyles from './menu.module.css';
import { useRef } from 'react';
import gsap from 'gsap';

export default function Menu(props) {
    const src = props.src
    const alt = props.alt
    const text = props.text
    const selected = props.selected
    const index = props.index
    const active = props.active
    const onSelect = props.onSelect
    const menuRef = useRef(null);
    const menuText = useRef(null);
    const menuIcon = useRef(null);
    function show() {
        console.log(selected.current.offsetTop, menuRef.current.offsetLeft, menuRef.current.offsetTop)
    }

    function move() {
        // move the highlighted selector
        gsap.to(selected.current, {
            y: menuRef.current.offsetTop,
            duration: 0.1,
        })
        // notify parent so it can mark this index as active
        if (typeof onSelect === 'function') onSelect(index)
    }

    const containerClass = `${menuStyles["menu-container"]} ${active ? menuStyles.active : ''}`

    return (
        <div ref={menuRef} onClick={move} className={containerClass}>
            <img ref={menuIcon} className={menuStyles["menus-icon"]} src={src} alt={alt} />
            <p onClick={show} ref={menuText}>{ text }</p>
        </div>
    );
}