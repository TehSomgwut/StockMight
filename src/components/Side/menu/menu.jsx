export default function menu(props) {
    const src = props.src
    const alt = props.alt
    const text = props.text
    return(
        <div>
            <img src={src} alt={alt} />
            <p>{ text }</p>
        </div>
    )
}