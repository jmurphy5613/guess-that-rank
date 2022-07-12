import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import ReactGa from 'react-ga';

const Login = () => {

    const router = useRouter();

    useEffect(() => {
        ReactGa.initialize('UA-234221342-1');
        ReactGa.pageview(router.pathname);
    }, [router.isReady]);

    return (
        <div className={styles.root}>
            <div className={styles["button-group"]}>
                <img style={{ height: '50px', marginTop: '1rem' }} src="/logo.png" />
                <h1 className={styles.title}>Login is required</h1>
                <button className={styles.option} onClick={e => {
                    router.push('/api/auth/login');
                }}>Login</button>
            </div>
        </div>
    )
}

export default Login;