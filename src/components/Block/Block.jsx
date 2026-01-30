import { useState } from 'react'
export default function Block(props) {
    const [count, setCount] = useState(0)

    function add() {
        setCount(count+1)
    }

    return(
        <div>
            <div>hello world {props.name}</div>
            <div>Count: {count}</div>
            <button onClick={add}>+1</button>
        </div>
    )
}