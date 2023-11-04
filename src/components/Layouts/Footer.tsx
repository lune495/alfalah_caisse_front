const Footer = () => {
    return (
        <div>
            <p className="dark:text-white-dark text-center ltr:sm:text-left rtl:sm:text-right pt-6">
                © {new Date().getFullYear()}. CHIFAA.
            </p>
        </div>
    );
};

export default Footer;
