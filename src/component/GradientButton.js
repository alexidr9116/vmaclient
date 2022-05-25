export default function GradientButton({ text, className, disabled }) {
    return (
        
        <button className={`${className} rounded-xl  text-white border-0 ${!disabled?` btn bg-gradient-to-b from-green-1 to to-green-2`:'bg-stone-300  '}`} disabled={disabled} >
            {text}
        </button>
    )
}