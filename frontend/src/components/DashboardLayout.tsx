import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import "../styles/layout.css";


type Props = {
  children: React.ReactNode;
  onAddClient?: () => void;
};

export default function DashboardLayout({ children, onAddClient }: Props) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="app-main">
        <Topbar onAddClient={onAddClient} />
        <div className="app-content">{children}</div>
      </div>
    </div>
  );
}
