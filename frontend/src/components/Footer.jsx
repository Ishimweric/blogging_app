const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-sm text-gray-700 dark:text-gray-100 text-center fixed w-full bottom-0 bg-gray-100 dark:bg-gray-900 py-2">&copy;{currentYear} NoteDown. All Rights Reserved</footer>
  )
}

export default Footer
