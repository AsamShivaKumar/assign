
export default function Notification(props: {msg: string}){
    return (
        <div className="w-[280px] px-[20px] py-[10px] border-[2px] text-red-300 whitespace-pre-wrap border-red-300 absolute top-[20px] right-[20px] bg-slate-500 rounded-md">
            {props.msg}
        </div>
    )
}