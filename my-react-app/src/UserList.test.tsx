import {beforeEach, describe, expect, it, vi} from "vitest";
import {MemoryRouter} from "react-router-dom";
import UserList from "./UserList.tsx";
import {render, screen} from "@testing-library/react";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {retry: false}, // в тестах не retry
  },
});

describe("user list", () => {
  beforeEach(() => {
    vi.resetAllMocks()
  });
  it("show users after loading", async () => {
    vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve([
            {id: 1, name: 'Андрей', email: 'a@test.com'},
          ])
        })
    ));

    render(
        <QueryClientProvider client={queryClient}>
          <MemoryRouter>
            <UserList/>
          </MemoryRouter>
        </QueryClientProvider>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(await screen.findByText('Андрей')).toBeInTheDocument()
  });
});