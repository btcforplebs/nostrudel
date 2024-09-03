import _throttle from "lodash.throttle";

import Subject from "../classes/subject";
import SuperMap from "../classes/super-map";
import { NostrEvent } from "../types/nostr-event";
import relayInfoService from "./relay-info";
import { localRelay } from "./local-relay";
import { MONITOR_STATS_KIND, SELF_REPORTED_KIND, getRelayURL } from "../helpers/nostr/relay-stats";
import relayPoolService from "./relay-pool";
import { Filter } from "nostr-tools";
import { alwaysVerify } from "./verify-event";

const MONITOR_PUBKEY = "151c17c9d234320cf0f189af7b761f63419fd6c38c6041587a008b7682e4640f";
const MONITOR_RELAY = "wss://history.nostr.watch";

class RelayStatsService {
  private selfReported = new SuperMap<string, Subject<NostrEvent | null>>(() => new Subject());
  private monitorStats = new SuperMap<string, Subject<NostrEvent>>(() => new Subject());

  constructor() {
    // load all stats from cache and subscribe to future ones
    localRelay?.subscribe([{ kinds: [SELF_REPORTED_KIND, MONITOR_STATS_KIND] }], {
      onevent: (e) => this.handleEvent(e, false),
    });
  }

  handleEvent(event: NostrEvent, cache = true) {
    if (!alwaysVerify(event)) return;

    // ignore all events before NIP-66 start date
    if (event.created_at < 1704196800) return;

    const relay = getRelayURL(event);
    if (!relay) return;

    const sub = this.monitorStats.get(relay);
    if (event.kind === SELF_REPORTED_KIND) {
      if (!sub.value || event.created_at > sub.value.created_at) {
        sub.next(event);
        if (cache && localRelay) localRelay.publish(event);
      }
    } else if (event.kind === MONITOR_STATS_KIND) {
      if (!sub.value || event.created_at > sub.value.created_at) {
        sub.next(event);
        if (cache && localRelay) localRelay.publish(event);
      }
    }
  }

  requestSelfReported(relay: string) {
    const sub = this.selfReported.get(relay);

    if (sub.value === undefined) {
      relayInfoService.getInfo(relay).then((info) => {
        if (!info.pubkey) return sub.next(null);

        const filter: Filter = { kinds: [SELF_REPORTED_KIND], authors: [info.pubkey] };
        const subscription = relayPoolService
          .requestRelay(MONITOR_RELAY)
          .subscribe([filter], { onevent: (event) => this.handleEvent(event), oneose: () => subscription.close() });
      });
    }

    return sub;
  }

  requestMonitorStats(relay: string) {
    const sub = this.monitorStats.get(relay);

    if (sub.value === undefined) {
      this.pendingMonitorStats.add(relay);
      this.throttleBatchRequestMonitorStats();
    }
    return sub;
  }

  throttleBatchRequestMonitorStats = _throttle(this.batchRequestMonitorStats, 200);
  pendingMonitorStats = new Set<string>();
  private batchRequestMonitorStats() {
    const relays = Array.from(this.pendingMonitorStats);

    const filter: Filter = { since: 1704196800, kinds: [MONITOR_STATS_KIND], "#d": relays, authors: [MONITOR_PUBKEY] };
    const sub = relayPoolService
      .requestRelay(MONITOR_RELAY)
      .subscribe([filter], { onevent: (event) => this.handleEvent(event), oneose: () => sub.close() });

    this.pendingMonitorStats.clear();
  }
}

const relayStatsService = new RelayStatsService();

if (import.meta.env.DEV) {
  //@ts-ignore
  window.relayStatsService = relayStatsService;
}

export default relayStatsService;