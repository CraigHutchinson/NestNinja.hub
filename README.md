# NestNinja Hub

> **Status: Planned — not yet in development.**

NestNinja Hub is a client-side camera feed discovery site that will allow bird box owners to optionally list their live NestNinja camera feeds for others to browse and enjoy.

## Concept

- Browse and search live NestNinja bird box camera feeds
- Camera owners explicitly opt-in to listing their feed
- Client-side only — no server-side compute
- Real-time data via Firebase (or equivalent)

## Architecture

No implementation decisions have been made yet. Architecture will be defined via ADRs before development begins.

Key questions to resolve via ADR:
- Data model and database choice (Firebase preferred starting point)
- Authentication and privacy model
- Domain / subdomain strategy
- Embed / stream URL approach
- Hosting and deployment

## Local Development

### Prerequisites

| Requirement | Version | Install |
|---|---|---|
| [Ruby](https://www.ruby-lang.org/en/downloads/) | 3.1+ | Windows: [RubyInstaller](https://rubyinstaller.org/downloads/) · macOS/Linux: [rbenv](https://github.com/rbenv/rbenv) |
| [Bundler](https://bundler.io/) | 2.x | `gem install bundler` |
| [Jekyll](https://jekyllrb.com/docs/installation/) | 4.x | Installed automatically via `bundle install` |

### Setup

```bash
# From the NestNinja.hub directory
bundle install

# Serve this site only
bundle exec jekyll serve --livereload --port 4001

# View the site at:
#   http://localhost:4001
```

### Running Both Sites Together

To test cross-site links, run **NestNinja.uk** (port 4000) alongside
**NestNinja.hub** (port 4001). Serve each in a separate terminal using
the local config override:

```bash
# Terminal 1 — NestNinja.uk checkout
# (run from within your NestNinja.uk directory)
bundle exec jekyll serve --livereload --livereload-port 35729 --port 4000 \
  --config _config.yml,_config.local.yml

# Terminal 2 — NestNinja.hub checkout (this repo)
bundle exec jekyll serve --livereload --livereload-port 35730 --port 4001 \
  --config _config.yml,_config.local.yml
```

| Site          | Local URL                   |
|---------------|-----------------------------|
| NestNinja.uk  | <http://localhost:4000>     |
| NestNinja.hub | <http://localhost:4001>     |

Cross-site links (`Get a NestNinja →`, `Discover the Hub →`) will
resolve between the two local servers.

## Links

- **Website:** [nestninja.uk](https://nestninja.uk)
- **Firmware (Community Edition):** [NestNinja.open](https://github.com/CraigHutchinson/NestNinja.open)
- **Contact:** hello@nestninja.uk
