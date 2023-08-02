import { useEffect, useMemo, useRef, useState } from "react";
import { useScroll } from "react-use";
import { Box, Button, ButtonGroup, Flex, Heading, Spacer, Spinner, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams, Navigate, useSearchParams } from "react-router-dom";
import { nip19 } from "nostr-tools";
import { Global, css } from "@emotion/react";

import { ParsedStream, STREAM_KIND, parseStreamEvent } from "../../../helpers/nostr/stream";
import { useReadRelayUrls } from "../../../hooks/use-client-relays";
import { unique } from "../../../helpers/array";
import { LiveVideoPlayer } from "../../../components/live-video-player";
import StreamChat, { ChatDisplayMode } from "./stream-chat";
import { UserAvatarLink } from "../../../components/user-avatar-link";
import { UserLink } from "../../../components/user-link";
import { useIsMobile } from "../../../hooks/use-is-mobile";
import StreamSummaryContent from "../components/stream-summary-content";
import { ArrowDownSIcon, ArrowUpSIcon, ExternalLinkIcon } from "../../../components/icons";
import useSetColorMode from "../../../hooks/use-set-color-mode";
import { CopyIconButton } from "../../../components/copy-icon-button";
import StreamDebugButton from "../components/stream-debug-button";
import replaceableEventLoaderService from "../../../services/replaceable-event-requester";
import useSubject from "../../../hooks/use-subject";
import RelaySelectionButton from "../../../components/relay-selection/relay-selection-button";
import RelaySelectionProvider from "../../../providers/relay-selection-provider";

function StreamPage({ stream, displayMode }: { stream: ParsedStream; displayMode?: ChatDisplayMode }) {
  const isMobile = useIsMobile();
  const scrollBox = useRef<HTMLDivElement | null>(null);
  const scrollState = useScroll(scrollBox);

  const renderActions = () => {
    const toggleButton =
      scrollState.y === 0 ? (
        <Button
          size="sm"
          onClick={() => scrollBox.current?.scroll(0, scrollBox.current.scrollHeight)}
          leftIcon={<ArrowDownSIcon />}
        >
          View Chat
        </Button>
      ) : (
        <Button size="sm" onClick={() => scrollBox.current?.scroll(0, 0)} leftIcon={<ArrowUpSIcon />}>
          View Stream
        </Button>
      );

    return (
      <ButtonGroup>
        {isMobile && toggleButton}
        {!isMobile && (
          <CopyIconButton
            text={location.href + "?displayMode=log&colorMode=dark"}
            aria-label="Copy chat log URL"
            title="Copy chat log URL"
            size="sm"
          />
        )}
        <Button
          rightIcon={<ExternalLinkIcon />}
          size="sm"
          onClick={() => {
            const w = 512;
            const h = 910;
            const y = window.screenTop + window.innerHeight - h;
            const x = window.screenLeft + window.innerWidth - w;
            window.open(location.href + "?displayMode=popup", "_blank", `width=${w},height=${h},left=${x},top=${y}`);
          }}
        >
          Open
        </Button>
      </ButtonGroup>
    );
  };

  return (
    <Flex
      h="full"
      overflowX="hidden"
      overflowY="auto"
      direction={isMobile ? "column" : "row"}
      p={isMobile || !!displayMode ? 0 : "2"}
      gap={isMobile ? 0 : "4"}
      ref={scrollBox}
    >
      {displayMode && (
        <Global
          styles={css`
            body {
              background: transparent;
            }
          `}
        />
      )}
      {!displayMode && (
        <Flex gap={isMobile ? "2" : "4"} direction="column" flexGrow={isMobile ? 0 : 1}>
          <LiveVideoPlayer
            stream={stream.streaming || stream.recording}
            autoPlay={!!stream.streaming}
            poster={stream.image}
            maxH="100vh"
          />
          <Flex gap={isMobile ? "2" : "4"} alignItems="center" p={isMobile ? "2" : 0}>
            <UserAvatarLink pubkey={stream.host} noProxy />
            <Box>
              <Heading size="md">
                <UserLink pubkey={stream.host} />
              </Heading>
              <Text>{stream.title}</Text>
            </Box>
            <Spacer />
            <StreamDebugButton stream={stream} variant="ghost" />
            <RelaySelectionButton />
            <Button as={RouterLink} to="/streams">
              Back
            </Button>
          </Flex>
          <StreamSummaryContent stream={stream} px={isMobile ? "2" : 0} />
        </Flex>
      )}
      <StreamChat
        stream={stream}
        flexGrow={1}
        maxW={isMobile || !!displayMode ? undefined : "lg"}
        maxH="100vh"
        minH={isMobile ? "100vh" : undefined}
        flexShrink={0}
        actions={renderActions()}
        displayMode={displayMode}
      />
    </Flex>
  );
}

export default function StreamView() {
  const { naddr } = useParams();
  const [params] = useSearchParams();
  useSetColorMode();

  if (!naddr) return <Navigate replace to="/streams" />;

  const readRelays = useReadRelayUrls();
  const [streamRelays, setStreamRelays] = useState<string[]>([]);

  const subject = useMemo(() => {
    try {
      const parsed = nip19.decode(naddr);
      if (parsed.type !== "naddr") throw new Error("Invalid stream address");
      if (parsed.data.kind !== STREAM_KIND) throw new Error("Invalid stream kind");

      const addrRelays = parsed.data.relays ?? [];
      return replaceableEventLoaderService.requestEvent(
        unique([...readRelays, ...streamRelays, ...addrRelays]),
        parsed.data.kind,
        parsed.data.pubkey,
        parsed.data.identifier,
        true
      );
    } catch (e) {
      console.log(e);
    }
  }, [naddr, streamRelays.join("|")]);

  const streamEvent = useSubject(subject);
  const stream = useMemo(() => streamEvent && parseStreamEvent(streamEvent), [streamEvent]);

  // refetch the stream from the correct relays when its loaded to ensure we have the latest
  useEffect(() => {
    if (stream?.relays) setStreamRelays(stream.relays);
  }, [stream?.relays]);

  if (!stream) return <Spinner />;
  return (
    // add snort and damus relays so zap.stream will always see zaps
    <RelaySelectionProvider additionalDefaults={streamRelays}>
      <StreamPage stream={stream} displayMode={(params.get("displayMode") as ChatDisplayMode) ?? undefined} />
    </RelaySelectionProvider>
  );
}