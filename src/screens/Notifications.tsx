import { HeaderMobile, Icon, Tag, type TagStatus } from 'flux-ds';
import type { Nav } from '../App';
import { redAlert, systems } from '../data';

type Item = { id: string; title: string; tag: TagStatus; tagLabel: string; time: string; text: string; onClick?: () => void };

function Notification({ title, tag, tagLabel, time, text, onClick }: Item) {
  const content = (
    <>
      <span className="notif__body">
        <span className="notif__top">
          <span className="p3-semibold">{title}</span>
          <span className="p5-regular muted nowrap">{time}</span>
        </span>
        <Tag status={tag}>{tagLabel}</Tag>
        <span className="p5-regular">{text}</span>
      </span>
      <Icon name="Arrow right" size={18} />
    </>
  );
  // Only the system alert opens a detail in this prototype; the others keep the arrow for consistency.
  return onClick ? (
    <button type="button" className="notif is-clickable" onClick={onClick}>{content}</button>
  ) : (
    <div className="notif">{content}</div>
  );
}

export function Notifications({ nav }: { nav: Nav }) {
  const system = systems.find((s) => s.id === redAlert.systemId)!;
  const items: Item[] = [
    {
      id: 'alert',
      title: redAlert.title,
      tag: 'emergency',
      tagLabel: 'Emergency',
      time: redAlert.time,
      text: `${system.name} · ${system.address}. The inverter stopped communicating — check the connection.`,
      onClick: () => nav.push({ name: 'alert', id: redAlert.id }),
    },
    {
      id: 'lead',
      title: 'New lead to claim',
      tag: 'major',
      tagLabel: 'Action needed',
      time: '1 h ago',
      text: 'Emma Wilson in Bristol is looking for solar + storage. Claim the lead before it goes to the shared pool.',
    },
    {
      id: 'welcome',
      title: 'Welcome to your new app',
      tag: 'info',
      tagLabel: 'Info',
      time: 'Yesterday',
      text: 'Installs, Academy, Partner program and Buy products are now in one app. Tap the title at the top to switch workspace.',
    },
  ];
  return (
    <>
      <HeaderMobile title="Notifications" onBack={nav.back} />
      <main className="content">
        <div className="page notif-list">
          {items.map(({ id, ...item }) => <Notification key={id} id={id} {...item} />)}
        </div>
      </main>
    </>
  );
}
