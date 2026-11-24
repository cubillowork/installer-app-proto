import { useState } from 'react';
import { Button, HeaderMobile, InfoBox, Link, NavItem, type IconName } from 'flux-ds';
import type { Nav } from '../App';

// Start of the commissioning flow — same entry point as today's Installer App.
const products: { id: string; title: string; description: string; icon: IconName; needsTraining?: boolean }[] = [
  { id: 'x5', title: 'X5', description: 'C&I storage · training required', icon: 'Battery Charge', needsTraining: true },
  { id: 'w10', title: 'W10', description: 'Residential storage · training required', icon: 'Battery_full', needsTraining: true },
  { id: 'reserve', title: 'Reserve', description: 'Hybrid inverter + battery', icon: 'Inverter' },
  { id: 'aio', title: 'All-in-One', description: 'Inverter and battery in one unit', icon: 'Power | Energy' },
];

export function NewInstallation({ nav }: { nav: Nav }) {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = products.find((p) => p.id === selected);
  return (
    <>
      <HeaderMobile title="New installation" onBack={nav.back} />
      <main className="content">
        <div className="page">
          <div>
            <h2 className="t-title">What are you installing?</h2>
            <p className="t-body muted">Choose the product to start commissioning.</p>
          </div>
          <div className="card-plain">
            {products.map((p) => (
              <NavItem key={p.id} icon={p.icon} title={p.title} description={p.description} selected={p.id === selected} onClick={() => setSelected(p.id)} />
            ))}
          </div>
          {chosen?.needsTraining && (
            <InfoBox type="warning">
              {chosen.title} needs the {chosen.title} commissioning certificate. You have completed 3 of 5 videos.{' '}
              <Link onClick={() => nav.go('academy', 'progress')}>Continue training</Link>
            </InfoBox>
          )}
        </div>
      </main>
      <div className="footer-action">
        <Button size="big" fullWidth disabled={!chosen || chosen.needsTraining}>
          Start commissioning
        </Button>
      </div>
    </>
  );
}
