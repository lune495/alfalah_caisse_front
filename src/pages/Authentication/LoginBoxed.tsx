import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setApeScolUser, setPageTitle } from '../../store/themeConfigSlice';
import { Typography } from '@material-tailwind/react';
import { sendData } from '../../Methodes';
import Swal from 'sweetalert2';

const LoginBoxed = () => {
    const [params, setParams] = useState<any>({});
    const [user, setUser] = useState<any>({});
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Connexion'));
    });
    const navigate = useNavigate();
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme) === 'dark' ? true : false;
   
    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    useEffect(()=>{
        const el:any=localStorage.getItem("chiffaa_user")
        const userPars=JSON.parse(el)
        setUser(userPars)
        setRedirect(userPars)
    },[])


    const submitForm = async() => {
         if (!params.password || !params.email) {
            showMessage('Veuillez renseigner les champs.', 'error');
            return true;
         }

            //add user
            await sendData(
                "api/login",
                params,
               )
                .then(async (resp:any)=> {
                   console.log("resp",resp?.data)
                  
                        dispatch(setApeScolUser(resp?.data))
                        setRedirect(resp?.data)
                 
                   
                })
                .catch((resp:any) => {
                 
                    let violations = resp?.response?.data?.message ;
                    showMessage('Identifiants incorrectes', 'error')
     
                });
    };

    const setRedirect = (user:any) => {
        if(user?.token){
            navigate("/dashboard")
        }else{
            navigate("/auth/boxed-signin")
        }
        
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
        <div className="flex justify-center  items-center min-h-screen bg-cover bg-center bg-[url('/assets/images/medecin2-opacity.png')] dark:bg-[url('/assets/images/map-dark.svg')]">
            <div className="panel bg-[#fce1a9] sm:w-[480px] m-6 max-w-lg w-full">
                <h2 className="font-bold text-2xl mb-3">CONNEXION</h2>
                <p className="mb-7">Entrer votre Email et Mot de passe</p>
                <div className="space-y-5">
                    <div>
                        <label htmlFor="email">Email</label>
                        <input id="email" type="email" className="form-input" onChange={(e:any)=>changeValue(e)} placeholder="Enter Email" />
                    </div>
                    <div>
                        <label htmlFor="password">Mot de passe</label>
                        <input id="password" type="password" onChange={(e:any)=>changeValue(e)} className="form-input" placeholder="Enter Password" />
                    </div>
                    
                    <button  onClick={submitForm} className="btn btn-primary w-full">
                        SE CONNECTER
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default LoginBoxed;
