import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teaType',
  title: 'Tea Type',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+|-+$/g, ''),
      },
      description: 'Used to fetch this tea type (e.g. green-tea).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Tea Type Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Optional image; can be replaced by local asset in frontend.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'relatedTeas',
      title: 'More from this Tea (e.g. Green Tea)',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'tea'}]}],
      description:
        'Collection of teas to surface in the modal. Can also be queried via tea.category reference.',
    }),
    defineField({
      name: 'flavorNotes',
      title: 'Flavor Notes',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'brewingInstructions',
      title: 'Brewing Instructions',
      type: 'object',
      fields: [
        defineField({
          name: 'amount',
          title: 'Amount',
          type: 'string',
        }),
        defineField({
          name: 'temperature',
          title: 'Temperature',
          type: 'string',
        }),
        defineField({
          name: 'steepTime',
          title: 'Steep Time',
          type: 'string',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
      subtitle: 'description',
    },
  },
})
