import { useState } from 'react';
import {
  Button, ChipGroup, Card, CardBody, CardHeader, Icon, Link, ListItem, SearchField, SectionHeader, StatusDot, Tag,
} from 'flux-ds';
import type { Nav } from '../App';
import { MenuList, MenuRow } from '../components/MenuRow';
import { alertCounts as ac, pendingWarranties, redAlert, registrations, systems, systemsOverview as o } from '../data';

export function InstallsView({ tab, nav }: { tab: string; nav: Nav }) {
  if (tab === 'systems') return <Systems nav={nav} />;
  if (tab === 'support') return <Support />;
  if (tab === 'warranty') return <Warranty nav={nav} />;
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
  { label: 'Emergency', value: ac.emergency, color: 'var(--color-red-600)' },
  { label: 'Major', value: ac.major, color: 'var(--color-orange-400)' },
  { label: 'Minor', value: ac.minor, color: 'var(--color-neutral-400)' },
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
            if (!a.value) return null;
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
                strokeDasharray={a.value === total ? `${c} ${c}` : `${Math.max(len - 2, 0)} ${c}`}
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
            <div><span className="p1-semibold">{o.normal}</span><StatusDot tone="success">Normal</StatusDot></div>
            <div><span className="p1-semibold">{o.alerts}</span><StatusDot tone="error">Alerts</StatusDot></div>
            <div><span className="p1-semibold">{o.offline}</span><StatusDot tone="neutral">Offline</StatusDot></div>
          </div>
        </CardBody>
      </Card>

      <Card padding="none">
        <CardHeader title="Alerts" onClick={() => nav.push({ name: 'alert', id: redAlert.id })} />
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
      <Button size="big" icon="Add" fullWidth>
        Begin installation
      </Button>
    </div>
  );
}

function Systems({ nav }: { nav: Nav }) {
  const [gen, setGen] = useState<'gen2' | 'gen1'>('gen2');
  return (
    <div className="page">
      <ChipGroup
        label="System generation"
        value={gen}
        onChange={setGen}
        options={[
          { value: 'gen2', label: 'Gen 2' },
          { value: 'gen1', label: 'Gen 1' },
        ]}
      />
      {gen === 'gen1' ? (
        <>
          <p className="p4-regular muted">Gen 1 systems are managed in the Partner Portal.</p>
          {[
            { name: 'SunPower Reserve', description: 'Monitor and manage Reserve systems', icon: 'Battery_full' as const },
            { name: 'SunPower Drive', description: 'Monitor and manage Drive systems', icon: 'Power | Energy' as const },
          ].map((g) => (
            <Card key={g.name} onClick={() => {}}>
              <div className="gen1-card">
                <Icon name={g.icon} />
                <span className="gen1-card__text">
                  <span className="p2-semibold">{g.name}</span>
                  <span className="p5-regular muted">{g.description}</span>
                </span>
                <Icon name="Link_external" size={20} />
              </div>
              <span className="p5-semibold gen1-card__note">Opens the Partner Portal</span>
            </Card>
          ))}
        </>
      ) : (
        <>
          <SearchField placeholder="Search system, address or ID" aria-label="Search systems" />
          <div className="system-list">
            {systems.map((s) => (
              <button key={s.id} type="button" className="system-card" onClick={() => nav.push({ name: 'system', id: s.id })}>
                <span className="system-card__body">
                  <span className="system-card__title">
                    <span className="p2-semibold">{s.name}</span>
                    <span className="system-card__tags">{s.tags.map((t) => <Tag key={t} status={t} />)}</span>
                  </span>
                  <span className="system-card__info p5-regular">
                    <span>Installed on</span><b>{s.installed}</b>
                    <span>Address:</span><b>{s.address}</b>
                  </span>
                </span>
                <Icon name="Arrow right" size={18} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/** Contact card — style from the Consumer App (Figma ⚡️ Consumer App, node 2602:37859). */
function ContactCard() {
  const rows = [
    { icon: 'Phone' as const, text: '+44 20 4572 6579', sub: 'Mon–Fri, 8:00–18:00', cta: 'Call', href: 'tel:+442045726579' },
    { icon: 'Email' as const, text: 'PartnerService.UK@sunpowerglobal.com', sub: 'We reply within 1 working day', cta: 'Email', href: 'mailto:PartnerService.UK@sunpowerglobal.com' },
  ];
  return (
    <section className="contact-card">
      <h2 className="h4">Contact us</h2>
      {rows.map((r) => (
        <div key={r.cta} className="contact-card__row">
          <span className="contact-card__icon"><Icon name={r.icon} size={16} /></span>
          <span className="contact-card__text">
            <a className="contact-card__link p4-semibold" href={r.href} aria-label={`${r.cta} ${r.text}`}>{r.text}</a>
            <span className="p5-regular muted">{r.sub}</span>
          </span>
        </div>
      ))}
    </section>
  );
}

function Support() {
  return (
    <div className="page">
      <MenuList>
        <MenuRow icon="Help" title="FAQ" description="Answers to common questions" />
        <MenuRow icon="contract" title="Installation guides" description="X5, W10, Reserve and more" />
        <MenuRow icon="Remote Control" title="Remote support" description="Let support access a system" />
      </MenuList>
      <ContactCard />
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
