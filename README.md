# Paneful

Paneful is a responsive design testing tool that helps developers visualize their application across multiple device sizes simultaneously.

No more constantly resizing your browser window or switching between device views - see all your breakpoints at once in a customizable layout.

## Why Paneful?

I do all my work from a laptop with no external monitors, and testing responsive designs is a massive pain. Every change meant either resizing my browser window over and over, or clicking through different devices in the dev tools.

Modern websites need to work on everything from phones to massive desktop screens. Trying to catch all those layout bugs by checking one size at a time is tedious and you'll probably miss something. Browser dev tools are great, but flipping between different device sizes is cumbersome, and it's can be hard to spot when something breaks.

So I built Paneful to scratch my own itch. Now I can see my site on a phone, tablet, and desktop all at once. No more tedious resizing or device-switching - just instant feedback when something looks off. Plus, being able to arrange the viewports however I want means I can set up the perfect testing layout for whatever I'm building.

It made my life easier, I hope it does the same for you.

## Features

- Create multiple, resizable viewports in a single window
- Choose from common devices, or resize to fit your needs
- Pan, pinch and zoom to get the layout you want

### Planned Features

- Manual zoom controls
- Put on dockerhub
- Snap to grid
- Save/share layouts
- Layout presets

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- pnpm

### Installation

1. Clone the repository

```bash
git clone https://github.com/danielaweston/paneful.git
cd paneful
```

You can just use `docker compose up -d` and it will build and run it on [http://localhost:3001](http://localhost:3001).

Alternatively, you can run it yourself by doing the following:

2. Install dependencies

```bash
pnpm install
```

3. Start the development server

```bash
pnpm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Enter your website's URL in the address bar
2. Create new panes using the + button
3. Resize panes to match your target device dimensions, or choose from the list of common devices
4. Hold cmd/ctrl to interact/scroll the contents (buggy)
5. Test your responsive design across all viewports simultaneously
6. Your layout will save to local storage between sessions

## Contributing

You're welcome to contribute, I'll be adding improvements and features over time as I go as well.

1. Fork the repository
2. Create a new branch for your feature
3. Make your changes
4. Submit a pull request

## License

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

This project is licensed under the GNU GPL-3.0 License - see the [LICENSE](LICENSE) file for details.
