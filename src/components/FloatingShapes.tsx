export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(142, 61, 255, 0.08)' }} />
      <div className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'rgba(140, 59, 255, 0.08)' }} />
      <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl animate-float" style={{ backgroundColor: 'rgba(201, 78, 255, 0.06)' }} />
      <div className="absolute bottom-40 right-1/3 w-64 h-64 rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'rgba(227, 224, 255, 0.06)' }} />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
  <div className="absolute top-0 left-0 w-full h-px animate-pulse-glow" style={{ background: 'linear-gradient(90deg, rgba(28,16,46,0), rgba(94,58,255,0.18), rgba(28,16,46,0))' }} />
  <div className="absolute bottom-0 left-0 w-full h-px animate-pulse-glow" style={{ background: 'linear-gradient(90deg, rgba(28,16,46,0), rgba(140,59,255,0.18), rgba(28,16,46,0))' }} />
  <div className="absolute left-0 top-0 w-px h-full animate-pulse-glow" style={{ background: 'linear-gradient(180deg, rgba(28,16,46,0), rgba(94,58,255,0.18), rgba(28,16,46,0))' }} />
  <div className="absolute right-0 top-0 w-px h-full animate-pulse-glow" style={{ background: 'linear-gradient(180deg, rgba(28,16,46,0), rgba(140,59,255,0.18), rgba(28,16,46,0))' }} />
      </div>
    </div>
  );
}
