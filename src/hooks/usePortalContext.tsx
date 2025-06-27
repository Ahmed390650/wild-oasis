import { useCallback, useId, useState } from "react";
const initalPosition: position = null;

const usePortalContext = () => {
  const [openId, setOpenId] = useState<string | null>();
  const id = useId();
  const [position, setPosition] = useState<position>(initalPosition);
  const openMenu = useCallback(
    (pos: { x: number; y: number }) => {
      setOpenId(id);
      setPosition(pos);
    },
    [id]
  );
  const closeMenu = useCallback(() => {
    setOpenId(null);
    setPosition(null);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const pos = {
      x: window.innerWidth - rect.x - rect.width,
      y: rect.y + rect.height + 8,
    };
    if (openId === id) closeMenu();
    else openMenu(pos);
  };
  return { openId, position, openMenu, handleClick, closeMenu, id };
};

export default usePortalContext;
