export default async (req, res) => {
  return [
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
    },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'gl', name: 'Galician', nativeName: 'Galego' },
  ]
}
