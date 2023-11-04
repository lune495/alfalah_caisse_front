import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import Select from 'react-select';
// import { NumberToLetter } from 'convertir-nombre-lettre';
import { getApiUrl } from "../../Methodes";

const FactureDuService:FunctionComponent<BtnProps> = ({data,handleNew,handlePrint,isDetail=false}) => {

const total=()=>{
    let somm=0
    for(var i=0;i<data?.element_services?.length;i++){
        somm+=data?.element_services[i]?.type_service?.prix
    }

    return somm-(+data.remise)
}

const handlePrint2=()=>{
    document?.getElementById("pdf-fact")?.click()
}
  
    return (
        <div className="p-5 w-full">
            <a id="pdf-fact" style={{display:"none"}} href={getApiUrl()+"/vente/ticket-pdf-service/"+data?.id} target="_blank">pdf link</a>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col items-center justify-center">
                    <img className="w-10 ltr:-ml-1 rtl:-mr-1 inline" src="/assets/images/logo_chifa.png" alt="logo" />
                    <div>CENTRE MEDICO-SOCIAL</div>
                    <div>CHIFAA</div>
                    <div style={{borderWidth:2}} className="h-px w-full border-b border-[#000205] mb-2"></div>
                    <div>No 23 Parcelles Assinies-Unité 24</div>
                    <div>Tel: 33 835 27 58 / Fax: 70 984 53 34</div>
                </div>
                <div>
                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                        <div style={{color:"#ff8041"}} className="uppercase underline flex justify-center text-center">{ 'Facture '+data?.module?.nom}</div>
                     </div>
                </div>
                <div>
                    <div>
                        <strong>Medecin:</strong> <span>{data?.medecin.nom+" "+data?.medecin.prenom}</span>
                    </div>
                    <div>
                        <strong>Date consultation:</strong> <span>{data?.created_at}</span>
                    </div>
                    <div>
                        <strong>Téléphone:</strong> <span>{data?.adresse}</span>
                    </div>
                    <div>
                        <strong>Caissier(e):</strong> <span>{data?.user?.name}</span>
                    </div>
                </div>
            </div>
            {isDetail===false && (<div className="flex flex-row justify-between mt-1">
                <button type="button" className="btn btn-primary " onClick={()=>handleNew()}>
                        Nouveau
                </button>
                <button type="button" className="btn btn-outline-seconadry ltr:ml-4 rtl:mr-4" onClick={()=>handlePrint2()}>
                        Imprimer
                </button>
            </div>)}
            <div className="flex flex-row justify-center mt-[-20px]">
                <div>
                    <div className="flex justify-center text-center"><strong>Facture No</strong></div>
                    <div className="flex justify-center text-center">{data?.ref}</div>
                    <div className="uppercase flex justify-center text-center"> {"Facture "+data?.module.nom}</div>
                </div>
            </div>
            <div>
             <table className="table-striped ">
                <tbody>
                    
                    <tr style={{backgroundColor:"#e0dfdc"}}>
                        <td>
                            <strong>Type de prestation</strong>
                        </td>
                        <td>
                            <strong>Prix</strong>
                        </td>
                          
                    </tr>
                    {data?.element_services?.map((val:any,id:number)=>(
                      <tr >
                         <td>
                            {val?.type_service?.nom}
                         </td>
                         <td>
                             {val?.type_service?.prix?.toLocaleString()}
                         </td>
                           
                      </tr>))
                    }
                    <tr >
                        <td>
                           Remise
                        </td>
                        <td>
                            {data?.remise}
                        </td>
                          
                    </tr>
                    <tr style={{backgroundColor:"#e0dfdc"}}>
                        <td>
                            Somme
                        </td>
                        <td>
                            0
                        </td>
                    </tr>
                    <tr style={{backgroundColor:"#e0dfdc"}}>
                        <td>
                            <strong>Montant Total Facture</strong>
                        </td>
                        <td>
                            <strong>{total()?.toLocaleString()} Fcfa</strong>
                        </td>
                          
                    </tr>
                    
                </tbody>
            </table>
            {/* <div>
                {"Arretée la présente a la somme de "+NumberToLetter(total())+" FCFA"}
            </div> */}
          </div>
        </div>
    )

}

export default FactureDuService;

interface BtnProps {
    data?: any;
    handlePrint?: any;
    handleNew?:any;
    isDetail?:boolean
    
}