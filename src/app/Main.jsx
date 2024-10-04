'use client'
import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import * as styles from "./page.module.css"
export default function Main({ children }) {
    return (
        <div >
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}
