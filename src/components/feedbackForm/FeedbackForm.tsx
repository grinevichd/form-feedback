import React, {ChangeEvent, useState} from 'react';
import {FormApi} from "../../api/formApi";
import {toast} from "react-toastify";
import loader from "../../assets/image/loader.svg"
import {Notification} from "../notification/Notification";
import styleContainer from '../../common/styles/Container.module.scss'
import styleButton from '../../common/styles/Button.module.scss'
import style from './FeedbackForm.module.scss'

export const FeedbackForm = () => {
    const [errorName, setErrorName] = useState(false)
    const [errorEmail, setErrorEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState(false)
    const [emailValue, setEmailValue] = useState('')
    const [nameValue, setNameValue] = useState('')
    const [messageValue, setMessageValue] = useState('')
    const [waitResult, setWaitResult] = useState(false)

    const buttonStyle = waitResult ? `${style.button}` : `${styleButton.button} ${style.button}`

    const getParams = async () => {

        const form = document.querySelector('#form')

        const formData = new FormData(form as any)
        const name = formData.get('Name')
        const email = formData.get('Telephone')
        const message = formData.get('Message')
        if (!name) {
            setErrorName(true)
        }
        if (!message) {
            setErrorMessage(true)

        }
        if (!email) {
            setErrorEmail("This field is required")
        }

        if (!/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/i.test(emailValue)) {
            setErrorEmail("Invalid telephone address")
            return

        }

        if (!email || !name || !message) {

            return
        }
        if (email && name && message) {
            setErrorName(false)
            setErrorEmail('')
            setErrorMessage(false)
            setWaitResult(true)
        }
        await FormApi.sendMessage({name, email, message})
        toast.success('Message sent success', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        setEmailValue("")
        setNameValue("")
        setMessageValue("")
        setWaitResult(false)

    }
    const onChangeNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorName(false)
        setNameValue(e.currentTarget.value)
    }
    const onChangeEmailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setErrorEmail('')
        setEmailValue(e.currentTarget.value)
    }
    const onChangeMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setErrorMessage(false)
        setMessageValue(e.currentTarget.value)
    }
    return (
        <div className={style.contactsContainer}>
            <div className={`${styleContainer.container} ${style.contactsBlock}`}>
                <div id={'contact'} className={style.formBlock}>
                    <form className={style.formContainer} id={"form"}>
                        <input onChange={onChangeNameHandler} value={nameValue} type="text" placeholder={"Name"}
                               name={"Name"}/>
                        {errorName ? <div className={style.errorMessage}>This field is required</div> :
                            <div style={{height: 21}}/>}
                        <input onChange={onChangeEmailHandler} value={emailValue} type="text" placeholder={"Telephone"}
                               name={"Telephone"}/>
                        {errorEmail ? <div className={style.errorMessage}>{errorEmail}</div> :
                            <div style={{height: 21}}/>}

                        <textarea onChange={onChangeMessageHandler} value={messageValue} placeholder={"Message"}
                                  name={"Message"}>
                    </textarea>
                        {errorMessage ? <div className={style.errorMessage}>This field is required</div> :
                            <div style={{height: 21}}/>}

                        <button disabled={waitResult} type='button' onClick={getParams}
                                className={buttonStyle}>{waitResult ?
                            <img src={loader} alt=""/> : <span
                                className={styleButton.textButton}>Send message</span>}</button>

                    </form>

                </div>


            </div>
            <Notification/>
        </div>
    );
};

