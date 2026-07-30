import { chimeAgentBRows } from "./chimeAgentB";
import { chimeHourlyRows, type ChimeSourceId } from "./chimeHourlyWeek";
import { chimeLgPmpRows } from "./chimeLgPmp";

export const chimeSources = [
  {
    id: "lg-pmp",
    shortName: "LG PMP",
    name: "Chime <> US (Hourly) - LG PMP",
    rows: chimeLgPmpRows,
  },
  {
    id: "freewheel-fm",
    shortName: "Freewheel FM",
    name: "Chime <> US Freewheel - FM agent (Hourly) - LG PMP",
    rows: chimeHourlyRows,
  },
  {
    id: "freewheel-agent-b",
    shortName: "FM Agent_B",
    name: "Chime <> US Freewheel FM Agent_B (Hourly)",
    rows: chimeAgentBRows,
  },
] as const;

export const defaultChimeSource: ChimeSourceId = "lg-pmp";

export const getChimeSource = (sourceId: string) =>
  chimeSources.find((source) => source.id === sourceId) ?? chimeSources[0];

export const getChimeRows = (sourceId: string, date: string) =>
  getChimeSource(sourceId).rows.filter((row) => row.date === date);
