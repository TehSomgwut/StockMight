import StyleInputField from './InputField.module.css'

export default function InputField({ name, placeholder, description, isReq, addClass, onChange, value, formName }) {
    
    const isLong = addClass === StyleInputField.long;
    const InputTag = isLong ? 'textarea' : 'input';

    return (
        <div className={`${StyleInputField["input-field"]} ${addClass}`}>
            <p>{name}</p>
            
            {/* 2. ใช้ Tag ที่เลือกไว้ และใส่ attributes แบบ Dynamic */}
            <InputTag 
                type={isLong ? undefined : 'text'}
                placeholder={placeholder} 
                required={isReq}
                name = { formName ? formName : name }
                onChange= { onChange }
                value = { value }
            />
            
            <p className={StyleInputField.description}>{description}</p>
        </div>
    )
}