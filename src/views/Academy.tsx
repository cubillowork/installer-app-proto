import { useState } from 'react';
import { Card, ChipGroup, Icon, Link, ProgressBar, ProgressCircle, Rail, SectionHeader } from 'flux-ds';
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
    <Card padding="md" className="event-card">
      <div className="event-date">
        <span className="h2">{e.day}</span>
        <span className="p5-semibold">{e.month}</span>
      </div>
      <span className="p4-semibold event-title">{e.title}</span>
      <div className="row between">
        <span className="p5-regular muted">{e.type}</span>
        <Link>Register</Link>
      </div>
    </Card>
  );
}

function Learn() {
  const [filter, setFilter] = useState<'all' | 'x5' | 'w10' | 'reserve'>('all');
  const v = videos[0];
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
          <span className="p6-semibold eyebrow">CONTINUE LEARNING</span>
          <span className="p3-semibold">{v.title}</span>
          <div className="row">
            <ProgressBar value={60} label="Course progress" />
            <span className="p5-regular muted nowrap">3 of 5 videos</span>
          </div>
        </div>
      </Card>

      <SectionHeader title="Training videos" actionLabel="See all" onAction={() => {}} />
      {videos.map((video) => (
        <Card key={video.id} padding="md" onClick={() => {}} className="video-row">
          <Thumb />
          <div className="video-row__text">
            <span className="p4-semibold">{video.title}</span>
            <span className="p5-regular muted">
              {video.length}
              {video.progress === 100 ? ' · Watched' : video.progress ? ` · ${video.progress}%` : ''}
            </span>
          </div>
        </Card>
      ))}

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
      {events.map((e) => (
        <EventCard key={e.id} e={e} />
      ))}
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
      <Card padding="md">
        <div className="row between">
          <span className="p3-semibold">X5 commissioning</span>
          <span className="p5-regular muted">In progress</span>
        </div>
        <ProgressBar value={60} label="X5 commissioning" />
        <span className="p5-regular muted">Required before commissioning an X5 system</span>
      </Card>
      <Card padding="md">
        <div className="row between">
          <span className="p3-semibold">Reserve installer</span>
          <span className="p5-regular success">Certified · ID RSV-2041</span>
        </div>
        <ProgressBar value={100} label="Reserve installer" />
      </Card>
    </div>
  );
}
