// Re-exports from Flux + a simple checkbox until Flux has the Checkbox component in code.
import { Icon } from 'flux-ds';
export { Button, HeaderMobile, InfoBox, TextField } from 'flux-ds';

export function Checkbox({ checked, onChange, children }: { checked: boolean; onChange: (v: boolean) => void; children: React.ReactNode }) {
  return (
    <label className="checkbox p4-regular">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <Icon name={checked ? 'Checkbox_filled' : 'Checkbox_empty'} color={checked ? 'var(--color-interactive-primary)' : 'var(--color-text-secondary)'} />
      <span>{children}</span>
    </label>
  );
}
