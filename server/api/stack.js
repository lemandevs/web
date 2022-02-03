export default async (req, res) => {
  return [
    {
      id: 'node',
      name: 'NodeJS',
      description: "I'm really familiar with NodeJS and all its ecosystem.",
      url: 'https://nodejs.org/',
    },
    {
      id: 'js',
      name: 'JavaScript',
      description:
        'I am confident of my Javascript skills and am always learning more',
      url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_is_JavaScript',
    },
    {
      id: 'html',
      name: 'HTML',
      description:
        'Obviously I have knowledge on the standard markup language for Web pages, what else?',
      url: 'https://www.w3schools.com/html/',
    },
    {
      id: 'css',
      name: 'CSS',
      description:
        'CSS is Awesome, it can be as lovely as poetry or frightening like a scary movie.',
      url: 'https://css-tricks.com/',
    },
  ]
}
