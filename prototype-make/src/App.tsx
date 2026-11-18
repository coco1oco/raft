import { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Check,
  CheckCheck,
  ChevronDown,
  CircleHelp,
  Clock3,
  Droplets,
  Flag,
  Fuel,
  House,
  Info,
  MapPin,
  Navigation,
  Pause,
  Play,
  RotateCcw,
  Route as RouteIcon,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Truck,
  Van,
  Waves,
  X,
  Zap,
  ChartNoAxesCombined,
  CircleAlert,
  ExternalLink,
} from "lucide-react";
import {
  edges,
  shelters,
  severities,
  solve,
  vehicles,
  waterDepth,
  type Route,
  type Solution,
} from "./routing";

const MapView = lazy(() => import("./MapView"));
const routeMeta = [
  {
    name: "Balanced route",
    subtitle: "The best of both worlds",
    badge: "Recommended",
    icon: Sparkles,
  },
  {
    name: "Critical-first route",
    subtitle: "Less waiting for urgent relief",
    badge: "Priority response",
    icon: Zap,
  },
  {
    name: "Shortest distance",
    subtitle: "Save fuel. Cover less ground.",
    badge: "Fuel saver",
    icon: Fuel,
  },
];
const scenarios = [
  { label: "Normal weather", sub: "Baseline · all roads open", severity: 0, vehicle: 0 },
  {
    label: "25-year rainfall flood",
    sub: "4×4 pickup · flood-safe detour",
    severity: 2,
    vehicle: 1,
  },
  {
    label: "100-year rainfall flood",
    sub: "Heavy truck vs. standard GPS",
    severity: 3,
    vehicle: 2,
  },
];
const steps = [
  { title: "Set conditions", text: "Flood, vehicle & shelter priorities", icon: SlidersHorizontal },
  { title: "Filter flooded roads", text: "Keep your vehicle out of deep water", icon: ShieldCheck },
  { title: "Find the best routes", text: "Balance distance with urgent needs", icon: RouteIcon },
  { title: "Select & dispatch", text: "Choose a route. Get relief moving.", icon: Truck },
];

