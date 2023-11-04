import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import Select from 'react-select';
import { Typography } from "@material-tailwind/react";

const TypeServiceItem:FunctionComponent<BtnProps> = ({data,loading,handleValidate}) => {
    const [params, setParams] = useState<any>({});
    const [search, setSearch] = useState<any>('');
    const [current, setCurrent] = useState<any>(false);

    const total=()=>{
        let tot=0
        for(var i=0;i<data?.length;i++){
            tot+=data[i].value?.prix
        }
        return tot
    }
    

   const services=["Consulatation Adulte","Consultation enfant"]
  
    return (
        <div className=" w-full pb-9">
                
                {data.map((contact: any,id:number) => {
                    return (
                        <div key={id} className={`flex flex-row w-full justify-between items-center h-8 bg-gray-100 mt-1 p-2 rounded`}>
                            <div className="flex w-max uppercase">
                                    <div>{contact.label}</div>
                            </div>
                            <div className="flex items-center w-max">
                                    <strong style={{color:"blue"}} className="text-bleu">{contact.value?.prix.toLocaleString()+" FCFA"}</strong>
                            </div>
                        </div>
                    );
                })}
             {data?.length!==0 &&(<div className="flex flex-row justify-between mt-2">
               {loading?<button type="button" className="btn btn-primary btn-md ml-1">
                                            <span className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></span>
                                            Envoie...
                                        </button>: 
                    <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={()=>handleValidate()}>
                           Créer
                    </button>}
                    <div className="flex flex-row justify-end items-center bg-gray-200 rounded p-1 " >
                        TOTAL: <strong> {" "+total().toLocaleString()}</strong>
                    </div>
             </div>)}
        </div>
    )

}

export default TypeServiceItem;

interface BtnProps {
    // open: boolean;
    // setOpen: any;
    loading:boolean;
    handleValidate?: any;
    data?:any
    
}