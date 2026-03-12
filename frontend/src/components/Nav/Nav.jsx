import navStyles from './Nav.module.css';
export default function Nav() {
    return (
        <nav className={navStyles.nav}>
            <div className={navStyles.logo}>
                <img className={navStyles.logo} src="\Icon\Navigator\StockMight_Color_Hor.svg" alt="logo" />
                <img className={navStyles.back} src="\Icon\Navigator\Icon-18.svg" alt="back" onClick={() => window.history.back()} />
            </div>

{/* แจ็คขอเพิ่มประกาศไว้ตรงนี้เพื่อปลุก Backend */}
        <div className={navStyles.announcement}>
                <span className={navStyles.announcements}>ประกาศ: </span>
                <span>หากไม่มีข้อมูลแสดงผล </span>
                <a href="https://stockmight-backend.onrender.com/" target="_blank" rel="noopener noreferrer">
                    "คลิกที่นี่เพื่อเริ่มการทำงานของเซิร์ฟเวอร์"</a>
                <span> ให้ "API Working" พร้อมทำงาน</span>
            </div>

            <div className={navStyles.date}>
                <img src="\Icon\Navigator\Icon-7.svg" alt="bell" className={navStyles.bell} />
                <p>{ new Date().toLocaleDateString('th-TH', {year: 'numeric',month: 'long',day: 'numeric' })}</p>
            </div>
        </nav>
    )
}