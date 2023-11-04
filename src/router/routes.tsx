import { lazy } from 'react';
import FinanceApescol from '../pages/FinanceApescol';
const Index = lazy(() => import('../pages/Index'));


const User = lazy(() => import('../pages/Apps/User'));
const Depense = lazy(() => import('../pages/Apps/Depense'));
const Caisse = lazy(() => import('../pages/Apps/Caisse'));
const Pharmacie = lazy(() => import('../pages/Apps/Pharmacie'));
const SituationGeneral = lazy(() => import('../pages/Apps/SituationGeneral'));
const Docteur = lazy(() => import('../pages/Apps/Docteur'));
const Service = lazy(() => import('../pages/Apps/Service'));
const TypeService = lazy(() => import('../pages/Apps/TypeService'));


const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoon = lazy(() => import('../pages/Pages/ComingSoon'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const LoginBoxed = lazy(() => import('../pages/Authentication/LoginBoxed'));
const RegisterBoxed = lazy(() => import('../pages/Authentication/RegisterBoxed'));
const UnlockBoxed = lazy(() => import('../pages/Authentication/UnlockBox'));
const RecoverIdBoxed = lazy(() => import('../pages/Authentication/RecoverIdBox'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const RegisterCover = lazy(() => import('../pages/Authentication/RegisterCover'));
const RecoverIdCover = lazy(() => import('../pages/Authentication/RecoverIdCover'));
const UnlockCover = lazy(() => import('../pages/Authentication/UnlockCover'));
const Error = lazy(() => import('../components/Error'));


const routes = [
    // dashboard
    {
        path: '/',
        // element: <Index />,
        element: <LoginBoxed />,
    },
    // {
    //     path: '/index',
    //     element: <Index />,
    // },
    // analytics page
    {
        path: '/dashboard',
        element: <FinanceApescol/>,
    },
   
    {
        path: '/apps/depense',
        element: <Depense />,
    },
    {
        path: '/apps/situation',
        element: <SituationGeneral loadingForm={false} />,
    },
    
    {
        path: '/apps/caisse',
        element: <Caisse />,
    },
    {
        path: '/apps/service',
        element: <Service />,
    },
    {
        path: '/apps/type-service',
        element: <TypeService />,
    },
    {
        path: '/apps/docteur',
        element: <Docteur />,
    },
    {
        path: '/apps/pharmacie',
        element: <Pharmacie />,
    },
    {
        path: '/apps/utilisateur',
        element: <User/>,
    },
   
 
    // Apps page
   
   
    // components page
    

  
 
    
    // Users page
  
    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
  
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon',
        element: <ComingSoon />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    //Authentication
    {
        path: '/auth/boxed-signin',
        element: <LoginBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-signup',
        element: <RegisterBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-lockscreen',
        element: <UnlockBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/boxed-password-reset',
        element: <RecoverIdBoxed />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-login',
        element: <LoginCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-register',
        element: <RegisterCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-lockscreen',
        element: <UnlockCover />,
        layout: 'blank',
    },
    {
        path: '/auth/cover-password-reset',
        element: <RecoverIdCover />,
        layout: 'blank',
    },
    //forms page
   
  
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
