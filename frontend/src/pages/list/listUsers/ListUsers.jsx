import "./listUsers.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DatatableUsers from "../../../components/datatables/datatableUsers/DatatableUsers";

const ListUsers = () => {
  return (
    <div className="listUsers">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableUsers />
      </div>
    </div>
  );
};

export default ListUsers;
