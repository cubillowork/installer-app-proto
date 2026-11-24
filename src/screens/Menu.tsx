import { HeaderMobile, Icon, type IconName } from 'flux-ds';
import type { Nav } from '../App';

// Mobile menu (☰ in the header) — replaces the "Me" tab. Same row style as today's Installer App "Me" screen.
function MenuRow({ icon, title, description, chevron = true, onClick }: { icon: IconName; title: string; description?: string; chevron?: boolean; onClick?: () => void }) {
  return (
    <button type="button" className="me-row" onClick={onClick}>
      <Icon name={icon} />
      <span className="me-row__text">
        <span className="p2-semibold">{title}</span>
        {description && <span className="p5-regular muted">{description}</span>}
      </span>
      {chevron && <Icon name="Arrow right" size={16} />}
    </button>
  );
}

export function Menu({ nav }: { nav: Nav }) {
  return (
    <>
      <HeaderMobile title="Hello, Xin" onBack={nav.back} />
      <main className="content me-content">
        <div className="page me">
          <div className="me__list">
            <MenuRow icon="Person_user" title="My account" description="Change your name, email or password" />
            <MenuRow icon="Full screen" title="Scan QR code" />
            <MenuRow icon="News" title="Language" description="Select your preferred app language" />
            <MenuRow icon="Two persons_user" title="User management" description="Invite users, roles & permissions" />
            <MenuRow icon="Information" title="About" description="Privacy policy, Terms of use agreement" />
            <MenuRow icon="Refresh | Reload" title="Clear cache" />
            <hr className="me__divider" />
            <MenuRow icon="Logout" title="Log out" chevron={false} />
          </div>
        </div>
      </main>
    </>
  );
}
