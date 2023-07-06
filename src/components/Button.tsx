
export default function Button(props: {name: string, submit?: Boolean, onClick?: any}){

    return (
        <input 
           type="submit"
           value={props.name}
           className="transition-all duration-700 cursor-pointer border-blue-600 border-2 bg-blue-600 text-white px-[20px] py-[5px] rounded-full hover:bg-white hover:text-blue-600"
           onClick={props.onClick? evt => props.onClick(evt): undefined}
        />
    )
}