import dbStyles from './Dashboard.module.css';
import Detail from './OverallDetail/OverallDetail';

export default function Dashboard() {
    const dashboardData = [
        {
            src: '/Icon/1-Home/Icon-6.svg',
            text: "จำนวนรายการสินค้า (SKU)",
            data: "7"
        },
        {
            src: '/Icon/1-Home/Icon-5.svg',
            text: "จำนวนคงเหลือรวม",
            data: "218 หน่วย"
        },
        {
            src: '/Icon/1-Home/Icon-4.svg',
            text: "รายการใกล้หมด",
            data: "3",
            alert: null
        },
        {
            src: '/Icon/1-Home/Icon-2.svg',
            text: "จำนวนรายใกล้หมดอายุ (30 วัน)",
            data: "0"
        },
        {
            src: '/Icon/1-Home/Icon-1.svg',
            text: "รับเข้าสินค้าวันนี้",
            data: "5 หน่วย"
        },
        {
            src: '/Icon/1-Home/Icon-10.svg',
            text: "เบิกออกสินค้าวันนี้",
            data: "2 หน่วย"
        },

    ]
    return (
        <div className={dbStyles.Dashboard}>
            <div>
                <h1>แดชบอร์ดคลังสินค้า</h1>
                <p>ภาพรวมและสถิติการจัดการคลังสินค้า</p>
            </div>
            <div className={dbStyles["overall-container"]}>
                {
                    dashboardData.map((item, index) => {
                        return <Detail key={index} src={item.src} text={item.text} data={item.data} alert={item.alert} />
                    })
                }
            </div>
        </div>
    )
}