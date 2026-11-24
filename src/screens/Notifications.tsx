import { HeaderMobile, Icon, Tag } from 'flux-ds';
import type { Nav } from '../App';
import { redAlert, systems } from '../data';

// Messages opened from the bell. Only the system alert opens a detail.
export function Notifications({ nav }: { nav: Nav }) {
  const system = systems.find((s) => s.id === redAlert.systemId)!;
  return (
    <>
      <HeaderMobile title="Notifications" onBack={nav.back} />
      <main className="content">
        <div className="page notif-list">
          <button type="button" className="notif notif--alert" onClick={() => nav.push({ name: 'alert', id: redAlert.id })}>
            <span className="notif__body">
              <span className="notif__top">
                <span className="p3-semibold">{redAlert.title}</span>
                <span className="p5-regular muted">{redAlert.time}</span>
              </span>
              <Tag status="emergency" />
              <span className="p5-regular">{system.name} · {system.address}</span>
            </span>
            <Icon name="Arrow right" size={18} />
          </button>

          <div className="notif">
            <span className="notif__icon"><Icon name="Two persons_user" size={20} /></span>
            <span className="notif__body">
              <span className="notif__top">
                <span className="p3-semibold">New lead to claim</span>
                <span className="p5-regular muted">1 h ago</span>
              </span>
              <span className="p5-regular">Emma Wilson in Bristol is looking for solar + storage. Claim it in Partner program → Leads before it goes to the shared pool.</span>
            </span>
          </div>

          <div className="notif">
            <span className="notif__icon"><Icon name="Idea" size={20} /></span>
            <span className="notif__body">
              <span className="notif__top">
                <span className="p3-semibold">Welcome to your new app</span>
                <span className="p5-regular muted">Yesterday</span>
              </span>
              <span className="p5-regular">Installs, Academy, Partner program and Buy products are now in one app. Tap the title at the top to switch workspace.</span>
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
