import { Dialog, Transition } from "@headlessui/react";
import { Fragment, FunctionComponent, useEffect, useState } from "react";
import Select from 'react-select';
import { Typography } from "@material-tailwind/react";
import { getApiUrl, getData } from "../../../Methodes";
import ServiceItem from "../ServiceItem";
import FactureForm from "../Forms/FactureForm";
import { MODULE_URL } from "../../../store/constants";
import FactureDuService from "../FactureDuService";
import Swal from "sweetalert2";

const ServiceList:FunctionComponent<BtnProps> = ({open,setOpen,loadingForm,handleNewService,response,handleValidate}) => {
    const [params, setParams] = useState<any>([]);
    const [modules, setModules] = useState<any>([]);
    const [moduleTitle, setModuleTitle] = useState<any>({});
    const [loading, setLoading] = useState<any>(true);

    
 
    const handleDetail = (e: any) => {
        setModuleTitle(e)
        setParams(e?.type_services?.map((val:any)=>({label:val?.nom+"   "+val?.prix,value:val})));
        if(e?.type_services?.length===0){
            showMessage("Ce service n'a pas encore de type de service associé!!!!",'error')
        }
    };

    const getStatus=async()=>{
        const { data } = await getData(MODULE_URL);
        console.log("statut",data)
        setModules(data?.data?.modules)
        setLoading(false)
    }

    const handleNew=()=>{
        handleNewService({})
        setParams([])
    }

    const handlePrint=(service:any)=>{
        // setParams([])
    }

    useEffect(() => {
        getStatus()
     }, []);

     const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };
     
  
  
    return (
        <Transition appear show={open} as={Fragment}>
        <Dialog as="div" open={open} onClose={() => setOpen()} className="relative z-50">
            <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                <div className="fixed inset-0 bg-[black]/60" />
            </Transition.Child>
            <div   className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full  justify-center px-1 py-2">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel style={{borderWidth:2,borderColor:"#ff8041"}} className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-8xl text-black dark:text-white-dark">
                            <button
                                type="button"
                                onClick={() => setOpen()}
                                className="absolute top-4 ltr:right-4 rtl:left-4 text-gray-400 hover:text-gray-800 dark:hover:text-gray-600 outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            {/* <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                            <div style={{color:"#ff8041"}} className="uppercase underline flex justify-center text-center">{ 'Liste des services'}</div>
                            </div> */}
                            
                            {params?.length===0 && (<>
                            { loading?<div className="flex justify-center ml-1">
                                            <div className="animate-spin border-2 border-white border-l-transparent rounded-full w-5 h-5 ltr:mr-4 rtl:ml-4 inline-block align-middle"></div>
                                            Chargement des modules ...
                                        </div>:
                                <div className="mb-2">
                                     <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        <div style={{color:"#ff8041"}} className="uppercase underline flex justify-center text-center">{ 'Liste des services'}</div>
                                    </div>
                                <ServiceItem data={modules} handleCheck={(e:any)=>handleDetail(e)}/>
                                </div>}
                            </>)}

                            {(params?.length!==0 && !response?.id) && (<div className="flex-1 h-full">
                            <button style={{marginBottom:-35}} type="button" className="btn btn-primary mt-1 ltr:ml-4 rtl:mr-4" onClick={()=>handleNew()}>
                                Nouveau service
                            </button>
                                 <FactureForm loading={loadingForm} handleSave={(e:any)=>handleValidate(e)} title={moduleTitle} service_list={params}/>
                            </div>)}
                            {response?.id>=0 && (<div>
                                <FactureDuService handleNew={()=>handleNew()} data={response} handlePrint={(e:any)=>handlePrint(e)} />
                            </div>)}
                          
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
        </Dialog>
    </Transition>
    )

}

export default ServiceList;

interface BtnProps {
    open: boolean;
    setOpen: any;
    response?:any;
    loadingForm:boolean;
    handleValidate?: any;
    handleNewService:any
    
}