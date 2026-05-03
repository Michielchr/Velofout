// sanity-schema/diagnose.js
// Schema voor de fiets diagnose kennisbank
// Voeg dit toe aan je Sanity Studio schemas/index.js

export default {
  name: 'diagnose',
  title: 'Diagnose Kennisbank',
  type: 'document',
  fields: [
    {
      name: 'onderdeel',
      title: 'Fietsonderdeel',
      type: 'string',
      options: {
        list: [
          'Ketting', 'Remmen', 'Versnellingen', 'Trapas',
          'Wielen', 'Banden', 'Stuur', 'Zadel',
          'Voorvork', 'Pedalen', 'Weet ik niet',
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'symptoom',
      title: 'Symptoom / Klacht',
      type: 'string',
      options: {
        list: [
          'Knerpend geluid', 'Klikgeluid', 'Piepend geluid', 'Trillingen',
          'Slechte schakelkwaliteit', 'Slechte remwerking', 'Wiel loopt scheef',
          'Iets zit los', 'Andere klacht',
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'ernst',
      title: 'Ernst',
      type: 'string',
      options: {
        list: [
          { title: '🟢 Veilig — gewoon doorrijden', value: '🟢' },
          { title: '🟡 Voorzichtig — snel repareren', value: '🟡' },
          { title: '🔴 Niet mee rijden — direct stoppen', value: '🔴' },
        ],
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'ernstLabel',
      title: 'Ernst omschrijving',
      type: 'string',
      description: 'Bijv: "Rij voorzichtig" of "Niet mee rijden"',
      validation: Rule => Rule.required(),
    },
    {
      name: 'oorzaak',
      title: 'Waarschijnlijke oorzaak',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required(),
    },
    {
      name: 'oplossing',
      title: 'Oplossing stappen',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Voeg stap voor stap de oplossing toe',
      validation: Rule => Rule.required().min(1),
    },
    {
      name: 'benodigdheden',
      title: 'Benodigdheden',
      type: 'string',
      description: 'Bijv: "Kettingolie, inbussleutel, doek"',
    },
    {
      name: 'winkel',
      title: 'Advies fietswinkel',
      type: 'string',
      description: 'Wanneer moet iemand naar de fietswinkel?',
    },
  ],
  preview: {
    select: {
      title: 'onderdeel',
      subtitle: 'symptoom',
      ernst: 'ernst',
    },
    prepare({ title, subtitle, ernst }) {
      return {
        title: `${ernst || ''} ${title || '?'} — ${subtitle || '?'}`,
      };
    },
  },
};
