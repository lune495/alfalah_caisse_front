import { InformationCircleIcon, PencilIcon, PrinterIcon, TrashIcon } from "@heroicons/react/24/outline";
import { FunctionComponent } from "react";

const IconBtn:FunctionComponent<BtnProps> = ({handleDelete,handlePrint,handleInfos,handleUpdate,isPrint,isUpdate,isInfos,isDelete}) => {

    return (
        <div className="flex gap-1 flex:row items-center justify-center">
            {isPrint===true && <PrinterIcon onClick={handlePrint} style={{cursor:"pointer"}} strokeWidth={2} className="h-6 w-6 hover text-grey " />}
            {isUpdate===true && <PencilIcon onClick={handleUpdate} style={{cursor:"pointer"}} strokeWidth={2} className="h-5 w-5 hover text-success " />}
            {isInfos===true && <InformationCircleIcon onClick={handleInfos} style={{cursor:"pointer"}} strokeWidth={2} className="h-6 w-6 hover text-info " />}
            {isDelete===true && <TrashIcon onClick={handleDelete} style={{cursor:"pointer"}} strokeWidth={2} className="h-6 w-6 hover text-danger " />}
        </div>
    )

}

export default IconBtn;

interface BtnProps {
    handleDelete?: any;
    handleUpdate?: any;
    handleInfos?: any;
    handlePrint?:any;
    isPrint?:boolean;
    isUpdate?:boolean;
    isInfos?:boolean;
    isDelete?:boolean;
}