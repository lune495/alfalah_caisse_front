import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setDisconnect, setPageTitle } from '../../store/themeConfigSlice';
import Btn from '../Components/Buttons/Btn';
import { getApiUrl, getData, sendData } from '../../Methodes';
import IconBtn from '../Components/Buttons/IconBtn';
import Loader from '../Components/Utils/Loader';
import Select from 'react-select';
import { MODULE_URL, SERVICE_URL, VENTE_URL } from '../../store/constants';
import ServiceList from '../Components/Details/ServiceList';
import DetailFacture from '../Components/Details/DetailFacture';
import { LockClosedIcon, PowerIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../components/Dropdown';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';
import Echo from 'laravel-echo'
import  io from 'socket.io-client'

// window.io=io
// window.Echo=new Echo({broadcaster:'socket.io',host: 'http://45.63.94.164'})


const Pharmacie = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profil'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [detailModal, setDetailModal] = useState<any>(false);
    const [showLoader, setShowLoader] = useState(true);
    const [venteId, setVenteId] = useState<any>();
    const [defaultParams] = useState({});

    const [params, setParams] = useState<any>({});
    const [filteredItemsInit, setFilteredItemsInit] = useState<any>([]);

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([]);

    const navigate = useNavigate();
    
    // const presenceChannel: PusherTypes.PresenceChannel;

    const [filteredItems, setFilteredItems] = useState<any>([]);

   

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.typePaiement.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

  
    useEffect(() => {
        getStatus()
    }, []);



    const changeStatusPaye = async(e:any) => {
       
        console.log("req",e)
            await sendData(
                "api/changestatut/"+e.id,
                {},
               )
                .then(async (resp:any)=> {
                   console.log("resp",resp?.data)
                   showMessage(`Facture payée avec succès.`);
                   
                })
                .catch((resp:any) => {
                 
                    let violations = resp?.response?.data?.message ;
                    console.log("errros",resp)
     
                });
                
                // setAddContactModal(false);
            
    };

    const refreshData=(data:any,isUpdate:boolean=false)=>{
            data.paye=true
            const id: any = filteredItems.findIndex((d: any) => d.id === data.id);
            let old=filteredItems
            old[id]=data
            setFilteredItems(old)
            setFilteredItemsInit(old)
            if(isUpdate){
                changeStatusPaye(data)
            }
            
    }


    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        setAddContactModal(true);
    };

    // useEffect(() => {
    
    //     const NewWebsocket = io(`ws://45.63.94.164:6001`,{
    //         transports: ['websocket'],
    //         reconnectionDelay: 1000,
    //         reconnection:true,
    //      })
        
    //        NewWebsocket.on("connect_error", (err) => { 
    //         console.log("erreur  ",err)
    //       })
    //     NewWebsocket.on('my-event',(e:any)=>{
    //         console.log("event",e)
    //     })
    //     return ()=>{
    //         NewWebsocket.off('my-event')
    //     }
      
	// }, []);
