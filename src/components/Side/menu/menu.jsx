import menuStyles from './menu.module.css'

export default function menu(props) {
    const src = props.src
    const alt = props.alt
    const text = props.text
    return(
        <div className={menuStyles["menu-container"]}>
            <img className={menuStyles["menus-icon"]} src={src} alt={alt} />
            <p>{ text }</p>
        </div>
    )
}