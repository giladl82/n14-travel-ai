import { create } from 'zustand';
type ResponseState = {
  response: string | null;
  error: Error | null;
  setResponse: (response: string) => void;
  setError: (error: Error) => void;
  reset: () => void;
};

export const useResponseStore = create<ResponseState>((set) => ({
  response: null,
  error: null,
  setResponse: (chunk: string) =>
    set((state) => ({
      response: (state.response ?? '') + chunk,
      error: null,
    })),
  setError: (error: Error) => set({ error, response: null }),
  reset: () => set({ response: null, error: null }),
}));

export const useResponseStoreModifiers = () => {
  return useResponseStore(({ setResponse, setError, reset }) => ({
    setResponse,
    setError,
    reset,
  }));
};
