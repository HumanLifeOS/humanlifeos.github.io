---
outline: deep
footer: false
prev: false
next: false
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const creator = [
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-founder',
    name: 'HLOS Founder',
    title: 'Life OS Architect',
    desc: 'Mindfulness Practitioner · Neuroscience Researcher · Life Intelligence System Architect',
    links: [
      { icon: 'github', link: 'https://github.com/HumanLifeOS' }
    ]
  }
]

const teamMembers = [
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-ai',
    name: 'AI Lead',
    title: 'AI Engineer',
    desc: 'LLM Architect · Agent System Developer · Knowledge Graph Engineer',
    links: [
      { icon: 'github', link: 'https://github.com/HumanLifeOS' }
    ]
  },
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-psy',
    name: 'Psychology Lead',
    title: 'Clinical Psychologist',
    desc: 'CBT Expert · Emotion Regulation Researcher · Mindfulness Teacher',
    links: [
      { icon: 'github', link: 'https://github.com/HumanLifeOS' }
    ]
  },
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-neuro',
    name: 'Neuroscience Researcher',
    title: 'Neuroscientist',
    org: 'University Life Sciences',
    desc: 'Brain Plasticity Research · Neural Correlates of Consciousness',
    links: []
  },
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-cog',
    name: 'Cognitive Science Researcher',
    title: 'Cognitive Scientist',
    org: 'University Psychology Dept',
    desc: 'Attention Mechanisms · Metacognition Training',
    links: []
  },
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-dev',
    name: 'Full-Stack Developer',
    title: 'Software Engineer',
    desc: 'Full-Stack Development · System Architecture · Toolchain',
    links: [
      { icon: 'github', link: 'https://github.com/HumanLifeOS' }
    ]
  },
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-partner1',
    name: 'Philosophy Researcher',
    title: 'PhD in Philosophy',
    org: 'Eastern Philosophy Institute',
    desc: 'Eastern Life Wisdom · Zen Culture Research',
    links: []
  },
  {
    avatar: 'https://api.dicebear.com/7.x/shapes/svg?seed=hlos-partner2',
    name: 'AI Researcher',
    title: 'AI Researcher',
    org: 'AI Research Lab',
    desc: 'Human-AI Collaborative Intelligence · Life Intelligence Models',
    links: []
  }
]
</script>

# About HumanLifeOS

HumanLifeOS is dedicated to building a scientific, engineered, lifestyle-integrated, and systematic **Human Life Intelligence Operating System**, helping humans upgrade from "Instinct OS" to "Intelligence OS" and achieve life intelligence evolution.

---

## Core Values {#values}

- **Awareness**: Seeing the true operation of life
- **Science**: Exploring life patterns with empirical methods
- **Openness**: Sharing knowledge, win-win cooperation
- **Evolution**: Continuous growth, transcendence of self

---

## Founder {#creator}

<VPTeamMembers size="medium" :members="creator" />

---

## Team {#team}

<VPTeamMembers size="small" :members="teamMembers" />

---

## Contact

- Email: contact@humanlifeos.com
- GitHub: [HumanLifeOS](https://github.com/HumanLifeOS)

## Join Us

We welcome passionate volunteers to join our team in the cross-disciplinary fields of life sciences, psychology, and artificial intelligence.
