import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Crosshair, Layers, Minus, Plus } from "lucide-react";
import offlineBasemap from "./data/basemap.json" with { type: "json" };
import {
  depot,
  shelters,
  edges,
  floodZones,
  vehicles,
  waterDepth,
  type Point,
  type Route,
} from "./routing";

type Props = {
  severity: number;
  vehicle: number;
  route?: Route;
  baseline?: Route;
  compare: boolean;
  blocks: Set<string>;
  onBlock: (id: string) => void;
  progress: number;
  showHazards: boolean;
  onHazards: () => void;
};
export default function MapView(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const overlay = useRef<L.LayerGroup | null>(null);
  const offline = useRef<L.LayerGroup | null>(null);
  const truck = useRef<L.Marker | null>(null);
  const [tileError, setTileError] = useState(false);
  useEffect(() => {
    if (!host.current) return;
    const instance = L.map(host.current, {
      zoomControl: false,
      attributionControl: true,
      minZoom: 11,
      maxZoom: 18,
    }).setView([14.442, 120.901], 13);
    // A narrow phone viewport cannot contain all six shelters at zoom 13.
    if (host.current.clientWidth < 500) {
      instance.fitBounds(L.latLngBounds(shelters.map((s) => s.point)), {
        paddingTopLeft: [30, 100],
        paddingBottomRight: [45, 135],
        maxZoom: 13,
      });
    }
    map.current = instance;
    const basePane = instance.createPane("offlineBasemap");
    basePane.style.zIndex = "150";
    basePane.style.pointerEvents = "none";
    const labelPane = instance.createPane("offlineLabels");
    labelPane.style.zIndex = "160";
    labelPane.style.pointerEvents = "none";
    let batchHasError = false;
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    })
      .on("loading", () => {
        batchHasError = false;
      })
      .on("tileerror", () => {
        batchHasError = true;
        setTileError(true);
      })
      .on("load", () => {
        if (!batchHasError) setTileError(false);
      })
      .addTo(instance);
    offline.current = L.layerGroup();
    overlay.current = L.layerGroup().addTo(instance);
    const resize = new ResizeObserver(() => instance.invalidateSize());
    resize.observe(host.current);
    return () => {
      resize.disconnect();
      instance.remove();
      map.current = null;
    };
  }, []);
  useEffect(() => {
    const instance = map.current;
    const layer = offline.current;
    if (!instance || !layer) return;
    layer.clearLayers();
    if (!tileError) {
      layer.removeFrom(instance);
      return;
    }
    const renderer = L.canvas({ pane: "offlineBasemap", padding: 0.5 });
    offlineBasemap.water.forEach((ring) => {
      L.polygon(ring as Point[], {
        pane: "offlineBasemap",
        renderer,
        color: "#a7c6dc",
        weight: 1.2,
        fillColor: "#d3e6f4",
        fillOpacity: 1,
        interactive: false,
      }).addTo(layer);
    });
    offlineBasemap.municipalities.forEach((muni) => {
      muni.rings.forEach((ring) => {
        L.polygon(ring as Point[], {
          pane: "offlineBasemap",
          renderer,
          color: "#ccd6cc",
          weight: 1.2,
          dashArray: "4 4",
          fillColor: "#f5f6ee",
          fillOpacity: 1,
          interactive: false,
        }).addTo(layer);
      });
    });
    offlineBasemap.roads.tertiary.forEach((pts) => {
      L.polyline(pts as Point[], {
        pane: "offlineBasemap",
        renderer,
        color: "#ffffff",
        weight: 1.1,
        opacity: 0.9,
        interactive: false,
      }).addTo(layer);
    });
    offlineBasemap.roads.secondary.forEach((pts) => {
      L.polyline(pts as Point[], {
        pane: "offlineBasemap",
        renderer,
        color: "#d6ddd5",
        weight: 3.2,
        opacity: 0.9,
        interactive: false,
      }).addTo(layer);
      L.polyline(pts as Point[], {
        pane: "offlineBasemap",
        renderer,
        color: "#ffffff",
        weight: 1.8,
        opacity: 0.95,
        interactive: false,
      }).addTo(layer);
    });
    offlineBasemap.roads.major.forEach((pts) => {
      L.polyline(pts as Point[], {
        pane: "offlineBasemap",
        renderer,
        color: "#dfb872",
        weight: 4,
        opacity: 0.95,
        interactive: false,
      }).addTo(layer);
      L.polyline(pts as Point[], {
        pane: "offlineBasemap",
        renderer,
        color: "#fae1a3",
        weight: 2.3,
        opacity: 1,
        interactive: false,
      }).addTo(layer);
    });
    offlineBasemap.labels.forEach((item) => {
      L.marker(item.point as Point, {
        pane: "offlineLabels",
        interactive: false,
        icon: L.divIcon({
          className: `offline-map-label offline-label-${item.kind}`,
          html: `<span>${item.text}</span>`,
          iconSize: [120, 20],
          iconAnchor: [60, 10],
        }),
      }).addTo(layer);
    });
    layer.addTo(instance);
  }, [tileError]);
  useEffect(() => {
    const layer = overlay.current;
    if (!layer) return;
    layer.clearLayers();
    const { severity, vehicle, blocks, route, baseline, compare, showHazards } = props;
    if (severity && showHazards)
      floodZones.forEach((zone) => {
        const level = Math.min(zone.level, severity);
        const color = ["", "#eac64d", "#ef974d", "#e9766b"][level];
        L.polygon(zone.points, {
          color,
          weight: 1,
          fillOpacity: 0.23,
          dashArray: "4 5",
          interactive: false,
        }).addTo(layer);
      });
    let blockedLabels = 0;
    edges.forEach((edge) => {
      const water = waterDepth(edge, severity);
      const blocked = blocks.has(edge.id) || water > vehicles[vehicle].depth;
      const line = L.polyline(edge.points, {
        color: blocked ? "#dc6b63" : water > 0 ? "#dca742" : "#a7b5ae",
        weight: blocked ? 3 : water > 0 ? 4 : 2,
        opacity: blocked || water > 0 ? 0.9 : 0.65,
        dashArray: blocked ? "6 7" : undefined,
      }).addTo(layer);
      line.bindTooltip(
        `${blocks.has(edge.id) ? "Manual roadblock" : blocked ? "Impassable" : water ? "Slowed speed" : "Open road"} · ${water.toFixed(2)} m water<br>Click to ${blocks.has(edge.id) ? "reopen" : "block"} this demo road`,
      );
      // Transparent hit area keeps narrow road segments easy to select.
      L.polyline(edge.points, { weight: 16, opacity: 0, bubblingMouseEvents: false })
        .on("click", () => props.onBlock(edge.id))
        .addTo(layer)
        .bindTooltip(line.getTooltip()!);
      line.on("click", () => props.onBlock(edge.id));
      if (blocks.has(edge.id))
        L.marker(edge.points[Math.floor(edge.points.length / 2)], {
          icon: L.divIcon({
            className: "roadblock-marker",
            html: "<span>−</span>",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
          }),
        })
          .addTo(layer)
          .bindTooltip("Manual roadblock · click to reopen")
          .on("click", () => props.onBlock(edge.id));
      else if (blocked && blockedLabels++ < 2)
        L.marker(edge.points[Math.floor(edge.points.length / 2)], {
          icon: L.divIcon({
            className: "blocked-label",
            html: `<span>Blocked · ${water.toFixed(1)} m</span>`,
            iconSize: [108, 24],
            iconAnchor: [54, 12],
          }),
          interactive: false,
          zIndexOffset: 50,
        }).addTo(layer);
    });
    if (compare && baseline)
      L.polyline(baseline.points, {
        color: severity ? "#d76565" : "#7e8587",
        weight: 4,
        opacity: 0.85,
        dashArray: "7 8",
        interactive: false,
      }).addTo(layer);
    if (route) {
      L.polyline(route.points, {
        color: "#fff",
        weight: 9,
        opacity: 0.95,
        interactive: false,
      }).addTo(layer);
      L.polyline(route.points, {
        color: "#4380ed",
        weight: 5,
        opacity: 0.95,
        className: "active-route",
        interactive: false,
      }).addTo(layer);
      L.polyline(route.points, {
        color: "#d2e2ff",
        weight: 2,
        opacity: 0.9,
        dashArray: "1 18",
        className: "route-flow",
        interactive: false,
      }).addTo(layer);
      // Keep route segments clickable as well as the rest of the network.
      [...new Set(route.roads)].forEach((id) => {
        const edge = edges.find((e) => e.id === id)!;
        L.polyline(edge.points, { weight: 14, opacity: 0, bubblingMouseEvents: false })
          .addTo(layer)
          .bindTooltip("Click to block this demo road")
          .on("click", () => props.onBlock(id));
      });
    }
    shelters.forEach((shelter, i) => {
      const order = route ? route.order.indexOf(i + 1) + 1 : i + 1;
      L.marker(shelter.point, {
        icon: L.divIcon({
          className: "stop-marker",
          html: `<span>${order}</span>`,
          iconSize: [30, 30],
          iconAnchor: [15, 15],
        }),
        zIndexOffset: 200,
      })
        .addTo(layer)
        .bindTooltip(`<strong>${shelter.name}</strong><br>${shelter.city} · Stop ${order}`, {
          direction: "top",
          offset: [0, -14],
        });
      L.marker(shelter.point, {
        icon: L.divIcon({
          className: "map-place-label",
          html: `<span>${shelter.name === "Toclong" ? `${shelter.name} (${shelter.city})` : shelter.name}</span>`,
          iconSize: [184, 24],
          iconAnchor: [-20, 12],
        }),
        interactive: false,
        zIndexOffset: 100,
      }).addTo(layer);
    });
    L.marker(depot, {
      icon: L.divIcon({
        className: "depot-marker",
        html: '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m3 10 9-7 9 7v11H3Z"/><path d="M9 21v-8h6v8"/></svg>',
        iconSize: [34, 34],
        iconAnchor: [17, 17],
      }),
      zIndexOffset: 400,
    })
      .addTo(layer)
      .bindTooltip("<strong>Command Depot</strong><br>Kawit Hub · Start & return", {
        direction: "top",
      });
    truck.current = L.marker(depot, {
      icon: L.divIcon({
        className: "truck-marker",
        html: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 5h12v13H2zM14 10h4l4 4v4h-8"/><circle cx="6" cy="18" r="2" fill="white"/><circle cx="18" cy="18" r="2" fill="white"/><path d="M6 9h4m-2-2v4"/></svg>',
        iconSize: [38, 38],
        iconAnchor: [19, 19],
      }),
      zIndexOffset: 1000,
      opacity: props.progress > 0 ? 1 : 0,
    }).addTo(layer);
  }, [
    props.severity,
    props.vehicle,
    props.route,
    props.baseline,
    props.compare,
    props.blocks,
    props.showHazards,
    props.onBlock,
  ]);
  useEffect(() => {
    const points = props.route?.points;
    if (!points?.length || !truck.current) return;
    const lengths = points.slice(1).map((p, i) => L.latLng(p).distanceTo(points[i]));
    let remaining = lengths.reduce((a, b) => a + b, 0) * props.progress;
    let position: Point = points[points.length - 1];
    for (let i = 0; i < lengths.length; i++) {
      if (remaining <= lengths[i]) {
        const t = lengths[i] ? remaining / lengths[i] : 0;
        position = [
          points[i][0] + (points[i + 1][0] - points[i][0]) * t,
          points[i][1] + (points[i + 1][1] - points[i][1]) * t,
        ];
        break;
      }
      remaining -= lengths[i];
    }
    truck.current.setLatLng(position).setOpacity(props.progress > 0 ? 1 : 0);
  }, [
    props.progress,
    props.route,
    props.baseline,
    props.compare,
    props.severity,
    props.vehicle,
    props.blocks,
    props.showHazards,
    props.onBlock,
  ]);
  const recenter = () =>
    map.current?.fitBounds(L.latLngBounds(shelters.map((s) => s.point)), {
      animate: true,
      paddingTopLeft: [35, 100],
      paddingBottomRight: [50, 150],
      maxZoom: 13,
    });
  return (
    <>
      <div
        ref={host}
        className={`leaflet-host ${tileError ? "offline-basemap-active" : ""}`}
        aria-label="Interactive relief routing map of Coastal Cavite"
      />
      {tileError && (
        <div className="tile-warning">
          Offline basemap active — OSM tiles unavailable.
        </div>
      )}
      <div className="map-tools">
        <button aria-label="Zoom in" onClick={() => map.current?.zoomIn()}>
          <Plus size={19} />
        </button>
        <button aria-label="Zoom out" onClick={() => map.current?.zoomOut()}>
          <Minus size={19} />
        </button>
        <button aria-label="Fit all shelters" onClick={recenter}>
          <Crosshair size={18} />
        </button>
        <button
          aria-label="Toggle flood layers"
          aria-pressed={props.showHazards}
          className={props.showHazards ? "tool-active" : ""}
          onClick={props.onHazards}
        >
          <Layers size={18} />
        </button>
      </div>
    </>
  );
}
