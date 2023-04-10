import Nav from "@/components/Nav";
import {
  AppShell,
  Header,
  Footer,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  ActionIcon,
  Anchor,
  Flex,
  Title,
  Image,
} from "@mantine/core";
import { useState } from "react";
import { BrandGithub } from "tabler-icons-react";

const CURRENT_YEAR = new Date().getFullYear();

interface Props {
  children: React.ReactNode;
}

export default function App({ children }: Props) {
  const theme = useMantineTheme();
  const [burgerOpened, setBurgerOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colors.dark[8],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Nav
          hidden={!burgerOpened}
          onClick={() => {
            setBurgerOpened((o) => !o);
          }}
        />
      }
      footer={
        <Footer height={40} p="xs">
          <Text fz="sm">
            {"Copyright © "}
            <Anchor color="dimmed" href="https://release-sonar.web.app/">
              Release Sonar
            </Anchor>
            {` ${CURRENT_YEAR}.`}
          </Text>
        </Footer>
      }
      header={
        <Header height={{ base: 50 }} p="md">
          <Flex sx={{ height: "100%" }} justify="space-between" align="center">
            <Flex align="center">
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={burgerOpened}
                  onClick={() => setBurgerOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <Anchor
                href="https://release-sonar.web.app/"
                color={theme.colors.gray[4]}
                underline={false}
              >
                <Flex align="center">
                  <Image
                    src="android-chrome-192x192.png"
                    alt="Release Sonar logo"
                    height={32}
                    width={32}
                    mr="xs"
                  />
                  <Title order={1} size="h2">
                    Release Sonar
                  </Title>
                </Flex>
              </Anchor>
            </Flex>
            <ActionIcon title="GitHub" variant="default">
              <Anchor
                href="https://github.com/justinhchan/release-sonar"
                target="_blank"
                color="white"
                inline
              >
                <BrandGithub size="1rem" />
              </Anchor>
            </ActionIcon>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
