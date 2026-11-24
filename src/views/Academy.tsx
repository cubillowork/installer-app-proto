import { useState } from 'react';
import { Card, ChipGroup, EmptyState, Icon, Link, ProgressBar, ProgressCircle, Rail, SectionHeader } from 'flux-ds';
import { events, videos } from '../data';

export function AcademyView({ tab }: { tab: string }) {
  if (tab === 'live') return <Live />;
  if (tab === 'progress') return <Progress />;
  return <Learn />;
}

function Thumb({ big = false }: { big?: boolean }) {
  return (
    <div className={`thumb${big ? ' thumb--big' : ''}`}>
      <Icon name="Video play" size={big ? 40 : 24} />
    </div>
  );
}

export function EventCard({ e }: { e: (typeof events)[number] }) {
  return (
    <Card className="event-card">
      <div className="event-date">
        <span className="t-number">{e.day}</span>
        <span className="t-caption-strong">{e.month}</span>
      </div>
      <span className="t-body-strong event-title">{e.title}</span>
      <div className="row between">
        <span className="t-caption muted">{e.type}</span>
        <Link>Register</Link>
      </div>
    </Card>
  );
}

function Learn() {
  const [filter, setFilter] = useState<'all' | 'x5' | 'w10' | 'reserve'>('all');
  const v = videos[0];
  const shown = videos.filter((x) => filter === 'all' || x.product === filter);
  return (
    <div className="page">
      <ChipGroup
        label="Product"
        value={filter}
        onChange={setFilter}
        options={[
          { value: 'all', label: 'All' },
          { value: 'x5', label: 'X5' },
          { value: 'w10', label: 'W10' },
          { value: 'reserve', label: 'Reserve' },
        ]}
      />

      <Card padding="none" onClick={() => {}}>
        <Thumb big />
        <div className="card-pad">
          <span className="t-caption-strong eyebrow">CONTINUE LEARNING</span>
          <span className="t-body-strong">{v.title}</span>
          <div className="row">
            <ProgressBar value={60} label="Course progress" />
            <span className="t-caption muted nowrap">3 of 5 videos</span>
          </div>
        </div>
      </Card>

      <SectionHeader title="Training videos" actionLabel="See all" onAction={() => {}} />
      {!shown.length && (
        <EmptyState icon="Video play" title={`No ${filter.toUpperCase()} videos yet`} description="New training is added every month. You'll get a notification when it's ready." actionLabel="See all videos" onAction={() => setFilter('all')} />
      )}
      <div className="stack">
      {shown.map((video) => (
        <Card key={video.id} onClick={() => {}} className="video-row">
          <Thumb />
          <div className="video-row__text">
            <span className="t-body-strong">{video.title}</span>
            <span className="t-caption muted">
              {video.length}
              {video.progress === 100 ? ' · Watched' : video.progress ? ` · ${video.progress}%` : ''}
            </span>
          </div>
        </Card>
      ))}
      </div>

      <SectionHeader title="Upcoming live training" actionLabel="See all" onAction={() => {}} />
      <Rail label="Upcoming live training" bleed>
        {events.map((e) => (
          <EventCard key={e.id} e={e} />
        ))}
      </Rail>
    </div>
  );
}

function Live() {
  return (
    <div className="page">
      <SectionHeader title="Live training and events" />
      <div className="stack">
        {events.map((e) => (
          <EventCard key={e.id} e={e} />
        ))}
      </div>
    </div>
  );
}

function Progress() {
  return (
    <div className="page">
      <Card>
        <div className="center">
          <ProgressCircle value={45} label="Courses completed" />
        </div>
      </Card>
      <SectionHeader title="Certificates" />
      <Card>
        <div className="row between">
          <span className="t-body-strong">X5 commissioning</span>
          <span className="t-caption muted">In progress</span>
        </div>
        <ProgressBar value={60} label="X5 commissioning" />
        <span className="t-caption muted">Required before commissioning an X5 system</span>
      </Card>
      <Card>
        <div className="row between">
          <span className="t-body-strong">Reserve installer</span>
          <span className="t-caption success">Certified · ID RSV-2041</span>
        </div>
        <ProgressBar value={100} label="Reserve installer" />
      </Card>
    </div>
  );
}
