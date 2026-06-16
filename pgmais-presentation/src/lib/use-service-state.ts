"use client";

import { useReducer, useCallback, useEffect, useRef } from "react";
import { AppState, AppAction, HistoryEntry, TriagemData } from "./types";

function createInitialState(): AppState {
  return {
    hiddenServices: new Set(),
    hiddenBlocks: new Set(),
    history: [],
    triagemData: null,
    isTriagemOpen: true,
    serviceLoaded: false,
  };
}

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "REMOVE_SERVICE": {
      const newHidden = new Set(state.hiddenServices);
      newHidden.add(action.id);
      return {
        ...state,
        hiddenServices: newHidden,
        history: [...state.history, { type: "service", id: action.id }],
      };
    }
    case "REMOVE_BLOCK": {
      const newHiddenBlocks = new Set(state.hiddenBlocks);
      newHiddenBlocks.add(action.id);
      const newHiddenServices = new Set(state.hiddenServices);
      action.children.forEach(c => newHiddenServices.add(c));
      return {
        ...state,
        hiddenBlocks: newHiddenBlocks,
        hiddenServices: newHiddenServices,
        history: [...state.history, { type: "block", id: action.id, children: action.children }],
      };
    }
    case "UNDO": {
      if (state.history.length === 0) return state;
      const newHistory = [...state.history];
      const last = newHistory.pop()!;
      const newHiddenBlocks = new Set(state.hiddenBlocks);
      const newHiddenServices = new Set(state.hiddenServices);
      if (last.type === "service") {
        newHiddenServices.delete(last.id);
      } else {
        newHiddenBlocks.delete(last.id);
        (last.children || []).forEach(c => newHiddenServices.delete(c));
      }
      return { ...state, hiddenBlocks: newHiddenBlocks, hiddenServices: newHiddenServices, history: newHistory };
    }
    case "RESET_ALL":
      return { ...state, hiddenServices: new Set(), hiddenBlocks: new Set(), history: [] };
    case "RESTORE_SERVICE": {
      const newHiddenServices = new Set(state.hiddenServices);
      newHiddenServices.delete(action.id);
      return { ...state, hiddenServices: newHiddenServices };
    }
    case "RESTORE_BLOCK": {
      const newHiddenBlocks = new Set(state.hiddenBlocks);
      newHiddenBlocks.delete(action.id);
      const newHiddenServices = new Set(state.hiddenServices);
      action.services.forEach(s => newHiddenServices.delete(s));
      return { ...state, hiddenBlocks: newHiddenBlocks, hiddenServices: newHiddenServices };
    }
    case "SET_TRIAGEM_DATA":
      return { ...state, triagemData: action.data };
    case "SET_TRIAGEM_OPEN":
      return { ...state, isTriagemOpen: action.open };
    case "SET_SERVICE_LOADED":
      return { ...state, serviceLoaded: action.loaded };
    case "INIT_FROM_STORAGE":
      return {
        ...state,
        hiddenServices: new Set(action.hiddenServices),
        hiddenBlocks: new Set(action.hiddenBlocks),
        serviceLoaded: true,
      };
    default:
      return state;
  }
}

let globalListeners: Array<(state: AppState) => void> = [];
let globalState: AppState = createInitialState();

export function getGlobalState() { return globalState; }
export function subscribeToState(fn: (state: AppState) => void) {
  globalListeners.push(fn);
  return () => { globalListeners = globalListeners.filter(l => l !== fn); };
}
function dispatch(action: AppAction) {
  globalState = appReducer(globalState, action);
  globalListeners.forEach(fn => fn(globalState));
}

export function useServiceState() {
  const stateRef = useRef(globalState);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    return subscribeToState((newState) => {
      stateRef.current = newState;
      forceUpdate();
    });
  }, []);

  const removeService = useCallback((id: string) => {
    dispatch({ type: "REMOVE_SERVICE", id });
    checkAutoCollapse();
  }, []);

  const removeBlock = useCallback((id: string, children: string[]) => {
    dispatch({ type: "REMOVE_BLOCK", id, children });
  }, []);

  const undo = useCallback(() => {
    dispatch({ type: "UNDO" });
  }, []);

  const resetAll = useCallback(() => {
    dispatch({ type: "RESET_ALL" });
  }, []);

  const restoreService = useCallback((id: string) => {
    dispatch({ type: "RESTORE_SERVICE", id });
  }, []);

  const restoreBlock = useCallback((id: string, services: string[]) => {
    dispatch({ type: "RESTORE_BLOCK", id, services });
  }, []);

  const isHidden = useCallback((id: string) => {
    return stateRef.current.hiddenServices.has(id) || stateRef.current.hiddenBlocks.has(id);
  }, []);

  const isBlockHidden = useCallback((id: string) => {
    return stateRef.current.hiddenBlocks.has(id);
  }, []);

  const hiddenBlockIds = useCallback((allBlockIds: string[]) => {
    return allBlockIds.filter(id => stateRef.current.hiddenBlocks.has(id));
  }, []);

  return {
    state: stateRef.current,
    removeService,
    removeBlock,
    undo,
    resetAll,
    restoreService,
    restoreBlock,
    isHidden,
    isBlockHidden,
    hiddenBlockIds,
    dispatch,
  };
}

export function getTriagemData(storageKey: string): TriagemData | null {
  if (typeof window === "undefined") return null;
  const saved = sessionStorage.getItem(storageKey);
  if (!saved) return null;
  try { return JSON.parse(saved); } catch { return null; }
}

export function saveTriagemData(storageKey: string, data: TriagemData) {
  sessionStorage.setItem(storageKey, JSON.stringify(data));
}

function checkAutoCollapse() {
  if (typeof window === "undefined") return;
  const state = globalState;
  const toRemove: string[] = [];
  state.history
    .filter(e => e.type === "block" && e.children?.length)
    .forEach(e => {
      const allHidden = (e.children || []).every(c => state.hiddenServices.has(c));
      if (allHidden && !state.hiddenBlocks.has(e.id)) {
        toRemove.push(e.id);
      }
    });
  toRemove.forEach(id => {
    dispatch({ type: "REMOVE_BLOCK", id, children: [] });
  });
}
