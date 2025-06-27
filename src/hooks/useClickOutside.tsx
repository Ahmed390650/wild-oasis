import { useEffect, useRef } from "react";

const useClickOutside = (callBack: () => void, listenCapturing = true) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callBack();
      }
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (ref.current) {
          callBack();
        }
      }
    };
    document.addEventListener("click", handleClick, listenCapturing);
    document.addEventListener("keydown", handleKey, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
      document.removeEventListener("keydown", handleKey, listenCapturing);
    };
  }, [callBack, listenCapturing]);

  return { ref };
};

export default useClickOutside;
