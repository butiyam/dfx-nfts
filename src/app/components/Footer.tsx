export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        {/* Left side */}
        <p className="text-sm">
          © {new Date().getFullYear()} 🚀 MyApp. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            GitHub
          </a>
          <a
            href="mailto:contact@myapp.com"
            className="hover:text-blue-400"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
