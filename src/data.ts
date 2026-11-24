// Sample data for the prototype. Texts come from the Figma mockups (Installer app – Portal 2027).
import type { IconName, TagStatus } from 'flux-ds';

export const systemsOverview = { total: 107, normal: 90, alerts: 12, offline: 5 }; // total = normal + alerts + offline

export const pendingWarranties = [
  { id: 'w1', name: 'Jess Becker', detail: 'Commissioned 12 Nov · not registered' },
  { id: 'w2', name: 'Martin Ruiz', detail: 'Draft · missing homeowner consent' },
];

export const systems: {
  id: string;
  name: string;
  address: string;
  tags: TagStatus[];
  installed: string;
  inverter: string;
  type: string;
}[] = [
  { id: 's1', name: 'Jensen Residence', address: 'Oslo · Storgata 12', tags: ['online', 'major'], installed: 'Mar 3, 2026', inverter: 'S1A23B456789012', type: 'All-in-One' },
  { id: 's2', name: 'Wilson Residence', address: 'Bristol · Park Street 8', tags: ['online', 'on-grid'], installed: 'Nov 20, 2026', inverter: 'S1A23B456789044', type: 'Reserve Kit' },
  { id: 's3', name: 'Rossi Residence', address: 'Milan · Via Torino 21', tags: ['offline'], installed: 'Jul 9, 2026', inverter: 'S1A23B456789101', type: 'All-in-One' },
  { id: 's4', name: 'Becker Residence', address: 'Hamburg · Hauptstrasse 4a', tags: ['online', 'on-grid'], installed: 'Nov 12, 2026', inverter: 'S1A23B456789133', type: 'X5' },
];

export const alerts = [
  { id: 'a1', level: 'emergency' as const, title: 'Battery fault', meta: 'Jensen Residence · 24/11/26', status: 'Opened' },
  { id: 'a2', level: 'warning' as const, title: 'Communication lost', meta: 'Rossi Residence · 23/11/26' },
];

export const registrations: { id: string; code: string; owner: string; date: string; status: 'Draft' | 'Submitted' | 'Completed' }[] = [
  { id: 'r1', code: 'SPR-460-0182', owner: 'Sophie Martin', date: '22 Aug 2026', status: 'Completed' },
  { id: 'r2', code: 'SPR-515-0047', owner: 'Pending owner', date: '12 Aug 2026', status: 'Submitted' },
  { id: 'r3', code: 'SP-RH-8831', owner: 'Martin Ruiz', date: '29 Jul 2026', status: 'Draft' },
];

export const videos = [
  { id: 'v1', title: 'X5 commissioning, step by step', length: '12 min', progress: 60 },
  { id: 'v2', title: 'Installing the Reserve battery', length: '8 min', progress: 100 },
  { id: 'v3', title: 'Performance 7: mounting and wiring', length: '15 min', progress: 0 },
  { id: 'v4', title: 'Troubleshooting communication alerts', length: '6 min', progress: 0 },
];

export const events = [
  { id: 'e1', day: '19', month: 'NOV', title: 'Want to see X5 explained in more depth?', type: 'Webinar · 11:00' },
  { id: 'e2', day: '28', month: 'NOV', title: 'Unlock the Full Potential of Your Partner Portal', type: 'Webinar · Online' },
  { id: 'e3', day: '04', month: 'DEC', title: 'Winning with Back Contact', type: 'Seminar · Online' },
];

export const partner = {
  company: 'Giro Installers',
  since: 'Partner since Jan 2022',
  tier: 'Authorised partner',
  next: 'Premier',
  progress: 35,
  progressText: '7 of 20 storage kits purchased',
  unlocks: 'Higher discount · Marketing support · Lead assignment',
};

export const benefits: { title: string; icon: IconName; premier?: boolean }[] = [
  { title: 'Access to the TCL SunPower Portal', icon: 'Check | Done_line' },
  { title: 'Right to use the SunPower logo', icon: 'Check | Done_line' },
  { title: 'Base discount on purchases', icon: 'Check | Done_line' },
  { title: 'Marketing support', icon: 'Lock', premier: true },
  { title: 'Lead assignment', icon: 'Lock', premier: true },
  { title: 'Premier Award', icon: 'Lock', premier: true },
];

export const news = [
  { id: 'n1', title: 'SunPower Installer App: More Control, More Value', date: '21 July 2026' },
  { id: 'n2', title: 'SunPower Origin is here — now available for orders', date: '23 Nov 2026' },
  { id: 'n3', title: 'SunPower Origin: sell the benefits', date: '24 Nov 2026' },
];

export const leads: { id: string; name: string; place: string; stage: string; tag: TagStatus }[] = [
  { id: 'l1', name: 'Emma Wilson', place: 'Bristol · Website', stage: 'Pending claim', tag: 'major' },
  { id: 'l2', name: 'Noah Jensen', place: 'Oslo · Referral', stage: 'Claimed', tag: 'info' },
  { id: 'l3', name: 'Clara Rossi', place: 'Milan · Campaign', stage: 'Qualified', tag: 'online' },
];

export const marketing: { title: string; description: string; icon: IconName }[] = [
  { title: 'Brand assets', description: 'Logos, photos and guidelines', icon: 'Share' },
  { title: 'Product sheets', description: 'Datasheets and price lists', icon: 'contract' },
  { title: 'Campaign kits', description: 'Ready-to-use social and print', icon: 'News' },
];

export type Product = {
  id: string;
  name: string;
  specs: string;
  badge?: 'Hot' | 'New';
  stock: 'In stock' | 'In stock soon';
  unit: string;
  category: 'panels' | 'storage' | 'accessories';
};

export const products: Product[] = [
  { id: 'p1', name: 'Performance 7 BLK P', specs: '515 W · 1996×1134×30 mm', badge: 'Hot', stock: 'In stock', unit: 'pallet · 18.54 kW', category: 'panels' },
  { id: 'p2', name: 'Origin 490', specs: '490 W · 1800×1134×30 mm', badge: 'New', stock: 'In stock soon', unit: 'pallet · 17.64 kW', category: 'panels' },
  { id: 'p3', name: '1P AIO Energy Storage Kit 6', specs: '10 kW hybrid inverter + 5 kWh battery', stock: 'In stock', unit: 'kit', category: 'storage' },
  { id: 'p4', name: 'Reserve Battery', specs: '5 kWh rechargeable Li-ion battery', stock: 'In stock', unit: 'pallet · 4 pcs', category: 'storage' },
  { id: 'p5', name: 'CT meter G1', specs: '170 × 125 × 150 mm', stock: 'In stock soon', unit: 'pc', category: 'accessories' },
];
