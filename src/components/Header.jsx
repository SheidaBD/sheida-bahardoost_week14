import React from 'react'
import styles from "./Header.module.css"
function Header() {
    return (
        <div className={styles.container}>
            <h1>لیست مخاطبین</h1>
            <p>
                <a href="https://botostart.ir">Botostart</a> | React.js Full Course
            </p>
            <hr />
        </div>
    )
}

export default Header;