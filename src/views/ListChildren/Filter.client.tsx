import type { ReactNode } from "react";

export default function Filter({ children }: { children: ReactNode }) {
  return (
    <form
      onChange={(event) => {
        const filters = [];
        for (const select of event.currentTarget.querySelectorAll("select")) {
          if (!select.value) continue;
          filters.push(select.name + "=" + select.value);
        }
        for (const child of event.currentTarget.querySelectorAll("[data-categories]")) {
          child.toggleAttribute(
            "hidden",
            !filters.every((filter) => child.getAttribute("data-categories")?.includes(filter)),
          );
        }
        history.replaceState(
          null,
          "",
          location.pathname + (filters.length > 0 ? "?" + filters.join("&") : ""),
        );
      }}
      onReset={(event) => {
        for (const select of event.currentTarget.querySelectorAll("select")) {
          select.value = "";
        }
        for (const child of event.currentTarget.querySelectorAll("[data-categories]")) {
          child.removeAttribute("hidden");
        }
        history.replaceState(null, "", location.pathname);
        event.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
