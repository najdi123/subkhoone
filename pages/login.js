import Head from 'next/head'
import styles from '../styles/login.module.css'
import Layout from '../components/layout'
import {useState, useEffect} from "react"
import axios from "axios"
import {useRouter} from 'next/router'
import {useCookies} from "react-cookie";



export default function Login() {
    const [userInput, setUserInput] = useState({
        phone_number: '',
        code: ""
    })
    const [step, setStep] = useState(0)
    const [formValue, setFormValue] = useState({
        placeholder: "موبایل",
        name: "phone_number",
        value: userInput.phone_number,
        button: "دریافت کد"
    })
    const [userInfo, setUserInfo] = useState({})

    const handleChange = (e) => {
        setUserInput({...userInput, [e.target.name]: e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStep(prevState => prevState + 1)

        const config = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: 'https://api.subkhoone.com/api/users/one_time_password/new?',
            data: {"phone_number": userInput.phone_number},
        };
        console.log(config)
        try {
            const res = await axios(config)
            console.log("res: ", res);
            setUserInfo({token: res.data.data["temp_token"], user: res.data.data.user})
            setStep(prevState => prevState + 1)
            return res
        } catch (error) {
            console.log("error", error);
        }
    }
    const router = useRouter()
    const handleSubmit2 = async (e) => {
        e.preventDefault()
        const config = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            url: 'https://api.subkhoone.com/api/users/one_time_password/login',
            data: {
                "phone_number": userInput.phone_number,
                "password": userInput.code,
                "temp_token": userInfo.token
            },
        };
        try {
            const res = await axios(config)
            console.log("res: ", res);
            setStep(prevState => prevState + 1)
            setUserInfo({token: res.data.data["jwt_token"]})
            document.cookie = `token=${res.data.data["jwt_token"]}; path=/`;
            router.push('/')
        } catch (error) {
            console.log("error", error);
        }
    }

    // console.log("userInput: ", userInput)
    // console.log("step: ", step)
    // console.log("userInfo: ", userInfo)
    useEffect(() => {
        if (step === 1) {
            setFormValue({
                ...formValue,
                button: "loading...",
            })
        }
        if (step === 2) {
            setFormValue({
                placeholder: "کد",
                name: "code",
                value: userInput.code,
                button: "ورود"
            })
        }
    }, [step])
    return (
        <Layout>
            <Head>
                <title>ورود</title>
            </Head>

            <main>
                {/*<Navbar/>*/}

                <section className={styles.Login_loginSection}>
                    <div className={styles.Login_whiteSpace}></div>
                    <img className={styles.Login_svg} src="/images/login.svg"/>
                    <div className={`${styles.Login_container} container`}>
                        <div className={styles.Login_loginBox}>
                            <h5 className={styles.Login_title}>ورود</h5>
                            <p className={styles.Login_subTitle}>تمام فیلد ها را به صورت صحیح وارد کنید</p>
                            <form>
                                <div className={`${styles.CustomInput_inputBox} rtl`}>
                                    <span className={styles.CustomInput_label}>{formValue.placeholder}</span>

                                    <input name={formValue.name}
                                           className={styles.CustomInput_input}
                                           type="text"
                                           placeholder={formValue.placeholder}
                                           onChange={handleChange}
                                           value={step === 0 || step === 1 ? userInput.phone_number : userInput.code}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className={`${styles.Login_blue} ${styles.Login_login}`}
                                    onClick={step === 0 ? handleSubmit : handleSubmit2}
                                >
                                    {formValue.button}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>


            </main>
        </Layout>
    );
};