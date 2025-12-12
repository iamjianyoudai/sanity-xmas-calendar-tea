import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'videoModule',
  title: 'Video Module',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional title for the video',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube or Vimeo video URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'text',
      description: 'Optional caption or description below the video',
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      description: 'Automatically play the video when page loads',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      videoUrl: 'videoUrl',
    },
    prepare({title, videoUrl}) {
      return {
        title: title || 'Video Block',
        subtitle: videoUrl || 'No video URL',
      }
    },
  },
})
