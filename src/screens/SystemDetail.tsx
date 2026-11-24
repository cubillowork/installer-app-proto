import { useState } from 'react';
import { AlertItem, Card, HeaderMobile, Icon, KeyValue, NavItem, Tabs, Tag } from 'flux-ds';
import type { Nav } from '../App';
import { alerts, systems } from '../data';

export function SystemDetail({ nav, id }: { nav: Nav; id: string }) {
  const s = systems.find((x) => x.id === id) ?? systems[0];
  const [tab, setTab] = useState<'overview' | 'devices' | 'alerts'>('overview');
  return (
    <>
      <HeaderMobile title={s.name} onBack={nav.back} />
      <main className="content">
        <div className="page">
          <div className="row">{s.tags.map((t) => <Tag key={t} status={t} />)}</div>
          <div className="row p5-regular"><Icon name="Location" size={18} />{s.address}</div>
          <Tabs value={tab} onChange={setTab} tabs={[{ value: 'overview', label: 'Overview' }, { value: 'devices', label: 'Devices' }, { value: 'alerts', label: 'Alerts' }]} />
          {tab === 'overview' && (
            <>
              <Card>
                <KeyValue label="Installed on" value={s.installed} />
                <KeyValue label="Inverter ID #" value={s.inverter} />
                <KeyValue label="Type" value={s.type} />
              </Card>
              <Card padding="md">
                <NavItem icon="Settings | Gear" title="System mode" description="Change battery capacity" />
                <NavItem icon="Wallet" title="Tariff" description="Time of use" />
                <NavItem icon="Remote Control" title="Remote support" />
              </Card>
            </>
          )}
          {tab === 'devices' && (
            <Card padding="md">
              <NavItem icon="Inverter" title="Hybrid inverter" description="Online · firmware 2.4.1" />
              <NavItem icon="Battery_full" title="Battery" description="State of charge 78%" />
              <NavItem icon="Solar" title="PV strings" description="2 strings · 8.2 kWp" />
            </Card>
          )}
          {tab === 'alerts' && alerts.map((a) => <AlertItem key={a.id} level={a.level} title={a.title} meta={a.meta} status={a.status} />)}
        </div>
      </main>
    </>
  );
}
