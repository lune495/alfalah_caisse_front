import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import Select from 'react-select';
import { Typography } from "@material-tailwind/react";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const ServiceItem:FunctionComponent<BtnProps> = ({data,handleCheck}) => {
    const [params, setParams] = useState<any>({});
    const [search, setSearch] = useState<any>('');
    const [current, setCurrent] = useState<any>(false);
    const img="Maternite"


    const getImg=(val:string)=>{
        if(("Maternite").toLowerCase().includes(val.toLowerCase())){
          return "Maternite"
        }else if(("Labo").toLowerCase().includes(val.toLowerCase())){
            return "Labo"
        }else if(("Dentaire").toLowerCase().includes(val.toLowerCase())){
            return "Dentaire"
        }else if(("Consultation").toLowerCase().includes(val.toLowerCase())){
            return "Consultation"
        }else if(("Cardiographie").toLowerCase().includes(val.toLowerCase())){
            return "Cardiographie"
        }else if(("Echographie").toLowerCase().includes(val.toLowerCase())){
            return "Echographie"
        }else if(("Ambulance").toLowerCase().includes(val.toLowerCase())){
            return "Ambulance"
        }else if(("Labo2").toLowerCase().includes(val.toLowerCase())){
            return "LABO_2"
        }else if(("Hospitalisation").toLowerCase().includes(val.toLowerCase())){
            return "HOSPITALISATION"
        }else if(("Cardiologie").toLowerCase().includes(val.toLowerCase())){
            return "CARDIOLOGIE"
        }else if(("Consultation specialise").toLowerCase().includes(val.toLowerCase())){
            return "CONSULTATION_SPECIALISE"
        }else if(("Echographie coeur").toLowerCase().includes(val.toLowerCase())){
            return "ECHOGRAPHIE_COEUR"
        }else if(("Oxygene").toLowerCase().includes(val.toLowerCase())){
            return "OXYGENE"
        }else if(("Infirmerie").toLowerCase().includes(val.toLowerCase())){
            return "INFIRMERIE"
        }else{
            return "NAN"
        }
        
    }

    const splits=(text:string)=>{
        const val=text?.split(' ')
        if(val?.length>1){
            return val[0][0].toUpperCase()+""+val[1][0].toUpperCase()
        }

        return val[0][0].toUpperCase()
    }

  
    return (
        <>
          <div className="p-5 w-full flex flex-wrap">
                {data.map((val:any,id:number)=>(<div onClick={()=>handleCheck(val)} key={id} className="uppercase flex justify-center items-center m-1 mb-9 mt-9" style={{height:50,marginBottom:110,width:"18%"}}>
                {getImg(val.nom)!=="NAN"?<div>
                        <Tippy content={val?.nom} placement="top">
                            <img style={{cursor:"pointer",height:150}} className="w-25 ml-[5px] flex-none" src={`/assets/images/${getImg(val.nom)}.jpeg `} alt="logo" />
                        </Tippy>
                        <div className="flex justify-center  items-center"><p className="md:line-clamp-1">{val.nom}</p></div>
                    </div>:
                    <div>
                        <Tippy content={val?.nom} placement="top">
                            <div style={{
                                cursor:"pointer",
                                display:"flex",
                                flexDirection:"row",
                                justifyContent:"center",
                                alignItems:"center",
                                borderRadius:"100%",
                                backgroundColor:"#e6e9f7",
                                height:120,width:120}}>
                                <div style={{fontWeight:'bold',color:'#ff8041',fontSize:45}}>{splits(val?.nom)}</div>
                            </div>
                        </Tippy>
                        <div className="flex justify-center  items-center"><p className="md:line-clamp-1">{val.nom}</p></div>
                    </div>
                }
                </div>))}
            </div>
            
        </>
    )

}

export default ServiceItem;

interface BtnProps {
    // open: boolean;
    data: any;
    handleCheck?: any;
    
}