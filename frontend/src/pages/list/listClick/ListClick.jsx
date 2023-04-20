import "./listClick.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DatatableClicks from "../../../components/datatables/datatableClicks/DatatableClicks";

const ListClick = () => {
  return (
    <div className="listClick">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableClicks />
      </div>
    </div>
  );
};

export default ListClick;
