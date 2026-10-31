import { useState } from "react";
import { ChatPanel } from "./components/ChatPanel";
import { Composer } from "./components/Composer";
import { Header } from "./components/Header";
import { Landing } from "./components/Landing";
import { RoutingInspector } from "./components/RoutingInspector";
import { useAgentRoute } from "./hooks/useAgentRoute";

export default function App() {
  const route = useAgentRoute();
  const hasMessages = route.turns.length > 0 || route.pending;
  const [entered, setEntered] = useState(false);

  if (!entered) {
    return <Landing onEnter={() => setEntered(true)} />;
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Header
        connected={route.connected}
        dark={route.dark}
        hasMessages={hasMessages}
        onToggleTheme={route.toggleTheme}
        onNew={route.newConversation}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto lg:flex-row lg:overflow-hidden">
        <ChatPanel
          turns={route.turns}
          pending={route.pending}
          activeId={route.active?.id ?? null}
          onSelect={route.setActive}
        />
        <RoutingInspector
          pending={route.pending}
          prompt={route.pending ? route.pendingPrompt : (route.active?.prompt ?? null)}
          result={route.pending ? null : (route.active?.result ?? null)}
        />
      </div>
      <Composer
        pending={route.pending}
        onSend={(message) => void route.onSend(message)}
      />
    </div>
  );
}
