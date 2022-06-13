import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import EditQnAMain from '../components/qnas/EditQnAMain'

const QnAEditScreen = ({ match }) => {
  const qnaId = match.params.id

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditQnAMain qnaId={qnaId} />
      </main>
    </>
  )
}
export default QnAEditScreen
