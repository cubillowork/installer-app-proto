import { useState } from 'react';
import { Button, Checkbox, HeaderMobile, InfoBox, TextField } from './_fields';
import type { Nav } from '../App';

export function RegisterWarranty({ nav, owner }: { nav: Nav; owner?: string }) {
  const [done, setDone] = useState(false);
  const [consent, setConsent] = useState(false);
  return (
    <>
      <HeaderMobile title="Register warranty" onBack={nav.back} />
      <main className="content">
        <div className="page">
          {done ? (
            <InfoBox type="info">Warranty submitted for {owner ?? 'the homeowner'}. We'll email them to confirm.</InfoBox>
          ) : (
            <>
              <InfoBox type="info">Serial numbers are prefilled from commissioning.</InfoBox>
              <TextField label="Homeowner name" defaultValue={owner} required />
              <TextField label="Homeowner email" type="email" placeholder="name@email.com" required />
              <TextField label="Inverter serial number" defaultValue="S1A23B456789133" hint="Captured during commissioning" />
              <TextField label="Installation date" defaultValue="12/11/2026" />
              <Checkbox checked={consent} onChange={setConsent}>The homeowner agrees to the warranty terms</Checkbox>
            </>
          )}
        </div>
      </main>
      <div className="footer-action">
        {done ? (
          <Button size="big" fullWidth onClick={nav.back}>Done</Button>
        ) : (
          <Button size="big" fullWidth disabled={!consent} onClick={() => setDone(true)}>Submit</Button>
        )}
      </div>
    </>
  );
}
