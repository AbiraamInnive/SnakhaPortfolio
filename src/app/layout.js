import '@styles/globals.css'

export const metadata = {
  title: 'Snakha Ranjan',
  icons: {
    icon: '/elements/favicon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Snakha Ranjan</title>
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}