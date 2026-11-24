import { Button, Icon } from 'flux-ds';
import './App.css';

// Placeholder screen — the real screens (Installs, view switcher, Academy, Partner program, Buy products) come next.
export default function App() {
  return (
    <div className="stage">
      <div className="phone">
        <header className="phone-header">
          <span className="h4">Installs</span>
          <Icon name="Notifications | Bell" />
        </header>
        <main className="phone-body">
          <p className="p3-regular">Installer App × Partner Portal — prototype built with Flux DS v0.1.0.</p>
          <Button size="big" icon="Add" fullWidth>
            New installation
          </Button>
        </main>
      </div>
    </div>
  );
}
