import { useState } from 'react';
import { AppHeader, BottomNav, BottomSheet, Icon, NavItem, type BottomNavItem, type IconName } from 'flux-ds';
import { InstallsView } from './views/Installs';
import { AcademyView } from './views/Academy';
import { PartnerView } from './views/Partner';
import { BuyView } from './views/Buy';
import { NewInstallation } from './screens/NewInstallation';
import { RegisterWarranty } from './screens/RegisterWarranty';
import { SystemDetail } from './screens/SystemDetail';
import { Menu } from './screens/Menu';
import { Notifications } from './screens/Notifications';
import { AlertDetail } from './screens/AlertDetail';
import { SafeArea, StatusBar } from './StatusBar';
import './App.css';

// ---------- Workspaces (workspace switcher) and their bottom bars ----------
export type View = 'installs' | 'academy' | 'partner' | 'buy';

const viewMeta: Record<View, { title: string; description: string; icon: IconName }> = {
  installs: { title: 'Installs', description: 'Commissioning and monitor systems', icon: 'Person_installer' },
  academy: { title: 'Academy', description: 'Training videos, live training and courses', icon: 'Idea' },
  partner: { title: 'Partner program', description: 'Your tier, benefits, leads and marketing', icon: 'Two persons_user' },
  buy: { title: 'Buy products', description: 'Catalogue, cart and price requests', icon: 'My products' },
};

const tabs = {
  installs: [
    { value: 'home', label: 'Home', icon: 'Home | House | Other' },
    { value: 'systems', label: 'Systems', icon: 'List' },
    { value: 'support', label: 'Support', icon: 'Support' },
    { value: 'warranty', label: 'Warranty', icon: 'agreement' },
  ],
  academy: [
    { value: 'learn', label: 'Learn', icon: 'Video play' },
    { value: 'live', label: 'Live training', icon: 'Date | Callendar' },
    { value: 'progress', label: 'My progress', icon: 'Live status' },
  ],
  partner: [
    { value: 'overview', label: 'Overview', icon: 'agreement' },
    { value: 'leads', label: 'Leads', icon: 'Two persons_user', badge: true },
    { value: 'marketing', label: 'Marketing', icon: 'Share' },
  ],
  buy: [
    { value: 'catalogue', label: 'Catalogue', icon: 'My products' },
    { value: 'cart', label: 'Cart', icon: 'Wallet' },
    { value: 'requests', label: 'Requests', icon: 'List' },
  ],
} satisfies Record<View, BottomNavItem<string>[]>;

// ---------- Screens pushed on top of a view ----------
export type Screen = { name: 'menu' } | { name: 'notifications' } | { name: 'alert'; id: string } | { name: 'new-installation' } | { name: 'register-warranty'; owner?: string } | { name: 'system'; id: string };

export type Nav = {
  go: (view: View, tab?: string) => void;
  push: (screen: Screen) => void;
  back: () => void;
};

/** Header icon, 24×24 as in Figma (Flux IconButton is 20×20 with an 18px icon). */
function HeaderAction({ icon, label, onClick, badge }: { icon: IconName; label: string; onClick?: () => void; badge?: boolean }) {
  return (
    <button type="button" className="header-action" aria-label={label} title={label} onClick={onClick}>
      <Icon name={icon} size={24} />
      {badge && <span className="header-action__badge" />}
    </button>
  );
}

export default function App() {
  const [view, setView] = useState<View>('installs');
  const [tab, setTab] = useState<Record<View, string>>({ installs: 'home', academy: 'learn', partner: 'overview', buy: 'catalogue' });
  const [stack, setStack] = useState<Screen[]>([]);
  const [switcher, setSwitcher] = useState(false);
  const [closing, setClosing] = useState(false);
  // Close with a short exit animation before unmounting the sheet.
  const closeSwitcher = (after?: () => void) => {
    if (!switcher) return after?.();
    setClosing(true);
    window.setTimeout(() => {
      setSwitcher(false);
      setClosing(false);
      after?.();
    }, 180);
  };
  const [cart, setCart] = useState<Record<string, number>>({});

  const nav: Nav = {
    go: (v, t) => {
      setView(v);
      if (t) setTab((s) => ({ ...s, [v]: t }));
      setStack([]);
    },
    push: (s) => setStack((st) => [...st, s]),
    back: () => setStack((st) => st.slice(0, -1)),
  };

  const screen = stack[stack.length - 1];
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const items = tabs[view].map((i) => (view === 'buy' && i.value === 'cart' ? { ...i, badge: cartCount > 0 } : i));

  return (
    <div className="stage">
      <div className="phone">
        <StatusBar />

        {screen ? (
          // Task and detail screens: Header mobile, no bottom bar
          <div className="screen">
            {screen.name === 'new-installation' && <NewInstallation nav={nav} />}
            {screen.name === 'register-warranty' && <RegisterWarranty nav={nav} owner={screen.owner} />}
            {screen.name === 'system' && <SystemDetail nav={nav} id={screen.id} />}
            {screen.name === 'menu' && <Menu nav={nav} />}
            {screen.name === 'notifications' && <Notifications nav={nav} />}
            {screen.name === 'alert' && <AlertDetail nav={nav} />}
          </div>
        ) : (
          // Root screens: App header with the workspace switcher + the workspace bottom bar
          <div className="screen">
            <AppHeader
              title={viewMeta[view].title}
              onTitleClick={() => (switcher ? closeSwitcher() : setSwitcher(true))}
              switcherOpen={switcher && !closing}
              actions={
                <>
                  <HeaderAction icon="Notifications | Bell" label="Notifications" badge onClick={() => closeSwitcher(() => nav.push({ name: 'notifications' }))} />
                  <HeaderAction icon="Burger Menu" label="Menu" onClick={() => closeSwitcher(() => nav.push({ name: 'menu' }))} />
                </>
              }
            />
            <main className="content" key={view + tab[view]}>
              {view === 'installs' && <InstallsView tab={tab.installs} nav={nav} />}
              {view === 'academy' && <AcademyView tab={tab.academy} />}
              {view === 'partner' && <PartnerView tab={tab.partner} />}
              {view === 'buy' && <BuyView tab={tab.buy} cart={cart} setCart={setCart} nav={nav} />}
            </main>
            <BottomNav items={items} value={tab[view]} onChange={(t) => setTab((s) => ({ ...s, [view]: t }))} />

            <BottomSheet open={switcher} onClose={() => closeSwitcher()} from="top" offsetTop={48}>
              <div className={`workspace-switcher${closing ? ' is-closing' : ''}`}>
              {(Object.keys(viewMeta) as View[]).map((v) => (
                <NavItem
                  key={v}
                  chevron={false}
                  icon={viewMeta[v].icon}
                  title={viewMeta[v].title}
                  description={viewMeta[v].description}
                  selected={v === view}
                  onClick={() => closeSwitcher(() => nav.go(v))}
                />
              ))}
              </div>
            </BottomSheet>
          </div>
        )}
        <SafeArea />
      </div>

      <aside className="caption">
        <p className="h6">Installer and Partner merged app v1</p>
        <p className="p5-regular">
          Prototype · built with <a href="https://cubillowork.github.io/flux-ds/">Flux DS v0.3.0</a>. Tap the title to open the workspace switcher.
        </p>
      </aside>
    </div>
  );
}
