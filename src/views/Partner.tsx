import { Badge, Card, CardHeader, Icon, Link, ListItem, ProgressBar, Rail, SectionHeader, Tag } from 'flux-ds';
import { benefits, leads, marketing, news, partner as p } from '../data';
import { MenuList, MenuRow } from '../components/MenuRow';

export function PartnerView({ tab }: { tab: string }) {
  if (tab === 'leads') return <Leads />;
  if (tab === 'marketing') return <Marketing />;
  return <Overview />;
}

function Overview() {
  return (
    <div className="page">
      <div>
        <p className="p2-semibold">{p.company}</p>
        <p className="p5-regular muted">{p.since}</p>
      </div>

      {/* Partner tier card (Figma 71:3313) */}
      <button type="button" className="tier-card">
        <div className="tier-card__top">
          <span className="tier-card__badge" aria-hidden="true" />
          <span className="tier-card__name">
            <span className="tier-card__eyebrow">Partner current tier</span>
            <span className="tier-card__tier">{p.tier}</span>
          </span>
          <Icon name="Arrow right" />
        </div>
        <div className="tier-card__progress">
          <div className="row baseline">
            <span className="tier-card__pct">{p.progress}%</span>
            <span className="tier-card__to">to {p.next}</span>
          </div>
          <ProgressBar value={p.progress} label={`Progress to ${p.next}`} />
          <span className="tier-card__meta">{p.progressText}</span>
        </div>
        <div className="tier-card__unlocks">
          <span className="tier-card__unlocks-label">Next tier unlocks</span>
          <span className="tier-card__unlocks-text">{p.unlocks}</span>
        </div>
      </button>

      <Card padding="none">
        <CardHeader title="Your benefits" onClick={() => {}} />
        <div className="card-list">
          {benefits.map((b) => (
            <ListItem key={b.title} icon={b.icon} title={b.title} trailing={b.premier ? <Badge>Premier</Badge> : undefined} />
          ))}
        </div>
      </Card>

      <SectionHeader title="Latest news" actionLabel="See all" onAction={() => {}} />
      <Rail label="Latest news" bleed>
        {news.map((n) => (
          <Card key={n.id} padding="md" className="news-card">
            <span className="p4-semibold">{n.title}</span>
            <span className="p5-regular muted">{n.date}</span>
            <Link>Read more</Link>
          </Card>
        ))}
      </Rail>
    </div>
  );
}

function Leads() {
  return (
    <div className="page">
      <div className="row">
        <Card padding="md"><span className="h2">3</span><span className="p5-regular muted">Open leads</span></Card>
        <Card padding="md"><span className="h2">1</span><span className="p5-regular muted">Pending claim</span></Card>
      </div>
      <SectionHeader title="Lead inbox" />
      <Card padding="none">
        <div className="card-list">
          {leads.map((l) => (
            <ListItem key={l.id} title={l.name} description={l.place} trailing={<Tag status={l.tag}>{l.stage}</Tag>} onClick={() => {}} />
          ))}
        </div>
      </Card>
      <p className="p5-regular muted">Lead assignment unlocks at Premier tier.</p>
    </div>
  );
}

function Marketing() {
  return (
    <div className="page">
      <MenuList>
        {marketing.map((m) => (
          <MenuRow key={m.title} icon={m.icon} title={m.title} description={m.description} />
        ))}
        <hr className="me__divider" />
        <MenuRow icon="Lock" title="Co-funded campaigns" description="Available at Premier tier" trailing={<Badge>Premier</Badge>} />
      </MenuList>
    </div>
  );
}
