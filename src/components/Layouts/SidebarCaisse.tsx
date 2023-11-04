import PerfectScrollbar from 'react-perfect-scrollbar';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { toggleSidebar } from '../../store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { IRootState } from '../../store';
import { useState, useEffect } from 'react';
import { BanknotesIcon, BuildingLibraryIcon, BuildingStorefrontIcon, CogIcon, CurrencyDollarIcon, NewspaperIcon, QueueListIcon, ShoppingCartIcon, TableCellsIcon, UserGroupIcon, UserIcon, WindowIcon } from '@heroicons/react/24/outline';

const SidebarCaisse = () => {
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const location = useLocation();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <div className={semidark ? 'dark' : ''}>
            <nav
                className={`sidebar fixed min-h-screen h-full top-0 bottom-0 w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] z-50 transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}
            >
                <div style={{backgroundColor:"#007fff"}} className="bg-white dark:bg-black h-full">
                    <div className="flex justify-between items-center pl-2">
                        <NavLink to="/" className="main-logo flex items-center shrink-0">
                            <img className="w-12 ml-[5px] flex-none" src="/assets/images/logo_chifa.png" alt="logo" />
                            <span className="text-xl ltr:ml-1.5 rtl:mr-1.5 font-bold align-middle lg:inline dark:text-white-light">{t('CHIFAA')}</span>
                        </NavLink>

                        <button
                            type="button"
                            className="collapse-icon w-8 h-8 rounded-full flex items-center hover:bg-gray-500/10 dark:hover:bg-dark-light/10 dark:text-white-light transition duration-300 rtl:rotate-180"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 m-auto">
                                <path d="M13 19L7 12L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path opacity="0.5" d="M16.9998 19L10.9998 12L16.9998 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                    <PerfectScrollbar className="h-[calc(100vh-80px)] relative">
                        <ul className="relative font-semibold space-y-0.5 p-4 py-0">
                            <li className="menu  nav-item">
                            <NavLink to="/dashboard">
                                {/* <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}> */}
                                    <div className="flex items-center">
                                        <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                opacity="0.5"
                                                d="M2 12.2039C2 9.91549 2 8.77128 2.5192 7.82274C3.0384 6.87421 3.98695 6.28551 5.88403 5.10813L7.88403 3.86687C9.88939 2.62229 10.8921 2 12 2C13.1079 2 14.1106 2.62229 16.116 3.86687L18.116 5.10812C20.0131 6.28551 20.9616 6.87421 21.4808 7.82274C22 8.77128 22 9.91549 22 12.2039V13.725C22 17.6258 22 19.5763 20.8284 20.7881C19.6569 22 17.7712 22 14 22H10C6.22876 22 4.34315 22 3.17157 20.7881C2 19.5763 2 17.6258 2 13.725V12.2039Z"
                                                fill="currentColor"
                                            />
                                            <path
                                                d="M9 17.25C8.58579 17.25 8.25 17.5858 8.25 18C8.25 18.4142 8.58579 18.75 9 18.75H15C15.4142 18.75 15.75 18.4142 15.75 18C15.75 17.5858 15.4142 17.25 15 17.25H9Z"
                                                fill="currentColor"
                                            />
                                        </svg>
                                        <span className="ltr:pl-3 rtl:pr-3 text-white dark:text-white dark:group-hover:text-white">{t('Accueil')}</span>
                                    </div>

                                    {/* <div className={currentMenu === 'dashboard' ? 'rotate-90' : 'rtl:rotate-180'}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9 5L15 12L9 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div> */}
                                  {/* </button> */}
                                </NavLink>
                            </li>

                            {/* <h2 className="py-3 px-7 flex items-center uppercase font-extrabold bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] -mx-4 mb-1">
                                <svg className="w-4 h-5 flex-none hidden" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                </svg>
                                <span>{t('apps')}</span>
                            </h2> */}

                            <li className="nav-item">
                                <ul>
                                   
                                    
                                    {/* <li className="nav-item">
                                        <NavLink to="/apps/scrumboard" className="group">
                                            <div className="flex items-center">
                                                <svg className="group-hover:!text-primary" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        opacity="0.5"
                                                        d="M21 15.9983V9.99826C21 7.16983 21 5.75562 20.1213 4.87694C19.3529 4.10856 18.175 4.01211 16 4H8C5.82497 4.01211 4.64706 4.10856 3.87868 4.87694C3 5.75562 3 7.16983 3 9.99826V15.9983C3 18.8267 3 20.2409 3.87868 21.1196C4.75736 21.9983 6.17157 21.9983 9 21.9983H15C17.8284 21.9983 19.2426 21.9983 20.1213 21.1196C21 20.2409 21 18.8267 21 15.9983Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        d="M8 3.5C8 2.67157 8.67157 2 9.5 2H14.5C15.3284 2 16 2.67157 16 3.5V4.5C16 5.32843 15.3284 6 14.5 6H9.5C8.67157 6 8 5.32843 8 4.5V3.5Z"
                                                        fill="currentColor"
                                                    />
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M12 9.25C12.4142 9.25 12.75 9.58579 12.75 10V12.25L15 12.25C15.4142 12.25 15.75 12.5858 15.75 13C15.75 13.4142 15.4142 13.75 15 13.75L12.75 13.75L12.75 16C12.75 16.4142 12.4142 16.75 12 16.75C11.5858 16.75 11.25 16.4142 11.25 16L11.25 13.75H9C8.58579 13.75 8.25 13.4142 8.25 13C8.25 12.5858 8.58579 12.25 9 12.25L11.25 12.25L11.25 10C11.25 9.58579 11.5858 9.25 12 9.25Z"
                                                        fill="currentColor"
                                                    />
                                                </svg>
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-[#506690] dark:group-hover:text-white-dark">{t('scrumboard')}</span>
                                            </div>
                                        </NavLink>
                                    </li> */}
                                  
                                   
                                    <li className="nav-item">
                                        <NavLink to="/apps/caisse" className="group">
                                            <div className="flex items-center">
                                               <ShoppingCartIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Caisse')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/pharmacie" className="group">
                                            <div className="flex items-center">
                                               <WindowIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Pharmacie')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/situation" className="group">
                                            <div className="flex items-center">
                                               <NewspaperIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Situation')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/service" className="group">
                                            <div className="flex items-center">
                                            <BanknotesIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Service')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/type-service" className="group">
                                            <div className="flex items-center">
                                            <QueueListIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Type Service')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/docteur" className="group">
                                            <div className="flex items-center">
                                            <UserIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Docteur')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/apps/depense" className="group">
                                            <div className="flex items-center">
                                               <BuildingLibraryIcon strokeWidth={2} className="h-6 w-6 hover text-info " />
                                                <span className="ltr:pl-3 rtl:pr-3 text-black dark:text-white dark:group-hover:text-white">{t('Depense')}</span>
                                            </div>
                                        </NavLink>
                                    </li>
                                   

                                </ul>
                            </li>

                            
                        </ul>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default SidebarCaisse;
