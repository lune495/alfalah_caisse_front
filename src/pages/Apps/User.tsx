import { useState, Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Btn from '../Components/Buttons/Btn';
import { getData, sendData } from '../../Methodes';
import DropDownAction from '../Components/Buttons/DropDownAction';
import Select from 'react-select';
import DropdownFilter from '../Components/Buttons/DropDownFilter';
import { Typography } from '@material-tailwind/react';
import IconBtn from '../Components/Buttons/IconBtn';
import Loader from '../Components/Utils/Loader';
import { USER_URL } from '../../store/constants';

const User = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Utilisateur'));
    });
    const [addContactModal, setAddContactModal] = useState<any>(false);
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState<any>('list');
    const [profil, setProfil] = useState<any>([]);
    const [defaultParams] = useState({});

    const options5 = [
        { value: 'Comptable', label: 'Comptable' },
        { value: 'Reception', label: 'Reception' },
        { value: 'Administreur', label: 'Administreur' },
        
    ];

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        if(id==="password"){
            setParams({ ...params, [id]: value,password_confirmation: value });

        }else{
            setParams({ ...params, [id]: value });
        }
    };
    const [showLoader, setShowLoader] = useState(false);
    const [search, setSearch] = useState<any>('');
    const [contactList] = useState<any>([]);

    const roles=[{label:"Administrateur",value:1},{label:"Caissier",value:2}]

    const [filteredItems, setFilteredItems] = useState<any>(contactList);

    useEffect(() => {
        setFilteredItems(() => {
            return contactList.filter((item: any) => {
                return item.nom.toLowerCase().includes(search.toLowerCase());
            });
        });
    }, [search, contactList]);

    const saveUser = async() => {
        if (!params.name ) {
            showMessage('Nom obligatoire.', 'error');
            return true;
        }
        if (!params.email) {
            showMessage('Email obligatoire.', 'error');
            return true;
        }
       

        if (!params.password) {
            showMessage('Mot de passe obligatoire.', 'error');
            return true;
        }

            await sendData(
                "api/register",
                params,
               )
                .then(async (resp:any)=> {
                   console.log("resp",resp?.data?.result)
                   showMessage('Utilisateur ajouté avec succès.');
                   
                   setFilteredItems([resp?.data?.user,...filteredItems])
                })
                .catch((resp:any) => {
                 
                    let violations = resp?.response?.data?.message ;
                 
     
                });
                setAddContactModal(false);
        
    };


    const getContact=async()=>{
        const { data } = await getData(USER_URL);
        console.log("getContact",data)
        setFilteredItems(data?.data?.users)
        setShowLoader(false)
    }

    useEffect(() => {
        getContact()
        // getProfil()
     }, []);
    
  
    const handleFilter=(e:any)=>{
        setParams({ ...params, role_id: e });
    }

    const editUser = (user: any = null) => {
        setParams({role_id:"1"});
        if (user) {
            setParams(user);
        }
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
                <h2 className="text-xl">Utilisateur</h2>
                <div className="flex sm:flex-row flex-col sm:items-center sm:gap-3 gap-4 w-full sm:w-auto">
                  
                    <div className="relative">
                        <input type="text" placeholder="Rechercher utilisateur" className="form-input py-2 ltr:pr-11 rtl:pl-11 peer" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute ltr:right-[11px] rtl:left-[11px] top-1/2 -translate-y-1/2 peer-focus:text-primary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="11.5" cy="11.5" r="9.5" stroke="currentColor" strokeWidth="1.5" opacity="0.5"></circle>
                                <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                            </svg>
                        </button>
                    </div>
                      <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editUser()}>
                                <svg className="w-5 h-5 ltr:mr-2 rtl:ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19"></line>
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                Ajouter Utilisateur
                            </button>
                        </div>
                       
                        
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="mt-5 panel p-0 border-1 flex-1 overflow-hidden">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th className="!text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems?.map((contact: any) => {
                                    return (
                                        <tr key={contact.id}>
                                            <td>
                                            <div className="flex items-center w-max">
                                            <div className="grid place-content-center h-8 w-8 ltr:mr-2 rtl:ml-2 rounded-full bg-primary text-white text-sm font-semibold"></div>
                                                   
                                                    <div>{contact?.name}</div>
                                                </div>
                                            </td>
                                            <td>{contact?.email}</td>
                                            <td>{contact?.role?.nom}</td>
                                            <td>
                                              <div className="flex gap-4 items-center justify-center">
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


            <Transition appear show={addContactModal} as={Fragment}>
                <Dialog as="div" open={addContactModal} onClose={() => setAddContactModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div   className="fixed inset-0 overflow-y-auto">
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
                                <Dialog.Panel style={{borderWidth:2,borderColor:"#ff8041"}} className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-3xl text-black dark:text-white-dark">
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
                                        {params.id ? 'Editer Utilisateur' : 'Ajouter Utilisateur'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                          
                                            <div className="flex flex-row w[100%] mt-5 ">
                                                <div className="mb-5 w-full mr-5">
                                                    <label htmlFor="name">Nom</label>
                                                    <input id="name" type="text" placeholder="Entrer le nom de l'utilisateur" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                                </div>
                                               
                                            </div>
                                            <div className="flex flex-row w[100%] grap-2">
                                                <div className="mb-5 w-full mr-5">
                                                    <label htmlFor="name">Email</label>
                                                    <input id="email" type="text" placeholder="Entrer le email" className="form-input" value={params.email} onChange={(e) => changeValue(e)} />
                                                </div>
                                                
                                            </div>

                                            <div className="mb-0 mr-5">
                                                <label htmlFor="name">Role</label>
                                                <Select  placeholder={params?.id?params?.role?.nom:"Role"} onChange={(e:any)=>{handleFilter(e?.value)}} options={roles}  isSearchable={true}/>
                                            </div>

                                            {/* <div className="flex flex-row w[100%] grap-2 ">
                                                <div className="flex flex-col w[100%] w-full mr-5">
                                                   
                                                    <div className="mb-5 w-full">
                                                            <label htmlFor="occupation">Profil</label>
                                                            <Select  className="focus:border-[#ff8041]" placeholder="Choisir le profil" onChange={(e:any)=>{setParams({...params,groupeID:e?.value})}} options={profil}  isSearchable={true}/>
                                                    </div>
                                                </div>
                                                
                                            </div> */}
                                            {!params?.id && (<>
                                            <Typography className="text-lg font-bold text-center mt-5 text-blue-gray-500">
                                                Mot de passe
                                            </Typography>
                                            <div style={{height:"1px",borderWidth:1,borderColor:"#f7c583"}}>

                                            </div>

                                            <div className="flex flex-col w[100%] mt-5 ">
                                                <div className="mb-5 w-full mr-5">
                                                    <label htmlFor="name">Mot de passe</label>
                                                    <input id="password" type="password" placeholder="Entrer le mot de passe" className="form-input" value={params.password} onChange={(e) => changeValue(e)} />
                                                </div>
                                                
                                            </div>
                                            </>)}
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

export default User;
