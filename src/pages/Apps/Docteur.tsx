import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Btn from '../Components/Buttons/Btn';
import { getData, sendData } from '../../Methodes';
import DropDownAction from '../Components/Buttons/DropDownAction';
import Select from 'react-select';
import IconBtn from '../Components/Buttons/IconBtn';
import Loader from '../Components/Utils/Loader';
import DocteurForm from '../Components/Forms/DocteurForm';
import { DOCTEUR_URL, MODULE_URL } from '../../store/constants';

const Docteur = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contacts'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [showLoader, setShowLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({});


    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));
    const [user, setUser] = useState<any>({});
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([]);
    const [classe, setClasse] = useState<any>([]);
    const [filteredItemsInit, setFilteredItemsInit] = useState<any>([]);
    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    useEffect(()=>{
        const el:any=localStorage.getItem("apescol_user")
        const userPars=JSON.parse(el)
        setUser(userPars)
    },[])

  

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

    const saveUser = async(req:any) => {
        console.log("req",req)
        if (!req.module_id) {
            showMessage('Veuillez lui affecter son service', 'error');
            return true;
        }
        if (!req.nom) {
            showMessage('Nom obligatoire.', 'error');
            return true;
        }
        if (!req.prenom) {
            showMessage('Prenom obligatoire.', 'error');
            return true;
        }
        setLoading(true)
        let msg=req?.id?"modifié":"ajouté"

            //add user
            await sendData(
                "api/medecin",
                req,
               )
                .then(async (resp:any)=> {
                    refreshData(resp?.data?.data?.medecins[0])
                  
                    showMessage(`Docteur ${msg} avec succès.`);
                   console.log("resp",resp?.data)
                   
                   
                })
                .catch((resp:any) => {
                 
                    let violations = resp?.response?.data?.message ;
     
                });
                setAddContactModal(false);
                setLoading(false)
        
    };


    const getContact=async()=>{
        const { data } = await getData(DOCTEUR_URL);
        console.log("getDocteur",data)
        // setFilteredItemsInit(data?.result)
        setFilteredItems(data?.data?.medecins)
        setShowLoader(false)
    }

    useEffect(() => {
        getContact()
     }, []);


    const refreshData=(data:any)=>{
        console.log("update",data,"",params)
        if(params?.id){
            const id: any = filteredItems.findIndex((d: any) => +d.id === +params.id);
            let old=filteredItems
            old[id]=data
            setFilteredItems(old)
            
        }else{
            setFilteredItems([data,...filteredItems])
        }
    }

    const handleFilter=(e:any)=>{
        setFilteredItems(filteredItemsInit?.filter((val:any)=>val?.classe.nom===e))
    }
    

    const editUser = (user: any = {}) => {
        setParams(user);
        setAddContactModal(true);
    };

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('Classe supprimé avec succès.');
    };

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
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">DOCTEUR</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                {/* <div className="mb-0 mr-5">
                        <Select  placeholder="Filter par classe" onChange={(e:any)=>{handleFilter(e?.value)}} options={classe}  isSearchable={true}/>
                </div> */}
                 <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => {setParams({});setAddContactModal(true)}}>
                                <svg className="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Nouveau docteur
                            </button>
                        </div>
                    </div>
                       
                    {/* <div className="relative">
                        <input type="text" placeholder="Search Contacts" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                    </div> */}
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Service</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems?.map((contact: any) => {
                                    return (
                                        <tr style={{backgroundColor:"#e0dfdc"}} key={contact.id}>
                                            <td>
                                              {contact?.nom}
                                            </td>
                                            <td>{contact?.prenom}</td>
                                            <td>{contact?.module?.nom}</td>
                                             <td>
                                                <div className="flex gap-4 items-center justify-start">
                                                    <IconBtn
                                                        isUpdate={true}
                                                        // isDelete={true}
                                                        // handleDelete={()=>deleteUser(contact)}
                                                        handleUpdate={()=>editUser(contact)}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            {addContactModal && <DocteurForm loading={loading} data={params} open={addContactModal} setOpen={()=>{setAddContactModal(false);setParams({})}} handleValidate={(e:any)=>saveUser(e)}/>}
        </div>
    );
};

export default Docteur;
