type Props = {
  title: string;
  count: number;
  icon?: React.ReactNode;
};

export default function StatsCard({ title, count, icon }: Props) {
  return (
    <div
      style={{
        flex: '1 1 240px',
        padding: '2rem',
        borderRadius: '16px',
        background: '#15202b',
        boxShadow: '0 6px 14px rgba(0,0,0,0.4)',
        textAlign: 'center',
        color: '#e0e7f0',
      }}
    >
      <div
        style={{
          fontSize: '2.5rem',
          marginBottom: '0.75rem',
          color: '#4fd1c5',
        }}
      >
        {icon}
      </div>
      <h3 style={{ marginBottom: '0.5rem', color: '#a0b1c5' }}>{title}</h3>
      <p style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#e0e7f0' }}>
        {count}
      </p>
    </div>
  );
}