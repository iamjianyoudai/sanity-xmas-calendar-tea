import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export default defineType({
  name: 'textModule',
  title: 'Text Module',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for this text section',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
      description: 'Rich text content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      content: 'content',
    },
    prepare({title, content}) {
      const firstBlock = content?.[0]
      const textPreview =
        firstBlock?._type === 'block'
          ? firstBlock.children?.map((child: any) => child.text).join('')
          : 'Text content'
      return {
        title: title || 'Text Block',
        subtitle: textPreview ? textPreview.substring(0, 50) + '...' : 'No content',
      }
    },
  },
})
