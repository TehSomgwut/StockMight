import block from './GSAP.module.css';
import gsap from 'gsap';
import { useRef } from 'react';

export default function GsapBlock() {
    const box = useRef(null);
    const text = useRef(null);

    function animation() {
        gsap.to(box.current, {y: 100,
            yoyo: true,
            repeat: 3,
            onComplete: () => {
                console.log(box.current.offsetWidth)
            }
        })
    }

    function toText() {
        gsap.to(box.current, {y: text.current.offsetTop - box.current.offsetHeight / 2,
            duration: 1
        })
    }

    return (
        <div className={block.container}>
            <div onClick={animation} ref={box} className={block.block}></div>
            <h1 ref={text} onClick={toText}>Change Me Please!!</h1>
        </div>
    )
}