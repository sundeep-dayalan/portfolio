import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const ogPages: Record<string, { title: string; role: string; description: string; tags: string[] }> = {
  home: {
    title: 'Sundeep Dayalan',
    role: 'Software Development Engineer II — AWS',
    description: 'Distributed Systems · AI Infrastructure · Real-Time Cloud Platforms',
    tags: ['Python', 'Java', 'React', 'Kafka', 'AWS', 'LangChain'],
  },
  'media-hits': {
    title: 'Media Coverage',
    role: 'Sundeep Dayalan',
    description: 'TV broadcasts, newspapers & digital features across national media',
    tags: ['TV', 'Print', 'Digital', 'National Media'],
  },
  'sentient-trader': {
    title: 'Sentient Trader',
    role: 'Autonomous AI Trading Agent',
    description: 'LangGraph + Groq LLaMA 3.1 agent that reads live market news and trades on its own',
    tags: ['Python', 'LangGraph', 'Groq', 'Alpaca API'],
  },
  'sky-bms': {
    title: 'SkyBMS AI',
    role: 'Battery Management System',
    description: 'AI-powered real-time cloud analytics for lithium-ion battery safety & lifespan',
    tags: ['Python', 'ML', 'IoT', 'Cloud Analytics'],
  },
  'web-hunter': {
    title: 'Web Hunter',
    role: 'Web Reconnaissance Tool',
    description: 'Python GUI tool for DNS enumeration & SSL certificate analysis',
    tags: ['Python', 'DNS', 'SSL', 'Security'],
  },
  'robotic-arm': {
    title: 'Robotic Arm',
    role: 'Computer Vision · Robotics',
    description: 'TensorFlow-powered arm that autonomously detects and organizes objects',
    tags: ['Python', 'TensorFlow', 'Computer Vision', 'Servo Control'],
  },
  'toolkit-for-whatsapp': {
    title: 'Toolkit for WhatsApp',
    role: 'Android Application',
    description: '7-module all-in-one WhatsApp toolkit — 1M+ downloads on Play Store',
    tags: ['Android', 'Java', 'Firebase', 'Media APIs'],
  },
  'smart-traffic': {
    title: 'Smart Traffic System',
    role: 'ML · Computer Vision · IoT',
    description: 'City-scale traffic management across 50+ intersections — Springer publication & patent',
    tags: ['TensorFlow', 'C++', 'Node.js', 'IoT'],
  },
  'multi-agent-finance': {
    title: 'Multi-Agent AI',
    role: 'Agentic AI Financial Platform',
    description: '5-agent LangGraph pipeline · 93% RAG accuracy · sub-100ms · 2.5% monthly ROI',
    tags: ['LangChain', 'LangGraph', 'Azure', 'Plaid API'],
  },
  'mindkeep': {
    title: 'MindKeep',
    role: 'AI-Powered Second Brain',
    description: '100% local AI Chrome extension — Gemini Nano, semantic search, encrypted notes',
    tags: ['TypeScript', 'Gemini Nano', 'Chrome MV3', 'Transformers.js'],
  },
  'smart-home': {
    title: 'Smart Home',
    role: 'IoT Automation System',
    description: 'Affordable home automation with voice control, energy monitoring & Android companion app',
    tags: ['Arduino', 'IoT', 'Firebase', 'Android'],
  },
};

export const getStaticPaths: GetStaticPaths = () =>
  Object.keys(ogPages).map(slug => ({ params: { slug } }));

// Load fonts from bundled npm packages — reliable at build time
let displayFont: ArrayBuffer | null = null;
let monoFont: ArrayBuffer | null = null;

function loadFonts(): { display: ArrayBuffer; mono: ArrayBuffer } {
  if (!displayFont) {
    displayFont = readFileSync(
      resolve('./node_modules/@fontsource/space-grotesk/files/space-grotesk-latin-700-normal.woff')
    ).buffer as ArrayBuffer;
  }
  if (!monoFont) {
    monoFont = readFileSync(
      resolve('./node_modules/@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff')
    ).buffer as ArrayBuffer;
  }
  return { display: displayFont, mono: monoFont };
}

