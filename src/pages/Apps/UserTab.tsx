import { useState, Fragment, useEffect } from 'react';
import { Dialog, Tab, Transition } from '@headlessui/react';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/themeConfigSlice';
import Profils from './Profil';

import User from './User';

const UserTab = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Utilisateur'));
    });

    const [defaultParams] = useState({
        id: null,
        name: '',
        email: '',
        phone: '',
        role: '',
        location: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));


    const [contactList] = useState<any>([
        {
            id: 1,
            path: 'profile-35.png',
            name: 'Alan Green',
            role: 'Web Developer',
            email: 'alan@mail.com',
            location: 'Boston, USA',
            phone: '+1 202 555 0197',
            posts: 25,
            followers: '5K',
            following: 500,
        },
      
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(contactList);



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
           <div className="panel" id="simple">
                        <div className="mb-5 flex items-center justify-between">
                            <h5 className="text-lg font-semibold dark:text-white-light">Utilisateur</h5>
                           
                        </div>
                        <div className="mb-5">
                            <Tab.Group>
                                <Tab.List className="mt-3 flex flex-wrap border-b border-white-light dark:border-[#191e3a]">
                                    
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                            >
                                                Utilisateur
                                            </button>
                                        )}
                                    </Tab>
                                    <Tab as={Fragment}>
                                        {({ selected }) => (
                                            <button
                                                className={`${selected ? '!border-white-light !border-b-white  text-primary !outline-none dark:!border-[#191e3a] dark:!border-b-black ' : ''}
                                                    dark:hover:border-b-black' -mb-[1px] block border border-transparent p-3.5 py-2 hover:text-primary`}
                                            >
                                                Profil
                                            </button>
                                        )}
                                    </Tab>
                                    
                                </Tab.List>
                                <Tab.Panels>
                                    
                                    <Tab.Panel>
                                        <div className="active pt-5">
                                            
                                            <User/>
                                              
                                        </div>
                                    </Tab.Panel>
                                    <Tab.Panel>
                                        <div className="pt-5">
                                            
                                            <Profils/>
                                              
                                        </div>
                                    </Tab.Panel>
                                    
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
        </div>
    );
};

export default UserTab;
