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

## Links

- **Website:** [nestninja.uk](https://nestninja.uk)
- **Firmware (Community Edition):** [NestNinja.open](https://github.com/CraigHutchinson/NestNinja.open)
- **Contact:** hello@nestninja.uk
