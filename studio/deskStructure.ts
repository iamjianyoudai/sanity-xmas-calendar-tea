import type {StructureResolver} from 'sanity/structure'

const deskStructure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('homepage').title('Homepage'),

      S.divider(),

      S.documentTypeListItem('teaType').title('Tea Types'),
      S.documentTypeListItem('tea').title('Teas'),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['homepage', 'teaType', 'tea'].includes(listItem.getId() || ''),
      ),
    ])

export default deskStructure
