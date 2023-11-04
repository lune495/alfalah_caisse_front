import { Link } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../store';
import { setPageTitle } from '../store/themeConfigSlice';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { getData } from '../Methodes';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import Loader from './Components/Utils/Loader';

const FinanceApescol = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Finance'));
    });
    const [params, setParams] = useState<any>({});
    const [annees, setAnnees] = useState<any>([]);
    const [annee, setAnnee] = useState<any>('');
    const [dateTime, setDateTime] = useState<any>({date1:0,date2:0});
    const [showLoader, setShowLoader] = useState(false);

  


     const handleDate1=(e:any)=>{
        const d=new Date(e+"T00:00:00").getTime()
        setDateTime({...dateTime,date1:d})

     }

     const handleDate2=(e:any)=>{
        const d=new Date(e+"T23:59:59").getTime()
        setDateTime({...dateTime,date2:d})

     }

     const handleAnnee=(e:any)=>{
        setAnnee(e.id)
     }

    

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
           
            <div className="fixed m-[-30px] mt-[-80px] justify-center w-full bg-cover bg-center h-[1000px] bg-[url('/assets/images/medecin2.jpg')]">
                <div className="bg-blue-80 ml-5">
                    <div style={{marginTop:80}} className="left-0 text-primary text-2xl">
                    <strong>CHIFAA</strong>  <span>Nous pronons soin </span>
                    </div>
                    <div style={{marginTop:2}} className="left-0 text-primary text-2xl">
                        
                    <span>de votre santé a chaque instant</span> 
                    </div>
                </div>
            </div>
    );
};

export default FinanceApescol;
