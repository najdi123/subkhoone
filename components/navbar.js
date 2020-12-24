import styles from '../styles/Navbar.module.css'
import {useState, useEffect} from "react"
import {useCookies} from 'react-cookie';
import Link from 'next/link'

import useSWR from 'swr'
import axios from "axios"
import login from "../pages/login";


export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [toggleLoginButton, setToggleLoginButton] = useState(false)
    const [toggleLoginButton2, setToggleLoginButton2] = useState(false)
    const [cookies, setCookie] = useCookies(['token']);
    // console.log("cookie token: ", cookies.token)

    const fetcher = params => url => {
        // const fetcher = (url,cookies) => {
        // console.log("cookies222222222222222: ", cookies.token)

        return axios.request({
            method: "GET",
            url: url,
            headers: {
                "Authorization": `Bearer ${cookies.token}`
            }
        })
    }

    const {data, error} = useSWR('http://api.subkhoone.com/api/users/my', fetcher(cookies))
    // const { data, error } = useSWR('https://api2.subkhoone.com/api/users/my', url => fetcher(url, cookies))
    // console.log("fetcher: ", fetcher)
    // console.log("swr data is", data)
    // console.log("swr error: ", error)
    // console.log("toggleLoginButton2: ", toggleLoginButton2)


    const expandLog = () => {
        setToggleLoginButton(prevState => !prevState)
    }
    const expandLog2 = () => {
        setToggleLoginButton2(prevState => !prevState)
    }
    const expandMenu = () => {
        setToggleMenu(prevState => !prevState)
    }


    return (
        <div>
            <nav
                className={`${styles.header} ${styles.absBg} ${styles.pTop} navbar navbar-expand-xl navbar-light fixed-top`}>
                <div className="d-flex align-items-center container">


                    <div className={`d-flex d-xl-none align-items-center rtl`}>
                        <a href="#" className={`d-inline-flex ${styles.Header_mLeft}`}>
                            <i className={`r-search1 ${styles.Header_itemIcon}`}></i>
                        </a>

                        <div className="position-relative">

                            {data ?
                                (
                                    <>
                                        <div
                                            onClick={expandLog2}
                                            className="d-flex justify-content-center align-items-center cursor-pointer "
                                        >
                                            <img
                                                className={styles.Header_userPic}
                                                src="https://api2.subkhoone.com//uploads/avatars/1/IuRyuvRInAXzeo3HYQ6GSd7eq5IG8fxLqKJspELlnTIBBnOsLRF9-K33_IUBoV6F/4UMyHV4Df6-CLvZd06TQfq976J_PQVhylNzwpajFwkdL6DgYfbgRfdVHYZnw1fRR.png"
                                            />
                                            <div className="d-flex flex-column justify-content-center">
                                                <p className={styles.Header_userName}>{data.data.data["first_name"]}</p>
                                                <p className={`${styles.Header_balance__PQiLL} -colorBlack`}>{data.data.data["balance"]}</p>
                                            </div>
                                        </div>
                                        <ul
                                            className={`${styles.Header_dropDown} ${toggleLoginButton2 && styles.Header_expanded} `}>
                                            <li className={styles.Header_dropDown__item}>
                                                <Link href="/dashboard">
                                                    <a className={styles.dropDown_item_link}>
                                                        <i className={`r-person ${styles.Header_dropDown__icon}`}></i>
                                                        پنل کاربری
                                                    </a>

                                                </Link>

                                            </li>
                                            <li className={styles.Header_dropDown__item}>
                                                <Link href="/dashboard">
                                                    <a className={styles.dropDown_item_link}>
                                                        <i className={`r-lock ${styles.Header_dropDown__icon}`}></i>
                                                        خروج
                                                    </a>

                                                </Link>

                                            </li>
                                        </ul>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <a
                                            onClick={expandLog}
                                            className={`d-inline-flex cursor-pointer ${styles.linkDecoration}`}
                                        >
                                            <i className={`r-person ${styles.Header_itemIcon} `}></i>
                                        </a>
                                        <ul
                                            className={`${styles.Header_dropDown} ${toggleLoginButton && styles.Header_expanded} `}>
                                            <li className={styles.Header_dropDown__item}>
                                                <Link href="/login">
                                                    <a className={styles.dropDown_item_link}>
                                                        <i className={`r-person ${styles.Header_dropDown__icon}`}></i>
                                                        ورود یا ثبت نام
                                                    </a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                )
                            }


                        </div>


                    </div>
                    <span className={`${styles.navLogo} ${styles.navbarBrand}`}>
                          <Link href="/">
                              <a>
                                  <img src="/images/logo.svg"/>
                              </a>
                          </Link>
                    </span>
                    <button
                        onClick={expandMenu}
                        aria-controls="basic-navbar-nav"
                        type="button"
                        aria-label="Toggle navigation"
                        className={`${styles.removeBorder} navbar-toggler collapsed`}
                    >
                        <span>
                            <img src="/images/menu-open-blue.svg"/>
                        </span>
                    </button>
                    <div
                        className={`navbar-collapse collapse ${toggleMenu && styles.Menu_expanded}`}

                    >
                        <div
                            className={`ml-auto navbar-nav ${styles.collapsedMenu}`}
                            id="basic-navbar-nav"
                        >
                            <Link href="/">
                                <a className={`nav-link  -colorDark ${styles.nLink}`}>خانه</a>
                            </Link>
                            <Link href="/properties">
                                <a className={`nav-link  -colorDark ${styles.nLink2}`}>املاک</a>
                            </Link>
                            <Link href="/whyUs">
                                <a className={`nav-link  -colorDark ${styles.nLink2}`}>چرا ما</a>
                            </Link>
                            <Link href="/contactUs">
                                <a className={`nav-link  -colorDark ${styles.nLink2}`}>تماس با ما</a>
                            </Link>
                            <Link href="/blog">
                                <a className={`nav-link  -colorDark ${toggleMenu ? styles.nLink2 : styles.nLink3}`}>وبلاگ</a>
                            </Link>
                            <Link href="/faq">
                                <a className={`nav-link  -colorDark ${toggleMenu ? styles.nLink3 : styles.displayNone}`}>سوالات متداول</a>
                            </Link>
                        </div>
                        <div className={`mr-auto d-flex align-items-center`}>
                            <Link href="#">
                                <a className={`search - icon & quot; ${styles.Header_mLeft}  ${toggleMenu && styles.displayNone}`}>
                                    <i className={`r-search1 ${styles.Header_itemIcon}`}></i>
                                </a>
                            </Link>

                            <div className={`position-relative  ${toggleMenu && styles.displayNone}`}>
                                {data ?
                                    (
                                        <>
                                            <div
                                                onClick={expandLog2}
                                                className="d-flex justify-content-center align-items-center cursor-pointer "
                                            >
                                                <img
                                                    className={styles.Header_userPic}
                                                    src="https://api.subkhoone.com//uploads/avatars/1/IuRyuvRInAXzeo3HYQ6GSd7eq5IG8fxLqKJspELlnTIBBnOsLRF9-K33_IUBoV6F/4UMyHV4Df6-CLvZd06TQfq976J_PQVhylNzwpajFwkdL6DgYfbgRfdVHYZnw1fRR.png"
                                                />
                                                <div className="d-flex flex-column justify-content-center">
                                                    <p className={styles.Header_userName}>{data.data.data["first_name"]}</p>
                                                    <p className={`${styles.Header_balance__PQiLL} -colorBlack`}>{data.data.data["balance"]}</p>
                                                </div>
                                            </div>
                                            <ul className={`${styles.Header_dropDown} ${toggleLoginButton2 && styles.Header_expanded} `}>
                                                <li className={styles.Header_dropDown__item}>
                                                    <Link href="/dashboard">
                                                        <a className={styles.dropDown_item_link}>
                                                            <i className={`r-person ${styles.Header_dropDown__icon}`}></i>
                                                            پنل کاربری
                                                        </a>
                                                    </Link>
                                                </li>
                                                <li className={styles.Header_dropDown__item}>
                                                    <Link href="/dashboard">
                                                        <a className={styles.dropDown_item_link}>
                                                            <i className={`r-lock ${styles.Header_dropDown__icon}`}></i>
                                                            خروج
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </>
                                    )
                                    :
                                    (
                                        <>
                                            <a
                                                onClick={expandLog}
                                                className={`d-inline-flex cursor-pointer ${styles.linkDecoration}`}
                                            >
                                                <i className={`r-person ${styles.Header_itemIcon}`}></i>
                                            </a>
                                            <ul
                                                className={`${styles.Header_dropDown} ${toggleLoginButton && styles.Header_expanded} `}>
                                                <li className={styles.Header_dropDown__item}>
                                                    <Link href="/login">
                                                        <a className={styles.dropDown_item_link}>
                                                            <i className={`r-person ${styles.Header_dropDown__icon}`}></i>
                                                            ورود یا ثبت نام
                                                        </a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </>
                                    )
                                }
                            </div>
                            <a href="#" className={styles.Header_addHome}>
                                <span>ملک خود را ثبت کنید</span>
                            </a>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
}