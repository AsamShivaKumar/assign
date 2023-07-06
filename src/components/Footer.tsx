import { nextSlide, prevSlide } from "../redux/slices/sliderSlice";
import {useDispatch} from "react-redux";


export default function Footer(props: {saveData?: Function, submit?: Function}){

    const dispatch = useDispatch();

    function navigate(next: boolean){
        let bool = false;
        if(props.saveData) bool = props.saveData();
        if(next && bool) dispatch(nextSlide({}));
        else if(!next) dispatch(prevSlide({}))
    }

    return (
        <div className="w-[60vw] sm:w-[312px] flex flex-row justify-between absolute bottom-[0] items-center">
            <i className="fi fi-sr-angle-circle-left text-[3rem] cursor-pointer text-blue-600" onClick={() => navigate(false)}></i>
            {props.submit && <button className="h-[40px] transition-all duration-700 cursor-pointer border-blue-600 border-2 bg-blue-600 text-white px-[30px] py-[0] rounded-full hover:bg-white hover:text-blue-600" onClick={() => props.submit? props.submit():null}>Submit</button>}
            <i className="fi fi-sr-angle-circle-right text-[3rem] cursor-pointer text-blue-600" onClick={() => navigate(true)}></i>
        </div>
    )
}