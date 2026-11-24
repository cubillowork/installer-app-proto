import {
  Button, Card, CardBody, CardHeader, Icon, KeyValue, Link, ListItem, NavItem, SearchField, SectionHeader, StatusDot, Tag,
} from 'flux-ds';
import type { Nav } from '../App';
import { pendingWarranties, registrations, systems, systemsOverview as o } from '../data';

export function InstallsView({ tab, nav }: { tab: string; nav: Nav }) {
  if (tab === 'systems') return <Systems nav={nav} />;
  if (tab === 'support') return <Support />;
  if (tab === 'warranty') return <Warranty nav={nav} />;
  if (tab === 'me') return <Me />;
  return <Home nav={nav} />;
}

/** Stacked bar: normal / alerts / offline (Figma "Systems overview"). */
function SystemsBar() {
  const pct = (n: number) => `${(n / o.total) * 100}%`;
  return (
    <div className="stack-bar" aria-hidden="true">
      <span style={{ width: pct(o.normal), background: 'var(--color-alert-success-icon)' }} />
      <span style={{ width: pct(o.alerts), background: 'var(--color-alert-error-icon)' }} />
      <span style={{ width: pct(o.offline), background: 'var(--color-neutral-400)' }} />
    </div>
  );
}

const alertCounts = [
  { label: 'Emergency', value: 1, color: 'var(--color-red-600)' },
  { label: 'Major', value: 5, color: 'var(--color-orange-400)' },
  { label: 'Minor', value: 6, color: 'var(--color-neutral-400)' },
];

/** Donut with the alerts split by level (Figma "Alerts" card). */
function AlertsDonut() {
  const total = alertCounts.reduce((a, b) => a + b.value, 0);
  const size = 120;
  const stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <div className="donut">
      <div className="donut__chart">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-background-strong)" strokeWidth={stroke} />
          {alertCounts.map((a) => {
            const len = (a.value / total) * c;
            const el = (
              <circle
                key={a.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={a.color}
                strokeWidth={stroke}
                strokeDasharray={`${Math.max(len - 2, 0)} ${c}`}
                strokeDashoffset={-offset}
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <span className="h3 donut__total">{total}</span>
      </div>
      <span className="p4-regular muted">Total alerts</span>
    </div>
  );
}

function Home({ nav }: { nav: Nav }) {
  return (
    <div className="page">
      <Card padding="none">
        <CardHeader title="Systems overview" onClick={() => nav.go('installs', 'systems')} />
        <CardBody>
          <div className="big-number">
            <span className="h2">{o.total}</span>
            <span className="p3-regular">Total systems</span>
          </div>
          <SystemsBar />
          <div className="legend">
            <div><span className="p1-semibold muted">{o.normal}</span><StatusDot tone="success">Normal</StatusDot></div>
            <div><span className="p1-semibold muted">{o.alerts}</span><StatusDot tone="error">Alerts</StatusDot></div>
            <div><span className="p1-semibold muted">{o.offline}</span><StatusDot tone="neutral">Offline</StatusDot></div>
          </div>
        </CardBody>
      </Card>

      <Card padding="none">
        <CardHeader title="Alerts" onClick={() => nav.push({ name: 'system', id: 's1' })} />
        <div className="alerts-body">
          <AlertsDonut />
          <div className="alerts-legend">
            {alertCounts.map((a) => (
              <div key={a.label}>
                <span className="legend-label p5-regular muted"><span className="dot" style={{ background: a.color }} />{a.label}</span>
                <span className="p1-semibold">{a.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Commissioning keeps today's entry point on the Installs home */}
      <Button fullWidth>
        Begin installation
      </Button>
    </div>
  );
}

function Systems({ nav }: { nav: Nav }) {
  return (
    <div className="page">
      <SearchField placeholder="Search system, address or ID" aria-label="Search systems" />
      {systems.map((s) => (
        <Card key={s.id} onClick={() => nav.push({ name: 'system', id: s.id })}>
          <span className="p2-semibold">{s.name}</span>
          <div className="row">{s.tags.map((t) => <Tag key={t} status={t} />)}</div>
          <div className="row p5-regular"><Icon name="Location" size={18} />{s.address}</div>
          <KeyValue label="Installed on" value={s.installed} />
          <KeyValue label="Type" value={s.type} />
        </Card>
      ))}
    </div>
  );
}

function Support() {
  return (
    <div className="page">
      <Card padding="md">
        <NavItem icon="Help" title="FAQ" description="Answers to common questions" />
        <NavItem icon="contract" title="Installation guides" description="X5, W10, Reserve and more" />
        <NavItem icon="Remote Control" title="Remote support" description="Let support access a system" />
      </Card>
      <SectionHeader title="Contact us" />
      <Card padding="md">
        <ListItem icon="Phone" title="+44 20 4572 6579" description="Mon–Fri, 8:00–18:00" />
        <ListItem icon="Email" title="PartnerService.UK@sunpowerglobal.com" description="We reply within 1 working day" />
      </Card>
      <p className="p5-regular muted">Training videos moved to the Academy workspace (tap the title at the top).</p>
    </div>
  );
}

function Warranty({ nav }: { nav: Nav }) {
  const tone = { Draft: 'minor', Submitted: 'info', Completed: 'online' } as const;
  return (
    <div className="page">
      <Button size="big" icon="Add" fullWidth onClick={() => nav.push({ name: 'register-warranty' })}>
        Register warranty
      </Button>
      <SectionHeader title="Waiting for registration" />
      <Card padding="none">
        <div className="card-list">
          {pendingWarranties.map((w) => (
            <ListItem key={w.id} title={w.name} description={w.detail} trailing={<Link onClick={() => nav.push({ name: 'register-warranty', owner: w.name })}>Register</Link>} />
          ))}
        </div>
      </Card>
      <SectionHeader title="Registrations" />
      <Card padding="none">
        <div className="card-list">
          {registrations.map((r) => (
            <ListItem key={r.id} title={r.code} description={`${r.owner} · ${r.date}`} trailing={<Tag status={tone[r.status]}>{r.status}</Tag>} />
          ))}
        </div>
      </Card>
    </div>
  );
}

function Me() {
  return (
    <div className="page">
      <Card padding="md">
        <ListItem icon="Person_installer" title="Xin Wang" description="Installer · Giro Installers" />
      </Card>
      <Card padding="md">
        <NavItem icon="Person_user" title="Profile" description="Personal and company information" />
        <NavItem icon="Two persons_user" title="User management" description="Invite users, roles and permissions" />
        <NavItem icon="Lock" title="Change password" />
        <NavItem icon="Language" title="Language" description="English" />
        <NavItem icon="Information" title="About" description="Version 3.0 · prototype" />
      </Card>
    </div>
  );
}
