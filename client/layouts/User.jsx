import React from 'react'
import Footer from '../containers/Footer'
import Header from '../containers/Header'
import Context from '../context/Context'

const User = ({ children }) => {
    return (
        <Context>
          <Header />
          {children}
          <Footer />
        </Context>
    )
}

export default User