//d138c832a9b86305ed9d
      useEffect(() => {
    const pusher = new Pusher('255b70e78fb686670b01', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('event-pharma', function(data:any) {
    getStatus()
        
    });

    // N'oubliez pas de se désabonner du canal lorsque le composant est démonté
    return () => {
      channel.unbind('event-pharma');
      pusher.unsubscribe('my-channel');
    };
  }, []);


    const handlePrint=(el:any)=>{
        setVenteId(el?.id)
        refreshData(el,true)
        setTimeout(()=>document?.getElementById("pdf")?.click())
    }

    const handleStatut=(el:any)=>{
        refreshData(el,true)
    }

   const handleFilter=(e:any)=>{
    setFilteredItems(filteredItemsInit?.filter((el:any)=>el?.module.nom===e))
   }

    const getStatus=async()=>{
        const { data } = await getData(VENTE_URL);
        console.log("statut",data)
        setFilteredItems(data?.data?.ventes)
        setFilteredItemsInit(data?.data?.ventes)
        setShowLoader(false)
    }

    const CloseCaisse=()=>{
        Swal.fire({
            icon: 'warning',
            title: 'Etes vous sur d\'éffectuer cette tache?',
            text: "Cette action est irreversible\n et vous serai déconnecté après cette action; rassurez-vous d'avoir imprimer votre situation générale.",
            showCancelButton: true,
            confirmButtonText: 'Cloturer ma caisse',
			cancelButtonText: "Annuler",
            showLoaderOnConfirm: true,
            padding: '2em',
            customClass: 'sweet-alerts',
        }).then((result) => {
            if (result.value) {
                // clotureCaisse()
            }
        });
    }


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
        <div>
             {showLoader && (
                    <Loader/>
                )}
                <a id="pdf" style={{display:"none"}} href={getApiUrl()+"/vente/ticket-pdf-pharmacie/"+venteId} target="_blank">pdf link</a>
                <a id="pdf-cloture" style={{display:"none"}} href={getApiUrl()+"/vente/situation-generale-pdf"} target="_blank">pdf link</a>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex">
                    <h2 className="text-xl mt-1">PHARMACIE</h2>
                    {/* <div className="mb-0 ml-5">
                        <Select  placeholder="Filter par service" onChange={(e:any)=>{handleFilter(e?.value)}} options={modules}  isSearchable={true}/>
                    </div> */}
                </div>
                
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    
                    <div className="flex gap-3">
                      
                       
                       
                    </div>
                    {/* <div className="relative">
                        <input type="text" placeholder="Recherche" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-hover">
                            <thead>
                                <tr>
                                <th>Date</th>
                                <th>Ref</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Total</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((val: any) => (
                                     (val?.statut===false &&
                                        (<tr style={!val?.paye?{backgroundColor:"#f7d0c8"}:{backgroundColor:"#ecf5eb"}} key={val.id}>
                                            <td>
                                                <div>
                                                    {val?.created_at?.split(" ")[0]}
                                                </div>
                                                <div>
                                                    {val?.created_at?.split(" ")[1]}
                                                </div>
                                            </td>
                                            <td>{val?.numero}</td>
                                            <td>{val.nom_complet ? val?.nom_complet : "Passager"}</td>
                                           <td>
                                            <div className="dropdown">
                                                <Dropdown
                                                    offset={[0, 5]}
                                                    placement={`${ 'bottom-end'}`}
                                                    btnClassName="align-middle"
                                                    button={
                                                        <span
                                                            className={`badge rounded-full capitalize hover:top-0 hover:text-white ${
                                                                val?.paye === true
                                                                    ? 'text-white bg-success'
                                                                    : val?.paye === false
                                                                    ? 'text-white bg-danger'
                                                                    : ''
                                                            }`}
                                                        >
                                                            {/* {priorities[task.priority]} */}
                                                            {val?.paye?"PAYE":"NON PAYE"}
                                                        </span>
                                                    }
                                                >
                                                    {val?.paye===false && (<ul className="text-sm text-medium">
                                                   
                                                        <li>
                                                            <button
                                                                type="button"
                                                                className="w-full text-success ltr:text-left rtl:text-right"
                                                                onClick={() => handleStatut(val)}
                                                            >
                                                                Confirmer
                                                            </button>
                                                        </li>
                                                        
                                                    </ul>)}
                                                </Dropdown>
                                                </div>
                                           </td>
                                            <td>{val.montant_ttc ? val.montant_ttc.toLocaleString() : val.montant_avec_remise.toLocaleString()}</td>
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                   <IconBtn
                                                        isPrint={true}
                                                        // isInfos={true}
                                                        // handleInfos={(e:any)=>e}
                                                        handlePrint={()=>handlePrint(val)}
                                                   />
                                                 
                                                </div>
                                            </td>
                                        </tr>)
                                    )
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            {detailModal && <DetailFacture data={params}  open={detailModal} setOpen={()=>setDetailModal(false)} />}

        </div>
    );
};

export default Pharmacie;
