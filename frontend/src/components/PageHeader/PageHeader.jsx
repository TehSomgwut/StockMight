import stylePH from './PageHeader.module.css'

export default function PageHeader({header, description}) {
    return (
        <div className={stylePH.header}>
            <h1>{header}</h1>
            <p>{description}</p>
        </div>
    )
}