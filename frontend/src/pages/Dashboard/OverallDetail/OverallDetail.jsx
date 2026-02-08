import oabStyles from './OverallDetail.module.css'
export default function OverallBlock(props) {
    const {src, text, data} = props
    return (
        <div className={oabStyles.OverallBlock}>
            <div className={oabStyles.detail}>
                <img src={src} alt={text} />
                <p> {text} </p>
                <h3> {data} </h3>
            </div>
            <div className={oabStyles["alert-container"]}> {/* เผื่อม่าแก้ตรง Icon ถ้ามีสถานะใหม่ */}
                {props.alert ? <div className={oabStyles.alert}>
                    <img src={props.alert.src} />
                    <p>{ props.alert.text }</p>
                </div> : <div></div>}
            </div>
        </div>
    )
}