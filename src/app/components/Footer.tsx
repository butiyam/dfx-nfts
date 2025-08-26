export default function Footer() {
  return (
    <footer className="w-full bg-black text-gray-300">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
        {/* Left side */}
        <p className="text-sm">
          © {new Date().getFullYear()} Dyfusion. All rights reserved.
        </p>

        {/* Right side */}
        <div className="flex gap-4 mt-2 md:mt-0">
          <a
            href="https://x.com/dyfusionchain?t=XfAWRBVqmgMA_V1uJqgvgQ&s=09"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Twitter
          </a>
          <a
            href="https://t.me/dyfusionchain"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400"
          >
            Telegram
          </a>
          <a
            href="mailto:chatdyfusion@proton.me"
            className="hover:text-blue-400"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
