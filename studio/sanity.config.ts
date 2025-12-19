import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {media} from 'sanity-plugin-media'
import {schemaTypes} from './schemaTypes'
import deskStructure from './deskStructure'
import {TeaPotIcon} from './icons/TeaIcons'

export default defineConfig({
  name: 'studio',
  title: 'Tea House',
  icon: TeaPotIcon,

  projectId: process.env.SANITY_PROJECT_ID || '3hojl0zw',
  dataset: process.env.SANITY_DATASET || 'production',

  plugins: [structureTool({structure: deskStructure}), visionTool(), media()],

  schema: {
    types: schemaTypes,
  },
})
