import type { APIRoute, GetStaticPaths } from 'astro';
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const ogPages: Record<string, { title: string; role: string; description: string; tags: string[] }> = {
  home: {
    title: 'Sundeep Dayalan',
    role: 'Senior Software Engineer',
    description: 'Distributed Systems · LLM Infrastructure · Real-Time Fintech',
    tags: ['Python', 'Java', 'React', 'Kafka', 'AWS / GCP', 'LangChain'],
  },
  'media-hits': {
    title: 'Media Coverage',
    role: 'Sundeep Dayalan',
    description: 'TV broadcasts, newspapers & digital features across national media',
    tags: ['TV', 'Print', 'Digital', 'National Media'],
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

// Load font from bundled npm package — reliable at build time
let orbitronFont: ArrayBuffer | null = null;

function loadFont(): ArrayBuffer {
  if (orbitronFont) return orbitronFont;
  const fontPath = resolve('./node_modules/@fontsource/orbitron/files/orbitron-latin-700-normal.woff');
  orbitronFont = readFileSync(fontPath).buffer as ArrayBuffer;
  return orbitronFont;
}

export const GET: APIRoute = async ({ params }) => {
  const data = ogPages[params.slug as string];
  if (!data) return new Response('Not found', { status: 404 });

  const font = loadFont();

  const node = {
    type: 'div',
    props: {
      style: {
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'space-between',
        width: '1200px',
        height: '630px',
        background: '#0a0e14',
        padding: '56px 64px',
        fontFamily: 'Orbitron',
        boxSizing: 'border-box' as const,
        border: '1px solid rgba(0,229,255,0.18)',
      },
      children: [
        // Top bar
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
            children: [
              {
                type: 'span',
                props: {
                  style: { color: 'rgba(0,229,255,0.5)', fontSize: '13px', letterSpacing: '3px' },
                  children: 'SUNDEEP_DAYALAN :: TERMINAL v4.2.1',
                },
              },
              {
                type: 'span',
                props: {
                  style: { color: 'rgba(0,229,255,0.4)', fontSize: '13px', letterSpacing: '2px' },
                  children: 'sundeepdayalan.in',
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
                    color: '#00e5ff',
                    fontSize: '15px',
                    letterSpacing: '4px',
                    marginBottom: '18px',
                  },
                  children: `> ${data.role.toUpperCase()}`,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: '#ffffff',
                    fontSize: data.title.length > 16 ? '58px' : '72px',
                    fontWeight: 700,
                    lineHeight: '1.1',
                    marginBottom: '20px',
                  },
                  children: data.title,
                },
              },
              {
                type: 'div',
                props: {
                  style: {
                    color: '#a0adbc',
                    fontSize: '22px',
                    lineHeight: '1.4',
                    maxWidth: '900px',
                  },
                  children: data.description,
                },
              },
            ],
          },
        },
        // Tags row + signal indicator
        {
          type: 'div',
          props: {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            },
            children: [
              // Tags
              {
                type: 'div',
                props: {
                  style: { display: 'flex', flexDirection: 'row' as const },
                  children: data.tags.map((tag, i) => ({
                    type: 'div',
                    props: {
                      style: {
                        background: 'rgba(0,229,255,0.07)',
                        border: '1px solid rgba(0,229,255,0.25)',
                        color: '#00e5ff',
                        padding: '8px 18px',
                        fontSize: '13px',
                        letterSpacing: '2px',
                        marginRight: i < data.tags.length - 1 ? '10px' : '0',
                      },
                      children: tag,
                    },
                  })),
                },
              },
              // Status
              {
                type: 'div',
                props: {
                  style: {
                    color: '#00ff9d',
                    fontSize: '12px',
                    letterSpacing: '3px',
                  },
                  children: '■ SIGNAL ACTIVE',
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
    fonts: [{ name: 'Orbitron', data: font, weight: 700, style: 'normal' }],
  });

  const png = await sharp(Buffer.from(svg)).png().toBuffer();

  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
