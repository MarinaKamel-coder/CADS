type TopbarProps = {
  onAddClient?: () => void;
};

export default function Topbar({ onAddClient }: TopbarProps) {
  return (
    <header className="topbar">
      <h2>Tableau de bord</h2>

      <div className="topbar-actions">
        <input placeholder="Rechercher..." />
        <button
          className="primary-btn"
          onClick={onAddClient}
        >
          + Ajouter un client
        </button>
      </div>
    </header>
  );
}