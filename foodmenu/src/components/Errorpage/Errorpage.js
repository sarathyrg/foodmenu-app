import React from "react"
import { Link, useRouteError } from "react-router-dom"
import styles from "./Errorpage.module.css"


function ErrorPage() {
    const error = useRouteError()
    const { status, statusText, data } = error
    console.log(error)
    return (
        <div className={styles.errorpage}>
            <h1>Error..!</h1>
            <i>{status}:{statusText}</i>
            <div>{data}</div>
            <Link to={"/"}>Go To Home</Link>
        </div>
    )
}

export default ErrorPage