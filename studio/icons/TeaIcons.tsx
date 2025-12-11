import React from 'react'

// Static asset imports are handled by the Studio bundler.
// @ts-expect-error bundler provides typing for static assets
import cupOfTeaIcon from './assets/cup-of-tea.png'
// @ts-expect-error bundler provides typing for static assets
import teaLeaves from './assets/teaLeaves.png'
// @ts-expect-error bundler provides typing for static assets
import teaPotIcon from './assets/teaPot.png'

export const TeaIcon = () =>
  React.createElement('img', {
    src: cupOfTeaIcon as string,
    alt: 'Tea',
    style: {width: '1.2em', height: '1.2em', objectFit: 'contain'},
  })

export const TeaTypeIcon = () =>
  React.createElement('img', {
    src: teaLeaves as string,
    alt: 'Tea type',
    style: {width: '1.2em', height: '1.2em', objectFit: 'contain'},
  })

export const TeaPotIcon = () =>
  React.createElement('img', {
    src: teaPotIcon as string,
    alt: 'Tea pot',
    style: {width: '1.2em', height: '1.2em', objectFit: 'contain'},
  })