const ACCENT = '#00f0ff';
const MUTED = '#888888';
const BORDER = '#222222';

export const GET: APIRoute = async ({ params }) => {
  const data = ogPages[params.slug as string];
  if (!data) return new Response('Not found', { status: 404 });

  const { display, mono } = loadFonts();

  const node = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        width: '1200px',
        height: '630px',
        background: '#000000',
        padding: '56px 64px',
        fontFamily: 'Space Grotesk',
        boxSizing: 'border-box' as const,
        border: `1px solid ${BORDER}`,
        position: 'relative' as const,
      },
      children: [
        // Faint vertical grid lines
        ...[300, 600, 900].map((x) => ({
          type: 'div',
          props: {
            style: {
              position: 'absolute' as const,
              left: `${x}px`,
              top: '0px',
              width: '1px',
              height: '630px',
              background: 'rgba(240,240,240,0.05)',
            },
          },
        })),
        // Accent line along the top edge
        {
          type: 'div',
          props: {
            style: {
              position: 'absolute' as const,
              left: '0px',
              top: '0px',
              width: '220px',
              height: '3px',
              background: ACCENT,
            },
          },
        },
        // Top bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'JetBrains Mono',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', alignItems: 'center' },
                  children: [
                    { type: 'span', props: { style: { color: '#f0f0f0', fontSize: '26px', fontFamily: 'Space Grotesk' }, children: 'SD' } },
                    { type: 'span', props: { style: { color: ACCENT, fontSize: '26px', fontFamily: 'Space Grotesk' }, children: '.' } },
                  ],
                },
              },
              {
                type: 'span',
                props: {
                  style: { color: MUTED, fontSize: '14px', letterSpacing: '4px' },
                  children: 'SUNDEEPDAYALAN.IN',
                },
              },
            ],
          },
        },
        // Main content
        {
          type: 'div',
          props: {
            style: { display: 'flex', flexDirection: 'column' as const },
            children: [
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    color: ACCENT,
                    fontSize: '16px',
                    letterSpacing: '5px',
                    marginBottom: '20px',
                    fontFamily: 'JetBrains Mono',
                  },
                  children: `/ ${data.role.toUpperCase()}`,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: '#f0f0f0',
                    fontSize: data.title.length > 16 ? '64px' : '84px',
                    fontWeight: 700,
                    lineHeight: '1.02',
                    letterSpacing: '-3px',
                    marginBottom: '22px',
                    textTransform: 'uppercase' as const,
                  },
                  children: data.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: MUTED,
                    fontSize: '21px',
                    lineHeight: '1.5',
                    maxWidth: '900px',
                    fontFamily: 'JetBrains Mono',
                  },
                  children: data.description,
                },
              },
            ],
          },
        },
        // Tags row + status
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            children: [
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'row' as const },
                  children: data.tags.map((tag, i) => ({
                    type: 'div',
                    props: {
                      style: {
                        background: '#0a0a0a',
                        border: `1px solid ${BORDER}`,
                        color: MUTED,
                        padding: '9px 18px',
                        fontSize: '13px',
                        letterSpacing: '2px',
                        marginRight: i < data.tags.length - 1 ? '10px' : '0',
                        fontFamily: 'JetBrains Mono',
                      },
                      children: tag.toUpperCase(),
                    },
                  })),
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    display: 'flex',
                    alignItems: 'center',
                    color: ACCENT,
                    fontSize: '13px',
                    letterSpacing: '4px',
                    fontFamily: 'JetBrains Mono',
                  },
                  children: '/ BELLEVUE, WA',
                },
              },
            ],
          },
        },
      ],
    },
  };

  const svg = await satori(node as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: 'Space Grotesk', data: display, weight: 700, style: 'normal' },
      { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' },
    ],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
