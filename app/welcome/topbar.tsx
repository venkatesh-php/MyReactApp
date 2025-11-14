import { NavLink } from "react-router";
import "./topbar.css";

export default function Topbar() {
  return (
    <nav className="topbar">
      <div className="topbar-container">
        <h1 className="topbar-title">School Management</h1>
        <ul className="topbar-tabs">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `tab-link ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/students"
              className={({ isActive }) =>
                `tab-link ${isActive ? "active" : ""}`
              }
            >
              Students
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teachers"
              className={({ isActive }) =>
                `tab-link ${isActive ? "active" : ""}`
              }
            >
              Teachers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/principal"
              className={({ isActive }) =>
                `tab-link ${isActive ? "active" : ""}`
              }
            >
              Principal
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
