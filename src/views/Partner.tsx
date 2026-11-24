import { Badge, Card, CardHeader, Icon, Link, ListItem, NavItem, ProgressBar, Rail, SectionHeader, Tag } from 'flux-ds';
import { benefits, leads, marketing, news, partner as p } from '../data';

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

      {/* Partner tier card — the coloured card from the Figma mockup */}
      <div className="tier-card">
        <div className="row">
          <div className="tier-icon"><Icon name="agreement" /></div>
          <div className="grow">
            <p className="p5-regular">Partner current tier</p>
            <p className="h3">{p.tier}</p>
          </div>
          <Icon name="Information" size={20} />
        </div>
        <div className="tier-progress">
          <div className="row baseline">
            <span className="h2">{p.progress}%</span>
            <span className="p4-regular">to {p.next}</span>
          </div>
          <ProgressBar value={p.progress} label={`Progress to ${p.next}`} />
          <span className="p5-regular">{p.progressText}</span>
        </div>
        <div className="tier-unlocks">
          <span className="p5-semibold">Next tier unlocks</span>
          <span className="p5-regular">{p.unlocks}</span>
        </div>
      </div>

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
      <Card padding="md">
        {marketing.map((m) => (
          <NavItem key={m.title} icon={m.icon} title={m.title} description={m.description} />
        ))}
      </Card>
      <Card padding="md">
        <ListItem icon="Lock" title="Co-funded campaigns" description="Available at Premier tier" trailing={<Badge>Premier</Badge>} />
      </Card>
    </div>
  );
}
