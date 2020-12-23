import styles from '../styles/Navbar.module.css'
import {useState, useEffect} from "react"
import {useCookies} from 'react-cookie';
import Link from 'next/link'

import useSWR from 'swr'
import axios from "axios"
import login from "../pages/login";


export default function Navbar() {

    const [toggleMenu, setToggleMenu] = useState(false)
    return(
        <div>
            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>

            <!-- Modal -->
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}