import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import EditDepartmentMain from "../components/departments/EditDepartmentMain";

const DepartmentEditScreen = ({ match }) => {
  const departmentId = match.params.id;

  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <EditDepartmentMain departmentId={departmentId} />
      </main>
    </>
  );
};
export default DepartmentEditScreen;
