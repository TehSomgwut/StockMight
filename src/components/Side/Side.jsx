import Menu from './menu/menu';

export default function Side() {
    const data = [
        {
            src:'#',
            alt:'#',
            text:'1'
        },
        {
            src:'#2',
            alt:'#2',
            text:'2'
        },
        {
            src:'#3',
            alt:'#3',
            text:'3'
        }
    ]
    return (
        <aside>
            <div>
                <img src="#" alt="profile"/>
                <div>
                    <p className="username">ผู้ดูแลระบบ</p>
                    <p className="role">ผู้ดูแลระบบ</p>
                </div>
            </div>
            <div className="menus">
                { data.map((item, index)=> {
                    return <Menu key={index} src={item.src} alt={item.alt} text={item.text} />
                })}
            </div>
        </aside>
    )
}