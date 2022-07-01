import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import MainMessage from './../components/newquestions/MainMessage'

const MessageScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainMessage />
      </main>
    </>
  )
}

export default MessageScreen
