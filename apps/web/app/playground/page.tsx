import {
  Badge,
  Button,
  Container,
  Heading,
  IconButton,
  Section,
  Text,
} from "@portfolio/ui";

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen bg-background">

      {/* Header */}

      <Section className="pb-12">
        <Container>

          <Badge variant="accent">
            UI PLAYGROUND
          </Badge>

          <Heading
            level="display"
            className="mt-6 max-w-4xl"
          >
            Portfolio OS
          </Heading>

          <Text
            size="body-lg"
            className="mt-6 max-w-2xl text-text-secondary"
          >
            Laboratoire visuel du Design System de notre portfolio.
          </Text>

        </Container>
      </Section>


      {/* Typography */}

      <Section className="border-t border-border">
        <Container>

          <Badge>
            Typography
          </Badge>

          <div className="mt-12 space-y-12">

            <div>
              <Text
                size="caption"
                className="mb-4 text-text-muted"
              >
                DISPLAY
              </Text>

              <Heading level="display">
                Display Heading
              </Heading>
            </div>


            <div>
              <Text
                size="caption"
                className="mb-4 text-text-muted"
              >
                H1
              </Text>

              <Heading level="h1">
                Heading level one
              </Heading>
            </div>


            <div>
              <Text
                size="caption"
                className="mb-4 text-text-muted"
              >
                H2
              </Text>

              <Heading level="h2">
                Heading level two
              </Heading>
            </div>


            <div>
              <Text
                size="caption"
                className="mb-4 text-text-muted"
              >
                H3
              </Text>

              <Heading level="h3">
                Heading level three
              </Heading>
            </div>


            <div>
              <Text
                size="caption"
                className="mb-4 text-text-muted"
              >
                BODY
              </Text>

              <Text
                size="body-lg"
                className="max-w-2xl"
              >
                We create digital experiences, visual identities and
                interfaces that combine clarity, strategy and emotion.
              </Text>
            </div>


            <div>
              <Text
                size="caption"
                className="mb-4 text-text-muted"
              >
                SIGNATURE
              </Text>

              <p className="font-signature text-5xl">
                Signature
              </p>
            </div>

          </div>

        </Container>
      </Section>


      {/* Buttons */}

      <Section className="border-t border-border">
        <Container>

          <Badge>
            Buttons
          </Badge>

          <div className="mt-10 flex flex-wrap gap-4">

            <Button variant="primary">
              Primary
            </Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="outline">
              Outline
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>

          </div>


          <div className="mt-6 flex flex-wrap items-center gap-4">

            <Button size="sm">
              Small
            </Button>

            <Button size="md">
              Medium
            </Button>

            <Button size="lg">
              Large
            </Button>

          </div>

        </Container>
      </Section>


      {/* Badges */}

      <Section className="border-t border-border">
        <Container>

          <Badge>
            Badges
          </Badge>

          <div className="mt-10 flex flex-wrap gap-4">

            <Badge>
              Web Design
            </Badge>

            <Badge variant="accent">
              Available for work
            </Badge>

            <Badge variant="outline">
              Branding
            </Badge>

            <Badge variant="dark">
              2026
            </Badge>

          </div>

        </Container>
      </Section>


      {/* Icon Buttons */}

      <Section className="border-t border-border">
        <Container>

          <Badge>
            Icon Buttons
          </Badge>

          <div className="mt-10 flex flex-wrap items-center gap-4">

            <IconButton aria-label="Previous">
              ←
            </IconButton>

            <IconButton
              variant="secondary"
              aria-label="Next"
            >
              →
            </IconButton>

            <IconButton
              variant="outline"
              aria-label="Open"
            >
              ↗
            </IconButton>

            <IconButton
              variant="primary"
              aria-label="Add"
            >
              +
            </IconButton>

          </div>

        </Container>
      </Section>


      {/* Colors */}

      <Section className="border-t border-border">
        <Container>

          <Badge>
            Colors
          </Badge>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">

            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-background border border-border" />
              <Text size="caption">
                Background
              </Text>
            </div>

            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-surface border border-border" />
              <Text size="caption">
                Surface
              </Text>
            </div>

            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-text-primary" />
              <Text size="caption">
                Primary
              </Text>
            </div>

            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-text-secondary" />
              <Text size="caption">
                Secondary
              </Text>
            </div>

            <div className="space-y-3">
              <div className="h-24 rounded-lg bg-accent" />
              <Text size="caption">
                Accent
              </Text>
            </div>

          </div>

        </Container>
      </Section>

    </main>
  );
}