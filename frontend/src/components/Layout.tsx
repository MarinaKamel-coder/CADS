import Sidebar from "./Sidebar";
import "../styles/layout.css";


type Props = {
  children: React.ReactNode;
  onAddClient?: () => void;
};

export default function Layout({ children}: Props) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">

        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}