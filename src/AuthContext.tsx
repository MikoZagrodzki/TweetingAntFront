import React, { useContext, useState, useEffect } from 'react'
import {auth} from './firebase'
import firebase from './firebase'



const AuthContext = React.createContext({ user: null, loading: true })

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }: any) {

    const [currentUser, setCurrentUser] = useState<any>()
    const [loading, setLoading] = useState(true)

    function signUp(email: string, password: string) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function logIn(email: string, password: string) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logOut() {
        return auth.signOut()
    }

    function resetPassword(email: string) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value: any = {
        currentUser,
        signUp,
        logIn, 
        logOut,
        resetPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
