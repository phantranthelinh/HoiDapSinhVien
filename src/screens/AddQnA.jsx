import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import AddQnAMain from '../components/qnas/AddQnAMain'

const AddQnA = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddQnAMain />
      </main>
    </>
  )
}

export default AddQnA
