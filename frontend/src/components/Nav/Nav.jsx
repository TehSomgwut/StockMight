import navStyles from './Nav.module.css';
export default function Nav() {
    return (
        <nav className={navStyles.nav}>
            <div className={navStyles.logo}>
                <img className={navStyles.logo} src="\Icon\Navigator\StockMight_Color_Hor.svg" alt="logo" />
                <img className={navStyles.back} src="\Icon\Navigator\Icon-18.svg" alt="back" />
            </div>
            <div className={navStyles.date}>
                <img src="\Icon\Navigator\Icon-7.svg" alt="bell" className={navStyles.bell} />
                <p>28 มกราคม 2569</p>
            </div>
        </nav>
    )
}