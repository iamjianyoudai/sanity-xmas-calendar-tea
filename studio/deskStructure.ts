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

      // Tea Types grouped view
      S.listItem()
        .title('Tea Types grouped')
        .id('teaTypesGrouped')
        .child(
          S.documentTypeList('teaType')
            .title('Tea Types')
            .child((teaTypeId) =>
              S.documentList()
                .title('Teas in this type')
                .filter('_type == "tea" && category._ref == $typeId')
                .params({typeId: teaTypeId}),
            ),
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !['homepage', 'teaType', 'tea'].includes(listItem.getId() || ''),
      ),
    ])

export default deskStructure
