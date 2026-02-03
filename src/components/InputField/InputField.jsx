import StyleInputField from './InputField.module.css'

export default function InputField({name, placeholder, description, isReq, addClass}) {
    
    return (
         <div className={`${StyleInputField["input-field"]} ${addClass}`}>
            <p>{name}</p>
            { isReq ? <input type='text' placeholder={placeholder} required /> : <input type='text' placeholder={placeholder} />  }   
            <p  className={StyleInputField.description}>{description}</p>
         </div>
    )
}