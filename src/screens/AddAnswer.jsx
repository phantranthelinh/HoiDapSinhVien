import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import AddAnswerMain from './../components/qnas/AddAnswerMain'

const AddAnswer = ({ match }) => {
  const qnaQuestion = match.params.question
  return (
    <>
      <Sidebar />

      <main className="main-wrap">
        <Header />
        <AddAnswerMain qnaQuestion={qnaQuestion} />
      </main>
    </>
  )
}

export default AddAnswer
