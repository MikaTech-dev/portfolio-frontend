import { motion } from 'framer-motion';

export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Shape 1 */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(142, 61, 255, 0.4) 0%, rgba(142, 61, 255, 0) 70%)' }}
        // Drifts right and down, then back
        animate={{ 
          x: [0, 30, -20, 0], 
          y: [0, -50, 20, 0],
          scale: [1, 1.05, 0.95, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Shape 2 */}
      <motion.div
        className="absolute top-40 right-20 w-96 h-96 rounded-full blur-3xl mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(140, 59, 255, 0.4) 0%, rgba(140, 59, 255, 0) 70%)' }}
        // Drifts left and up
        animate={{ 
          x: [0, -40, 20, 0],
          y: [0, 30, -30, 0] 
        }}
        transition={{ duration: 18, repeat: Infinity, delay: 1, ease: 'easeInOut' }}
      />

      {/* Shape 3 */}
      <motion.div
        className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full blur-3xl mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(201, 78, 255, 0.3) 0%, rgba(201, 78, 255, 0) 70%)' }}
        // Drifts diagonally
        animate={{ 
          x: [0, 40, -40, 0],
          y: [0, -20, -40, 0] 
        }}
        transition={{ duration: 20, repeat: Infinity, delay: 2, ease: 'easeInOut' }}
      />

      {/* Shape 4 */}
      <motion.div
        className="absolute bottom-40 right-1/3 w-64 h-64 rounded-full blur-3xl mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(227, 224, 255, 0.3) 0%, rgba(227, 224, 255, 0) 70%)' }}
         // Subtle drift
        animate={{ 
          x: [0, -20, 20, 0], 
          y: [0, 20, -20, 0] 
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 3, ease: 'easeInOut' }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(28,16,46,0), rgba(94,58,255,0.18), rgba(28,16,46,0))' }} />
        <div className="absolute bottom-0 left-0 w-full h-px" style={{ background: 'linear-gradient(90deg, rgba(28,16,46,0), rgba(140,59,255,0.18), rgba(28,16,46,0))' }} />
        <div className="absolute left-0 top-0 w-px h-full" style={{ background: 'linear-gradient(180deg, rgba(28,16,46,0), rgba(94,58,255,0.18), rgba(28,16,46,0))' }} />
        <div className="absolute right-0 top-0 w-px h-full" style={{ background: 'linear-gradient(180deg, rgba(28,16,46,0), rgba(140,59,255,0.18), rgba(28,16,46,0))' }} />
      </div>
    </div>
  );
}