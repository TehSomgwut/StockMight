import Menu from './menu/Menu';
import sideStyles from './Side.module.css';
import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function Side() {
    const [username, setUsername] = useState("ผู้ดูแลระบบ")
    const [activeIndex, setActiveIndex] = useState(0)
    let profile = null
    const data = [
        {
            src:'/Icon/Navigator/Icon-17.svg',
            alt:'dashboard',
            text:'แดชบอร์ด'
        },
        {
            src:'/Icon/Navigator/Icon-16.svg',
            alt:'stock',
            text:'สินค้าคงคลัง'
        },
        {
            src:'/Icon/Navigator/Icon-15.svg',
            alt:'imported-exported',
            text:'รับเข้า / เบิกออก'
        },
        {
            src:'/Icon/Navigator/Icon-14.svg',
            alt:'history',
            text:'ประวัติการเคลื่อนไหว'
        },
        {
            src:'/Icon/Navigator/Icon-13.svg',
            alt:'catagory',
            text:'หมวดหมู่สินค้า'
        },
        {
            src:'/Icon/Navigator/Icon-12.svg',
            alt:'metrics',
            text:'หน่วยนับ'
        },
        {
            src:'/Icon/Navigator/Icon-11.svg',
            alt:'report',
            text:'รายงาน'
        },
        {
            src:'/Icon/Navigator/Icon-9.svg',
            alt:'user-manage',
            text:'จัดการผู้ใช้'
        }
    ]
    const selected = useRef(null)
    const menusContainerRef = useRef(null)

    useEffect(() => {
        // Set initial position of the selected indicator to the first menu
        if (menusContainerRef.current && selected.current) {
            const target = menusContainerRef.current.children[1]; // children[0] is the .selected element itself
            if (target) gsap.set(selected.current, { y: target.offsetTop });
        }
    }, [])

    const handleSelect = (index) => {
        setActiveIndex(index)
    }

    return (
        <aside>
            <div>
                <div className={sideStyles["profile-container"]}>
                    { !profile ? <p className={sideStyles["profile-text"]}> {username.slice(0, 1)}</p> : <img className={sideStyles["profile-picture"]} src="profile" alt="profile" />}
                    <div>
                        <p className={sideStyles.username}>ผู้ดูแลระบบ</p>
                        <p className={sideStyles.role}>ผู้ดูแลระบบ</p>
                    </div>
                </div>
                <div className={sideStyles.menus} ref={menusContainerRef}>
                    <div className={sideStyles.selected} ref={selected}></div>
                    { data.map((item, index)=> {
                        return <Menu key={index} src={item.src} alt={item.alt} text={item.text} selected={ selected } index={index} active={ activeIndex === index } onSelect={ handleSelect } />
                    })}
                </div>
            </div>
            <div className={sideStyles.exit}>
                <img src="/Icon/Navigator/Icon-8.svg" alt="exit-icon" />
                <p>ออกจากระบบ</p>
            </div>
        </aside>
    )
}