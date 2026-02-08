import { useState } from 'react';
import StyleSwitch from './switch.module.css';

export default function Switch() {
    const [active, setActive] = useState("1")
    return(
        <div className="switch-test-container">
            <p className={active == "1" ? StyleSwitch.active : ""} onClick={() => setActive("1")}>option 1</p>
            <p className={active == "2" ? StyleSwitch.active : ""} onClick={() => setActive("2")}>option 2</p>
            <p className={active == "3" ? StyleSwitch.active : ""} onClick={() => setActive("3")}>option 3</p>
        </div>
    )
}