import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import Select from 'react-select';
import { Typography } from "@material-tailwind/react";
import { getData } from "../../../Methodes";
import TypeServiceItem from "../Lists/TypeServiceList";
import { DOCTEUR_URL } from "../../../store/constants";

const FactureForm:FunctionComponent<BtnProps> = ({service_list,loading,handleSave,title}) => {
    const [params, setParams] = useState<any>({montant:0,remise:0,module_id:title?.id});
    const [data, setData] = useState<any>([]);
    const [medecins, setMedecins] = useState<any>([]);

    const services=[
        {label:"Consultation enfant",value:5000},
        {label:"Consultation adulte",value:7000},
    ]
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const generateRandomString = () => {
        return Math.floor(Math.random() * Date.now()).toString(36);
    }

    const getContact=async()=>{
        const { data } = await getData(DOCTEUR_URL);
        // setFilteredItemsInit(data?.result)
        setMedecins(data?.data?.medecins?.map((val:any)=>({label:val?.nom+" "+val?.prenom,value:val?.id})))
    }

    const handleService=(e:any)=>{
        setData(e)
        setParams({...params,type_services:e?.map((el:any)=>({type_service_id:el?.value?.id}))})
    }

    useEffect(() => {
        // getContact()
        setMedecins(title.medecins?.map((val:any)=>({label:val?.nom+" "+val?.prenom,value:val?.id})))
        setParams({...params,ref:"Fact-"+generateRandomString()})
     }, []);
    
  
    return (
        
            <div className="p-5 w-full">
                     <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                        <div style={{color:"#ff8041"}} className="uppercase underline flex justify-center text-center">{ 'Nouvelle Facture '+title.nom}</div>
                     </div>
                <form>
                    <div className="flex flex-row w-full">
                        <div className="mb-5 w-full mr-2">
                            <label htmlFor="name">Ref</label>
                            <input id="ref" type="text" placeholder="Ref" className="form-input" value={params.ref} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="name">Medecin</label>
                            <Select  className="focus:border-[#ff8041]" placeholder="Choisir le medecin" onChange={(e:any)=>{setParams({...params,medecin_id:e.value})}} options={medecins}  isSearchable={true}/>
                        </div>
                    </div>
                    <div className="flex flex-row w-full">
                        <div className="mb-5 w-full mr-2">
                            <label htmlFor="name">Nom complet du patient</label>
                            <input id="nom_complet" type="text" placeholder="Entrer le nom complet du patient" className="form-input" value={params.nom_complet} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5 w-full">
                            <label htmlFor="name">Téléphone</label>
                            <input id="adresse" type="text" placeholder="Entrer le téléphone du patient" className="form-input" value={params.adresse} onChange={(e) => changeValue(e)} />
                        </div>
                    </div>
                    <div className="flex flex-row w-full">
                        
                        <div className="mb-5 w-[49.5%]">
                            <label htmlFor="name">Remise</label>
                            <input id="remise" type="number" placeholder="Entrer la remise" className="form-input" value={params.remise} onChange={(e) => changeValue(e)} />
                        </div>
                       
                    </div>
                    <div className="mb-5 w-full">
                            <Select  className="focus:border-[#ff8041]" placeholder="Choisir le/les type(s) de service" onChange={(e:any)=>handleService(e)} options={service_list} isMulti isSearchable={true}/>
                    </div>
                    <div className="mt-1">
                        <TypeServiceItem loading={loading} handleValidate={()=>handleSave(params)} data={data}/>
                    </div>
                
                </form>
            </div>
            
    )

}

export default FactureForm;

interface BtnProps {
    // open: boolean;
    service_list: any;
    handleSave:any;
    title:any;
    loading:boolean
    
}