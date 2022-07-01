import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import MainDepartments from '../components/departments/MainDepartments'

const DepartmentsScreen = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MainDepartments />
      </main>
    </>
  )
}

export default DepartmentsScreen
