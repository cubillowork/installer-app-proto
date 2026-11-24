import { Icon, Tag } from 'flux-ds';
import type { Nav } from '../App';
import { systems } from '../data';
import house from '../assets/system/house.png';
import components from '../assets/system/components.png';
import connections from '../assets/system/connections.png';

// System detail — Figma "System detail page" (Installer app – Portal 2027, node 82:4149).
// Illustration layers exported from Figma: house, connections (energy flow) and components (panels, inverter, battery).

/** Eco | Leaf from Icon General — not in flux-ds code yet. */
function LeafIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22.0002 2.15039V12.5574C22.0002 16.4812 19.7427 19.8687 16.4686 21.5112L15.5718 19.7236C18.1977 18.4062 20.0002 15.6936 20.0002 12.5574V4.96443L14.5773 6.8524C13.4657 7.23719 12.5126 7.94011 11.8162 8.82557L10.2441 7.58925C11.1676 6.41493 12.4342 5.47798 13.9223 4.96271L22.0002 2.15039Z" fill="currentColor" />
      <path d="M2 5.64644L8.10952 9.88542C11.1807 12.0136 13 15.5119 13 19.2474V22.5574H9.26C5.24772 22.5574 2 19.3097 2 15.2974V5.64644ZM4 9.46836V15.2974C4 18.2051 6.35228 20.5574 9.26 20.5574H11V19.2474C11 16.1631 9.49895 13.2812 6.97048 11.5294L4 9.46836Z" fillRule="evenodd" clipRule="evenodd" fill="currentColor" />
      <path d="M14.8321 15.1121L18.8321 9.1121L17.168 8.0027L13.168 14.0027L14.8321 15.1121Z" fill="currentColor" />
    </svg>
  );
}

function Reading({ value, unit, label, align = 'left', style }: { value: string; unit: string; label: string; align?: 'left' | 'right'; style: React.CSSProperties }) {
  return (
    <div className={`reading reading--${align}`} style={style}>
      <span className="reading__value">
        <b>{value}</b> {unit}
      </span>
      <span className="reading__label">{label}</span>
    </div>
  );
}

export function SystemDetail({ nav, id }: { nav: Nav; id: string }) {
  const s = systems.find((x) => x.id === id) ?? systems[0];
  return (
    <div className="system">
      {/* Illustration (positions from Figma, relative to the screen under the status bar) */}
      <img className="system__layer" src={house} alt="" style={{ top: -47, height: 809 }} />
      <img className="system__layer" src={connections} alt="" style={{ top: 173, height: 300 }} />
      <img className="system__layer" src={components} alt="" style={{ top: 174, height: 300 }} />

      <header className="system__header">
        <button type="button" className="header-action" aria-label="Back" onClick={nav.back}>
          <Icon name="Arrow left" />
        </button>
        <h1 className="p2-semibold">{s.name}</h1>
        <button type="button" className="header-action" aria-label="System settings">
          <Icon name="Settings | Gear" />
        </button>
      </header>
      <div className="system__tags">
        {s.tags.map((t) => <Tag key={t} status={t} />)}
      </div>

      {/* Indicator lines joining each reading to the house (Figma "indicator gradient") */}
      <span className="system__line" style={{ left: 21, top: 119, height: 215 }} />
      <span className="system__line" style={{ left: 153, top: 116, height: 101 }} />
      <span className="system__line" style={{ left: 329, top: 150, height: 46 }} />
      <span className="system__line system__line--h" style={{ left: 205, top: 433, width: 26 }} />

      <Reading value="8.1" unit="kW" label="Home" style={{ top: 119, left: 28 }} />
      <Reading value="4.5" unit="kW" label="Solar" style={{ top: 116, left: 160 }} />
      <Reading value="0.0" unit="kW" label="Grid" align="right" style={{ top: 162, right: 54 }} />

      <div className="system__battery">
        <Icon name="Battery Charge" size={24} />
        <div>
          <span className="reading__value"><b>1</b> %</span>
          <span className="reading__label">Charging <b>3.6</b> kW</span>
        </div>
      </div>

      <div className="system__cards">
        <div className="system__totals">
          <div>
            <span className="p5-regular">Today’s production</span>
            <span className="system__big"><b>8.1</b> kWh</span>
          </div>
          <div className="right">
            <span className="p5-regular">Today’s savings</span>
            <span className="system__big">€ <b>7,6</b></span>
          </div>
        </div>
        <div className="system__mode">
          <div className="row between">
            <span className="row p3-regular"><LeafIcon />Self-consumption mode</span>
            <Tag status="online">Active</Tag>
          </div>
          <hr />
          <button type="button" className="system__change p3-semibold">
            Change mode <Icon name="Arrow right" size={16} />
          </button>
        </div>
      </div>

      <p className="system__live p4-regular">Live data, updated every 10 secs.</p>
    </div>
  );
}
