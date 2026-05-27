import React, { createContext, useContext, useState } from "react";

// 1) Створюємо контекст
const TabsContext = createContext(null);

// 2) Головний компонент-контейнер
export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ active, setActive }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

// 3) Підкомпоненти

Tabs.List = function TabsList({ children }) {
  return <div className="tabs-list">{children}</div>;
};

Tabs.Trigger = function TabsTrigger({ value, children }) {
  const { active, setActive } = useContext(TabsContext);

  return (
    <button
      onClick={() => setActive(value)}
      style={{
        fontWeight: active === value ? "bold" : "normal",
        marginRight: 8,
      }}
    >
      {children}
    </button>
  );
};

Tabs.Content = function TabsContent({ value, children }) {
  const { active } = useContext(TabsContext);

  if (active !== value) return null;

  return <div className="tabs-content">{children}</div>;
};

// 4) Використання
export default function App() {
  return (
    <Tabs defaultValue="a">
      <Tabs.List>
        <Tabs.Trigger value="a">Tab A</Tabs.Trigger>
        <Tabs.Trigger value="b">Tab B</Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="a">Content for A</Tabs.Content>
      <Tabs.Content value="b">Content for B</Tabs.Content>
    </Tabs>
  );
}
