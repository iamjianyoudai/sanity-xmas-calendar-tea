import {defineField, defineType} from 'sanity'
import {OlistIcon} from '@sanity/icons'

export default defineType({
  name: 'brewingInstructionsModule',
  title: 'Brewing Instructions Module',
  type: 'object',
  icon: OlistIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the brewing instructions section',
    }),
    defineField({
      name: 'amount',
      title: 'Amount',
      type: 'string',
      description: 'Tea amount (e.g., ~1g tea per 100ml water)',
    }),
    defineField({
      name: 'temperature',
      title: 'Temperature',
      type: 'string',
      description: 'Brewing temperature (e.g., 75-80°C)',
    }),
    defineField({
      name: 'steepTime',
      title: 'Steep Time',
      type: 'string',
      description: 'Steeping time (e.g., 45s - 2m)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      temperature: 'temperature',
      steepTime: 'steepTime',
    },
    prepare({title, temperature, steepTime}) {
      const details = [temperature, steepTime].filter(Boolean).join(' • ')
      return {
        title: title || 'Brewing Instructions',
        subtitle: details || 'No details',
      }
    },
  },
})
