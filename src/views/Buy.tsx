import { useState } from 'react';
import { Badge, Button, Card, ChipGroup, Icon, InfoBox, ListItem, SearchField, StatusDot, Stepper, Tag } from 'flux-ds';
import type { Nav } from '../App';
import { products, type Product } from '../data';

type Cart = Record<string, number>;
type Props = { tab: string; cart: Cart; setCart: React.Dispatch<React.SetStateAction<Cart>>; nav: Nav };

export function BuyView({ tab, cart, setCart, nav }: Props) {
  if (tab === 'cart') return <CartTab cart={cart} setCart={setCart} nav={nav} />;
  if (tab === 'requests') return <Requests />;
  return <Catalogue cart={cart} setCart={setCart} />;
}

function ProductCard({ p, qty, onQty }: { p: Product; qty: number; onQty: (n: number) => void }) {
  return (
    <Card padding="md">
      <div className="product">
        <div className="product__image"><Icon name={p.category === 'storage' ? 'Battery_full' : p.category === 'panels' ? 'Solar' : 'Inverter'} size={32} /></div>
        <div className="product__info">
          <div className="row">
            <span className="p6-semibold muted">SUNPOWER</span>
            {p.badge && <Badge tone={p.badge === 'Hot' ? 'error' : 'success'}>{p.badge}</Badge>}
          </div>
          <span className="p3-semibold">{p.name}</span>
          <span className="p5-regular muted">{p.specs}</span>
          <StatusDot tone={p.stock === 'In stock' ? 'success' : 'info'}>{p.stock}</StatusDot>
        </div>
      </div>
      <div className="row between">
        <div>
          <p className="p5-semibold">Price: contact sales</p>
          <p className="p6-regular muted">per {p.unit}</p>
        </div>
        <Stepper value={qty} onChange={onQty} label={`Quantity of ${p.name}`} />
      </div>
    </Card>
  );
}

function Catalogue({ cart, setCart }: { cart: Cart; setCart: Props['setCart'] }) {
  const [cat, setCat] = useState<'all' | Product['category']>('all');
  const [q, setQ] = useState('');
  const list = products.filter((p) => (cat === 'all' || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="page">
      <SearchField placeholder="Search SKU, model or product" aria-label="Search products" value={q} onChange={(e) => setQ(e.target.value)} />
      <ChipGroup
        label="Category"
        value={cat}
        onChange={setCat}
        options={[
          { value: 'all', label: 'All' },
          { value: 'panels', label: 'Solar panels' },
          { value: 'storage', label: 'Storage' },
          { value: 'accessories', label: 'Accessories' },
        ]}
      />
      <div className="row p5-regular muted"><Icon name="Refresh | Reload" size={18} />Stock on 24/11/2026</div>
      {list.map((p) => (
        <ProductCard key={p.id} p={p} qty={cart[p.id] ?? 0} onQty={(n) => setCart((c) => ({ ...c, [p.id]: n }))} />
      ))}
      {!list.length && <p className="p4-regular muted center">No products match.</p>}
    </div>
  );
}

function CartTab({ cart, setCart, nav }: { cart: Cart; setCart: Props['setCart']; nav: Nav }) {
  const [sent, setSent] = useState(false);
  const lines = products.filter((p) => (cart[p.id] ?? 0) > 0);
  if (sent)
    return (
      <div className="page">
        <InfoBox type="info">Price request sent. Your distributor will reply within 1 working day.</InfoBox>
        <Button variant="secondary" fullWidth onClick={() => nav.go('buy', 'requests')}>See requests</Button>
      </div>
    );
  if (!lines.length)
    return (
      <div className="page empty">
        <Icon name="Wallet" size={40} />
        <p className="p3-semibold">Your cart is empty</p>
        <p className="p5-regular muted">Add products from the catalogue to request a price.</p>
        <Button variant="secondary" onClick={() => nav.go('buy', 'catalogue')}>Go to catalogue</Button>
      </div>
    );
  return (
    <div className="page">
      <Card padding="none">
        <div className="card-list">
          {lines.map((p) => (
            <ListItem key={p.id} title={p.name} description={p.specs} trailing={<Stepper value={cart[p.id]} onChange={(n) => setCart((c) => ({ ...c, [p.id]: n }))} />} />
          ))}
        </div>
      </Card>
      <Button size="big" fullWidth onClick={() => { setSent(true); setCart({}); }}>Request price</Button>
    </div>
  );
}

function Requests() {
  return (
    <div className="page">
      <Card padding="none">
        <div className="card-list">
          <ListItem title="REQ-2026-118" description="3 items · 18 Nov 2026" trailing={<Tag status="online">Quoted</Tag>} />
          <ListItem title="REQ-2026-102" description="1 item · 2 Nov 2026" trailing={<Tag status="offline">Closed</Tag>} />
        </div>
      </Card>
    </div>
  );
}
