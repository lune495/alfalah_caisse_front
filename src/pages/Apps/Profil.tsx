import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Btn from '../Components/Buttons/Btn';
import { Typography } from '@material-tailwind/react';
import Select from 'react-select';
import { getData, sendData } from '../../Methodes';

const Profils = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Profil'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);

    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        libelle: '',
        description: '',
        
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([]);

    const [filteredItems, setFilteredItems] = useState<any>([]);

    const groupe=[
        {label:"ADMINISTRATEUR",value:"ADMINISTRATEUR"},
        {label:"SERVICE SCOLARITE",value:"SERVICE_SCOLARITE"},
        {label:"CAISSE",value:"CAISSE"},
        {label:"RESPONSABLE CAISSE",value:"RESPONSABLE_CAISSE"},
    ]

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.nomGroupe.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

    const saveUser = async() => {
        if (!params.nomGroupe) {
            showMessage('Nom obligatoire.', 'error');
            return true;
        }
        let msg=params?.id?"modifié":"ajouté"

            //add user
            await sendData(
                "groupes",
                params,
               )
                .then(async (resp:any)=> {
                   console.log("resp",resp?.data?.result)
                   showMessage(`Profil ${msg} avec succès.`);
                   
                   refreshData(resp?.data?.result)
                })
                .catch((resp:any) => {
                 
                    let violations = resp?.response?.data?.message ;
                 
     
                });
                setAddContactModal(false);
    };

    const getProfil=async()=>{
        const { data } = await getData("groupes");
        console.log("getContact",data)
        setFilteredItems(data?.result)

    }

    const refreshData=(data:any)=>{

        if(params?.id){
            const id: any = filteredItems.findIndex((d: any) => d.id === params.id);
            let old=filteredItems
            old[id]=data
            setFilteredItems(old)
            
        }else{
            setFilteredItems([data,...filteredItems])
        }
    }

    useEffect(() => {
        // getProfil()
     }, []);

    const editUser = (user: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (user) {
            let json1 = JSON.parse(JSON.stringify(user));
            setParams(json1);
        }
        // setAddContactModal(true);
    };

    const deleteUser = (user: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== user.id));
        showMessage('Contact supprimé avec succès.');
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
            <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl">Profils</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <svg className="ltr:mr-2 rtl:ml-2" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10" cy="6" r="4" stroke="currentColor" strokeWidth="1.5" />
                                    <path
                                        opacity="0.5"
                                        d="M18 17.5C18 19.9853 18 22 10 22C2 22 2 19.9853 2 17.5C2 15.0147 5.58172 13 10 13C14.4183 13 18 15.0147 18 17.5Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    />
                                    <path d="M21 10H19M19 10H17M19 10L19 8M19 10L19 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                Ajouter Profil
                            </button>
                        </div>
                       
                       
                    </div>
                    
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-0 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Nom</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((contact: any) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>
                                                <div className="flex items-center w-max">
                                                    <div>{contact.nomGroupe}</div>
                                                </div>
                                            </td>
                                          
                                            <td>
                                                <div className="flex gap-4 items-center justify-center">
                                                    <Btn
                                                     title='Détail'
                                                     color='btn-outline-warning'
                                                     handleAction={()=>editUser(contact)}
                                                    />
                                                    <Btn
                                                     title='Editer'
                                                     handleAction={()=>editUser(contact)}
                                                    />
                                                    <Btn
                                                     title='Supprimer'
                                                     color='btn-outline-danger'
                                                     handleAction={()=>deleteUser(contact)}
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

          
            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel style={{borderWidth:2,borderColor:"#ff8041"}} className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddContactModal(false)}
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
                                    <div className="text-lg font-medium bg-[#fbfbfb] dark:bg-[#121c2c] ltr:pl-5 rtl:pr-5 py-3 ltr:pr-[50px] rtl:pl-[50px]">
                                        {params.id ? 'Modification Profil' : 'Ajout de profil'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                                <div className="mb-5 w-full">
                                                    <label htmlFor="occupation">Nom du groupe</label>
                                                    <Select  className="focus:border-[#ff8041]" placeholder={params?.id?params?.nomGroupe:"Choisir le nom"} onChange={(e:any)=>{setParams({...params,nomGroupe:e?.value})}} options={groupe}  isSearchable={true}/>
                                                </div>
                                            {/* <Typography className="text-lg font-bold text-center mt-1 text-blue-gray-500">
                                                Module(s) accessible(s)
                                            </Typography>
                                            <div style={{height:"1px",borderWidth:1,borderColor:"#ff8041"}}>

                                            </div> */}
                                            <div className="flex flex-row mt-2">
                                                {/* <div className="flex flex-col">
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox"  />
                                                        <span>Module Elève</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox"  />
                                                        <span>Module Classe</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox"  />
                                                        <span>Module Configuration</span>
                                                    </label>
                                                
                                                </div> */}
                                                {/* <div className="flex flex-col ml-5">
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox"  />
                                                        <span>Module Comptabilité</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox"  />
                                                        <span>Module Matière</span>
                                                    </label>
                                                    <label className="inline-flex">
                                                        <input type="checkbox" className="form-checkbox"  />
                                                        <span>Module Utilisateur</span>
                                                    </label>
                                                </div> */}
                                            </div>
                                            <div className="flex justify-end items-center mt-8">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddContactModal(false)}>
                                                    Annuler
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveUser}>
                                                    {params.id ? 'Modifier' : 'Ajouter'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Profils;
