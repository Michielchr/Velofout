// sanity-schema/post.js
// Dit bestand gebruik je bij het opzetten van je Sanity Studio

export default {
  name: 'post',
  title: 'Blogbericht',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titel',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Publicatiedatum',
      type: 'datetime',
    },
    {
      name: 'category',
      title: 'Categorie',
      type: 'string',
      options: {
        list: [
          { title: 'Ketting', value: 'Ketting' },
          { title: 'Remmen', value: 'Remmen' },
          { title: 'Versnellingen', value: 'Versnellingen' },
          { title: 'E-bike', value: 'E-bike' },
          { title: 'Onderhoud', value: 'Onderhoud' },
          { title: 'Tips', value: 'Tips' },
        ],
      },
    },
    {
      name: 'excerpt',
      title: 'Samenvatting (voor overzicht)',
      type: 'text',
      rows: 3,
    },
    {
      name: 'mainImage',
      title: 'Hoofdafbeelding',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'body',
      title: 'Inhoud',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normaal', value: 'normal' },
            { title: 'Kop 1', value: 'h1' },
            { title: 'Kop 2', value: 'h2' },
            { title: 'Kop 3', value: 'h3' },
            { title: 'Citaat', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Vet', value: 'strong' },
              { title: 'Cursief', value: 'em' },
            ],
          },
        },
        { type: 'image', options: { hotspot: true } },
      ],
    },
    {
      name: 'seoTitle',
      title: 'SEO Titel (optioneel)',
      type: 'string',
      description: 'Laat leeg om de gewone titel te gebruiken',
    },
    {
      name: 'seoDescription',
      title: 'SEO Beschrijving (optioneel)',
      type: 'text',
      rows: 2,
      description: 'Laat leeg om de samenvatting te gebruiken',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      subtitle: 'category',
    },
  },
}