function Analytics({
  solution,
  selected,
  onSelect,
}: {
  solution: Solution;
  selected: number;
  onSelect: (n: number) => void;
}) {
  const points = [...solution.routes, solution.baseline, solution.reference];
  const minX = Math.floor(Math.min(...points.map((p) => p.km)) - 1);
  const maxX = Math.ceil(Math.max(...points.map((p) => p.km)) + 1);
  const minY = Math.max(0, Math.floor(Math.min(...points.map((p) => p.urgency)) * 2 - 1) / 2);
  const maxY = Math.ceil(Math.max(...points.map((p) => p.urgency)) * 2 + 1) / 2;
  const x = (value: number) => 47 + ((value - minX) / Math.max(1, maxX - minX)) * 237;
  const y = (value: number) => 208 - ((value - minY) / Math.max(0.5, maxY - minY)) * 168;
  return (
    <div className="analytics">
      <div className="eyebrow">BEHIND THE RECOMMENDATION</div>
      <h3>Less distance. Less delay.</h3>
      <p>
        Each point is a delivery loop. Closer to the bottom-left means a shorter trip and less
        waiting for urgent shelters.
      </p>
      <div className="chart-wrap">
        <svg
          viewBox="0 0 320 260"
          role="img"
          aria-label="Distance versus urgency delay chart comparing optimized routes with distance-only and reverse-order baselines"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <line
                x1="47"
                y1={40 + i * 42}
                x2="284"
                y2={40 + i * 42}
                stroke="#e8ede8"
                strokeDasharray="3 4"
              />
              <text x="37" y={44 + i * 42} textAnchor="end" fill="#7d8780" fontSize="9">
                {(maxY - ((maxY - minY) * i) / 4).toFixed(1)}
              </text>
              <text x={47 + i * 59.25} y="227" textAnchor="middle" fill="#7d8780" fontSize="9">
                {(minX + ((maxX - minX) * i) / 4).toFixed(1)}
              </text>
            </g>
          ))}
          <text
            transform="translate(14 133) rotate(-90)"
            textAnchor="middle"
            fill="#64736a"
            fontSize="10"
          >
            Urgency delay score ↓
          </text>
          <text x="165" y="250" textAnchor="middle" fill="#64736a" fontSize="10">
            Total distance (km) ↓
          </text>
          {[solution.baseline, solution.reference].map((p, i) => (
            <g key={i}>
              <circle cx={x(p.km)} cy={y(p.urgency)} r="5" fill={i ? "#a0a8a3" : "#dc7c73"} />
              <text
                x={x(p.km)}
                y={y(p.urgency) - 11}
                textAnchor="middle"
                fontSize="8"
                fill="#89918c"
              >
                {i ? "Reverse order" : "Standard GPS"}
              </text>
            </g>
          ))}
          {solution.routes.map((p, i) => (
            <g
              key={i}
              onClick={() => onSelect(i)}
              className="chart-point"
              role="button"
              tabIndex={0}
              aria-label={`Select ${routeMeta[i].name}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(i);
                }
              }}
            >
              {selected === i && <circle cx={x(p.km)} cy={y(p.urgency)} r="12" fill="#e0ebff" />}
              <circle
                cx={x(p.km)}
                cy={y(p.urgency)}
                r="6"
                fill={selected === i ? "#3978e8" : "#7ca2e7"}
                stroke="white"
                strokeWidth="2"
              />
              <title>
                {routeMeta[i].name}: {p.km.toFixed(2)} km, {p.urgency.toFixed(2)} delay
              </title>
            </g>
          ))}
        </svg>
        <div className="chart-key">
          <span>
            <i className="blue-dot" />
            Optimized routes
          </span>
          <span>
            <i className="grey-dot" />
            Unfiltered baselines
          </span>
        </div>
      </div>
      <div className="analytics-note">
        <Info size={15} />
        <span>
          Flood detours can be longer than an unsafe GPS route. Safer does not always mean shorter.
        </span>
      </div>
      <h4>How the swarm finds a route</h4>
      <p className="algorithm-label">DMO-PSO-inspired · Multi-objective swarm optimization</p>
      <div className="algorithm-flow">
        <div>
          <span>01</span>
          <strong>Try different stop orders</strong>
          <p>36 route “particles” explore delivery sequences.</p>
        </div>
        <ArrowDown size={16} />
        <div>
          <span>02</span>
          <strong>Learn, swap & improve</strong>
          <p>Swap stops toward the best distance and priority outcomes over 40 rounds.</p>
        </div>
        <ArrowDown size={16} />
        <div>
          <span>03</span>
          <strong>Keep the best trade-offs</strong>
          <p>
            {solution.evaluated} unique loops checked. {solution.pareto.length} non-dominated
            solutions found.
          </p>
        </div>
      </div>
      <details className="math-details">
        <summary>
          Model assumptions & formulas <ChevronDown size={14} />
        </summary>
        <p>
          Distance = sum of modeled road lengths. Travel time uses 32 km/h on dry roads, 18 km/h
          when wading, plus 2 minutes per delivery.
        </p>
        <p>
          Urgency delay = Σ (priority × arrival minutes) / Σ priority / 10. Lower is better.
          Priorities affect stop order, not road safety.
        </p>
        <p>
          A road is removed if water depth exceeds the vehicle limit or it is manually blocked. The
          balanced choice minimizes normalized distance to the ideal distance–delay point.
        </p>
        <p>
          This is a seeded, discrete multi-objective PSO-inspired prototype, not a validated
          implementation of the research algorithm. The network and flood extents are illustrative;
          markers use the supplied coordinates. It is not a field navigation tool.
        </p>
        <p>
          Different objectives may share the same best loop. Baselines ignore water and roadblocks;
          they are not guaranteed to be dominated in every scenario.
        </p>
      </details>
    </div>
  );
}

function About({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    dialog.current?.showModal();
  }, []);
  return (
    <dialog
      ref={dialog}
      className="about-dialog"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button className="icon-button dialog-close" onClick={onClose} aria-label="Close about RAFT">
        <X size={20} />
      </button>
      <div className="about-icon">
        <Waves size={28} />
      </div>
      <span className="eyebrow">RELIEF ROUTING, REIMAGINED</span>
      <h2>
        Because the shortest road
        <br />
        isn’t always the safest.
      </h2>
      <p>
        RAFT helps relief dispatchers navigate flooded areas in Coastal Cavite. Match flood
        conditions to a vehicle’s safe wading depth, prioritize evacuation centers, and find a safer
        delivery loop.
      </p>
      <div className="about-steps">
        {steps.map((s, i) => (
          <div key={s.title}>
            <span>{i + 1}</span>
            <div>
              <strong>{s.title}</strong>
              <p>{s.text}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="about-warning">
        <ShieldCheck size={20} />
        <p>
          <strong>A thesis demonstration, not live emergency guidance.</strong> Flood zones and
          roads are illustrative, not live UP NOAH observations. Verify actual conditions with local
          disaster risk reduction offices before travel.
        </p>
      </div>
      <button className="primary-button" onClick={onClose}>
        Explore the dispatch workspace <ArrowRight size={17} />
      </button>
    </dialog>
  );
}

export default function App() {
  const [severity, setSeverity] = useState(2);
  const [vehicle, setVehicle] = useState(1);
  const [scenario, setScenario] = useState("1");
  const [priorities, setPriorities] = useState(shelters.map((s) => s.priority));
  const [blocks, setBlocks] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState(0);
  const [tab, setTab] = useState<"routes" | "analytics">("routes");
  const [compare, setCompare] = useState(false);
  const [showHazards, setShowHazards] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [about, setAbout] = useState(false);
  const [notice, setNotice] = useState("");
  const solution = useMemo(
    () => solve(severity, vehicle, priorities, blocks),
    [severity, vehicle, priorities, blocks],
  );
  const route: Route | undefined = solution.routes[selected];
  const baselineBlocked = solution.baseline.roads.filter((id) => {
    const e = edges.find((e) => e.id === id)!;
    return blocks.has(id) || waterDepth(e, severity) > vehicles[vehicle].depth;
  }).length;
  useEffect(() => {
    setPlaying(false);
    setProgress(0);
  }, [route]);
  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now();
      const delta = ((now - previous) / 60000) * speed;
      previous = now;
      setProgress((p) => Math.min(1, p + delta));
    }, 50);
    return () => clearInterval(timer);
  }, [playing, speed]);
  useEffect(() => {
    if (progress >= 1) setPlaying(false);
  }, [progress]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 4500);
    return () => clearTimeout(timer);
  }, [notice]);
  const onBlock = useCallback((id: string) => {
    setBlocks((previous) => {
      const next = new Set(previous);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setNotice("Road status updated. Safe routes recalculated.");
  }, []);
  const applyScenario = (value: string) => {
    if (value === "custom") return;
    const preset = scenarios[Number(value)];
    setScenario(value);
    setSeverity(preset.severity);
    setVehicle(preset.vehicle);
    setBlocks(new Set());
    setSelected(0);
    setPriorities(shelters.map((s) => s.priority));
    setProgress(0);
    setPlaying(false);
    setNotice(`${preset.label} scenario loaded.`);
  };
  const currentStop = route ? route.stopProgress.filter((p) => progress >= p).length : 0;
  const changeConditions = () => {
    setScenario("custom");
    setSelected(0);
  };
  return (
    <div className="app-shell">
      <header className="app-header">
        <a
          className="brand"
          href="#"
          aria-label="RAFT home"
          onClick={(e) => {
            e.preventDefault();
            setAbout(true);
          }}
        >
          <span className="brand-symbol">
            <Waves size={27} strokeWidth={2.3} />
          </span>
          <span>
            RAFT<span className="brand-caption">Relief, on the right route.</span>
          </span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <button
            className="nav-active"
            onClick={() => {
              setTab("routes");
              setAbout(false);
            }}
          >
            <Navigation size={16} />
            Dispatch workspace
          </button>
          <button onClick={() => setAbout(true)}>
            How RAFT works <ExternalLink size={13} />
          </button>
        </nav>
        <div className="header-end">
          <span className="location-label">
            <MapPin size={14} />
            Coastal Cavite, PH
          </span>
          <span className="demo-badge">
            <i />
            THESIS DEMO
          </span>
          <button
            className="icon-button"
            aria-label="About this demonstration"
            onClick={() => setAbout(true)}
          >
            <CircleHelp size={19} />
          </button>
        </div>
      </header>
      <main>
        <h1 className="sr-only">RAFT dispatch workspace</h1>
        <div className="workspace">
          <aside className="setup-panel panel" aria-label="Dispatch setup">
            <div className="panel-heading">
              <div>
                <SlidersHorizontal size={17} />
                <h2>Dispatch setup</h2>
              </div>
              <span className="small-tag">01</span>
            </div>
            <div className="setup-scroll">
              <section className="scenario-box">
                <label className="eyebrow" htmlFor="scenario">
                  <Play size={11} fill="currentColor" /> QUICK DEMO SCENARIO
                </label>
                <div className="select-wrap">
                  <select
                    id="scenario"
                    value={scenario}
                    onChange={(e) => applyScenario(e.target.value)}
                  >
                    {scenarios.map((s, i) => (
                      <option key={s.label} value={i}>
                        {s.label}
                      </option>
                    ))}
                    {scenario === "custom" && <option value="custom">Custom conditions</option>}
                  </select>
                  <ChevronDown size={15} />
                </div>
                <p>
                  {scenario === "custom"
                    ? "Your conditions. Your delivery plan."
                    : scenarios[Number(scenario)].sub}
                </p>
              </section>
              <section className="setup-section">
                <div className="section-label">
                  <span>
                    <Droplets size={15} />
                    Flood severity
                  </span>
                  <Info size={13}>
                    <title>
                      Rainfall return periods; AEP means annual exceedance probability. Road water
                      depths are separate illustrative inputs.
                    </title>
                  </Info>
                </div>
                <div className="severity-grid">
                  {severities.map((s, i) => (
                    <button
                      key={s.name}
                      aria-pressed={severity === i}
                      title={
                        i
                          ? `${s.rainfall}. AEP means annual exceedance probability, not a maximum flood depth.`
                          : "Dry-weather baseline"
                      }
                      className={`severity-card ${severity === i ? "severity-selected" : ""}`}
                      onClick={() => {
                        setSeverity(i);
                        changeConditions();
                      }}
                    >
                      <span className="severity-top">
                        <i style={{ background: s.color }} />
                        <span>{s.period}</span>
                        {severity === i && <Check size={12} />}
                      </span>
                      <strong>
                        {["Dry weather", "Moderate flood", "Severe flood", "Extreme flood"][i]}
                      </strong>
                      <small>{s.rainfall}</small>
                    </button>
                  ))}
                </div>
              </section>
              <section className="setup-section">
                <div className="section-label">
                  <span>
                    <Truck size={16} />
                    Choose relief vehicle
                  </span>
                </div>
                <div className="vehicle-options">
                  {vehicles.map((v, i) => {
                    const Icon = i === 0 ? Van : Truck;
                    return (
                      <button
                        key={v.class}
                        className={`vehicle-card ${vehicle === i ? "vehicle-selected" : ""}`}
                        onClick={() => {
                          setVehicle(i);
                          changeConditions();
                        }}
                        aria-pressed={vehicle === i}
                      >
                        <span className="vehicle-icon">
                          <Icon size={26} strokeWidth={1.5} />
                        </span>
                        <span className="vehicle-detail">
                          <strong>{v.name}</strong>
                          <small>
                            Class {v.class} · {v.model}
                          </small>
                        </span>
                        <span className="depth-badge">
                          {v.depth.toFixed(2)}
                          <small>m safe</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <div className="helper-text">
                  <ShieldCheck size={12} />
                  Roads deeper than {vehicles[vehicle].depth.toFixed(2)} m are excluded.
                </div>
              </section>
              <section className="setup-section priority-section">
                <div className="section-label">
                  <span>
                    <Flag size={15} />
                    Shelter priority
                  </span>
                  <span className="subtle">1 low · 5 critical</span>
                </div>
                <div className="depot-info">
                  <span>
                    <House size={14} />
                  </span>
                  <div>
                    <strong>Command Depot</strong>
                    <small>Kawit Hub · Start & return</small>
                  </div>
                  <span className="start-tag">START</span>
                </div>
                <div className="shelter-list">
                  {shelters.map((s, i) => (
                    <div className="shelter-row" key={s.name}>
                      <span className={`priority-dot ${priorities[i] >= 4 ? "critical" : ""}`} />
                      <div>
                        <strong>{s.name}</strong>
                        <small>{s.city}</small>
                      </div>
                      <label
                        className={`priority-input ${priorities[i] >= 4 ? "high-priority" : ""}`}
                        title={s.need}
                      >
                        <select
                          aria-label={`${s.name} priority`}
                          value={priorities[i]}
                          onChange={(e) => {
                            setPriorities((previous) =>
                              previous.map((p, j) => (j === i ? Number(e.target.value) : p)),
                            );
                            changeConditions();
                          }}
                        >
                          {[1, 2, 3, 4, 5].map((n) => (
                            <option value={n} key={n}>
                              {n}
                            </option>
                          ))}
                        </select>
                        <span>/ 5</span>
                        <ChevronDown size={10} />
                      </label>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div className="setup-footer">
              <span className="live-dot" />
              <span>Routes update as conditions change</span>
              <RotateCcw size={13} />
            </div>
          </aside>

          <section className="map-panel" aria-label="Coastal Cavite dispatch map">
            <Suspense
              fallback={
                <div className="map-loading">
                  <Waves size={25} />
                  <span>Preparing your dispatch map…</span>
                </div>
              }
            >
              <MapView
                severity={severity}
                vehicle={vehicle}
                route={route}
                baseline={solution.baseline}
                compare={compare}
                blocks={blocks}
                onBlock={onBlock}
                progress={progress}
                showHazards={showHazards}
                onHazards={() => setShowHazards((v) => !v)}
              />
            </Suspense>
            <div className="map-topline">
              <span className="map-region">
                <MapPin size={14} />
                <strong>Coastal Cavite</strong>
                <span>Philippines</span>
              </span>
              <span className={`map-condition ${severity ? "flood-condition" : ""}`}>
                <span style={{ background: severities[severity].color }} />
                {severity ? severities[severity].name : "All roads clear"}
              </span>
            </div>
            <div className="map-status">
              <span>
                <ShieldCheck size={15} />
                {edges.length - solution.blocked} safe roads
              </span>
              <i />
              <span>
                <span className="status-red-dot" />
                {solution.blocked} blocked
              </span>
              {solution.slowed > 0 && (
                <>
                  <i />
                  <span>
                    <span className="status-amber-dot" />
                    {solution.slowed} slowed
                  </span>
                </>
              )}
            </div>
            {blocks.size > 0 && (
              <button
                className="clear-blocks"
                onClick={() => {
                  setBlocks(new Set());
                  setNotice("Manual roadblocks cleared.");
                }}
              >
                <RotateCcw size={12} />
                Clear {blocks.size} manual {blocks.size === 1 ? "roadblock" : "roadblocks"}
              </button>
            )}
            <div className="map-hint">
              <Info size={13} />
              <span>Road closed? Click a road to block it. We’ll reroute.</span>
            </div>
            <div className="map-legend">
              <span className="legend-title">
                FLOOD DEPTH <span>Illustrative</span>
              </span>
              <span>
                <i style={{ background: "#f1d77f" }} />
                Low <small>0.1–0.5 m</small>
              </span>
              <span>
                <i style={{ background: "#efaf71" }} />
                Medium <small>0.5–1.5 m</small>
              </span>
              <span>
                <i style={{ background: "#e88c82" }} />
                High <small>&gt; 1.5 m</small>
              </span>
              <div className="road-legend">
                <span>
                  <b className="legend-blue" />
                  Selected route
                </span>
                <span>
                  <b className="legend-red" />
                  Blocked road
                </span>
              </div>
            </div>
            <div className="dispatch-control">
              <div className="dispatch-progress">
                <span style={{ width: `${progress * 100}%` }} />
              </div>
              <button
                className={`play-button ${playing ? "is-playing" : ""}`}
                disabled={!route}
                aria-label={
                  playing
                    ? "Pause dispatch"
                    : progress >= 1
                      ? "Replay dispatch"
                      : "Simulate truck dispatch"
                }
                onClick={() => {
                  if (progress >= 1) setProgress(0);
                  setPlaying((v) => !v);
                }}
              >
                {playing ? (
                  <Pause size={19} fill="currentColor" />
                ) : (
                  <Play size={19} fill="currentColor" />
                )}
              </button>
              <div className="dispatch-copy">
                <strong>
                  {!route
                    ? "No safe route available"
                    : progress >= 1
                      ? "Delivery complete. Back at base."
                      : playing
                        ? "Relief is on the way"
                        : progress > 0
                          ? "Dispatch paused"
                          : "Simulate truck dispatch"}
                </strong>
                <span>
                  {!route
                    ? "Try a higher-clearance vehicle or reopen roads."
                    : progress >= 1
                      ? "All 6 shelters reached · simulation complete"
                      : progress > 0
                        ? `${Math.min(6, currentStop)} of 6 shelters reached · ${Math.round(progress * 100)}% complete`
                        : "6 shelters · One safer round trip"}
                </span>
              </div>
              <button
                className="speed-control"
                onClick={() => setSpeed((s) => (s === 1 ? 2 : s === 2 ? 4 : 1))}
                aria-label={`Simulation speed ${speed}x. Click to change.`}
              >
                {speed}×
              </button>
              <button
                className="reset-button"
                aria-label="Reset simulation"
                onClick={() => {
                  setProgress(0);
                  setPlaying(false);
                }}
              >
                <RotateCcw size={16} />
              </button>
            </div>
            <div className="map-disclaimer">
              OSM road geometry · Simulated network & floods · Not for navigation
            </div>
          </section>

          <aside className="routes-panel panel" aria-label="Route options">
            <div className="route-panel-intro">
              <div className="panel-heading">
                <div>
                  <RouteIcon size={18} />
                  <h2>Your route options</h2>
                </div>
                <span className="route-count">{solution.routes.length}</span>
              </div>
              <p>A safer journey starts with a better route.</p>
            </div>
            <div className="panel-tabs">
              <button
                className={tab === "routes" ? "tab-active" : ""}
                onClick={() => setTab("routes")}
              >
                <Navigation size={14} />
                Routes
              </button>
              <button
                className={tab === "analytics" ? "tab-active" : ""}
                onClick={() => setTab("analytics")}
              >
                <ChartNoAxesCombined size={15} />
                Optimization analytics
              </button>
            </div>
            <div className="routes-scroll">
              {tab === "analytics" ? (
                <Analytics solution={solution} selected={selected} onSelect={setSelected} />
              ) : (
                <>
                  <div className="route-cards">
                    {solution.routes.length ? (
                      solution.routes.map((r, i) => {
                        const meta = routeMeta[i],
                          Icon = meta.icon;
                        return (
                          <button
                            key={i}
                            className={`route-card ${selected === i ? "selected-route" : ""}`}
                            aria-pressed={selected === i}
                            onClick={() => setSelected(i)}
                          >
                            <div className="route-card-top">
                              <span className={`route-type-icon type-${i}`}>
                                <Icon size={16} />
                              </span>
                              <span className="route-badge">{meta.badge}</span>
                              <span className="radio">{selected === i && <span />}</span>
                            </div>
                            <h3>{meta.name}</h3>
                            <div className="route-metrics">
                              <strong>
                                {r.km.toFixed(2)}
                                <small> km</small>
                              </strong>
                              <span>·</span>
                              <span>
                                <Clock3 size={12} />
                                {Math.round(r.minutes)} min
                              </span>
                              <span
                                className="urgency-score"
                                title="Priority-weighted arrival delay. Lower is better."
                              >
                                Delay {r.urgency.toFixed(2)}
                              </span>
                            </div>
                            <p>
                              {selected === i
                                ? i === 0
                                  ? `Reaches ${shelters[r.order[0] - 1].name} first. Balances travel and shelter urgency.`
                                  : i === 1
                                    ? "Minimizes priority-weighted waiting time for relief."
                                    : "The shortest safe delivery loop for your vehicle."
                                : meta.subtitle}
                            </p>
                          </button>
                        );
                      })
                    ) : (
                      <div className="no-route">
                        <CircleAlert size={30} />
                        <h3>Safety comes first.</h3>
                        <p>
                          At least one shelter is unreachable with these road conditions. Change
                          vehicle, reduce flood severity, or clear manual roadblocks.
                        </p>
                        <button
                          onClick={() => {
                            setBlocks(new Set());
                            setVehicle(2);
                            changeConditions();
                          }}
                        >
                          Try heavy cargo truck <ArrowRight size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="gps-comparison">
                    <label className="toggle-label">
                      <span>
                        <RouteIcon size={15} />
                        <strong>Compare with standard GPS</strong>
                      </span>
                      <input
                        type="checkbox"
                        checked={compare}
                        onChange={(e) => setCompare(e.target.checked)}
                      />
                      <span className={`toggle ${compare ? "toggle-on" : ""}`} />
                    </label>
                    <p>See what distance-only routing misses.</p>
                    {compare && (
                      <div
                        className={`baseline-result ${baselineBlocked ? "baseline-unsafe" : ""}`}
                      >
                        <div>
                          <strong>{solution.baseline.km.toFixed(2)} km</strong>
                          <span>
                            {baselineBlocked ? "0% loop passability" : "All roads passable"}
                          </span>
                        </div>
                        <p>
                          {baselineBlocked
                            ? `GPS attempts ${baselineBlocked} blocked road crossings. This loop cannot be safely completed.`
                            : `Nearest-stop greedy baseline · ${Math.round(solution.baseline.minutes)} min. Ignores shelter priorities.`}
                        </p>
                      </div>
                    )}
                  </div>
                  {route && (
                    <section className="timeline-section">
                      <div className="timeline-heading">
                        <h3>Your delivery stops</h3>
                        <span>
                          {route.order.length} shelters <ArrowRight size={11} />
                        </span>
                      </div>
                      <div className="timeline-start">
                        <span className="timeline-home">
                          <House size={12} />
                        </span>
                        <strong>Kawit Command Depot</strong>
                        <small>Start</small>
                      </div>
                      <div className="stop-timeline">
                        {route.order.map((stop, i) => {
                          const s = shelters[stop - 1],
                            delivered = progress > 0 && i < currentStop;
                          return (
                            <div
                              key={stop}
                              className={`timeline-stop ${delivered ? "delivered-stop" : ""}`}
                            >
                              <span className="timeline-number">
                                {delivered ? <Check size={12} /> : i + 1}
                              </span>
                              <div>
                                <strong>{s.name}</strong>
                                <span>
                                  {s.city}
                                  {priorities[stop - 1] >= 4 && (
                                    <b>Priority {priorities[stop - 1]}</b>
                                  )}
                                </span>
                              </div>
                              <small>
                                {delivered ? "Delivered" : `~${Math.round(route.arrivals[i])} min`}
                              </small>
                            </div>
                          );
                        })}
                      </div>
                      <div className="timeline-start timeline-end">
                        <span className="timeline-home">
                          <Flag size={12} />
                        </span>
                        <strong>Return to Command Depot</strong>
                        <small>~{Math.round(route.minutes)} min</small>
                      </div>
                    </section>
                  )}
                </>
              )}
            </div>
            <div className="route-footer">
              <ShieldCheck size={13} />
              <span>
                {route
                  ? "All selected roads meet your vehicle’s water limit"
                  : "Unsafe roads are never used for dispatch"}
              </span>
            </div>
          </aside>
        </div>
        <footer className="app-footer">
          <span>
            <Waves size={13} />
            <strong>RAFT</strong>
            <i />
            Routing Algorithm for Flood Topographies
          </span>
          <span>
            Built for Coastal Cavite. Designed around people.
            <span className="prototype-label">RESEARCH PROTOTYPE</span>
          </span>
        </footer>
      </main>
      {notice && (
        <div className="toast" role="status">
          <CheckCheck size={17} />
          {notice}
          <button onClick={() => setNotice("")} aria-label="Dismiss notification">
            <X size={14} />
          </button>
        </div>
      )}
      {about && <About onClose={() => setAbout(false)} />}
    </div>
  );
}
