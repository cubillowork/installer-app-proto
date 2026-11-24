import { HeaderMobile, Icon, Link, Tag } from 'flux-ds';
import type { Nav } from '../App';
import { redAlert as a, systems } from '../data';

// Red alert detail — Figma 🛠️ Installer App, node 7549:9739.
export function AlertDetail({ nav }: { nav: Nav }) {
  const system = systems.find((s) => s.id === a.systemId)!;
  const rows: [string, string][] = [
    ['Status', a.status],
    ['Time', a.time],
    ['Duration', a.duration],
    ['Device type', a.deviceType],
    ['Device ID', a.deviceId],
  ];
  return (
    <>
      <HeaderMobile title={system.name} onBack={nav.back} />
      <main className="content">
        <div className="page">
          <section className="alert-card">
            <div className="alert-card__title">
              <span className="t-subtitle">{a.title}</span>
              <span><Tag status="emergency" /></span>
            </div>
            <dl className="alert-card__rows"><div><dt>Code</dt><dd>{a.code}</dd></div></dl>
            <hr />
            <dl className="alert-card__rows">
              {rows.map(([k, v]) => (
                <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
            <hr />
            <div className="alert-card__block">
              <span className="t-body">Alert description</span>
              <p className="t-caption pre">{a.description}</p>
            </div>
            <hr />
            <div className="alert-card__block">
              <span className="alert-card__how t-caption"><Icon name="Information" size={18} />How to solve it?</span>
              <ol className="t-caption">
                {a.steps.map((s) => <li key={s}>{s}</li>)}
              </ol>
            </div>
          </section>
          <Link onClick={() => nav.push({ name: 'system', id: system.id })}>Go to system</Link>
        </div>
      </main>
    </>
  );
}
