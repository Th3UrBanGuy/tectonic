import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') || 'Techtonic';
  const subtitle = searchParams.get('subtitle') || 'Foundation of Future';
  const theme = searchParams.get('theme') || 'dark';

  const bg = theme === 'dark' ? '#000000' : '#f8fafc';
  const fg = theme === 'dark' ? '#ffffff' : '#0f172a';
  const accent = '#14b8a6';
  const muted = theme === 'dark' ? '#6b7280' : '#94a3b8';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 80,
          backgroundColor: bg,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(90deg, ${accent}, #a855f7, #f97316)`,
          }}
        />

        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 400,
            height: 400,
            opacity: theme === 'dark' ? 0.05 : 0.03,
            backgroundImage: `repeating-linear-gradient(${accent} 0px, transparent 1px, transparent 40px, ${accent} 40px, ${accent} 41px), repeating-linear-gradient(90deg, ${accent} 0px, transparent 1px, transparent 40px, ${accent} 40px, ${accent} 41px)`,
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 100,
            right: 100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
          }}
        />

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: accent,
              textTransform: 'uppercase',
            }}
          >
            Tectonic Industries
          </div>
          <div
            style={{
              fontSize: 64,
              fontFamily: 'sans-serif',
              fontWeight: 800,
              color: fg,
              lineHeight: 1.1,
              maxWidth: 800,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 24,
              fontFamily: 'sans-serif',
              fontWeight: 400,
              color: muted,
              marginTop: 8,
            }}
          >
            {subtitle}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 40,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: `1px solid ${theme === 'dark' ? '#ffffff15' : '#00000010'}`,
            paddingTop: 20,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontFamily: 'monospace',
              color: muted,
            }}
          >
            tect0nic.com
          </div>
          <div
            style={{
              fontSize: 14,
              fontFamily: 'monospace',
              color: accent,
            }}
          >
            Software • Security • Robotics
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
