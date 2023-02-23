import { Sidebar } from "primereact/sidebar";
import "./SideMenu.css";

const SideMenu = ({ visible, setVisible }) => {
  return (
    <Sidebar visible={visible} onHide={() => setVisible(false)}>
      <div>
        <p className="sideBar-item">
          <a className="sideBar-link" href="/">
            <i className="pi pi-home" style={{ fontSize: "1.5rem" }}></i> Home
          </a>
        </p>
        <p className="sideBar-item">
          <a className="sideBar-link" href="/users">
            <i className="pi pi-user" style={{ fontSize: "1.5rem" }}></i> Users
          </a>
        </p>
        <p className="sideBar-item">
          <a className="sideBar-link" href="/ticketList">
            <i className="pi pi-ticket" style={{ fontSize: "1.5rem" }}></i>{" "}
            Tickets
          </a>
        </p>
      </div>
    </Sidebar>
  );
};

export default SideMenu;
