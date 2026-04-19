"use client";

import * as React from "react";

export interface DemoState {
  remindedClientIds: Set<string>;
  confirmedRowIds: Set<string>;
  rejectedRowIds: Set<string>;
  spvPullCompleted: boolean;
  sagaExported: boolean;
  saftGenerated: boolean;
  declarationsSubmitted: Set<string>;
  exportFormat: "Saga" | "WinMentor" | "Ciel" | "SmartBill Conta";
}

type Action =
  | { type: "SEND_REMINDER"; clientId: string }
  | { type: "CONFIRM_ROW"; rowId: string }
  | { type: "REJECT_ROW"; rowId: string }
  | { type: "COMPLETE_SPV_PULL" }
  | { type: "EXPORT_SAGA" }
  | { type: "GENERATE_SAFT" }
  | { type: "SUBMIT_DECLARATION"; code: string }
  | { type: "SET_EXPORT_FORMAT"; format: DemoState["exportFormat"] }
  | { type: "RESET" };

const initialState: DemoState = {
  remindedClientIds: new Set(),
  confirmedRowIds: new Set(),
  rejectedRowIds: new Set(),
  spvPullCompleted: false,
  sagaExported: false,
  saftGenerated: false,
  declarationsSubmitted: new Set(),
  exportFormat: "Saga",
};

function reducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "SEND_REMINDER": {
      const next = new Set(state.remindedClientIds);
      next.add(action.clientId);
      return { ...state, remindedClientIds: next };
    }
    case "CONFIRM_ROW": {
      const next = new Set(state.confirmedRowIds);
      next.add(action.rowId);
      return { ...state, confirmedRowIds: next };
    }
    case "REJECT_ROW": {
      const next = new Set(state.rejectedRowIds);
      next.add(action.rowId);
      return { ...state, rejectedRowIds: next };
    }
    case "COMPLETE_SPV_PULL":
      return { ...state, spvPullCompleted: true };
    case "EXPORT_SAGA":
      return { ...state, sagaExported: true };
    case "GENERATE_SAFT":
      return { ...state, saftGenerated: true };
    case "SUBMIT_DECLARATION": {
      const next = new Set(state.declarationsSubmitted);
      next.add(action.code);
      return { ...state, declarationsSubmitted: next };
    }
    case "SET_EXPORT_FORMAT":
      return { ...state, exportFormat: action.format };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

interface DemoContextValue {
  state: DemoState;
  dispatch: React.Dispatch<Action>;
}

const DemoContext = React.createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = React.useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}
