import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'teaType',
  title: 'Tea Types',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Tea Type Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'relatedTeas',
      title: 'Related teas',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'tea'}],
          options: {
            // Show only teas whose category matches this tea type
            filter: ({document}: {document?: {_id?: string}}) => {
              const baseId = document?._id?.replace(/^drafts\./, '')
              return {
                filter: 'category._ref in [$draftId, $publishedId]',
                params: {
                  draftId: baseId ? `drafts.${baseId}` : '',
                  publishedId: baseId || '',
                },
              }
            },
          },
        },
      ],
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
