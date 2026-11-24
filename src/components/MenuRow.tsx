import { Icon, type IconName } from 'flux-ds';

/** Menu row without a card, as in today's Installer App "Me" screen:
 *  icon 24 · title p2 semibold · description p5 · arrow 16 (or something else on the right). */
export function MenuRow({
  icon,
  title,
  description,
  chevron = true,
  trailing,
  onClick,
}: {
  icon: IconName;
  title: string;
  description?: string;
  chevron?: boolean;
  trailing?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button type="button" className="me-row" onClick={onClick}>
      <Icon name={icon} />
      <span className="me-row__text">
        <span className="p2-semibold">{title}</span>
        {description && <span className="p5-regular muted">{description}</span>}
      </span>
      {trailing ?? (chevron && <Icon name="Arrow right" size={16} />)}
    </button>
  );
}

/** Vertical list of MenuRows, 32px apart. */
export function MenuList({ children }: { children: React.ReactNode }) {
  return <div className="me__list">{children}</div>;
}
